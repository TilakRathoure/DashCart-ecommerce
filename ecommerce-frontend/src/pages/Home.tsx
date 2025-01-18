import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/Product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import backimg from "../assets/iPhone-15-General-Feature-Green.webp";
import { RootState } from "../redux/store";

const Home = () => {
  const { cartItems: CART } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {

    const index=CART.findIndex((i)=>i.productId===cartItem.productId);

    if(index!=-1) return toast.success("Already in cart");

    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full">
      <img
        src={backimg}
        className="absolute w-[100vw] object-cover object-top xl:object-left-top top-0 -z-40 h-[40vh]"
        alt=""
      />

      <div className="mt-[25vh]">
        <h1 className="md:px-10 mt-12 px-3 py-1 text-center text-2xl flex justify-between items-center">
          Latest Products
          <Link to="/search" className="text-xl">
            More
          </Link>
        </h1>

        <main className="w-full bg-gray-100 py-10 flex gap-4 justify-center flex-wrap mt-6">
          {isLoading ? (
            <Skeleton width="80vw" />
          ) : (
            data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
