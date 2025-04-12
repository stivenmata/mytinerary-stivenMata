import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchItinerariesByCity,likeItinerary,} from "../redux/features/itinerariesSlice";
import { fetchCities } from "../redux/features/citiesSlice";

const backendURL = "http://localhost:5000";

const CityDetails = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [imageSrc, setImageSrc] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);
  const [warningShown, setWarningShown] = useState({});
  const [showCommentBox, setShowCommentBox] = useState({});
  const [comment, setComment] = useState("");

  const itineraries = useSelector((state) => state.itineraries.items || []);
  const loadingItineraries = useSelector((state) => state.itineraries.loading);
  const cities = useSelector((state) => state.cities.allCities);
  const isLoadingCities = useSelector((state) => state.cities.loading);

  const city = Array.isArray(cities)
    ? cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase())
    : null;

  
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  
  useEffect(() => {
    if (city?._id) {
      dispatch(fetchItinerariesByCity(city._id));
    }
  }, [dispatch, city]);

  
  useEffect(() => {
    
    const loadCityImage = async () => {
      if (city?.image) {
        
        try {
          const response = await fetch(`${backendURL}${city.image}`, { method: "HEAD" });
          if (response.ok) {
            setImageSrc(`${backendURL}${city.image}`);
            setLoadingImage(false);
            return;
          }
        } catch (error) {
          
        }
      }

      
      const formats = ["avif", "jpg", "jpeg", "webp", "png"];
      const cityFormatted = cityName.replace(/\s+/g, "");

      for (const ext of formats) {
        const url = `${backendURL}/images/cities/${cityFormatted}.${ext}`;
        try {
          const response = await fetch(url, { method: "HEAD" });
          if (response.ok) {
            setImageSrc(url);
            setLoadingImage(false);
            return;
          }
        } catch (error) {
          
        }
      }

      
      setImageSrc("https://dummyimage.com/800x400/cccccc/000000&text=No+Image");
      setLoadingImage(false);
    };

    if (cityName) {
      loadCityImage();
    }
  }, [cityName, city]);

  const handleViewMoreClick = (id) => {
    setWarningShown((prev) => ({ ...prev, [id]: true }));
  };

  const toggleCommentBox = (id) => {
    setShowCommentBox((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLike = (id) => {
    dispatch(likeItinerary(id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      
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
      
      {/* City Features Section */}
      <div id="features" className="py-20 px-4 bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            City Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-800 bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-blue-700 transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💵</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-blue-300 mb-2">Currency</h3>
              <p className="text-center text-gray-300">{city?.currency || "Loading..."}</p>
            </div>
            
            <div className="bg-purple-800 bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-purple-700 transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-purple-300 mb-2">Population</h3>
              <p className="text-center text-gray-300">
                {city?.population 
                  ? new Intl.NumberFormat().format(city.population) 
                  : "Loading..."}
              </p>
            </div>
            
            <div className="bg-indigo-800 bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-indigo-700 transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🕒</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-indigo-300 mb-2">Timezone</h3>
              <p className="text-center text-gray-300">{city?.timezone || "Loading..."}</p>
            </div>
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
      
      {/* Itineraries Section */}
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
                <div
                  key={itinerary._id}
                  className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-opacity-80 border border-gray-700 border-opacity-50"
                >
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
                    
                    {/* Actions */}
                    <div className="flex justify-between border-t border-gray-700 pt-4">
                      <button
                        onClick={() => toggleCommentBox(itinerary._id)}
                        className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-300 flex items-center gap-1 bg-blue-900 bg-opacity-30 px-3 py-1 rounded-full"
                      >
                        <span>💬</span>
                        <span>Comments ({itinerary.comments?.length || 0})</span>
                      </button>
                      
                      {!warningShown[itinerary._id] ? (
                        <button
                          onClick={() => handleViewMoreClick(itinerary._id)}
                          className="text-sm text-purple-300 hover:text-purple-200 transition-colors duration-300 flex items-center gap-1 bg-purple-900 bg-opacity-30 px-3 py-1 rounded-full"
                        >
                          <span>View Details</span>
                          <span>→</span>
                        </button>
                      ) : (
                        <p className="text-yellow-300 text-sm animate-pulse flex items-center gap-1 bg-yellow-900 bg-opacity-30 px-3 py-1 rounded-full">
                          <span>🚧</span>
                          <span>Coming soon</span>
                        </p>
                      )}
                    </div>
                    
                    {/* Comments Box */}
                    {showCommentBox[itinerary._id] && (
                      <div className="mt-6 pt-4 border-t border-gray-700 bg-gray-900 bg-opacity-50 p-4 rounded-xl">
                        <h4 className="text-sm font-bold text-blue-300 mb-3 flex items-center gap-2">
                          <span>💬</span>
                          <span>COMMENTS</span>
                        </h4>
                        
                        
                        {itinerary.comments && itinerary.comments.length > 0 ? (
                          <div className="space-y-3 mb-4">
                            {itinerary.comments.map((comment, idx) => (
                              <div key={idx} className="flex gap-2 bg-gray-800 bg-opacity-50 p-3 rounded-lg">
                                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs">
                                  {comment.user.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-white text-sm font-semibold">{comment.user}</p>
                                  <p className="text-gray-300 text-sm">{comment.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm mb-4">There are no comments yet, be the first!</p>
                        )}
                        
                        <div className="flex gap-3">
                          <img
                            src="https://i.imgur.com/Vz81GEl.png"
                            alt="Avatar"
                            className="w-8 h-8 object-cover rounded-full flex-shrink-0"
                          />
                          <div className="flex-1 bg-gray-800 bg-opacity-70 rounded-xl overflow-hidden border border-gray-700">
                            <textarea
                              placeholder="Share your experience in the city..."
                              className="w-full p-3 resize-none border-none outline-none text-gray-300 bg-transparent"
                              rows="2"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <div className="flex justify-end p-2 bg-gray-800 bg-opacity-70">
                              <button className="px-3 py-1 bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 text-white rounded-full text-sm transition-colors duration-300">
                              Send to
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Navigation */}
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
    </div>
  );
};

export default CityDetails;