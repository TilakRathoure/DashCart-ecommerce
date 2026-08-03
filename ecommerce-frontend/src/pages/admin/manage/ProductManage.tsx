import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../../../components/Loader";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
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

    responseToast(res, navigate, "/admin/products");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user!._id!,
      productId: data!.product._id!,
    });

    responseToast(res, navigate, "/admin/products");
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
    <div className="flex flex-col gap-8 text-admin-text lg:flex-row">
      {isLoading ? (
        <Skeleton variant="dark" length={20} />
      ) : (
        <>
          <section className="admin-card flex w-full flex-col items-center gap-4 p-6 lg:w-1/3">
            <strong className="text-sm text-admin-muted">
              ID - {data?.product._id}
            </strong>
            <img
              src={photo}
              alt="Product"
              className="h-48 w-full rounded-lg object-cover"
            />
            <p className="text-lg font-medium uppercase tracking-wide">{name}</p>
            {stock > 0 ? (
              <span className="admin-status-green">{stock} Available</span>
            ) : (
              <span className="admin-status-red">Not Available</span>
            )}
            <h3 className="text-xl font-bold">₹{price}</h3>
            <button
              type="button"
              className="admin-btn-danger mt-2"
              onClick={deleteHandler}
            >
              <FaTrash /> Delete
            </button>
          </section>

          <article className="admin-card w-full p-6 lg:w-2/3">
            <form onSubmit={submitHandler} className="flex flex-col gap-5">
              <h2 className="text-xl font-bold uppercase tracking-wide">
                Manage
              </h2>

              <div>
                <label className="admin-label">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={nameUpdate}
                  onChange={(e) => setNameUpdate(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={priceUpdate}
                  onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">Stock</label>
                <input
                  type="number"
                  placeholder="Stock"
                  value={stockUpdate}
                  onChange={(e) => setStockUpdate(Number(e.target.value))}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">Category</label>
                <input
                  type="text"
                  placeholder="e.g., Laptop, Camera, etc."
                  value={categoryUpdate}
                  onChange={(e) => setCategoryUpdate(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">Photo</label>
                <input
                  type="file"
                  onChange={changeImageHandler}
                  className="admin-input cursor-pointer file:mr-3 file:rounded file:border-0 file:bg-admin-accent/20 file:px-3 file:py-1 file:text-admin-accent"
                />
              </div>

              {photoUpdate && (
                <img
                  src={photoUpdate}
                  alt="New Product"
                  className="mt-2 h-20 w-20 rounded-md object-cover"
                />
              )}

              <button type="submit" className="admin-btn w-full py-3 text-base">
                Update
              </button>
            </form>
          </article>
        </>
      )}
    </div>
  );
};

export default Productmanagement;
