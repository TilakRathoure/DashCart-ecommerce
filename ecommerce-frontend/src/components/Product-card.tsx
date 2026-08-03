import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  const addHandler = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handler({
      productId,
      price,
      name,
      photo: photo,
      stock,
      quantity: 1,
    });
  };

  return (
    <Link to={`/${productId}`}>
      <div className="group relative flex w-[13.5rem] flex-col overflow-hidden rounded-md border border-store-line bg-store-surface shadow-sm transition-colors hover:border-store-accent/50">
        <div className="flex h-[13rem] items-center justify-center bg-store-bg/80 p-4">
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 border-t border-store-line p-4">
          <p className="line-clamp-2 text-sm font-medium text-store-text">
            {name}
          </p>
          <span className="font-display text-lg font-semibold text-store-accent">
            ₹{price}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/75 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={addHandler}
            aria-label={`Add ${name} to cart`}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-md bg-store-accent text-white"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
