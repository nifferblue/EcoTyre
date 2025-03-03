import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRecycle } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "../components/Button";
import ty1 from "../assets/ty1.jpeg";
import ty2 from "../assets/ty2.jpeg";
import ty3 from "../assets/ty3.jpeg";
import ty4 from "../assets/ty4.jpeg";

// Array of images (doubled)
const images = [ty1, ty2, ty3, ty4, ty1, ty2, ty3, ty4];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-gray-100 relative overflow-hidden">
      {/* Navigation Bar */}
      <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center z-20">
        <h1 className="text-2xl font-bold text-green-700">EcoTyre</h1>
        <Button type="button" onClick={() => navigate("/login")} className="px-4 py-2 bg-green-700 text-white rounded-lg">
          Log in
        </Button>
      </nav>

      {/* Hero Section (Centered & Transparent) */}
      <div className="absolute inset-0 flex justify-center items-center z-10 text-center">
        <div className="p-8 rounded-lg max-w-xl">
          <FaRecycle className="mx-auto mb-4 text-green-700 animate-spin-slow" size={80} />
          <h1 className="text-5xl font-bold text-green-700 mb-4">Sustainable Tyre Recycling</h1>
          <p className="text-lg text-green-500 font-semibold mb-8">
            Connecting you with collection centers to ensure ethical and eco-friendly waste management.
          </p>
          <Button type="button" onClick={() => navigate("/login")} className="px-6 py-3 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 transition">
            Get Started
          </Button>
        </div>
      </div>

      {/* Sliding Image Background */}
      <div className="absolute bottom-0 left-0 w-full h-full flex justify-center items-end overflow-hidden z-0">
        <motion.div
          className="flex gap-6"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
        >
          {[...images, ...images].map((img, index) => (
            <div key={index} className="w-96 h-80 flex-shrink-0">
              <img src={img} alt={`bg-${index}`} className="w-full h-full object-cover rounded-lg shadow-lg" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
