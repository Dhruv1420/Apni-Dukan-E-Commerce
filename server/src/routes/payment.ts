import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import {
  allCoupons,
  applyDiscount,
  createPaymentIntent,
  deleteCoupon,
  newCoupon,
} from "../controllers/payment.js";

const app = express.Router();

// route - /api/v1/payment/create
app.post("/create", createPaymentIntent);

// route - /api/v1/payment/discount
app.get("/discount", applyDiscount);

// route - /api/v1/payment/coupon/new
app.post("/coupon/new", AdminOnly, newCoupon);

// route - /api/v1/payment/coupon/all
app.get("/coupon/all", AdminOnly, allCoupons);

// route - /api/v1/payment/coupon/:id
app.delete("/coupon/:id", AdminOnly, deleteCoupon);

export default app;
