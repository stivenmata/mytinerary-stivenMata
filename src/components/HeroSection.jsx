import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../image/home4.jpg';

const HeroSection = () => {
  const navigate = useNavigate(); 

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden">
      
      
      <div className="absolute w-full h-full bg-fixed bg-cover bg-center scale-125 animate-zoom-out transition-transform duration-[10s]" 
           style={{ backgroundImage: `url(${heroImage})` }}>
      </div>

      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md animate-fade-in"></div>
      
      
      <div className="relative z-20 px-6 space-y-6 md:space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold animate-fade-in-down tracking-wide drop-shadow-xl">
          My <span className="text-yellow-400">Tineraries</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl max-w-xl sm:max-w-2xl mx-auto animate-fade-in-up opacity-90">
          "Find your perfect trip, designed by insiders who know and love their cities!"
        </p>
        
        
        <button
          onClick={() => navigate('/cities')} 
          className="group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-lg sm:text-xl font-semibold rounded-lg 
                     hover:scale-110 transition-all duration-300 ease-out shadow-xl hover:shadow-yellow-500/50"
        >
          <span className="relative z-20">Explore Now</span>
          <div className="absolute inset-0 bg-yellow-600 scale-x-0 group-hover:scale-x-100 
                         transition-transform duration-300 origin-left rounded-lg"></div>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
