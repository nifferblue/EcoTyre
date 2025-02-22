import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdList, MdMessage, MdSchedule, MdPerson } from "react-icons/md";
import { FaRecycle } from "react-icons/fa"; // Importing an icon

const Sidebar = () => {
  const location = useLocation(); // Get current path for active styling

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
    { name: "My Listings", path: "/listings", icon: <MdList /> },
    { name: "Messages", path: "/messages", icon: <MdMessage /> },
    { name: "Schedules", path: "/schedules", icon: <MdSchedule /> },
    { name: "Profile", path: "/account", icon: <MdPerson /> },
  
  ];

  return (
    <aside className="w-64 h-screen bg-green-100 p-6 flex flex-col">
      {/* Sidebar Header */}
      <h1 className="text-xl font-bold text-green-700 flex items-center space-x-2">
      {<FaRecycle size={50} className="text-green-700" />}
        <span>EcoTyre</span>
      </h1>

      {/* Navigation Links */}
      <nav className="mt-8 flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-medium transition duration-200 ${
              location.pathname === item.path
                ? "bg-green-600 text-white"
                : "text-green-700 hover:bg-green-300"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
