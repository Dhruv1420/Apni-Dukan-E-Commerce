import { Request } from "express";
import { myCache, stripe } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import { NewCouponRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { invalidateCache } from "../utils/features.js";

export const createPaymentIntent = TryCatch(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) return next(new ErrorHandler("Please enter Amount!", 400));

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount) * 100,
    currency: "inr",
  });

  res.status(201).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

export const newCoupon = TryCatch(
  async (req: Request<{}, {}, NewCouponRequestBody>, res, next) => {
    const { code, amount } = req.body;

    if (!code || !amount)
      return next(new ErrorHandler("Please Add Coupon and Amount!", 400));

    await Coupon.create({ code: code.toUpperCase(), amount });

    invalidateCache({ coupon: true, admin: true });

    res.status(201).json({
      success: true,
      message: `Coupon Created Successfully!`,
    });
  }
);

export const applyDiscount = TryCatch(async (req, res, next) => {
  const { coupon } = req.query;

  const discount = await Coupon.findOne({ code: coupon });

  if (!discount) return next(new ErrorHandler("Invalid Coupon Code!", 400));

  invalidateCache({ coupon: true, admin: true });

  res.status(200).json({
    success: true,
    discount: discount.amount,
  });
});

export const allCoupons = TryCatch(async (req, res, next) => {
  let coupons;
  const key = "all-coupons";

  if (myCache.has(key)) coupons = JSON.parse(myCache.get(key) as string);
  else {
    coupons = await Coupon.find();
    myCache.set(key, JSON.stringify(coupons));
  }

  res.status(200).json({
    success: true,
    coupons,
  });
});

export const deleteCoupon = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const coupon = await Coupon.findById(id);

  if (!coupon) return next(new ErrorHandler("Invalid Coupon ID!", 400));

  await coupon.deleteOne();

  invalidateCache({ coupon: true, admin: true });

  res.status(200).json({
    success: true,
    message: `Coupon Deleted Successfully!`,
  });
});
