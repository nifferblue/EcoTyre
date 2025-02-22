import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Dashboard Title */}
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>

      {/* Right Section: Notifications & User Info */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <IoMdNotifications className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />

        {/* User Info */}
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-700 text-lg" />
          <span className="text-gray-800 font-medium">Jane Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
