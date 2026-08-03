import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableHOC from "../../components/admin/TableHOC";
import { Column } from "react-table";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";
import { FaPlus } from "react-icons/fa";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  { Header: "Photo", accessor: "photo" },
  { Header: "Name", accessor: "name" },
  { Header: "Price", accessor: "price" },
  { Header: "Stock", accessor: "stock" },
  { Header: "Action", accessor: "action" },
];

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
          action: (
            <Link className="admin-table-link" to={`/admin/products/${i._id}`}>
              Manage
            </Link>
          ),
        }))
      );
  }, [data]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="relative">
      <Link
        to={"/admin/products/new"}
        className="admin-btn fixed bottom-8 right-8 z-10 h-12 w-12 rounded-full p-0 shadow-lg md:bottom-10 md:right-10"
        aria-label="Add product"
      >
        <FaPlus />
      </Link>

      {isLoading ? <Skeleton variant="dark" length={20} /> : Table}
    </div>
  );
};

export default Products;
