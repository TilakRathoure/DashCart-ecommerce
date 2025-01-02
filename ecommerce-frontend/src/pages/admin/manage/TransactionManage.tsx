import { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    _id: "asdsaasdas",
    quantity: 4,
    price: 2000,
  },
];

export type OrderItemType = {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    _id: string;
  };
  
  export type OrderType = {
    name: string;
    address: string;
    city: string;
    country: string;
    state: string;
    pinCode: number;
    status: "Processing" | "Shipped" | "Delivered";
    subtotal: number;
    discount: number;
    shippingCharges: number;
    tax: number;
    total: number;
    orderItems: OrderItemType[];
    _id: string;
  };

const TransactionManage = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Tilak Rathoure",
    address: "77 Black Street",
    city: "Neyword",
    state: "Nevada",
    country: "India",
    pinCode: 2434341,
    status: "Processing",
    subtotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItems,
    _id: "asdnasjdhbn",
  });

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
  } = order;

  const updateHandler = () => {
    setOrder((prev) => ({
      ...prev,
      status: prev.status === "Processing" ? "Shipped" : "Delivered",
    }));
  };

  return (
    <div className="md:flex text-gray-100 h-screen backgco">

      <AdminSidebar />

      <main className="md:w-3/4 flex justify-center backgco p-8 gap-8">
        {/* Order Items Section */}
        <section className="w-full max-w-lg p-8 backgco shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
          {order.orderItems.map((i) => (
            <ProductCard
              key={i._id}
              name={i.name}
              photo={i.photo}
              _id={i._id}
              quantity={i.quantity}
              price={i.price}
            />
          ))}
        </section>

        {/* Order Info Section */}
        <article className="shipping-info-card p-8 backgco shadow-md rounded-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">Order Info</h1>
          <h5 className="mt-4 mb-2 text-lg font-bold">User Info</h5>
          <p className="mb-2">Name: {name}</p>
          <p className="mb-2">
            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>

          <h5 className="mt-4 mb-2 text-lg font-bold">Amount Info</h5>
          <p className="mb-2">Subtotal: {subtotal}</p>
          <p className="mb-2">Shipping Charges: {shippingCharges}</p>
          <p className="mb-2">Tax: {tax}</p>
          <p className="mb-2">Discount: {discount}</p>
          <p className="mb-2">Total: {total}</p>

          <h5 className="mt-4 mb-2 text-lg font-bold">Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={`${
                status === "Delivered"
                  ? "text-purple-600"
                  : status === "Shipped"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {status}
            </span>
          </p>

          <button
            onClick={updateHandler}
            className="mt-4 bg-blue-600 text-white w-full rounded-md text-lg hover:opacity-80"
          >
            Process Status
          </button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="transaction-product-card flex flex-col items-center gap-4 mb-4">
    <img src={photo} alt={name} className="w-16 h-16 object-cover rounded-md" />
    <Link to={`/product/${_id}`} className="text-blue-600">
      {name}
    </Link>
    <span className="">{`$${price} x ${quantity} = $${price * quantity}`}</span>
  </div>
);

export default TransactionManage;
