console.log("🔥 THIS APP.JS IS RUNNING 🔥");
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import { protect } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);



app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});
app.get("/protected", protect, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});


export default app;
