import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-store-line bg-store-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <Link
            to="/"
            className="font-display text-2xl font-bold tracking-tight text-store-text"
          >
            DashCart
          </Link>
          <p className="mt-2 max-w-xs text-sm text-store-muted">
            Fast commerce with a live admin suite — shop and manage in one
            stack.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <nav className="flex gap-5 text-sm text-store-muted">
            <Link to="/" className="transition-colors hover:text-store-accent">
              Home
            </Link>
            <Link
              to="/search"
              className="transition-colors hover:text-store-accent"
            >
              Search
            </Link>
            <Link
              to="/cart"
              className="transition-colors hover:text-store-accent"
            >
              Cart
            </Link>
          </nav>
          <div className="flex gap-4 text-xl text-store-muted">
            <a
              href="https://github.com/TilakRathoure/DashCart-ecommerce"
              aria-label="GitHub"
              className="transition-colors hover:text-store-accent"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/tilakrathoure"
              aria-label="LinkedIn"
              className="transition-colors hover:text-store-accent"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
