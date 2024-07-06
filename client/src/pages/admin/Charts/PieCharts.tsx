import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SkeletonLoader } from "../../../components/Loader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { usePieQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError } = usePieQuery(user?._id as string);

  if (isError) return <Navigate to={"/"} />;

  const charts = data?.charts;
  const categories = charts?.productCategories || [{ "": 0 }];

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <h1>Pie & Doughnut Charts</h1>
        {isLoading ? (
          <SkeletonLoader length={20} />
        ) : (
          <>
            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[
                    charts?.status.processing || 0,
                    charts?.status.shipped || 0,
                    charts?.status.delivered || 0,
                  ]}
                  bgColor={[
                    `hsl(110,80%,80%)`,
                    `hsl(110,80%,50%)`,
                    `hsl(110, 40%,50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={categories.map((i) => Object.keys(i)[0])}
                  data={categories.map((i) => Object.values(i)[0])}
                  bgColor={categories.map(
                    (i) =>
                      `hsl(${Object.values(i)[0] * 4}, ${
                        Object.values(i)[0]
                      }%, 50%)`
                  )}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2>Product Categories Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[
                    charts?.stockAvailability.inStock || 0,
                    charts?.stockAvailability.outOfStock || 0,
                  ]}
                  bgColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2>Stock Availability</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    charts?.revenueDistribution.marketingCost || 0,
                    charts?.revenueDistribution.discount || 0,
                    charts?.revenueDistribution.burnt || 0,
                    charts?.revenueDistribution.productionCost || 0,
                    charts?.revenueDistribution.netMargin || 0,
                  ]}
                  bgColor={[
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
              <h2>Revenue Distribution</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[
                    charts?.usersAgeGroup.teen || 0,
                    charts?.usersAgeGroup.adult || 0,
                    charts?.usersAgeGroup.old || 0,
                  ]}
                  bgColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[
                    charts?.adminCustomer.admin || 0,
                    charts?.adminCustomer.customer || 0,
                  ]}
                  bgColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  offset={[0, 80]}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
