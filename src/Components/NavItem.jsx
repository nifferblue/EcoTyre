import React from "react";

const NavItem = ({ icon, text, active }) => (
  <div className={`flex items-center space-x-3 p-2 rounded-md ${active ? 'bg-white shadow' : 'hover:bg-green-200 cursor-pointer'}`}>
    <span className="text-green-600">{icon}</span>
    <span className="text-gray-800">{text}</span>
  </div>
);

export default NavItem;
