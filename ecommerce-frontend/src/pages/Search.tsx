import { useState } from "react";
import ProductCard from "../components/Product-card";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";

const Search = () => {
  const searchQuery = useSearchParams()[0];

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState(searchQuery.get("category") || "");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  const hasActiveFilters =
    !!sort || !!category || maxPrice < 100000 || !!search;

  const clearFilters = () => {
    setSort("");
    setCategory("");
    setMaxPrice(100000);
    setSearch("");
    setPage(1);
  };

  if (isError) {
    toast.error("Error while fetching");
  }
  if (productIsError) {
    toast.error("Error while fetching");
  }

  return (
    <div className="store-shell flex min-h-[calc(100vh-4rem)]">
      <aside className="sticky top-[57px] flex h-[calc(100vh-57px)] w-[38vw] shrink-0 flex-col border-r border-store-line bg-store-surface sm:w-[240px] md:w-[280px]">
        <div className="flex items-center justify-between border-b border-store-line px-5 py-4">
          <div>
            <h2 className="font-display text-xl font-bold text-store-text">
              Filters
            </h2>
            <p className="mt-0.5 text-xs text-store-muted">Refine results</p>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-store-accent transition-colors hover:text-teal-700"
            >
              <FaTimes className="text-[10px]" />
              Clear
            </button>
          )}
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-store-muted">
              Sort by
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              {[
                { value: "", label: "Default" },
                { value: "asc", label: "Price: Low to High" },
                { value: "dsc", label: "Price: High to Low" },
              ].map((option) => (
                <button
                  key={option.value || "default"}
                  type="button"
                  onClick={() => {
                    setSort(option.value);
                    setPage(1);
                  }}
                  className={`rounded-md border px-3 py-2.5 text-left text-sm transition-colors ${
                    sort === option.value
                      ? "border-store-accent bg-teal-50 font-medium text-store-accent"
                      : "border-store-line bg-store-bg/50 text-store-text hover:border-store-accent/40"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <section className="border-t border-store-line pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-store-muted">
                Max price
              </h3>
              <span className="font-display text-sm font-semibold text-store-accent">
                {maxPrice >= 100000 ? "Any" : `₹${maxPrice}`}
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={10000}
              value={Math.min(maxPrice, 10000)}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setPage(1);
              }}
              className="mt-4 w-full accent-store-accent"
            />
            <div className="mt-1 flex justify-between text-[11px] text-store-muted">
              <span>₹100</span>
              <span>₹10,000</span>
            </div>
          </section>

          <section className="border-t border-store-line pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-store-muted">
              Category
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setCategory("");
                  setPage(1);
                }}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                  category === ""
                    ? "border-store-accent bg-store-accent text-white"
                    : "border-store-line bg-white text-store-muted hover:border-store-accent/40 hover:text-store-text"
                }`}
              >
                All
              </button>
              {!loadingCategories &&
                categoriesResponse?.categories.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setCategory(i);
                      setPage(1);
                    }}
                    className={`rounded-md border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                      category === i
                        ? "border-store-accent bg-store-accent text-white"
                        : "border-store-line bg-white text-store-muted hover:border-store-accent/40 hover:text-store-text"
                    }`}
                  >
                    {i}
                  </button>
                ))}
            </div>
          </section>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col bg-store-bg p-6 md:p-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-store-text">
            Products
          </h1>
          <p className="mt-1 text-sm text-store-muted">
            {productLoading
              ? "Loading catalog…"
              : `${searchedData?.products.length ?? 0} result${
                  (searchedData?.products.length ?? 0) === 1 ? "" : "s"
                }`}
          </p>
        </div>

        <div className="relative mb-6 max-w-xl">
          <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-store-muted" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="store-input pl-10 text-base"
          />
        </div>

        {productLoading ? (
          <Skeleton length={10} />
        ) : searchedData?.products.length ? (
          <div className="flex flex-wrap justify-center gap-4 md:justify-start md:gap-6">
            {searchedData.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
            <p className="font-display text-xl font-semibold text-store-text">
              No products found
            </p>
            <p className="mt-2 text-sm text-store-muted">
              Try adjusting filters or clearing your search.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="store-btn mt-6"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {searchedData && searchedData.totalPage > 1 && (
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="store-btn-ghost disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-store-muted">
              {page} of {searchedData.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="store-btn-ghost disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
