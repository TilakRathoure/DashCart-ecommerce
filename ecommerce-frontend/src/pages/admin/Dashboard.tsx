import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { BarChart, DoughnutChart } from "../../components/admin/Chart";
import DashboardTable from "../../components/admin/DashboardTable";
import { useStatsQuery } from "../../redux/api/dashboardAPIs";
import { Skeleton } from "../../components/Loader";
import { getLastMonths } from "../../utils/features";
import toast from "react-hot-toast";
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
    <div className="flex flex-col gap-6 text-admin-text">
      <header className="flex items-center gap-3 border-b border-admin-line pb-4">
        <BsSearch className="shrink-0 text-admin-muted" />
        <input
          type="text"
          placeholder="Search for data, users, docs"
          className="flex-grow border-none bg-transparent p-1 text-admin-text outline-none placeholder:text-admin-muted"
        />
        <FaRegBell className="shrink-0 text-admin-muted" />
        <FaUserCircle className="shrink-0 text-2xl text-admin-muted" />
      </header>

      {isLoading ? (
        <Skeleton variant="dark" width="100%" length={20} />
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-4">
            <WidgetItem
              graph={stats.changePercent.revenue}
              price={stats.count.revenue}
              heading="Revenue"
              color="rgb(59, 130, 246)"
            />
            <WidgetItem
              graph={stats.changePercent.user}
              price={stats.count.user}
              color="rgb(56, 189, 248)"
              heading="Users"
            />
            <WidgetItem
              graph={stats.changePercent.order}
              price={stats.count.order}
              color="rgb(251, 191, 36)"
              heading="Transactions"
            />
            <WidgetItem
              graph={stats.changePercent.product}
              price={stats.count.product}
              color="rgb(129, 140, 248)"
              heading="Products"
            />
          </div>

          <div className="flex w-full flex-col gap-7 lg:flex-row">
            <div className="admin-card p-5 lg:w-[70%]">
              <h1 className="text-center text-2xl uppercase tracking-wide">
                Revenue & Transaction
              </h1>
              <BarChart
                labels={months}
                data_2={stats.chart.revenue}
                data_1={stats.chart.order}
                title_1="Revenue"
                title_2="Transaction"
                bgColor_1="rgb(59,130,246)"
                bgColor_2="rgba(56,189,248,0.75)"
              />
            </div>

            <div className="admin-card flex flex-col gap-6 p-5 lg:w-[30%]">
              <h1 className="text-center text-2xl uppercase tracking-wide text-admin-text">
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

          <section className="flex flex-col gap-6 lg:flex-row">
            <div className="admin-card flex flex-col gap-3 p-5 lg:w-[30%]">
              <h2 className="text-center text-2xl uppercase tracking-wide">
                Gender Ratio
              </h2>

              <div className="relative flex h-[50vh] items-center justify-center">
                <DoughnutChart
                  labels={["Female", "Male"]}
                  data={[stats.userRatio.female, stats.userRatio.male]}
                  backgroundColor={[
                    "rgba(244, 114, 182, 0.85)",
                    "rgba(59, 130, 246, 0.85)",
                  ]}
                  cutout={90}
                />
                <BiMaleFemale className="absolute h-[30px] w-[30px] text-admin-muted" />
              </div>
            </div>

            <div className="lg:w-[70%]">
              <DashboardTable data={stats.latestTransaction} />
            </div>
          </section>
        </>
      )}
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
  <div>
    <div className="flex items-center justify-between gap-3 text-sm">
      <div className="capitalize text-admin-muted">{heading}</div>
      <div className="h-2 w-[95px] overflow-hidden rounded-full bg-admin-elevated">
        <div
          className="h-2 rounded-full bg-admin-accent"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <div className="w-8 text-right text-admin-text">{value}</div>
    </div>
  </div>
);

const WidgetItem = ({ heading, color, graph, price }: Dash) => (
  <div className="admin-card flex h-[8rem] w-[10rem] items-center justify-around overflow-hidden p-4 sm:w-[13rem] md:w-[15rem] lg:w-[16rem]">
    <div className="flex flex-col gap-0.5">
      <h1 className="text-sm text-admin-muted">{heading}</h1>
      <h1 className="text-2xl font-bold text-admin-text">
        {heading === "Revenue" ? "₹" : ""}
        {price}
      </h1>
      {graph > 0 ? (
        <p className="flex items-center gap-1 text-sm">
          <HiTrendingUp className="text-emerald-400" />
          <span className="text-emerald-400">+{graph}%</span>
        </p>
      ) : (
        <p className="flex items-center gap-1 text-sm">
          <HiTrendingDown className="text-red-400" />
          <span className="text-red-400">{graph}%</span>
        </p>
      )}
    </div>
    <div className="flex items-center justify-center">
      <div
        className="flex h-[5rem] w-[5rem] flex-shrink-0 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(${color} 0deg ${
            (Math.abs(graph) / 100) * 360
          }deg, rgba(255,255,255,0.08) 0deg)`,
        }}
      >
        <div className="flex h-[4rem] w-[4rem] flex-shrink-0 items-center justify-center rounded-full bg-admin-surface text-center text-sm">
          <span>{graph}</span>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
