import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // Import API function
import InputField from "../Components/InputField";
import Button3 from "../Components/Button3";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation functions
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10,}$/.test(phone);
  const isValidPassword = (password) => password.length >= 6;

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const { firstName, lastName, email, phone, password, confirmPassword } = formData;

    // Trim values to prevent whitespace issues
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required!");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format! Please enter a valid email.");
      return;
    }

    if (!isValidPhone(phone)) {
      setError("Invalid phone number! Enter at least 10 digits.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    try {
      const userData = { firstName, lastName, email, phone, password };
      const data = await registerUser(userData);

      localStorage.setItem("token", data.token); // Store token for authentication
      navigate("/dashboard"); // Redirect on success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-3">
          <span className="text-green-600 text-3xl">👤➕</span>
        </div>

        <h1 className="text-2xl font-bold text-center text-green-700">Create Account</h1>
        <p className="text-center text-gray-600 mb-5">Join our sustainable recycling network</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>

          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Phone number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
          <InputField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />

          <Button3 text="Create Account" className="bg-black text-white w-full py-2 mt-4" type="submit" />
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-green-600 font-semibold">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
