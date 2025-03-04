import React from "react";

const ListingCard = ({ title, description, price, location, images }) => {
  return (
    <div className="border p-4 rounded shadow">
      {images && images.length > 0 && (
        <img src={`http://localhost:5000${images[0]}`} alt={title} className="w-full h-40 object-cover rounded" />
      )}
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <p className="font-semibold">💰 ${price}</p>
      <p className="text-sm text-gray-500">📍 {location}</p>
    </div>
  );
};

export default ListingCard;
