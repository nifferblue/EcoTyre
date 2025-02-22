import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // Import user routes

// Load environment variables
dotenv.config(); 

console.log("🔍 Checking process.env after dotenv.config():", process.env.MONGO_URI ? "Loaded" : "Not Loaded");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
  origin: "http://localhost:5173", // Adjust based on your frontend
  credentials: true,
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch((err) => {
  console.error("❌ MongoDB Connection Failed:", err.message);
  process.exit(1); // Exit if DB connection fails
});

// Routes
app.use("/api/users", userRoutes); // All user-related routes

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
