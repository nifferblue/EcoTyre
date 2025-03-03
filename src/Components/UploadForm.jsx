import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UploadForm = ({ onUpload }) => {
  const [formData, setFormData] = useState({
    title: "",
    condition: "",
    price: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("condition", formData.condition);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("image", formData.image);

    try {
      await axios.post("http://localhost:5000/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpload(); // Refresh the listings after upload
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <input type="text" name="condition" placeholder="Condition" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

// ✅ Add PropTypes validation
UploadForm.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default UploadForm;
