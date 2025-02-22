import React from "react";
import Header from "../Components/Header";
import StatCard from "../Components/StatCard";
import ActivityItem from "../Components/ActivityItem";

const Dashboard = () => {
  // Sample data for recent activities
  const recentActivities = [
    { id: 1, message: "New offer received for your Michelin tyre", time: "2h ago" },
    { id: 2, message: "Tyre pickup scheduled for tomorrow", time: "4h ago" },
    { id: 3, message: "Your listing for Pirelli tyres was approved", time: "1 day ago" },
  ];

  const handleActivityClick = (activity) => {
    alert(`You clicked on: ${activity.message}`);
  };

  return (
    <main className="flex-1 p-6">
      {/* Header */}
      <Header />

      {/* Stats Section */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Active Listings" value="12" />
        <StatCard title="Pending Offers" value="5" />
        <StatCard title="Completed Recycling" value="28" />
      </div>

      {/* Recent Activity (Aligned with Header and Stats) */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        
        {/* Single Column Layout with Alignment */}
        <div className="flex flex-col gap-4">
          {recentActivities.map((activity) => (
            <ActivityItem 
              key={activity.id} 
              message={activity.message} 
              time={activity.time} 
              onClick={() => handleActivityClick(activity)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
