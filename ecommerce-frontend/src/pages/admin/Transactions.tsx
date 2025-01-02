import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Column } from "react-table";


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

const arr: DataType[] = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    quantity: 3,
    status: <span className="red">Processing</span>,
    action: <Link to="/admin/transactions/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="green">Shipped</span>,
    quantity: 6,
    action: <Link to="/admin/transactions/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="purple">Delivered</span>,
    quantity: 6,
    action: <Link to="/admin/transactions/sajknaskd">Manage</Link>,
  },
];


const Transactions = () => {

  const [data]= useState<DataType[]>(arr)

  const Table= TableHOC(
    coloumn,data,
    "transaction-table",
    "Transaction",
    true
  )();


  return (
    <div className="flex justify-center h-screen backgco">

    <AdminSidebar/>


    {/* TABLE */}

    <div className="md:w-3/4 backgco border-none p-5">
    {Table}
    </div>

    </div>
  )
}

export default Transactions