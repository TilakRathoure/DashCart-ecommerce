import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const [file1, setFile] = useState<File>();

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
          setFile(file);
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
    formData.set("photo", file1!);
    formData.set("category", category);

    const res = await newProduct({ id: user!._id!, formData });

    responseToast(res, navigate, "/admin/products");
  };

  return (
    <div className="flex min-h-full items-center justify-center py-6">
      <form
        onSubmit={submitHandler}
        className="admin-card flex w-full max-w-[420px] flex-col items-stretch gap-6 p-8 shadow-lg shadow-black/20"
      >
        <h2 className="text-center text-lg uppercase tracking-wider text-admin-text">
          New Product
        </h2>

        <div>
          <label htmlFor="name" className="admin-label">
            Name
          </label>
          <input
            id="name"
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label">Price</label>
          <input
            required
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label">Stock</label>
          <input
            required
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label">Category</label>
          <input
            required
            type="text"
            placeholder="eg. laptop, camera etc"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="admin-input"
          />
        </div>

        <div>
          <label className="admin-label">Photo</label>
          <input
            required
            accept="image/*"
            type="file"
            onChange={changeImageHandler}
            className="admin-input file:mr-3 file:rounded file:border-0 file:bg-admin-accent/20 file:px-3 file:py-1 file:text-admin-accent"
          />
        </div>

        {photo && (
          <img
            src={photo}
            alt="New Image"
            className="max-h-40 rounded-md object-contain"
          />
        )}

        <button type="submit" className="admin-btn w-full py-3 text-base">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
