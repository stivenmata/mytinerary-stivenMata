import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cities = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); // Simula la carga por 3 segundos
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 text-center p-6 text-white">
      {loading ? (
        <div className="w-full max-w-2xl">
          <div className="h-10 w-64 bg-gray-500 rounded-lg animate-pulse mb-4"></div>
          <div className="h-4 w-48 bg-gray-500 rounded-lg animate-pulse mb-2"></div>
          <div className="h-4 w-56 bg-gray-500 rounded-lg animate-pulse mb-6"></div>
          <div className="h-48 w-full bg-gray-500 rounded-lg animate-pulse"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg text-gray-900 max-w-2xl animate-fadeIn opacity-100 transition-opacity duration-1000">
          <h1 className="text-4xl font-extrabold mb-4 animate-slideInDown">🌍 Exciting Adventures Await! 🌍</h1>
          <p className="text-lg max-w-lg mb-6 animate-fadeIn">
            Our team is working hard to bring you the best city itineraries.
            Soon, you'll be able to explore unique places with personalized experiences.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300 text-lg font-semibold"
          >
            🔙 Back to Home
          </button>
          <p className="mt-4 text-sm text-gray-700 animate-bounce">
            New adventures are coming soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default Cities;
