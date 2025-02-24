import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../image/home3.jpg';

const HeroSection = () => {
  const navigate = useNavigate(); // Hook para la navegación

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden">
      {/* Imagen con efecto parallax */}
      <div className="absolute w-full h-full bg-fixed bg-cover bg-center scale-100 transition-transform duration-[10s]" 
           style={{ backgroundImage: `url(${heroImage})` }}>
      </div>

      {/* Overlay con efecto de desvanecimiento */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"></div>
      
      {/* Contenido principal con animaciones */}
      <div className="relative z-20 px-6 space-y-8">
        <h1 className="text-6xl font-bold animate-fade-in-down drop-shadow-lg">
        My Tineraries
        </h1>
        
        <p className="text-xl max-w-2xl mx-auto animate-fade-in-up opacity-80">
        "Find your perfect trip, designed by insiders who know and love their cities!"
        </p>
        
        {/* Botón con efecto de brillo y pulso */}
        <button
          onClick={() => navigate('/cities')} 
          className="group relative px-10 py-4 bg-blue-500 text-lg font-semibold rounded-lg 
                     hover:scale-110 transition-all duration-300 ease-out
                     hover:shadow-xl hover:shadow-blue-500/50 animate-pulse"
        >
          <span className="relative z-20">Explore Now</span>
          <div className="absolute inset-0 bg-blue-600 scale-x-0 group-hover:scale-x-100 
                         transition-transform duration-300 origin-left rounded-lg"></div>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
