import React from "react";

const Button3 = ({ text, className }) => {
  return (
    <button className={`rounded ${className} hover:opacity-80 transition`}>
      {text}
    </button>
  );
};

export default Button3;
