import { FaTrash } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItems = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;

  return (
    <div className="w-full flex text-sm md:text-base justify-between md:justify-around items-center gap-5">
      <div className="w-2/3">
        <div className="flex justify-center w-full">
        <img className="max-h-[150px]" src={`${server}/${photo}`} alt={name} />
        </div>
      <article>
        <p className="">{name}</p>
        <span>₹{price}</span>
      </article>
      </div>

      <div className="relative gap-2 w-1/3">
        <div className=" flex justify-between max-w-[150px] bg-white px-3 rounded-lg gap-5">
          <button onClick={() => decrementHandler(cartItem)}>-</button>
          <p className="text-center border-2 border-white">{quantity}</p>
          <button onClick={() => incrementHandler(cartItem)}>+</button>
        </div>

        <button className=" -top-5 lg:-right[6px] lg:top-[5px] right-0 absolute" onClick={() => removeHandler(productId)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItems;
