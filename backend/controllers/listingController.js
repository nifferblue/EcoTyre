import Listing from "../models/Listing.js";

// ✅ Create a new listing
export const createListing = async (req, res) => {
  try {
    const { title, description, price, location, category, images } = req.body;
    const userId = req.user.id; // Assuming authentication middleware attaches user info

    const newListing = new Listing({ title, description, price, location, category, images, createdBy: userId });
    await newListing.save();

    res.status(201).json({ message: "Listing created successfully", listing: newListing });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get all listings
export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate("createdBy", "firstName email"); // Populate user info
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get a single listing by ID
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("createdBy", "firstName email");
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Update a listing (only the creator can update)
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    // Ensure only the creator can update
    if (listing.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to update this listing" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Listing updated successfully", listing: updatedListing });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Delete a listing (only the creator can delete)
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    // Ensure only the creator can delete
    if (listing.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to delete this listing" });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
