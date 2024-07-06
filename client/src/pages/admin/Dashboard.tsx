import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import userImg from "../../assets/userpic.png";
import { SkeletonLoader } from "../../components/Loader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import Table from "../../components/admin/DashboardTable";
import { useStatsQuery } from "../../redux/api/dashboardAPI";
import { RootState } from "../../redux/store";
import { getLastMonths } from "../../utils/features";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError } = useStatsQuery(user?._id as string);

  if (isError) return <Navigate to={"/"} />;

  const stats = data?.stats;
  const lastYear = getLastMonths();

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard">
        {isLoading ? (
          <SkeletonLoader length={20} />
        ) : (
          <>
            <div className="bar">
              <BsSearch />
              <input type="text" placeholder="Search for data, users, docs" />
              <FaRegBell />
              <img src={user?.photo || userImg} alt="User" />
            </div>

            <section className="widgetContainer">
              <WidgetItem
                percent={stats?.changePercent.revenue || 0}
                amount={true}
                value={stats?.count.revenue || 0}
                heading="Revenue"
                color="rgb(0,115,255)"
              />
              <WidgetItem
                percent={stats?.changePercent.user || 0}
                value={stats?.count.user || 0}
                heading="Users"
                color="rgb(0,198,202)"
              />
              <WidgetItem
                percent={stats?.changePercent.order || 0}
                value={stats?.count.order || 0}
                heading="Transactions"
                color="rgb(255,196,0)"
              />
              <WidgetItem
                percent={stats?.changePercent.product || 0}
                value={stats?.count.product || 0}
                heading="Products"
                color="rgb(76,0,255)"
              />
            </section>

            <section className="graphContainer">
              <div className="revenueChart">
                <h2>Revenue & Transactions</h2>
                <BarChart
                  labels={lastYear}
                  data_1={stats?.chart.revenue || []}
                  data_2={stats?.chart.order || []}
                  title_1="Revenue"
                  title_2="Transaction"
                  bgColor_1="rgb(0,115,255)"
                  bgColor_2="rgba(53,162,235,0.8)"
                />
              </div>
              <div className="inventory">
                <h2>Inventory</h2>
                <div>
                  {stats?.inventory.map((i) => {
                    const [heading, value] = Object.entries(i)[0];
                    return (
                      <InventoryItem
                        key={heading}
                        heading={heading}
                        value={value}
                        color={`hsl(${value * 4},${value}%,50%)`}
                      />
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="transactionContainer">
              <div className="genderChart">
                <h2>Gender Ratio</h2>
                <DoughnutChart
                  labels={["Female", "Male"]}
                  data={[
                    stats?.usersRatio.female || 0,
                    stats?.usersRatio.male || 0,
                  ]}
                  bgColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                  cutout={90}
                />
                <p>
                  <BiMaleFemale />
                </p>
              </div>

              <Table data={stats?.latestTransactions || []} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widgetInfo">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{`${percent > 10000 ? 9999 : percent}%`}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {`${percent < -10000 ? -9999 : percent}%`}
        </span>
      )}
    </div>
    <div
      className="widgetCircle"
      style={{
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255,255,255) 0
      )`,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
        {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
      </span>
    </div>
  </article>
);

interface InventoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const InventoryItem = ({ color, value, heading }: InventoryItemProps) => (
  <div className="inevntoryItem">
    <h5>{heading.toUpperCase()}</h5>
    <div>
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;
