import { ReactElement } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
  message?:string;
}

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminOnly,
  admin,
  message=""
}: Props) => {
  if (!isAuthenticated){
    if(message) toast.error(message);
    return <Navigate to="/login" />;
  }

  if (adminOnly && !admin){
    toast.error("Dont have admin access");
    return <Navigate to="/admin/dashboard" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;