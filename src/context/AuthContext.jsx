import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { 
  onAuthStateChanged, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Signup function
  const signup = async (email, password) => {
    try {
      setError(null); // Reset errors before attempting signup
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setError(null); // Reset errors before attempting login
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
