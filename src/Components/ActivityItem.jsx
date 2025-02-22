import React from "react";
import { FaBell } from "react-icons/fa";

const ActivityItem = ({ message, time, onClick }) => (
  <div 
    className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-300 border border-gray-200"
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <FaBell className="text-green-600 text-xl" />
      <div>
        <p className="text-gray-800 font-semibold">{message}</p>
        <p className="text-gray-500 text-sm">{time}</p>
      </div>
    </div>
  </div>
);

export default ActivityItem;
