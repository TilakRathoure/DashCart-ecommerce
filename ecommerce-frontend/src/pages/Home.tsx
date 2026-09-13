import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProductGridSkeleton } from "../components/Loader";
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
    <div className="store-shell">
      {/* Hero */}
      <section className="relative min-h-[88vh] w-full overflow-hidden">
        <img
          src={backimg}
          className="absolute inset-0 h-full w-full object-cover object-top xl:object-left-top"
          alt="Featured products"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-store-bg via-store-bg/90 to-store-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-store-bg via-transparent to-store-bg/40" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-20 md:px-10">
          <motion.p
            className="font-display text-5xl font-bold tracking-tight text-store-text sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            DashCart
          </motion.p>
          <motion.h1
            className="mt-4 max-w-xl font-display text-2xl font-semibold text-store-text sm:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Gear that moves with you
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md text-base text-store-muted sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Curated tech and everyday essentials — shop fast, manage smarter.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Link to="/search" className="store-btn">
              Shop latest
            </Link>
            <a href="#admin-showcase" className="store-btn-ghost">
              View admin demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* Admin showcase — recruiter feature */}
      <section
        id="admin-showcase"
        className="border-y border-store-line bg-store-surface"
      >
        <motion.div
          className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:px-10 md:py-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-store-accent">
              Built-in admin
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-store-text md:text-4xl">
              Admin Dashboard
            </h2>
            <p className="mt-4 max-w-md text-store-muted">
              Explore the full management suite — products, customers, charts,
              and transactions — the same tools recruiters can try live.
            </p>
            <Link to="/admin/dashboard" className="store-btn mt-8">
              Checkout Admin Dashboard
            </Link>
          </div>
          <Link
            to="/admin/dashboard"
            className="group relative block overflow-hidden rounded-md border border-store-line shadow-sm"
          >
            <img
              src={dashboard}
              className="h-[240px] w-full object-cover object-top transition duration-500 group-hover:scale-[1.02] lg:h-[320px] lg:object-center"
              alt="Admin dashboard preview"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-store-text/20 to-transparent" />
          </Link>
        </motion.div>
      </section>

      {/* Latest Products */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-20">
        <motion.div
          className="mb-8 flex items-end justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold text-store-text md:text-3xl">
            Latest Products
          </h2>
          <Link
            to="/search"
            className="text-sm font-medium text-store-accent transition-colors hover:text-teal-700"
          >
            More
          </Link>
        </motion.div>

        <motion.main
          className="flex flex-wrap justify-center gap-4 md:justify-start"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {isLoading ? (
            <ProductGridSkeleton count={8} className="contents" />
          ) : (
            data?.products.map((i, index) => (
              <motion.div
                key={i._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
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
      </section>
    </div>
  );
};

export default Home;
