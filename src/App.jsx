import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import MyListings from "./Pages/MyListings";
import Messages from "./Pages/Messages";
import CollectionSchedule from "./Pages/CollectionSchedule";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Sidebar from "./components/Sidebar";
import Account from "./Pages/Account";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

const DashboardLayout = ({ children }) => (
  <div className="flex h-screen">
    <Sidebar />
    <main className="flex-1 p-6 bg-gray-100">{children}</main>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Dashboard Routes (With Sidebar) */}
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/listings" element={<DashboardLayout><MyListings /></DashboardLayout>} />
          <Route path="/messages" element={<DashboardLayout><Messages /></DashboardLayout>} />
          <Route path="/schedules" element={<DashboardLayout><CollectionSchedule /></DashboardLayout>} />
          <Route path="/account" element={<DashboardLayout><Account /></DashboardLayout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
