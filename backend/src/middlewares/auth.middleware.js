import jwt from "jsonwebtoken";
import { User } from "../modules/users/user.model.js";

export const protect = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Get user from DB (exclude password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4️⃣ Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR 👉", error);
    res.status(401).json({ message: "Not authorized" });
  }
};
