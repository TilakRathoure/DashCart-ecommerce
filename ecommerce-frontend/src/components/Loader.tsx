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

/** Quiet Suspense fallback for route chunk loads — keeps chrome stable. */
export const RouteLoader = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <section
      className={`flex min-h-[calc(100vh-4rem)] w-full items-center justify-center ${
        isAdmin ? "bg-admin-bg" : "bg-store-bg"
      }`}
      aria-busy="true"
      aria-label="Loading page"
    >
      <div
        className={`h-10 w-10 animate-spin rounded-full border-[3px] ${
          isAdmin
            ? "border-admin-line border-t-admin-accent"
            : "border-store-line border-t-store-accent"
        }`}
      />
    </section>
  );
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

export const ProductCardSkeleton = () => (
  <div
    className="flex w-[13.5rem] flex-col overflow-hidden rounded-md border border-store-line bg-store-surface shadow-sm"
    aria-hidden
  >
    <div className="h-[13rem] animate-pulse bg-store-bg" />
    <div className="flex flex-col gap-2 border-t border-store-line p-4">
      <div className="h-4 w-4/5 animate-pulse rounded-md bg-store-bg" />
      <div className="h-5 w-1/3 animate-pulse rounded-md bg-store-bg" />
    </div>
  </div>
);

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

export const ProductGridSkeleton = ({
  count = 8,
  className = "flex flex-wrap justify-center gap-4 md:justify-start",
}: ProductGridSkeletonProps) => (
  <div className={className} aria-busy="true" aria-label="Loading products">
    {Array.from({ length: count }, (_, idx) => (
      <ProductCardSkeleton key={idx} />
    ))}
  </div>
);

export const ProductDetailsSkeleton = () => (
  <div className="store-shell min-h-[calc(100vh-4rem)]" aria-busy="true">
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-10 md:py-12">
      <div className="h-4 w-32 animate-pulse rounded-md bg-store-line" />

      <div className="mt-6 grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-h-[320px] animate-pulse rounded-md border border-store-line bg-store-surface md:min-h-[480px]" />

        <div className="flex flex-col justify-center">
          <div className="h-3 w-24 animate-pulse rounded-md bg-store-line" />
          <div className="mt-3 h-10 w-3/4 max-w-md animate-pulse rounded-md bg-store-line" />
          <div className="mt-4 h-9 w-28 animate-pulse rounded-md bg-store-line" />
          <div className="mt-5 h-8 w-32 animate-pulse rounded-md bg-store-line" />
          <div className="mt-6 h-16 max-w-md animate-pulse rounded-md bg-store-line" />
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="h-12 w-36 animate-pulse rounded-md bg-store-line" />
            <div className="h-12 w-28 animate-pulse rounded-md bg-store-line" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
