import React from "react";

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-md shadow text-center">
    <p className="text-gray-600">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default StatCard;
