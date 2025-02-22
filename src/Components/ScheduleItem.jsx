import React from "react";

const ScheduleItem = ({ center, dateTime, status }) => {
  const statusColors = {
    Confirmed: "bg-green-500",
    Pending: "bg-red-500",
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center shadow">
      <div>
        <p className="font-semibold">{center}</p>
        <p className="text-gray-700 text-sm">{dateTime}</p>
      </div>
      <span className={`px-3 py-1 text-white text-sm font-semibold rounded ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
};

export default ScheduleItem;
