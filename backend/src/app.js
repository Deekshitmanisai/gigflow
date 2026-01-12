console.log("🔥 THIS APP.JS IS RUNNING 🔥");
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
