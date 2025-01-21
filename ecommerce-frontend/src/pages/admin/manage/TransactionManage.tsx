import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/Loader";
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderAPI";
import { RootState } from "../../../redux/store";
import { Order, OrderItem } from "../../../types/types";
import { responseToast } from "../../../utils/features";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};

const TransactionManagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, data, isError } = useOrderDetailsQuery(params.id!);

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user!._id!,
      orderId: data!.order._id!,
    });
    responseToast(res, navigate, "/admin/transactions");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user!._id!,
      orderId: data!.order._id!,
    });
    responseToast(res, navigate, "/admin/transactions");
  };

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="md:flex text-black h-screen bg-gray-100">
      <AdminSidebar />
      <main className="md:w-3/4 p-8 gap-8 flex flex-col md:flex-row">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <section className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
              {orderItems.map((i) => (
                <ProductCard
                  key={i._id}
                  name={i.name}
                  photo={i.photo}
                  productId={i.productId}
                  _id={i._id}
                  quantity={i.quantity}
                  price={i.price}
                />
              ))}
            </section>

            <article className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
              <button
                className="text-red-600 hover:text-red-800"
                onClick={deleteHandler}
              >
                <FaTrash />
              </button>
              <h1 className="text-xl font-bold text-center mb-4">Order Info</h1>

              <h5 className="mt-4 text-lg font-bold">User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
              </p>

              <h5 className="mt-4 text-lg font-bold">Amount Info</h5>
              <p>Subtotal: {subtotal}</p>
              <p>Shipping Charges: {shippingCharges}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p>Total: {total}</p>

              <h5 className="mt-4 text-lg font-bold">Status Info</h5>
              <p>
                Status: {
                  <span
                    className={
                      status === "Delivered"
                        ? "text-purple-600"
                        : status === "Shipped"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {status}
                  </span>
                }
              </p>
              <button
                onClick={updateHandler}
                className="mt-4 bg-blue-600 text-white w-full rounded-md text-lg hover:opacity-80"
              >
                Process Status
              </button>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, productId }: OrderItem) => (
  <div className="transaction-product-card flex flex-col items-center gap-4 mb-4">
    <img src={photo} alt={name} className="w-16 h-16 object-cover rounded-md" />
    <Link to={`/product/${productId}`} className="text-blue-600">
      {name}
    </Link>
    <span>{`₹${price} x ${quantity} = ₹${price * quantity}`}</span>
  </div>
);

export default TransactionManagement;