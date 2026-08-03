import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
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

const statusClass = (status: string) => {
  if (status === "Delivered") return "admin-status-purple";
  if (status === "Shipped") return "admin-status-green";
  return "admin-status-red";
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
    <div className="flex flex-col gap-8 text-admin-text md:flex-row">
      {isLoading ? (
        <Skeleton variant="dark" length={12} />
      ) : (
        <>
          <section className="admin-card w-full max-w-lg p-6">
            <h2 className="mb-4 text-2xl font-semibold tracking-wide">
              Order Items
            </h2>
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

          <article className="admin-card relative w-full max-w-md p-6">
            <button
              type="button"
              className="absolute right-4 top-4 rounded-md p-2 text-red-400 transition hover:bg-red-500/15 hover:text-red-300"
              onClick={deleteHandler}
              aria-label="Delete order"
            >
              <FaTrash />
            </button>
            <h1 className="mb-4 text-center text-xl font-bold uppercase tracking-wide">
              Order Info
            </h1>

            <h5 className="mt-4 text-sm font-semibold uppercase tracking-wider text-admin-muted">
              User Info
            </h5>
            <p className="mt-1 text-sm">Name: {name}</p>
            <p className="text-sm text-admin-muted">
              Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
            </p>

            <h5 className="mt-5 text-sm font-semibold uppercase tracking-wider text-admin-muted">
              Amount Info
            </h5>
            <div className="mt-1 space-y-1 text-sm">
              <p>Subtotal: {subtotal}</p>
              <p>Shipping Charges: {shippingCharges}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p className="font-medium text-admin-text">Total: {total}</p>
            </div>

            <h5 className="mt-5 text-sm font-semibold uppercase tracking-wider text-admin-muted">
              Status Info
            </h5>
            <p className="mt-2 text-sm">
              Status: <span className={statusClass(status)}>{status}</span>
            </p>
            <button
              type="button"
              onClick={updateHandler}
              className="admin-btn mt-5 w-full py-3 text-base"
            >
              Process Status
            </button>
          </article>
        </>
      )}
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, productId }: OrderItem) => (
  <div className="mb-4 flex flex-col items-center gap-3 border-b border-admin-line pb-4 last:mb-0 last:border-0 last:pb-0">
    <img src={photo} alt={name} className="h-16 w-16 rounded-md object-cover" />
    <Link
      to={`/${productId}`}
      className="text-sm font-medium text-admin-accent transition hover:text-blue-400"
    >
      {name}
    </Link>
    <span className="text-sm text-admin-muted">{`₹${price} x ${quantity} = ₹${price * quantity}`}</span>
  </div>
);

export default TransactionManagement;
