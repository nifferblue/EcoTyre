import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Simulate checking authentication from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); // Simulate user data
    }
  }, []);

  // Login Function
  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    setUser(userData);
    navigate("/dashboard"); // Redirect after login
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth
export const useAuth = () => {
  return useContext(AuthContext);
};
