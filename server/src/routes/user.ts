import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
} from "../controllers/user.js";
import { AdminOnly } from "../middlewares/auth.js";

const app = express.Router();

// route - /api/v1/user/new
app.post("/new", newUser);

// route - /api/v1/user/all
app.get("/all", AdminOnly, getAllUsers);

// route - /api/v1/user/dynamicID
app.route("/:id").get(getUser).delete(AdminOnly, deleteUser);

export default app;
