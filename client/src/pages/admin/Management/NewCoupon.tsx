import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewCouponMutation } from "../../../redux/api/couponAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const NewCoupon = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [code, setCode] = useState<string>("");
  const [amount, setAmount] = useState<number>();

  const [newCoupon] = useNewCouponMutation();
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!code || !amount) return toast.error("Please Add All Fields");

    const coupon = { code, amount };

    const res = await newCoupon({ id: user?._id as string, coupon });

    responseToast(res, navigate, "/admin/coupon");
  };

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="productManagement couponManagement">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Coupon</h2>

            <div>
              <label>Coupon Code</label>
              <input
                type="text"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div>
              <label>Amount</label>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewCoupon;
