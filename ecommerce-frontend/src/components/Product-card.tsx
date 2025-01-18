import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";

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
  return (
    <div className="relative p-4 flex-none flex flex-col items-center justify-start space-y-1 hover:opacity-100">
      <img
        src={`${import.meta.env.VITE_SERVER}/${photo}`}
        alt={name}
        className="w-[13rem] h-[13rem] object-contain m-4"
      />
      <p className=" text-lg">{name}</p>
      <span className=" text-xl">₹{price}</span>

      <div           onClick={() =>
            handler({
              productId,
              price,
              name,
              photo: photo,
              stock,
              quantity: 1,
            })
          } className="cursor-pointer absolute inset-0 backdrop-blur-lg bg-white bg-opacity-35 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
          <FaPlus />
      </div>
    </div>
  );
};

export default ProductCard;
