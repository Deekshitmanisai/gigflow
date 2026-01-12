import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";
import gigRoutes from "./modules/gigs/gig.routes.js";
import { protect } from "./middlewares/auth.middleware.js";

const app = express();

/**
 * Global Middlewares
 */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5000", // frontend origin (adjust later)
    credentials: true,
  })
);

/**
 * Routes
 */
app.use("/auth", authRoutes);
app.use("/gigs", gigRoutes);

/**
 * Health check
 */
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

/**
 * Test protected route
 */
app.get("/protected", protect, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

export default app;
