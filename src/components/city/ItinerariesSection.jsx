import React from "react";
import ItineraryCard from "./ItineraryCard";

const ItinerariesSection = ({ 
  loadingItineraries, 
  itineraries, 
  cityName, 
  handleViewMoreClick, 
  handleLike, 
  warningShown 
}) => {
  return (
    <div id="itineraries" className="py-20 px-4 bg-gradient-to-b from-purple-900 to-blue-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Popular Itineraries
        </h2>
        
        {loadingItineraries ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white bg-opacity-10 rounded-3xl p-6 animate-pulse h-80" />
            ))}
          </div>
        ) : itineraries.length === 0 ? (
          <div className="bg-white bg-opacity-10 rounded-3xl p-12 text-center">
            <div className="text-6xl mb-6">🏙️</div>
            <h3 className="text-2xl font-bold mb-4">No Itineraries Yet</h3>
            <p className="text-gray-300 mb-6">Be the first to create an amazing itinerary for {cityName}!</p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg transition-all duration-300">
              Create Itinerary
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {itineraries.map((itinerary) => (
              <ItineraryCard 
                key={itinerary._id}
                itinerary={itinerary}
                handleLike={handleLike}
                handleViewMoreClick={handleViewMoreClick}
                warningShown={warningShown}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItinerariesSection;