import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItemcard";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
  saveCoupon,
} from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };
  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          dispatch(saveCoupon(couponCode));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="store-shell mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:gap-8 md:px-10">
      <main className="flex flex-1 flex-col gap-3 overflow-y-auto rounded-md border border-store-line bg-store-surface p-4 md:p-6">
        <h1 className="mb-2 font-display text-2xl font-bold text-store-text md:text-3xl">
          Your cart
        </h1>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={idx}
              cartItem={i}
            />
          ))
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
            <h2 className="font-display text-2xl font-semibold text-store-text">
              No items added
            </h2>
            <p className="text-sm text-store-muted">
              Browse the catalog and add something you like.
            </p>
            <Link to="/search" className="store-btn">
              Shop products
            </Link>
          </div>
        )}
      </main>

      <aside className="flex w-full flex-col gap-4 rounded-md border border-store-line bg-store-surface p-5 md:w-[36%] md:max-w-md md:p-6">
        <h2 className="font-display text-xl font-bold text-store-text">
          Order summary
        </h2>
        <div className="space-y-3 text-sm text-store-muted md:text-base">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-store-text">₹{subtotal}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>
            <span className="text-store-text">₹{shippingCharges}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax</span>
            <span className="text-store-text">₹{tax}</span>
          </p>
          <p className="flex justify-between">
            <span>Discount</span>
            <em className="not-italic text-red-500">- ₹{discount}</em>
          </p>
          <p className="flex justify-between border-t border-store-line pt-3 font-display text-lg font-bold text-store-text">
            <span>Total</span>
            <span>₹{total}</span>
          </p>
        </div>

        <input
          type="text"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="store-input mt-2"
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="text-sm text-teal-700">
              ₹{discount} off using <code className="font-medium">{couponCode}</code>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-sm text-red-500">
              Invalid coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && (
          <Link to="/shipping" className="store-btn mt-2 w-full !py-3 uppercase tracking-wide">
            Checkout
          </Link>
        )}
      </aside>
    </div>
  );
};

export default Cart;
