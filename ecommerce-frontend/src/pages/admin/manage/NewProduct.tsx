import  { ChangeEvent, useState } from 'react'
import AdminSidebar from '../../../components/admin/AdminSidebar';

const NewProduct = () => {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [stock, setStock] = useState<number>();
    const [photo, setPhoto] = useState<string>();


    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
    
        const reader: FileReader = new FileReader();
    
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            if (typeof reader.result === "string") setPhoto(reader.result);
          };
        }
      };

  return (
<div className='md:flex text-gray-100 h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>

        <AdminSidebar />

    <main className='md:w-3/4 h-full overflow-y-auto flex justify-center items-center'>
        <form className="flex flex-col items-center gap-8 p-8 w-full max-w-[400px] border-2 border-gray-700 rounded-lg shadow-gray-700 shadow-lg">
  <h2 className="uppercase tracking-wider">New Product</h2>
  
  <div className="w-full relative">
    <label htmlFor="name" className="absolute left-0 top-[-1.5rem]">Name</label>
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
  </div>

  {photo && <img src={photo} alt="New Image" className=" object-contain rounded-md" />}
  
  <button
    type="submit"
    className="p-4 bg-blue-600 text-white w-full rounded-md text-lg cursor-pointer"
  >
    Create
  </button>
</form>

        </main>

    </div>
  )
}

export default NewProduct