import { useState, ChangeEvent, FormEvent } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManage = () => {
  const [name, setName] = useState<string>("Puma Shoes");
  const [price, setPrice] = useState<number>(2000);
  const [stock, setStock] = useState<number>(10);
  const [photo, setPhoto] = useState<string>(img);

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhotoUpdate(reader.result);
      };
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(nameUpdate);
    setPrice(priceUpdate);
    setStock(stockUpdate);
    setPhoto(photoUpdate);
  };
  return (
    <div className="flex h-screen text-gray-100">

        <AdminSidebar />
        
      <main className=" flex gap-5 items-center p-16  border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-3/4 overflow-y-auto">
        {/* Section for Product Details */}
        <section className=" w-full h-[85vh] max-w-lg border-2 border-gray-700 p-20 shadow-lg relative rounded-lg flex flex-col gap-4">
          <strong className="font-light">ID - asnmdkasndmsan</strong>
          <img src={photo} alt="Product" className="w-full object-cover min-w-5 rounded-lg" />
          <p className="text-center tracking-wider uppercase">{name}</p>
          {stock > 0 ? (
            <span className="text-green-500 absolute right-8 top-8">{stock} Available</span>
          ) : (
            <span className="text-red-500 absolute right-8 top-8">Not Available</span>
          )}
          <h3 className="text-center text-2xl">${price}</h3>
        </section>

        {/* Form for Product Management */}
        <article className=" p-8 w-full max-w-md border-2 border-gray-700 rounded-lg shadow-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <form onSubmit={submitHandler} className="flex flex-col gap-8  border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <h2 className="uppercase tracking-wide">Manage</h2>

            <div className="relative">
              <label className="absolute left-0 top-[-1.5rem]">Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
                className="w-full p-4 border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-md"
              />
            </div>

            <div className="relative">
              <label className="absolute left-0 top-[-1.5rem]">Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
                className="w-full p-4 border  border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-md"
              />
            </div>

            <div className="relative">
              <label className="absolute left-0 top-[-1.5rem]">Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
                className="w-full p-4 border  border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-md"
              />
            </div>

            <div className="relative">
              <label className="absolute left-0 top-[-1.5rem]">Photo</label>
              <input
                required
                type="file"
                onChange={changeImageHandler}
                className="w-full p-4 border  border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-md cursor-pointer"
              />
            </div>

            {photoUpdate && (
              <img
                src={photoUpdate}
                alt="New Image"
                className="w-20 h-20 object-cover rounded-md"
              />
            )}

            <button
              type="submit"
              className="p-4 bg-blue-600 text-white w-full rounded-md text-lg cursor-pointer"
            >
              Update
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManage;
