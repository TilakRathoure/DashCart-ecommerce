import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";

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

    <Link to={`/${productId}`}>
    <div className="relative p-4 flex-none flex flex-col items-center justify-start space-y-1 hover:opacity-100">
      <img
        src={photo}
        alt={name}
        className="w-[13rem] h-[13rem] object-contain m-4"
      />
      <p className=" text-lg">{name}</p>
      <span className=" text-xl">₹{price}</span>

      <div className="cursor-pointer absolute inset-0 backdrop-blur-lg bg-white bg-opacity-35 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
          <FaPlus onClick={() =>
            handler({
              productId,
              price,
              name,
              photo: photo,
              stock,
              quantity: 1,
            })
          } />
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
