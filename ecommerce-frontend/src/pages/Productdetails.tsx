import { Link, useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";

const Productdetails = () => {
  const { cartItems: CART } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    const index = CART.findIndex((i) => i.productId === cartItem.productId);

    if (index != -1) return toast.success("Already in cart");

    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const { id } = useParams();

  const { data, isError, error, isLoading } = useProductDetailsQuery(id!);

  if (isError) {
    const err = error as CustomError;
    toast.error(`Error ${err.data.message}`);
  }

  if (isLoading) {
    return <Loader />;
  }

  const product = data?.product;
  const inStock = (product?.stock ?? 0) > 0;
  const alreadyInCart = CART.some((i) => i.productId === product?._id);

  return (
    <div className="store-shell min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-10 md:py-12">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 text-sm text-store-muted transition-colors hover:text-store-accent"
        >
          <FaArrowLeft className="text-xs" />
          Back to products
        </Link>

        <div className="mt-6 grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-h-[320px] items-center justify-center rounded-md border border-store-line bg-store-surface p-8 md:min-h-[480px]">
            <img
              className="max-h-[50vh] w-full object-contain"
              src={product?.photo}
              alt={product?.name || "Product"}
            />
          </div>

          <div className="flex flex-col justify-center">
            {product?.category && (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-store-accent">
                {product.category}
              </p>
            )}
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-store-text md:text-4xl">
              {product?.name}
            </h1>
            <p className="mt-4 font-display text-3xl font-semibold text-store-accent">
              ₹{product?.price}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <span
                className={`rounded-md border px-3 py-1.5 font-medium ${
                  inStock
                    ? "border-teal-200 bg-teal-50 text-teal-800"
                    : "border-red-200 bg-red-50 text-red-600"
                }`}
              >
                {inStock ? `${product?.stock} in stock` : "Out of stock"}
              </span>
              {alreadyInCart && (
                <span className="rounded-md border border-store-line bg-store-bg px-3 py-1.5 text-store-muted">
                  Already in cart
                </span>
              )}
            </div>

            <p className="mt-6 max-w-md text-store-muted">
              Ready to ship from DashCart. Add it to your bag and checkout when
              you&apos;re ready.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={!inStock}
                className="store-btn !px-6 !py-3 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() =>
                  addToCartHandler({
                    productId: product?._id!,
                    photo: product?.photo!,
                    name: product?.name!,
                    price: product?.price!,
                    quantity: 1,
                    stock: product?.stock!,
                  })
                }
              >
                <FaShoppingBag />
                Add to Cart
              </button>
              <Link to="/cart" className="store-btn-ghost !px-6 !py-3">
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
