import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model.js";

export const register = async (req, res) => {
    try {
      
  
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing fields" });
      }
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      await User.create({ name, email, password });
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("REGISTER ERROR 👉", error);
      res.status(500).json({ message: "Registration failed" });
    }
  };
  

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};