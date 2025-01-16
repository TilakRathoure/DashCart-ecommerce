import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";

const Shipping = () => {
  const { cartItems, total } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
    <div className="relative p-8">
      <button
        className="absolute top-8 left-8 p-2 bg-gray-800 text-white rounded-full shadow-md flex items-center justify-center"
        onClick={() => navigate("/cart")}
      >
        <BiArrowBack className="transition-all duration-300 hover:translate-x-1" />
      </button>

      <form
        onSubmit={submitHandler}
        className="max-w-lg w-full mx-auto p-8 flex flex-col space-y-6 bg-white shadow-lg rounded-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Shipping Address</h1>

        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
          className="p-3 border border-gray-300 rounded-lg text-lg"
        />

        <input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
          className="p-3 border border-gray-300 rounded-lg text-lg"
        />

        <input
          required
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
          className="p-3 border border-gray-300 rounded-lg text-lg"
        />

        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
          className="p-3 border border-gray-300 rounded-lg text-lg"
        >
          <option value="">Choose Country</option>
          <option value="india">India</option>
        </select>

        <input
          required
          type="number"
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
          className="p-3 border border-gray-300 rounded-lg text-lg"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg uppercase tracking-wide hover:opacity-80"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Shipping;
