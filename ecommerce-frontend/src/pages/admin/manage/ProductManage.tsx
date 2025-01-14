import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/Loader";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { RootState, server } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  const { price, photo, name, stock, category } = data?.product || {
    photo: "",
    category: "",
    name: "",
    stock: 0,
    price: 0,
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);

    const res = await updateProduct({
      formData,
      userId: user!._id!,
      productId: data!.product._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user!._id!,
      productId: data!.product._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="flex h-screen text-gray-100">
      <AdminSidebar />

      <main className="flex gap-10 p-8 w-full bg-gray-900 overflow-y-auto">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            {/* Product Details Section */}
            <section className="w-1/3 h-[85vh] p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg flex flex-col items-center gap-4">
              <strong className="text-sm">ID - {data?.product._id}</strong>
              <img
                src={`${server}/${photo}`}
                alt="Product"
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-lg font-medium uppercase tracking-wide">{name}</p>
              {stock > 0 ? (
                <span className="text-green-500">{stock} Available</span>
              ) : (
                <span className="text-red-500">Not Available</span>
              )}
              <h3 className="text-xl font-bold text-center">₹{price}</h3>
              <button
                className="flex items-center gap-2 px-4 py-2 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={deleteHandler}
              >
                <FaTrash /> Delete
              </button>
            </section>

            {/* Product Management Form */}
            <article className="w-2/3 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
              <form
                onSubmit={submitHandler}
                className="flex flex-col gap-6"
              >
                <h2 className="text-xl font-bold uppercase tracking-wide">Manage</h2>

                <div>
                  <label className="block text-sm mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                    className="w-full p-3 border border-gray-700 bg-gray-900 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                    className="w-full p-3 border border-gray-700 bg-gray-900 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                    className="w-full p-3 border border-gray-700 bg-gray-900 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g., Laptop, Camera, etc."
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                    className="w-full p-3 border border-gray-700 bg-gray-900 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Photo</label>
                  <input
                    type="file"
                    onChange={changeImageHandler}
                    className="w-full p-3 border border-gray-700 bg-gray-900 rounded-md cursor-pointer focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>

                {photoUpdate && (
                  <img
                    src={photoUpdate}
                    alt="New Product"
                    className="w-20 h-20 object-cover rounded-md mt-4"
                  />
                )}

                <button
                  type="submit"
                  className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg"
                >
                  Update
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
