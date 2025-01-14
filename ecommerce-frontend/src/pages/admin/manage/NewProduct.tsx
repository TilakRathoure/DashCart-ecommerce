import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photo, setPhoto] = useState<string>();

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhoto(reader.result);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !price || stock < 0 || !category || !photo) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);

    const res = await newProduct({ id: user!._id!, formData });

    responseToast(res, navigate, "/admin/product");
  };

  return (
    <div className="md:flex text-gray-100 h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminSidebar />

      <main className="md:w-3/4 h-full overflow-y-auto flex justify-center items-center">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center gap-8 p-8 w-full max-w-[400px] border-2 border-gray-700 rounded-lg shadow-gray-700 shadow-lg"
        >
          <h2 className="uppercase tracking-wider">New Product</h2>
          <div className="w-full relative">
            <label htmlFor="name" className="absolute left-0 top-[-1.5rem]">
              Name
            </label>
            <input
              id="name"
              required
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-md"
            />
          </div>
          <div className="w-full relative">
            <label className="absolute left-0 top-[-1.5rem]">Price</label>
            <input
              required
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-4  border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-md"
            />
          </div>
          <div className="w-full relative">
            <label className="absolute left-0 top-[-1.5rem]">Stock</label>
            <input
              required
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full p-4  border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-md"
            />
          </div>
          <div className="w-full relative">
            <label className="absolute left-0 top-[-1.5rem]">Photo</label>
            <input
              required
              accept="image/*"
              type="file"
              onChange={changeImageHandler}
              className="w-full p-4 border border-gray-700 rounded-md"
            />
          </div>{" "}
          <input
            required
            type="text"
            placeholder="eg. laptop, camera etc"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <div></div>
          {photo && (
            <img
              src={photo}
              alt="New Image"
              className=" object-contain rounded-md"
            />
          )}
          <button
            type="submit"
            className="p-4 bg-blue-600 text-white w-full rounded-md text-lg cursor-pointer"
          >
            Create
          </button>
        </form>
      </main>
    </div>
  );
};

export default NewProduct;
