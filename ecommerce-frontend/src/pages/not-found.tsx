import { MdError } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <MdError className="text-5xl" />
      <h1 className="text-2xl font-bold mt-4">Page Not Found</h1>
    </div>
  );
};

export default NotFound;
