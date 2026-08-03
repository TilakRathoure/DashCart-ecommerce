import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="admin-shell flex min-h-screen">
      <AdminSidebar />
      <main className="relative flex min-h-screen w-full flex-1 flex-col overflow-y-auto bg-gradient-to-br from-admin-bg via-admin-surface to-admin-bg px-5 pb-5 pt-16 md:p-7">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
