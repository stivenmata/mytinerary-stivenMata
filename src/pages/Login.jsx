import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import backgroundImage from "../image/home1.jpg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with email:", email);
    navigate("/dashboard");
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

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input 
            type="email" 
            placeholder="example@email.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-1 rounded-lg bg-gray-100 text-gray-900 border focus:border-yellow-500 focus:ring focus:ring-yellow-400"
            required
          />
          <button 
            type="submit" 
            className="w-full mt-5 bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        
        <button className="w-full flex items-center justify-center bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-all">
          <FcGoogle className="mr-3 text-xl" /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
