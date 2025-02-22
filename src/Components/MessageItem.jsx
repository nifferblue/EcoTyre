import React from "react";

const MessageItem = ({ sender, message, time, icon }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-between shadow">
      <div className="flex items-center space-x-4">
        {/* Profile Icon */}
        <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white font-bold rounded-full">
          {icon}
        </div>
        {/* Message Content */}
        <div>
          <p className="font-semibold">{sender}</p>
          <p className="text-gray-700 text-sm">{message}</p>
        </div>
      </div>
      {/* Timestamp */}
      <p className="text-gray-500 text-xs">{time}</p>
    </div>
  );
};

export default MessageItem;
