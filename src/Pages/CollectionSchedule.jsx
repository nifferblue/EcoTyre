import React from "react";
import ScheduleItem from "../Components/ScheduleItem";

const CollectionSchedule = () => {
  const schedules = [
    {
      id: 1,
      center: "Recycling Center A",
      dateTime: "08/02/2025 at 14:00",
      status: "Confirmed",
    },
    {
      id: 2,
      center: "Recycling Center B",
      dateTime: "08/02/2025 at 14:00",
      status: "Pending",
    },
  ];

  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Collection Schedule</h1>

      {/* Schedule List */}
      <div className="mt-4 space-y-3 bg-white p-4 rounded-lg shadow-md">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <ScheduleItem 
              key={schedule.id} 
              center={schedule.center} 
              dateTime={schedule.dateTime} 
              status={schedule.status} 
            />
          ))
        ) : (
          <p className="text-gray-500">No schedules available.</p>
        )}
      </div>
    </main>
  );
};

export default CollectionSchedule;
