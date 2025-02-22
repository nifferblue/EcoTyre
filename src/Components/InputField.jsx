import React from "react";

const InputField = ({ label, placeholder, type = "text" }) => {
  return (
    <div className="mb-4">
      <label className="block text-green-700 font-semibold">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
    </div>
  );
};

export default InputField;
