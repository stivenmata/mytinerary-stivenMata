import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Cities = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); 
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      
      <div className="flex flex-grow items-center justify-center text-center p-6 pt-32 md:pt-20">
        {loading ? (
          <div className="w-full max-w-2xl">
            <div className="h-10 w-64 bg-gray-500 rounded-lg animate-pulse mb-4"></div>
            <div className="h-4 w-48 bg-gray-500 rounded-lg animate-pulse mb-2"></div>
            <div className="h-4 w-56 bg-gray-500 rounded-lg animate-pulse mb-6"></div>
            <div className="h-48 w-full bg-gray-500 rounded-lg animate-pulse"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg text-gray-900 max-w-3xl animate-fadeIn opacity-100 transition-opacity duration-1000">
            
            <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-slideInDown">
              🌍 Explore the Best Cities! 🌍
            </h1>

            
            <div className="w-full flex justify-center mb-8">
              <SearchBar />
            </div>

            
            <p className="text-lg max-w-lg mb-8 animate-fadeIn">
              We are currently working on improving your experience. Stay tuned for exciting updates and new features!
            </p>

            
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300 text-lg font-semibold"
            >
              🔙 Back to Home
            </button>

            <p className="mt-6 text-sm text-gray-700 animate-bounce">
              New adventures are waiting for you!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cities;
