import express from "express";
import Listing from "../models/listing.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, async (req, res) => {
  try {
    const { title, description, price, location, category, imageUrl } = req.body;
    const newListing = new Listing({ title, description, price, location, category, imageUrl, createdBy: req.user.id });
    await newListing.save();

    res.status(201).json({ message: "Listing created successfully", listing: newListing });
  } catch (error) {
    res.status(500).json({ message: "Error creating listing", error: error.message });
  }
});

router.get("/", async (req, res) => {
  const listings = await Listing.find().populate("createdBy", "firstName lastName");
  res.json(listings);
});

export default router;
