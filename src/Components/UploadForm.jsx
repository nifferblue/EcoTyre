import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ onUpload }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // ✅ Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImageUrl(res.data.imageUrl); // ✅ Save uploaded image URL
    } catch (error) {
      console.error("❌ Image upload failed:", error);
    }
  };

  // ✅ Handle Listing Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image first!");
      return;
    }

    const listingData = {
      title,
      description,
      price: parseFloat(price), // ✅ Ensure it's a number
      location,
      category,
      images: [imageUrl], // ✅ Ensure array format
    };

    try {
      await axios.post("http://localhost:5000/api/listings", listingData, {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` // ✅ Add auth if needed
        },
      });

      alert("✅ Listing uploaded successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setCategory("");
      setImage(null);
      setImageUrl("");

      onUpload(); // ✅ Refresh listings
    } catch (error) {
      console.error("❌ Error uploading listing:", error.response?.data || error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload a Tire Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-2 border rounded" />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full p-2 border rounded" />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-2 border rounded" />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-2 border rounded" />

        <input type="file" accept="image/*" onChange={handleImageUpload} required className="w-full p-2 border rounded" />
        {imageUrl && <img src={`http://localhost:5000${imageUrl}`} alt="Preview" className="w-32 mt-2" />}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
