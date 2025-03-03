import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Listing from "../models/listing.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

// 🔹 Middleware for authentication
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from header

  if (!token) return res.status(401).json({ error: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

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


// ✅ Create a new listing (Protected Route)
router.post("/listings", authMiddleware, async (req, res) => {
  try {
    const { title, description, price, location } = req.body;

    // 🔹 Create a new listing linked to the user
    const newListing = new Listing({
      title,
      description,
      price,
      location,
      owner: req.user.id, // Link the listing to the authenticated user
    });

    await newListing.save();
    res.status(201).json({ message: "Listing created successfully", listing: newListing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Get all listings of the authenticated user (Protected Route)
router.get("/my-listings", authMiddleware, async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user.id }); // Fetch listings by user ID
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Delete a listing (Protected Route)
router.delete("/listings/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // 🔹 Find listing and ensure it's owned by the authenticated user
    const listing = await Listing.findOne({ _id: id, owner: req.user.id });

    if (!listing) return res.status(404).json({ error: "Listing not found or unauthorized" });

    await Listing.findByIdAndDelete(id);
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
