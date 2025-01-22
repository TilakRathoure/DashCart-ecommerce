import { motion } from "framer-motion";
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
import dashboard from "../assets/Screenshot 2025-01-18 223547.png";

const Home = () => {
  const { cartItems: CART } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    const index = CART.findIndex((i) => i.productId === cartItem.productId);

    if (index !== -1) return toast.success("Already in cart");

    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <div className="">
      {/* Background Image - No animation here */}
      <img
        src={backimg}
        className="absolute w-[100vw] object-cover object-top xl:object-left-top top-0 -z-40 h-[40vh]"
        alt="Background"
      />

      <div className="mt-[35vh]">
        {/* Checkout Dashboard Section */}
        <Link to="/admin/dashboard">
          <motion.div
            className="relative mb-5 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <img
              src={dashboard}
              className="z-2 object-cover object-top lg:object-center w-full h-[15vh]"
              alt="Dashboard"
            />
            <div className="inset-0 z-4 absolute backdrop-blur-sm"></div>
            <p className="z-10 absolute font-bold inset-0 flex items-center justify-center text-white">
              Checkout Dashboard
            </p>
          </motion.div>
        </Link>

        {/* Title Section */}
        <motion.h1
          className="md:px-10 px-3 py-1 text-center text-2xl flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          Latest Products
          <Link to="/search" className="text-xl">
            More
          </Link>
        </motion.h1>

        {/* Product Cards Section */}
        <motion.main
          className="w-full bg-gray-100 py-10 flex gap-4 justify-center flex-wrap mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          {isLoading ? (
            <Skeleton width="80vw" />
          ) : (
            data?.products.map((i) => (
              <motion.div
                key={i._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                  photo={i.photo}
                />
              </motion.div>
            ))
          )}
        </motion.main>
      </div>
    </div>
  );
};

export default Home;
