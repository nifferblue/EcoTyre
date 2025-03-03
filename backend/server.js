import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import userRoutes from "./routes/userRoutes.js"; // User routes
import listingRoutes from "./routes/listingRoutes.js"; // Listing routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet());
app.use(morgan("dev"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// Initialize AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Configure Multer-S3 for File Uploads
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET,
    acl: "public-read", // Allow public access to the file
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `listings/${Date.now()}_${file.originalname}`);
    },
  }),
});

// Upload Listing API (AWS S3)
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const { title, condition, price, location } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Get the S3 file URL
    const imageUrl = req.file.location;

    // Store listing details in MongoDB
    const newListing = {
      title,
      condition,
      price,
      location,
      imageUrl,
      date: new Date(),
    };

    // Save to MongoDB (assuming a Listing model exists)
    // const listing = new Listing(newListing);
    // await listing.save();

    res.status(200).json({ message: "Listing uploaded successfully!", data: newListing });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/listings", listingRoutes); // Listing-related routes

// Default Route
app.get("/", (req, res) => res.json({ message: "🚀 API is running..." }));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
