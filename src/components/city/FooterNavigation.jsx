import React from "react";
import { useNavigate } from "react-router-dom";

const FooterNavigation = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-10 px-4 bg-blue-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <button
          onClick={() => navigate("/cities")}
          className="mb-4 md:mb-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to Cities</span>
        </button>
        
        <div className="flex gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterNavigation;