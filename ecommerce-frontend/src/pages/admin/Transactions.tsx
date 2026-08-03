import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableHOC from "../../components/admin/TableHOC";
import { Column } from "react-table";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types";
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

const coloumn: Column<DataType>[] = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const statusClass = (status: string) => {
  if (status === "Processing") return "admin-status-red";
  if (status === "Shipped") return "admin-status-green";
  return "admin-status-purple";
};

const Transactions = () => {
  const { isLoading, data, isError, error } = useAllOrdersQuery("");

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
          status: <span className={statusClass(i.status)}>{i.status}</span>,
          action: (
            <Link
              className="admin-table-link"
              to={`/admin/transactions/${i._id}`}
            >
              Manage
            </Link>
          ),
        }))
      );
  }, [data]);

  const Table = TableHOC(coloumn, rows, "transaction-table", "Transaction", true)();

  return (
    <div>{isLoading ? <Skeleton variant="dark" length={20} /> : Table}</div>
  );
};

export default Transactions;
