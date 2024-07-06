import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { SkeletonLoader } from "../../components/Loader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import {
  useAllCouponsQuery,
  useDeleteCouponMutation,
} from "../../redux/api/couponAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/apiTypes";
import { responseToast } from "../../utils/features";

interface DataType {
  code: string;
  amount: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Coupon Code",
    accessor: "code",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Coupon = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, isError, error, data } = useAllCouponsQuery(
    user?._id as string
  );

  const [rows, setRows] = useState<DataType[]>([]);
  const [deleteCoupon] = useDeleteCouponMutation();

  const deleteHandler = async (couponId: string) => {
    const res = await deleteCoupon({ couponId, adminId: user?._id as string });
    responseToast(res, null, "");
  };

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.coupons.map((i) => ({
          amount: i.amount,
          code: i.code,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboardProductBox",
    "Coupons",
    rows.length > 4
  )();

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main>{isLoading ? <SkeletonLoader length={20} /> : Table}</main>
      <Link to="/admin/coupon/new" className="createProductBtn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Coupon;
