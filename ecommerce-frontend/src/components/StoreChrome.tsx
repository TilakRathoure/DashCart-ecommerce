import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { User } from "../types/types";

interface Props {
  user: User | null;
  children: ReactNode;
}

const StoreChrome = ({ user, children }: Props) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header user={user} />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
};

export default StoreChrome;
