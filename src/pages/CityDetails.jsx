import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItinerariesByCity } from "../redux/features/itinerariesSlice";
import { fetchCities } from "../redux/features/citiesSlice";

const backendURL = "http://localhost:5000";

const CityDetails = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);

  const itineraries = useSelector((state) => state.itineraries.items || []);
  const loadingItineraries = useSelector((state) => state.itineraries.loading);

  const cities = useSelector((state) => state.cities.allCities);
  const city = Array.isArray(cities)
    ? cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase())
    : null;

  // Cargar ciudades si no están aún
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  // Cargar itinerarios para la ciudad actual
  useEffect(() => {
    if (city?._id) {
      dispatch(fetchItinerariesByCity(city._id));
    }
  }, [dispatch, city]);

  // Cargar imagen de la ciudad
  useEffect(() => {
    const formats = ["avif", "jpg", "jpeg","webp"];
    const cityFormatted = cityName.replace(/\s+/g, "-");

    const checkImages = async () => {
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
          // evitar spam de errores
        }
      }

      setImageSrc("https://dummyimage.com/400x300/cccccc/000000&text=No+Image");
      setLoadingImage(false);
    };

    checkImages();
  }, [cityName]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="flex flex-col items-center pt-32 md:pt-20 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {cityName}
        </h1>

        {loadingImage ? (
          <div className="w-full max-w-md h-64 bg-gray-500 animate-pulse rounded-lg mb-6" />
        ) : (
          <img
            src={imageSrc}
            alt={cityName}
            className="w-full max-w-md h-64 object-cover rounded-lg shadow-md mb-6"
          />
        )}

        <button
          onClick={() => navigate("/cities")}
          className="mb-10 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300 text-lg font-semibold"
        >
          🔙 Back to Cities
        </button>

        <div className="w-full max-w-5xl">
          {loadingItineraries ? (
            <p className="text-lg">Loading itineraries...</p>
          ) : !Array.isArray(itineraries) || itineraries.length === 0 ? (
            <p className="text-lg">No itineraries yet for this city.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {itineraries.map((itinerary) => (
                <div
                  key={itinerary._id}
                  className="bg-white text-gray-900 p-4 rounded-lg shadow-md"
                >
                  <h2 className="text-xl font-bold mb-2">{itinerary.name}</h2>
                  <img
                    src={itinerary.photo}
                    alt={itinerary.name}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <p className="text-sm font-semibold">
                    Author: {itinerary.author}
                  </p>
                  <p>Duration: {itinerary.duration} hrs</p>
                  <p>Price: {"💵".repeat(itinerary.price)}</p>
                  <p>Likes: ❤️ {itinerary.likes || 0}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {itinerary.hashtags?.join(" ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
