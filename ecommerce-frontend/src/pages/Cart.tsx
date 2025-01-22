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
    <div className="flex gap-2 justify-between p-8 h-[calc(100vh-4rem)]">
      <main className="w-[70%] sm:w-[60%] flex flex-col gap-3 bg-gray-100 p-4 overflow-y-auto">
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
          <h1 className="text-center text-2xl">No Items Added</h1>
        )}
      </main>

      <aside className=" w-[30%] sm:w-[40%] text-base md:text-lg flex flex-col gap-6 sm:p-4">
        <p className="">Subtotal: ₹{subtotal}</p>
        <p className="">Shipping Charges: ₹{shippingCharges}</p>
        <p className="">Tax: ₹{tax}</p>
        <p className="">
          Discount: <em className="text-red-500"> - ₹{discount}</em>
        </p>
        <p className="text-lg font-bold">
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="p-4 border border-gray-300 rounded-md mt-8"
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="text-green-500">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="text-red-500 flex items-center gap-1">
              Invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && (
          <Link
            to="/shipping"
            className="bg-blue-500 text-white py-4 px-1 sm:px-4 rounded-md uppercase tracking-wide hover:opacity-80"
          >
            Checkout
          </Link>
        )}
      </aside>
    </div>
  );
};

export default Cart;
