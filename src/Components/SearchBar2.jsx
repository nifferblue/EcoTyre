import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar2 = ({ placeholder }) => {
  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
};

export default SearchBar2;
