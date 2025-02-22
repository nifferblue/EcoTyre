import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

// ✅ Register a new user
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // 🔹 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    // 🔹 Hash password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔹 Create new user
    const newUser = new User({ firstName, lastName, email, phone, password: hashedPassword });
    await newUser.save();

    // 🔹 Generate JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, firstName, email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // 🔹 Check password validity
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // 🔹 Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, firstName: user.firstName },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
