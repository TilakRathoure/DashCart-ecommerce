import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Column } from "react-table";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAllOrdersQuery } from "../../redux/api/orderAPI";
import { Skeleton } from "../../components/Loader";


interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const coloumn: Column<DataType>[]=[

  {
    Header:"User", accessor:"user"
  },
  {
    Header:"Amount", accessor:"amount"
  },
  {
    Header:"Discount", accessor:"discount"
  },
  {
    Header:"Quantity", accessor:"quantity"
  },
  {
    Header:"Status", accessor:"status"
  },
  {
    Header:"Action", accessor:"action"
  },

];


const Transactions = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useAllOrdersQuery(user!._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          user: i.user.name,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transactions/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const Table= TableHOC(
    coloumn,rows,
    "transaction-table",
    "Transaction",
    true
  )();


  return (
    <div className="flex justify-center h-screen backgco">

    <AdminSidebar/>

    <div className="md:w-3/4 backgco border-none p-5">
    {isLoading? <Skeleton length={20}/> : (

Table
    )}
    </div>

    </div>
  )
}

export default Transactions