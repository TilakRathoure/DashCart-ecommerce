import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLocation } from "react-router-dom";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const { loading: authLoading } = useSelector(
    (state: RootState) => state.userReducer
  );

  const location = useLocation();
  const adminpage = location.pathname.includes("admin");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch {
      toast.error("Sign Out Fail");
    }
  };

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-store-line bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10">
        <Link to="/">
          <p
            className={`${
              adminpage ? "pl-12" : ""
            } font-display text-2xl font-bold tracking-tight text-store-text transition-colors hover:text-store-accent md:text-3xl`}
          >
            DashCart
          </p>
        </Link>

        <div className="relative flex items-center gap-1 sm:gap-2" ref={menuRef}>
          <Link
            onClick={() => setIsOpen(false)}
            to="/"
            className="hidden rounded-md px-3 py-2 text-sm font-medium tracking-wide text-store-muted transition-colors hover:text-store-accent sm:inline-block"
          >
            Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/search"
            aria-label="Search"
            className="rounded-md p-2.5 text-store-muted transition-colors hover:text-store-accent"
          >
            <FaSearch className="text-lg" />
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/cart"
            aria-label="Cart"
            className="relative rounded-md p-2.5 text-store-muted transition-colors hover:text-store-accent"
          >
            {cartItems.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded bg-store-accent px-1 text-[10px] font-semibold text-white">
                {cartItems.length}
              </span>
            )}
            <FaShoppingBag className="text-lg" />
          </Link>

          {authLoading ? (
            <div
              className="ml-1 h-9 w-9 animate-pulse rounded-md bg-store-bg"
              aria-hidden
            />
          ) : user?._id ? (
            <>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Account menu"
                className="rounded-md p-2.5 text-store-muted transition-colors hover:text-store-accent"
              >
                <FaUser className="text-lg" />
              </button>
              {isOpen && (
                <div className="absolute right-0 top-12 w-44 overflow-hidden rounded-md border border-store-line bg-store-surface py-1 shadow-lg">
                  {user.role === "admin" && (
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="/admin/dashboard"
                      className="block px-4 py-2.5 text-sm text-store-text transition-colors hover:bg-store-bg hover:text-store-accent"
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/orders"
                    className="block px-4 py-2.5 text-sm text-store-text transition-colors hover:bg-store-bg hover:text-store-accent"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-store-muted transition-colors hover:bg-store-bg hover:text-store-accent"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="store-btn-ghost ml-1 !px-3 !py-1.5 text-sm"
            >
              <FaSignInAlt />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
