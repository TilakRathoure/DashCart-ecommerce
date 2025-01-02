import AdminSidebar from "../../../components/admin/AdminSidebar";
import { PieChart, DoughnutChart } from "../../../components/admin/Chart";
import data from "../../../assets/admin/data.json"


const Pie = () => {
  return (
    <div className="md:flex h-screen">
      {/* Sidebar with fixed position */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="md:w-3/4 flex flex-col items-center p-7 overflow-auto text-white backgco">
        <div className="w-full flex flex-col">
          {/* Section 1 */}
          <section className="w-4/5 mx-auto flex flex-col items-center">
            <h1 className="text-4xl mx-auto mb-20 font-bold">Pie & Doughnut Charts</h1>
            <div className=" max-w-[25rem] max-h-[30vh] ">
              <PieChart
                labels={["Processing", "Shipped", "Delivered"]}
                data={[12, 9, 13]}
                backgroundColor={[
                  `hsl(110,80%, 80%)`,
                  `hsl(110,80%, 50%)`,
                  `hsl(110,40%, 50%)`,
                ]}
                offset={[0, 0, 50]}
              />
            </div>
          </section>

          {/* Section 2 */}
          <section className="w-4/5 mx-auto flex flex-col items-center my-16">
            <h2 className="text-center text-2xl mb-8">Order Fulfillment Ratio</h2>
            <div className=" border-3 max-h-[30vh] ">
              <DoughnutChart
                labels={data.categories.map((i) => i.heading)}
                data={data.categories.map((i) => i.value)}
                backgroundColor={data.categories.map(
                  (i) => `hsl(${i.value * 4},${i.value}%, 50%)`
                )}
                legends={false}
                offset={[0, 0, 0, 80]}
              />
            </div>
          </section>

          {/* Section 3 */}
          <section className="w-4/5 mx-auto flex flex-col items-center my-16">
            <h2 className="text-center text-2xl mb-8">Product Ratio</h2>
            <div className=" border-3 max-h-[30vh] ">
              <DoughnutChart
                labels={["In Stock", "Out Of Stock"]}
                data={[40, 20]}
                backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                legends={false}
                offset={[0, 80]}
                cutout={"70%"}
              />
            </div>
          </section>

          {/* Section 4 */}
          <section className="w-4/5 mx-auto flex flex-col items-center my-16">
            <h2 className="text-center text-2xl mb-8">Product</h2>
            <div className=" border-3 max-h-[30vh] ">
              <DoughnutChart
                labels={[
                  "Marketing Cost",
                  "Discount",
                  "Burnt",
                  "Production Cost",
                  "Net Margin",
                ]}
                data={[32, 18, 5, 20, 25]}
                backgroundColor={[
                  "hsl(110,80%,40%)",
                  "hsl(19,80%,40%)",
                  "hsl(69,80%,40%)",
                  "hsl(300,80%,40%)",
                  "rgb(53, 162, 255)",
                ]}
                legends={false}
                offset={[20, 30, 20, 30, 80]}
              />
            </div>
          </section>

          {/* Section 5 */}
          <section className="w-4/5 mx-auto flex flex-col items-center my-16">
            <h2 className="text-center text-2xl mb-8">Revenue Distribution</h2>
            <div className=" border-3 max-h-[30vh] ">
              <PieChart
                labels={["Teenager (Below 20)", "Adult (20-40)", "Older (Above 40)"]}
                data={[30, 250, 70]}
                backgroundColor={[
                  `hsl(10, ${80}%, 80%)`,
                  `hsl(10, ${80}%, 50%)`,
                  `hsl(10, ${40}%, 50%)`,
                ]}
                offset={[0, 0, 50]}
              />
            </div>
          </section>

          {/* Section 6 */}
          <section className="w-4/5 mx-auto flex flex-col items-center my-16">
            <h2 className="text-center text-2xl mb-8">Users Age Group</h2>
            <div className=" border-3 max-h-[30vh] ">
              <DoughnutChart
                labels={["Admin", "Customers"]}
                data={[40, 250]}
                backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                offset={[0, 80]}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Pie;
