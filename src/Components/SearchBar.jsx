import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search by location ..."
        className="outline-none w-full text-gray-700"
      />
    </div>
  );
};

export default SearchBar;
