import { FaTrash } from "react-icons/fa";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";

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
    <div className="flex w-full flex-col items-center gap-4 rounded-md border border-store-line bg-store-bg/60 p-4 sm:flex-row sm:justify-between md:gap-6">
      <div className="flex w-full flex-1 items-center gap-4">
        <Link
          to={`/${productId}`}
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md bg-white p-2"
        >
          <img className="max-h-full object-contain" src={photo} alt={name} />
        </Link>
        <article className="min-w-0">
          <Link
            to={`/${productId}`}
            className="line-clamp-2 font-medium text-store-text transition-colors hover:text-store-accent"
          >
            {name}
          </Link>
          <span className="mt-1 block font-display text-lg font-semibold text-store-accent">
            ₹{price}
          </span>
        </article>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 rounded-md border border-store-line bg-white px-3 py-1.5">
          <button
            type="button"
            onClick={() => decrementHandler(cartItem)}
            className="text-lg text-store-muted transition-colors hover:text-store-accent"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <p className="min-w-[1.5rem] text-center font-medium text-store-text">
            {quantity}
          </p>
          <button
            type="button"
            onClick={() => incrementHandler(cartItem)}
            className="text-lg text-store-muted transition-colors hover:text-store-accent"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-store-muted transition-colors hover:text-red-500"
          onClick={() => removeHandler(productId)}
          aria-label={`Remove ${name}`}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItems;
