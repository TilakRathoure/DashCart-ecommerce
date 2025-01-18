import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const { cartItems } = useSelector((state) => state.cartReducer);

  const adminpage = location.pathname.includes("admin");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <nav className="backdrop-blur-5 z-50 bg-transparent md:px-10 flex justify-between items-center space-x-4 p-4">
      <Link to="/">
        <p
          className={`${
            adminpage && "pl-12"
          } text-2xl font-semibold cursor-pointer`}
        >
          ShopHere
        </p>
      </Link>

      <div className="relative flex gap-4 items-center">
        <Link
          onClick={() => setIsOpen(false)}
          to={"/"}
          className="text-gray-700 hover:text-blue-600 text-xl tracking-wider"
        >
          HOME
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          to={"/search"}
          className="text-gray-700 hover:text-blue-600 text-xl"
        >
          <FaSearch />
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          to={"/cart"}
          className="relative text-gray-700 hover:text-blue-600 text-xl"
        >
          <div className="absolute w-[10px] h-[15px] -top-[4px] right-0 rounded-md text-center text-xs bg-red-600 text-white">
            {cartItems.length}
          </div>
          <FaShoppingBag />
        </Link>

        {user?._id ? (
          <>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-gray-700 hover:text-blue-600 text-xl"
            >
              <FaUser />
            </button>
            <dialog
              open={isOpen}
              className="border border-gray-300 rounded p-2 w-28 absolute top-10 right-0"
            >
              <div className="flex flex-col items-center space-y-1">
                {user.role === "admin" && (
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/admin/dashboard"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Admin
                  </Link>
                )}

                <Link
                  onClick={() => setIsOpen(false)}
                  to="/orders"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Orders
                </Link>
                <button
                  onClick={logoutHandler}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link
            to={"/login"}
            className="text-gray-700 hover:text-blue-600 text-xl"
          >
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
