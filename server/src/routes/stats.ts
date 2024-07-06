import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import {
  getBarCharts,
  getDashboardStats,
  getLineCharts,
  getPieCharts,
} from "../controllers/stats.js";

const app = express.Router();

// route - /api/v1/dashboard/stats
app.get("/stats",AdminOnly, getDashboardStats);

// route - /api/v1/dashboard/pie
app.get("/pie",AdminOnly, getPieCharts);

// route - /api/v1/dashboard/bar
app.get("/bar",AdminOnly, getBarCharts);

// route - /api/v1/dashboard/line
app.get("/line",AdminOnly, getLineCharts);

export default app;
