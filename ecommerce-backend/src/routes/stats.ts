import express from "express";
import { adminOnly } from "../middlewares/authentication.js";
import {
  getDashboardStats,
} from "../controllers/stats.js";

const app = express.Router();

// route - /api/v1/dashboard/stats
app.get("/stats", getDashboardStats);



// route - /api/v1/dashboard/pie
// app.get("/pie", adminOnly, getPieCharts);

// // route - /api/v1/dashboard/bar
// app.get("/bar", adminOnly, getBarCharts);

// // route - /api/v1/dashboard/line
// app.get("/line", adminOnly, getLineCharts);

export default app;