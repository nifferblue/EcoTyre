import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "../Components/UploadForm";

import ListingCard from "../Components/ListingCard";

const MyListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/listings");
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <UploadForm onUpload={fetchListings} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
      </div>
    </div>
  );
};

export default MyListings;
