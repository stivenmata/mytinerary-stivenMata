// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../redux/features/authSlice";  
import backgroundImage from "../../image/home1.jpg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please complete all fields.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });

      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      
      dispatch(login(data.user));

      navigate("/");  
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative p-6 pt-20 md:pt-28"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md md:max-w-lg">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center">Welcome Back!</h2>
        <p className="text-gray-500 text-center mt-2">Login to your account</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input 
              type="email" 
              placeholder="example@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg bg-gray-100 text-gray-900 border focus:border-yellow-500 focus:ring focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input 
              type="password" 
              placeholder="********"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg bg-gray-100 text-gray-900 border focus:border-yellow-500 focus:ring focus:ring-yellow-400"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition-all"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <button 
            onClick={() => navigate("/signup")} 
            className="text-yellow-500 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
