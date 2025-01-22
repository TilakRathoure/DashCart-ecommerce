import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Column } from "react-table";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";


interface DataType{

  photo:ReactElement,
  name:string,
  price:number,
  stock:number,
  action:ReactElement
}

const columns:Column<DataType>[]=[
  {Header: "Photo",accessor: "photo"},
  {Header: "Name",accessor: "name"},
  {Header: "Price",accessor: "price"},
  {Header: "Stock",accessor: "stock"},
  {Header: "Action",accessor: "action"},

]

const Products = () => {

  const { isLoading, isError, error, data } = useAllProductsQuery("");

  const [rows, setRows] = useState<DataType[]>([]);



  useEffect(() => {
    if (data)
      setRows(
        data.products.map((i) => ({
          photo: <img src={i.photo} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/products/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);


  if(isError){
    const err= error as CustomError;
    toast.error(err.data.message);
  }

  const Table=TableHOC<DataType>(
    columns,rows,
    "dashboard-product-box",
    "Products",
    rows.length>6
  )();

  return (
    <div className="min-h-screen md:flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 md:h-screen">
    <AdminSidebar/>

    {/* AddProduct */}
    <Link to={"/admin/products/new"} className="z-10 fixed top-[80px] right-10 w-12 h-12 rounded-full bg-red-600 text-center text-white flex items-center justify-center border-1 border-black">Add</Link>

    {/* Main */}

    <div className="md:w-3/4 p-7 rounded-lg">

    {
      isLoading? <Skeleton length={20}/>: Table}
    </div>

    </div>
  )
}

export default Products