import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ cityName, city, isLoadingCities, loadingImage, imageSrc }) => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen overflow-hidden">
      {loadingImage ? (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      ) : (
        <>
          <div 
            className="absolute inset-0 bg-center bg-cover transform scale-110" 
            style={{ 
              backgroundImage: `url(${imageSrc})`,
              filter: "brightness(0.7)",
              transform: "scale(1.05)",
              transformOrigin: "center center",
              transition: "transform 1s ease-out"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900 opacity-90" />
        </>
      )}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
          {cityName}
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
          {isLoadingCities ? "Loading city information..." : city?.description || "Discover the unique charm and attractions of this amazing destination."}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => navigate("/cities")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <span>Back to Cities</span>
          </button>
          <button 
            onClick={() => document.getElementById('itineraries').scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <span>View Itineraries</span>
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <button 
          onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
          className="animate-bounce p-2 bg-white bg-opacity-20 rounded-full"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;