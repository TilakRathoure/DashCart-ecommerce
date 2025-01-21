import { useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";

const Productdetails = () => {

    const { cartItems: CART } = useSelector(
        (state: RootState) => state.cartReducer
      );
    
      const dispatch = useDispatch();

    const addToCartHandler = (cartItem: CartItem) => {

        const index=CART.findIndex((i)=>i.productId===cartItem.productId);
    
        if(index!=-1) return toast.success("Already in cart");
    
        if (cartItem.stock < 1) return toast.error("Out of Stock");
    
        dispatch(addToCart(cartItem));
        toast.success("Added to cart");
      };

  const { id } = useParams();

  const { data, isError, error, isLoading } = useProductDetailsQuery(id!);

  if (isError) {
    const err = error as CustomError;
    toast.error(`Error ${err.data.message}`);
  }

  return isLoading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="bg-gray-100 h-[100vh] w-[100vw] pt-10">
      <div className="flex flex-col md:flex-row">
          <img className="object-contain max-h-[50vh] md:w-1/2" src={data?.product.photo} alt="" />
        <div className="mt-4 flex flex-col px-10 gap-5 md:w-1/2 justify-center">
          <h1 className="text-xl md:text-2xl">{data?.product.name}
          </h1>
          <p className="font-semibold md:text-xl">₹{data?.product.price}</p>
          <button className="bg-black md:text-xl rounded-xl px-3 text-white" onClick={()=>addToCartHandler({    productId: data?.product._id!,
    photo: data?.product.photo!,
    name:data?.product.name!,
    price: data?.product.price!,
    quantity:1,
    stock: data?.product.stock!})}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
