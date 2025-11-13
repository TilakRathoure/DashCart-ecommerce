import { FaTrash } from "react-icons/fa";
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
    <div className="w-full flex flex-col sm:flex-row text-sm md:text-base justify-between md:justify-around items-center gap-5">
      <div className="w-2/3">
        <div className="flex justify-center w-full">
          <img className="max-h-[150px]" src={photo} alt={name} />
        </div>
        <article className="w-full text-center">
          <p className="">{name}</p>
          <span>₹{price}</span>
        </article>
      </div>

      <div className="flex gap-2 sm:w-1/3">
        <div className=" flex justify-between max-w-[150px] bg-white px-3 rounded-lg gap-5">
          <button onClick={() => decrementHandler(cartItem)}>-</button>
          <p className="text-center border-2 border-white">{quantity}</p>
          <button onClick={() => incrementHandler(cartItem)}>+</button>
        </div>

        <button className="" onClick={() => removeHandler(productId)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItems;
