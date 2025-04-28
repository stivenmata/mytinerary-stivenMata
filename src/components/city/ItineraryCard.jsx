import React from "react";

const ItineraryCard = ({ itinerary, handleLike, handleViewMoreClick, warningShown }) => {
  return (
    <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-opacity-80 border border-gray-700 border-opacity-50">
      {/* Itinerary Image */}
      <div className="relative h-48 overflow-hidden">
        {itinerary.placePhoto ? (
          <img
            src={itinerary.placePhoto}
            alt={itinerary.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-800 to-purple-800 flex items-center justify-center">
            <span className="text-4xl">🏞️</span>
          </div>
        )}
        
        {/* Price and Duration Badge */}
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg border border-blue-600">
            ${itinerary.price || "50"}
          </div>
          <div className="bg-purple-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg border border-purple-600">
            {itinerary.duration || "3"} h
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">
            {itinerary.title}
          </h3>
          <button 
            onClick={() => handleLike(itinerary._id)}
            className="flex items-center gap-1 bg-gray-800 bg-opacity-50 hover:bg-red-900 px-3 py-1 rounded-full transition-colors duration-300"
          >
            <span>❤️</span>
            <span>{itinerary.likes || 0}</span>
          </button>
        </div>
        
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4 bg-blue-900 bg-opacity-20 p-2 rounded-lg border-l-4 border-blue-600">
          <img
            src={itinerary.authorPhoto || "https://i.imgur.com/Vz81GEl.png"}
            alt={itinerary.authorName}
            className="w-10 h-10 object-cover rounded-full border-2 border-blue-600"
          />
          <div>
            <p className="text-blue-200 text-xs">Created by</p>
            <p className="font-semibold text-white">{itinerary.authorName}</p>
          </div>
        </div>
        
        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(itinerary.hashtags || ["culture", "history", "art"]).map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-900 bg-opacity-70 text-blue-200 px-2 py-1 rounded-full text-xs font-medium border border-indigo-700"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-end border-t border-gray-700 pt-4">
          <button
            onClick={() => handleViewMoreClick(itinerary._id)}
            className="text-sm text-purple-300 hover:text-purple-200 transition-colors duration-300 flex items-center gap-1 bg-purple-900 bg-opacity-30 px-3 py-1 rounded-full"
          >
            <span>View Details</span>
            <span>→</span>
          </button>
        </div>
        
        {/* Under Construction Section */}
        {warningShown[itinerary._id] && (
          <div className="mt-6 pt-4 border-t border-gray-700 bg-yellow-900 bg-opacity-20 p-4 rounded-xl">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="text-5xl mb-4">🚧</div>
              <h4 className="text-xl font-bold text-yellow-300 mb-2">Under Construction</h4>
              <p className="text-gray-300 text-center">Activities and detailed information will be available soon!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryCard;