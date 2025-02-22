import React from "react";

const ListingCard = ({ title, image, condition, price, location, date }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />

      {/* Title */}
      <h3 className="text-lg font-semibold mt-4">{title}</h3>

      {/* Details Section */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span className="font-medium">Condition:</span>
          <span className="ml-10">{condition}</span> {/* Add spacing */}
        </div>
        <div className="flex justify-between text-green-600 font-semibold">
          <span className="font-medium">Price:</span>
          <span className="ml-10">Ksh. {price}</span> {/* Add spacing */}
        </div>
        <div className="flex justify-between text-gray-600">
          <span className="font-medium">Location:</span>
          <span className="ml-10">{location}</span> {/* Add spacing */}
        </div>
        <div className="flex justify-between text-gray-500 text-sm">
          <span className="font-medium">Posted:</span>
          <span className="ml-10">{date}</span> {/* Add spacing */}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
