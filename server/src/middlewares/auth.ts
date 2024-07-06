import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const AdminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("Login First!", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid ID!", 401));
  if (user.role !== "admin")
    return next(new ErrorHandler("You Are Not Admin!", 403));

  next();
});
