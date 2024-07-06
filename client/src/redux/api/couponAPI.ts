import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CouponsResponse,
  DeleteCouponRequest,
  MessageResponse,
  NewCouponRequest,
} from "../../types/apiTypes";

export const couponAPI = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment/coupon/`,
  }),
  tagTypes: ["coupons"],
  endpoints: (builder) => ({
    allCoupons: builder.query<CouponsResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["coupons"],
    }),
    newCoupon: builder.mutation<MessageResponse, NewCouponRequest>({
      query: ({ id, coupon }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: coupon,
      }),
      invalidatesTags: ["coupons"],
    }),
    deleteCoupon: builder.mutation<MessageResponse, DeleteCouponRequest>({
      query: ({ couponId, adminId }) => ({
        url: `${couponId}?id=${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupons"],
    }),
  }),
});

export const {
  useAllCouponsQuery,
  useNewCouponMutation,
  useDeleteCouponMutation,
} = couponAPI;
