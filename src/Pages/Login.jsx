import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import InputField from "../Components/InputField";
import Button3 from "../Components/Button3";
import AuthHeader from "../Components/AuthHeader";
import { FaRecycle } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData.email, formData.password);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6">
      <AuthHeader 
        title="Welcome Back" 
        subtitle="Sign in to manage your tyre recycling" 
        icon={<FaRecycle size={50} className="text-green-700" />} 
      />
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <InputField label="Email" name="email" type="email" placeholder="Enter your email" onChange={handleChange} />
          <InputField label="Password" name="password" type="password" placeholder="Enter password" onChange={handleChange} />
          <div className="text-green-700 text-sm mb-4 cursor-pointer">Forgot password?</div>
          <Button3 text="Sign in" type="submit" />
        </form>
      </div>
      <p className="text-green-700 mt-4 text-sm">
        Dont have an account? <a href="/register" className="font-semibold cursor-pointer">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
