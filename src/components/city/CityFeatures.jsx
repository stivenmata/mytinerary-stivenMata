import React from "react";

const FeatureCard = ({ gradient, icon, title, value }) => (
  <div className={`bg-${gradient}-800 bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-${gradient}-700 transform hover:scale-105 transition-all duration-300`}>
    <div className="flex justify-center mb-4">
      <div className={`w-16 h-16 bg-gradient-to-br from-${gradient}-500 to-${gradient === 'blue' ? 'purple' : gradient === 'purple' ? 'pink' : 'blue'}-600 rounded-full flex items-center justify-center shadow-lg`}>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
    <h3 className={`text-xl font-bold text-center text-${gradient}-300 mb-2`}>{title}</h3>
    <p className="text-center text-gray-300">{value}</p>
  </div>
);

const CityFeatures = ({ city, isLoadingCities, cityName }) => {
  return (
    <div id="features" className="py-20 px-4 bg-gradient-to-b from-blue-900 to-purple-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          City Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            gradient="blue"
            icon="💵"
            title="Currency"
            value={city?.currency || "Loading..."}
          />
          
          <FeatureCard 
            gradient="purple"
            icon="👥"
            title="Population"
            value={city?.population 
              ? new Intl.NumberFormat().format(city.population) 
              : "Loading..."}
          />
          
          <FeatureCard 
            gradient="indigo"
            icon="🕒"
            title="Timezone"
            value={city?.timezone || "Loading..."}
          />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-800 to-purple-800 bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-blue-700">
            <h3 className="text-xl font-bold text-center text-blue-300 mb-4">Country Information</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-gray-300">Country:</span>
                <span className="font-medium text-white">{city?.country || "Loading..."}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-gray-300">Continent:</span>
                <span className="font-medium text-white">{city?.continent || "Loading..."}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-gray-300">Area:</span>
                <span className="font-medium text-white">
                  {city?.area 
                    ? `${new Intl.NumberFormat().format(city.area)} km²` 
                    : "Loading..."}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Phone Code:</span>
                <span className="font-medium text-white">{city?.phone || "Loading..."}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-800 to-indigo-800 bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-purple-700">
            <h3 className="text-xl font-bold text-center text-purple-300 mb-4">About {cityName}</h3>
            <p className="text-gray-300 leading-relaxed">
              {isLoadingCities 
                ? "Loading city information..." 
                : city?.description || `Discover the unique charm and attractions of ${cityName}.`}
            </p>
            <div className="mt-6 flex justify-center">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg transition-all duration-300 text-sm">
                Learn More About {cityName}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityFeatures;