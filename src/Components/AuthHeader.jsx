import React from "react";

const AuthHeader = ({ title, subtitle, icon }) => {
  return (
    <div className="text-center mb-6">
      <div className="flex justify-center mb-2">{icon}</div>
      <h2 className="text-xl font-bold text-green-700">{title}</h2>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
