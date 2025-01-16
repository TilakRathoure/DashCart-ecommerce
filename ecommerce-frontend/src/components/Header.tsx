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

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
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
    <nav className="relative flex items-center justify-end space-x-4 p-4">
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
        className="text-gray-700 hover:text-blue-600 text-xl"
      >
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
          <dialog open={isOpen} className="border border-gray-300 rounded p-2 w-28 absolute top-0 right-0">
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
    </nav>
  );
};

export default Header;
