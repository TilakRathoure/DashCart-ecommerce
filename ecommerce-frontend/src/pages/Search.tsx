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

  if (isError) {
    toast.error("Error while fetching");
  }
  if (productIsError) {
    toast.error("Error while fetching");
  }

  return (
    <div className="flex p-8 space-x-8 min-h-[calc(100vh-6.5vh)]">
      {/* Sidebar (Filters) */}
      <aside className="min-w-[20rem] p-8 shadow-xl flex flex-col space-y-4">
        <h2 className="text-3xl font-bold">Filters</h2>

        <div>
          <h4 className="text-xl">Sort</h4>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded-xl mt-2"
          >
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4 className="text-xl">Max Price: ₹{maxPrice}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div>
          <h4 className="text-xl">Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded-xl mt-2"
          >
            <option value="">ALL</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>

      {/* Main Content (Products) */}
      <main className="flex flex-col w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-gray-400 rounded-xl mb-4 text-xl"
        />

        {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="flex flex-wrap gap-8">
            {searchedData?.products.map((i) => (
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
        )}

        {searchedData && searchedData.totalPage > 1 && (
          <div className="flex items-center justify-between mt-4">
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="p-2 bg-blue-500 text-white rounded-xl disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              {page} of {searchedData.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="p-2 bg-blue-500 text-white rounded-xl disabled:opacity-50"
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
