import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../../image/home1.jpg"; 

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    photo: "",
    country: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const countries = [
    "Argentina", "Brazil", "Canada", "Chile", "Colombia", "Mexico", "Spain", "United States"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    
    if (!form.name || !form.lastName || !form.email || !form.password || !form.photo || !form.country) {
      setError("Please complete all fields.");
      return;
    }

    
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }

    
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(form.photo)) {
      setError("Please enter a valid photo URL.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative p-6 pt-20 md:pt-28"
      style={{ backgroundImage: `url(${backgroundImage})` }} 
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center">Create your account</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <input
            name="name"
            type="text"
            placeholder="First Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 border focus:border-yellow-500 focus:ring focus:ring-yellow-400"
            required
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 border focus:border-yellow-500 focus:ring focus:ring-yellow-400"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 border focus:border-yellow-500 focus:ring focus:ring-yellow-400"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 border focus:border-yellow-500 focus:ring focus:ring-yellow-400"
            required
          />
          <input
            name="photo"
            type="url"
            placeholder="Photo URL"
            value={form.photo}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 border focus:border-yellow-500 focus:ring focus:ring-yellow-400"
            required
          />

          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 border focus:border-yellow-500 focus:ring focus:ring-yellow-400"
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition-all"
          >
            Register
          </button>
        </form>

        <p className="text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-yellow-500 font-semibold hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
