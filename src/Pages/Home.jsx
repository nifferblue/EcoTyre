import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import { FaRecycle } from "react-icons/fa";
import Button from "../components/Button"; // Ensure correct import path
import TyreMain from "../assets/TyreMain.jpg"; // Import the image

const Home = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div 
      className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${TyreMain})` }} // Use imported image
    >
      <div className="text-center max-w-xl mx-auto p-6 rounded-lg shadow-lg">
        {/* Animated Recycle Icon */}
        <FaRecycle className="mx-auto mb-4 text-green-700 animate-spin-slow" size={80} />

        <h1 className="text-5xl font-bold text-green-700 mb-4">EcoTyre</h1>
        <p className="text-lg text-green-700 mb-8">
          Sustainable Motorcycle Tyre Recycling
        </p>

        {/* Buttons */}
        <div className="w-full flex flex-col space-y-4 max-w-md">
          <Button type="button" onClick={() => navigate("/login")} className="w-full">
            Sign in
          </Button>
          <Button type="button" onClick={() => navigate("/register")} className="w-full">
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
