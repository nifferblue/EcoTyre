import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Ensure correct path and include .js extension

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    console.log("Received registration request:", email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User registered successfully");

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received login request:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, email: user.email, firstName: user.firstName } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
