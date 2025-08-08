import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Chart";
import DashboardTable from "../../components/admin/DashboardTable";
// import { Navigate } from "react-router-dom";
import { useStatsQuery } from "../../redux/api/dashboardAPIs";
import { Skeleton } from "../../components/Loader";
import { getLastMonths } from "../../utils/features";
import toast from "react-hot-toast";
import userImg from "../../assets/admin/user.png"
import { Stats } from "../../types/types";

const { last6Months: months } = getLastMonths();

interface Dash {
  heading: string;
  price: number;
  graph: number;
  color: string;
}

const Dashboard = () => {
  const { isLoading, data, isError } = useStatsQuery("");

  const stats: Stats = data?.stats!;

  if (isError) toast.error("Error fetching dashboard stats.");

  return (
    <div className="flex h-screen text-gray-100 bg-opacity-50">
      <AdminSidebar />

      {/* Main */}
      <main className="md:w-3/4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-y-auto p-6 gap-5 flex flex-col">
        <header className="flex items-center gap-2 border-gray-700 border-b-[2px] pb-3">
          <BsSearch />
          <input
            type="text"
            placeholder="Search for data, users, docs"
            className="flex-grow border-none bg-transparent p-1 outline-none focus:border-none"
          />
          <FaRegBell />
          <img
            className="w-7 rounded-full"
            src={userImg}
            alt="User Profile"
          />
        </header>

        {isLoading ? (
          <Skeleton width="100vw"  length={20} />
        ) : (
          <>
            <div className="flex lg:gap-4 flex-wrap justify-center gap-4">
              <>
                <WidgetItem
                  graph={stats.changePercent.revenue}
                  price={stats.count.revenue}
                  heading="Revenue"
                  color="rgb(0, 115, 255)"
                />
                <WidgetItem
                  graph={stats.changePercent.user}
                  price={stats.count.user}
                  color="rgb(0 198 202)"
                  heading="Users"
                />
                <WidgetItem
                  graph={stats.changePercent.order}
                  price={stats.count.order}
                  color="rgb(255 196 0)"
                  heading="Transactions"
                />
                <WidgetItem
                  graph={stats.changePercent.product}
                  price={stats.count.product}
                  color="rgb(76 0 255)"
                  heading="Products"
                />
              </>
            </div>

            {/* Chart and Inventory */}
            <div className="w-full flex lg:flex-row flex-col gap-7">
              <div className="lg:w-[70%] bg-gradient-to-br border-2 border-gray-700 from-gray-900 via-gray-800 to-gray-900 rounded-xl p-5">
                <h1 className="text-2xl uppercase text-center">
                  Revenue & Transaction
                </h1>

                {/* Graph */}
                <BarChart
                  labels={months}
                  data_2={stats.chart.revenue}
                  data_1={stats.chart.order}
                  title_1="Revenue"
                  title_2="Transaction"
                  bgColor_1="rgb(0,115,255)"
                  bgColor_2="rgba(53,162,235,0.8)"
                />
              </div>

              {/* Inventory */}
              <div className="lg:w-[30%] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg p-5 flex flex-col gap-6 border-2 border-gray-700">
                <h1 className="text-2xl uppercase text-gray-100 text-center">
                  Inventory
                </h1>
                <div className="flex flex-col gap-4">
                  {stats.categoryCount.map((i) => {
                    const [heading, value] = Object.entries(i)[0];
                    return (
                      <CategoryItem
                        key={heading}
                        value={value}
                        heading={heading}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <section className="lg:flex-row gap-6 flex flex-col">
              <div className="lg:w-[30%] flex flex-col gap-3 bg-gradient-to-br border-2 border-gray-700 from-gray-900 via-gray-800 to-gray-900 rounded-lg p-5">
                <h2 className="text-2xl uppercase text-center">Gender Ratio</h2>

                <div className="flex relative justify-center items-center h-[50vh]">
                  {/* Donut Chart */}
                  <DoughnutChart
                    labels={["Female", "Male"]}
                    data={[stats.userRatio.female, stats.userRatio.male]}
                    backgroundColor={[
                      "hsl(340,82%,56%)",
                      "rgba(53,162,235,0.8)",
                    ]}
                    cutout={90}
                  />
                  <BiMaleFemale className="absolute w-[30px] h-[30px]" />
                </div>
              </div>

              {/* Table */}
              <div className="lg:w-[70%]">
                <DashboardTable data={stats.latestTransaction} />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

const CategoryItem = ({
  heading,
  value,
}: {
  heading: string;
  value: number;
}) => (
  <div key={heading}>
    <div className="flex items-center justify-evenly gap-2">
      <div>{heading}</div>
      <div className="w-[95px] bg-gray-200 rounded-xl h-[15px]">
        <div
          className="bg-green-400 rounded-xl h-[15px]"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <div>{value}</div>
    </div>
  </div>
);

const WidgetItem = ({ heading, color, graph, price }: Dash) => (
  <div
    key={heading}
    className="flex border-2 border-gray-700 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:w-[16rem] md:w-[15rem] w-[10rem] sm:w-[13rem] h-[8rem] rounded-xl p-4 justify-around overflow-hidden"
  >
    <div className="flex flex-col">
      <h1>{heading}</h1>
      <h1 className="text-2xl font-bold">
        {heading === "Revenue" ? "₹" : ""}
        {price}
      </h1>
      {graph > 0 ? (
        <p className="flex items-center gap-1">
          <HiTrendingUp className="text-green-500" />
          <span className="text-green-500">+{graph}%</span>
        </p>
      ) : (
        <p className="flex items-center gap-1">
          <HiTrendingDown className="text-red-500" />
          <span className="text-red-500">{graph}%</span>
        </p>
      )}
    </div>
    <div className="flex items-center justify-center">
      <div
        className="flex-shrink-0 flex justify-center items-center h-[5rem] w-[5rem] rounded-full"
        style={{
          background: `conic-gradient(${color} 0deg ${
            (Math.abs(graph) / 100) * 360
          }deg, transparent 0deg)`,
        }}
      >
        <div className="flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 h-[4rem] w-[4rem] rounded-full text-center">
          <span>{graph}</span>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
