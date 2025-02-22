import React, { useState } from "react";

const FilterButtons = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    console.log("Selected Filter:", filter);
  };

  return (
    <div className="flex space-x-4">
      {["All", "Active", "Pending", "Sold"].map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-full ${
            activeFilter === filter ? "ring-2 ring-blue-500" : ""
          } ${
            filter === "Sold" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => handleFilterClick(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
