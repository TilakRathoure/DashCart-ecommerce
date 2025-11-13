import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="h-[20vh] p-7 lg:px-[100px] flex justify-between">
      <div>
        <h1 className="font-bold text-3xl">DashCart.</h1>
      </div>
      <div className="flex gap-5 text-3xl items-end">
        <a href="https://github.com/TilakRathoure/DashCart-ecommerce">
          <FaGithub />
        </a>

        <a href="https://www.linkedin.com/in/tilakrathoure">
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
};

export default Footer;
