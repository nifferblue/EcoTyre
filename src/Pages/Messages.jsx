import React from "react";
import MessageItem from "../Components/MessageItem";
import SearchBar2 from "../Components/SearchBar2";

const Messages = () => {
  const messages = [
    {
      id: 1,
      sender: "Recycling Center A",
      message: "Your tyre collection is scheduled for tomorrow at 2 PM",
      time: "10:30 AM",
      icon: "R",
    },
    {
      id: 2,
      sender: "Recycling Centre B",
      message: "We received your inquiry about recycling 4 tyres",
      time: "11:30 AM",
      icon: "M",
    },
    {
      id: 3,
      sender: "EcoWaste Solutions",
      message: "Reminder: Your pickup slot is confirmed for Friday.",
      time: "2:15 PM",
      icon: "E",
    },
  ];

  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      
      {/* Search Bar */}
      <div className="max-w-md">
        <SearchBar2 placeholder="Search messages..." />
      </div>

      {/* Messages List */}
      <div className="mt-4 space-y-3 bg-white p-4 rounded-lg shadow-md">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <MessageItem 
              key={msg.id} 
              sender={msg.sender} 
              message={msg.message} 
              time={msg.time} 
              icon={msg.icon} 
            />
          ))
        ) : (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>
    </main>
  );
};

export default Messages;
