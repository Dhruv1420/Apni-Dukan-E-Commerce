import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SkeletonLoader } from "../../../components/Loader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { useLineQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import { getLastMonths } from "../../../utils/features";

const LineCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError } = useLineQuery(user?._id as string);

  if (isError) return <Navigate to={"/"} />;

  const lastYear = getLastMonths();
  const products = data?.charts.products || [];
  const users = data?.charts.users || [];
  const discount = data?.charts.discount || [];
  const revenue = data?.charts.revenue || [];

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="chartContainer">
        <h1>Line Charts</h1>
        {isLoading ? (
          <SkeletonLoader length={20} />
        ) : (
          <>
            <section>
              <LineChart
                data={users}
                label="Users"
                backgroundColor="rgba(53,162,255,0.5)"
                borderColor="rgb(53, 162, 255)"
                labels={lastYear}
              />
              <h2>Active Users</h2>
            </section>

            <section>
              <LineChart
                data={products}
                backgroundColor={"hsla(269,80%,40%,0.4)"}
                borderColor={"hsl(269,80%,40%)"}
                label="Products"
                labels={lastYear}
              />
              <h2>Total Products (SKU)</h2>
            </section>

            <section>
              <LineChart
                data={revenue}
                backgroundColor={"hsla(129,80%,40%,0.4)"}
                borderColor={"hsl(129,80%,40%)"}
                label="Revenue"
                labels={lastYear}
              />
              <h2>Total Revenue</h2>
            </section>

            <section>
              <LineChart
                data={discount}
                backgroundColor={"hsla(29,80%,40%,0.4)"}
                borderColor={"hsl(29,80%,40%)"}
                label="Discount"
                labels={lastYear}
              />
              <h2>Discount Alloted</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default LineCharts;
