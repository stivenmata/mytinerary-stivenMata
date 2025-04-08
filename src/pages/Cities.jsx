import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, filterCities } from "../redux/features/citiesSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { FaMapMarkerAlt } from "react-icons/fa";

const backendURL = "http://localhost:5000";

const Cities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { filteredCities, loading, allCities } = useSelector((state) => state.cities);




  useEffect(() => {
    if (!allCities || allCities.length === 0) {
      dispatch(fetchCities());
    }
  }, [dispatch, allCities]);
  

  const handleSearch = (query) => {
    dispatch(filterCities(query));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#1a1a40] to-[#3a2d82] text-white px-6">
      <div className="flex-grow flex items-center justify-center text-center pt-32 md:pt-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            {Array(12).fill().map((_, i) => (
              <div key={i} className="w-full h-64 bg-gray-700 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center w-full max-w-6xl pb-20">
            <div className="w-full flex justify-center mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {filteredCities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {filteredCities.map((city) => (
                  <div
                    key={city._id}
                    className="relative w-full h-64 bg-gray-200 rounded-lg shadow-lg overflow-hidden group"
                  >
                    <img
                      src={city.image?.startsWith("http") ? city.image : `${backendURL}${city.image}`}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-90"
                      onError={(e) => (e.target.src = "https://dummyimage.com/300x200/cccccc/000000&text=No+Image")}
                    />
                    <div className="absolute top-3 left-3 text-white drop-shadow-md">
                      <h2 className="text-lg font-bold">{city.name}</h2>
                      <div className="flex items-center gap-1 text-sm text-gray-200">
                        <FaMapMarkerAlt className="text-blue-400" />
                        <span>{city.country}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/cities/${city.name}`)}
                      className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 border-2 border-blue-300 hover:shadow-blue-500"
                    >
                      View More
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg backdrop-blur-md mt-8 animate-fadeIn text-center border-2 border-gray-300">
                <p className="text-4xl font-bold text-gray-800 drop-shadow-md">
                  No Results Found
                </p>
                <p className="text-lg text-gray-700 italic mt-3">
                  Try searching for another destination. 🌍
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cities;
