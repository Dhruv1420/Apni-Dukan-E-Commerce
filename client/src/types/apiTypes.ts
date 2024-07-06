import {
  Bar,
  CartItem,
  Coupon,
  Line,
  Order,
  Pie,
  Product,
  ShippingInfo,
  Stats,
  User,
} from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UsersResponse = {
  success: boolean;
  users: User[];
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type ProductsResponse = {
  success: boolean;
  products: Product[];
};

export type CouponsResponse = {
  success: boolean;
  coupons: Coupon[];
};

export type CategoryResponse = {
  success: boolean;
  categories: string[];
};

export type SearchProductsResponse = ProductsResponse & {
  totalPage: number;
};

export type ProductResponse = {
  success: boolean;
  product: Product;
};

export type OrdersResponse = {
  success: boolean;
  orders: Order[];
};

export type OrderResponse = {
  success: boolean;
  order: Order;
};

export type StatsResponse = {
  success: boolean;
  stats: Stats;
};

export type PieResponse = {
  success: boolean;
  charts: Pie;
};

export type BarResponse = {
  success: boolean;
  charts: Bar;
};

export type LineResponse = {
  success: boolean;
  charts: Line;
};

export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};

export type NewCouponRequest = {
  id: string;
  coupon: {
    code: string;
    amount: number;
  };
};

export type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};

export type DeleteProductRequest = {
  userId: string;
  productId: string;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};

export type DeleteCouponRequest = {
  couponId: string;
  adminId: string;
};
