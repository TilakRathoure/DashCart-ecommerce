import React, { useState } from "react";
import { IconType } from "react-icons";
import {
  FaChartBar,
  FaRegCreditCard,
  FaUsers,
  FaStopwatch,
  FaTicketAlt,
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

interface Topic {
  topic: string;
  items: {
    title: string;
    icon: IconType;
    path: string;
  }[];
}

const topics: Topic[] = [
  {
    topic: "Dashboard",
    items: [
      { title: "Dashboard", icon: FaChartBar, path: "/admin/dashboard" },
      { title: "Products", icon: FaRegCreditCard, path: "/admin/products" },
      { title: "Customers", icon: FaUsers, path: "/admin/customers" },
      { title: "Transactions", icon: FaTicketAlt, path: "/admin/transactions" },
    ],
  },
  {
    topic: "Apps",
    items: [
      { title: "Stopwatch", icon: FaStopwatch, path: "/admin/stopwatch" },
      { title: "Coupon", icon: FaTicketAlt, path: "/admin/coupon" },
    ],
  },
];

const AdminSidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <button
        type="button"
        aria-label="Open admin menu"
        className="fixed left-4 top-4 z-30 rounded-md border border-admin-line bg-admin-elevated p-2 text-admin-text shadow-lg md:hidden"
        onClick={() => setMenuOpen(true)}
      >
        <HiMenu className="text-2xl" />
      </button>

      {menuOpen && (
        <button
          type="button"
          aria-label="Close admin menu overlay"
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 z-40 flex h-screen w-64 flex-col border-r border-admin-line bg-gradient-to-b from-admin-bg via-admin-surface to-admin-bg p-5 text-admin-text transition-transform duration-300 md:static md:w-1/4 md:min-w-[220px] md:max-w-[280px] md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-xl font-semibold tracking-tight text-admin-text"
            onClick={() => setMenuOpen(false)}
          >
            DashCart
          </Link>
          <button
            type="button"
            aria-label="Close admin menu"
            className="rounded-md border border-admin-line p-1.5 text-admin-muted transition hover:text-admin-text md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <HiX className="text-lg" />
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          {topics.map((group) => (
            <div key={group.topic}>
              <h2 className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-admin-muted">
                {group.topic}
              </h2>
              <ul className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    location.pathname.startsWith(`${item.path}/`);
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
                          isActive
                            ? "bg-admin-accent/15 font-medium text-admin-accent"
                            : "text-admin-muted hover:bg-admin-elevated hover:text-admin-text"
                        }`}
                      >
                        {React.createElement(item.icon, {
                          className: "text-base shrink-0",
                        })}
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
