
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet());
app.use(morgan("dev"));

// console.log("AWS_S3_BUCKET:", process.env.AWS_S3_BUCKET); // Debugging

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => res.json({ message: "🚀 API is running..." }));

// Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
