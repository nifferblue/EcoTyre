// Import Firebase SDK
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxGX4RXq-qo9ZEjFQvWvMQBbqLm0c3JuM",
  authDomain: "ecotyre-dc441.firebaseapp.com",
  projectId: "ecotyre-dc441",
  storageBucket: "ecotyre-dc441.appspot.com",  // ✅ Fixed storage bucket
  messagingSenderId: "598990155936",
  appId: "1:598990155936:web:8b91ea270791c3082f99c5",
  measurementId: "G-4F023GCRV5"
};

// Prevent duplicate initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firebase auth
export const auth = getAuth(app);
export default app;
