import React from "react";

const Button = ({ children, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
