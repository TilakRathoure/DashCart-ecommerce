import { ReactElement } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
  message?: string;
}

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminOnly,
  admin,
  redirect = "/login",
  message = "",
}: Props) => {
  const { loading } = useSelector((state: RootState) => state.userReducer);

  // Wait for Firebase/session resolve — don't bounce users while auth is unknown.
  if (loading) return null;

  if (!isAuthenticated) {
    if (message) toast.error(message);
    return <Navigate to={redirect} replace />;
  }

  if (adminOnly && !admin) {
    toast.error("Dont have admin access");
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
