import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const backendURL = "http://localhost:5000";

const CityDetails = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const formats = ["avif", "jpg", "jpeg"]; 
    const cityFormatted = cityName.toLowerCase().replace(/\s+/g, "-");

    const checkImages = async () => {
      for (const ext of formats) {
        const url = `${backendURL}/images/cities/${cityFormatted}.${ext}`;
        try {
          const response = await fetch(url, { method: "HEAD" });
          if (response.ok) {
            setImageSrc(url);
            setLoading(false);
            return; 
          }
        } catch (error) {
          console.error(`Error checking image format: ${ext}`, error);
        }
      }

      
      setImageSrc("https://dummyimage.com/400x300/cccccc/000000&text=No+Image");
      setLoading(false);
    };

    checkImages();
  }, [cityName]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="flex flex-grow items-center justify-center text-center p-6 pt-32 md:pt-20">
        {loading ? (
          <div className="w-full max-w-2xl">
            <div className="h-10 w-64 bg-gray-500 rounded-lg animate-pulse mb-4"></div>
            <div className="h-48 w-full bg-gray-500 rounded-lg animate-pulse"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg text-gray-900 max-w-3xl animate-fadeIn opacity-100 transition-opacity duration-1000">
            <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {cityName}
            </h1>
            <img
              src={imageSrc}
              alt={cityName}
              className="w-full max-w-md h-64 object-cover rounded-lg shadow-md"
            />
            <p className="text-lg mt-4 font-semibold text-gray-700">
              🚧 Under Construction 🚧
            </p>
            <button
              onClick={() => navigate("/cities")}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300 text-lg font-semibold"
            >
              🔙 Back to Cities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityDetails;
