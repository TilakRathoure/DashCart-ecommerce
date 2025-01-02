import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Chart";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "Aug", "Sept", "Oct", "Nov", "Dec",
];

const BarCharts = () => {
  return (
    <div className="md:flex h-screen">
      <AdminSidebar />

      <main className="md:w-3/4 overflow-auto backgco text-gray-100 p-7 flex flex-col gap-4">
        <h1 className="text-center">Line Charts</h1>

        {/* Section 1: Active Users & Products */}
        <section className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 max-h-[40vh]">
            <LineChart
              data={[200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200]}
              label="Users"
              borderColor="rgb(53, 162, 255)"
              backgroundColor="rgba(53, 162, 255, 0.5)"
              labels={months}
            />
            <h2 className="mt-2">Active Users</h2>
          </div>

          <div className="flex-1 max-h-[40vh]">
            <LineChart
              data={[40, 60, 244, 100, 143, 120, 41, 47, 50, 56, 32]}
              backgroundColor={"hsla(269,80%,40%,0.4)"}
              borderColor={"hsl(269,80%,40%)"}
              label="Products"
              labels={months}
            />
            <h2 className="mt-2">Total Products (SKU)</h2>
          </div>
        </section>

        {/* Section 2: Revenue & Discount */}
        <section className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 max-h-[40vh]">
            <LineChart
              data={[24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000, 144400, 100000, 120000]}
              backgroundColor={"hsla(129,80%,40%,0.4)"}
              borderColor={"hsl(129,80%,40%)"}
              label="Revenue"
              labels={months}
            />
            <h2 className="mt-2">Total Revenue</h2>
          </div>

          <div className="flex-1 max-h-[40vh]">
            <LineChart
              data={[9000, 12000, 12000, 9000, 1000, 5000, 4000, 1200, 1100, 1500, 2000, 5000]}
              backgroundColor={"hsla(29,80%,40%,0.4)"}
              borderColor={"hsl(29,80%,40%)"}
              label="Discount"
              labels={months}
            />
            <h2 className="mt-2">Discount Allotted</h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BarCharts;
