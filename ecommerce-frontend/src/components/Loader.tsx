import { useLocation } from "react-router-dom";

interface LoaderProps {
  variant?: "light" | "dark";
}

const Loader = ({ variant = "light" }: LoaderProps) => {
  const isDark = variant === "dark";

  return (
    <section
      className={`flex h-screen w-full items-center justify-center ${
        isDark ? "bg-admin-bg" : "bg-store-bg"
      }`}
    >
      <div
        className={`h-[10rem] w-[10rem] animate-spin rounded-full border-[1rem] ${
          isDark
            ? "border-admin-line border-t-admin-accent border-r-admin-accent"
            : "border-store-line border-t-store-accent border-r-store-accent"
        }`}
      />
    </section>
  );
};

/** Suspense fallback that follows storefront vs admin theme from the URL. */
export const RouteLoader = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  return <Loader variant={isAdmin ? "dark" : "light"} />;
};

export default Loader;

interface SkeletonProps {
  width?: string;
  length?: number;
  variant?: "light" | "dark";
}

export const Skeleton = ({
  width = "unset",
  length = 3,
  variant = "light",
}: SkeletonProps) => {
  const barClass =
    variant === "dark"
      ? "mb-2 h-[30px] w-full animate-pulse rounded-md bg-admin-elevated"
      : "mb-2 h-[30px] w-full animate-pulse rounded-md bg-white";

  const skeletions = Array.from({ length }, (_, idx) => (
    <div key={idx} className={barClass}></div>
  ));

  return (
    <div className="flex flex-col" style={{ width }}>
      {skeletions}
    </div>
  );
};
