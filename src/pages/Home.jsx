import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const backendURL = "http://localhost:5000";

const Home = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${backendURL}/api/cities`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Cities:", data);
        setCities(data.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-around min-h-screen p-4 lg:p-6 bg-gradient-to-r from-blue-900 to-purple-900 text-white pb-16 lg:pb-20">
      {/* Hero Section */}
      <div className="w-full lg:w-1/3 text-center lg:text-left space-y-4 lg:pl-8">
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
          Find the <span className="text-yellow-400">Perfect Destination</span>
        </h1>
        <p className="text-base lg:text-lg text-gray-300">
          We are currently working on improving your experience. Stay tuned for exciting updates and new features!
        </p>
        <Link
          to="/cities"
          className="px-5 py-2 lg:px-6 lg:py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
        >
          Explore Cities
        </Link>
      </div>

      {/* Carrusel de ciudades */}
      <div className="w-full lg:w-[60%] relative mt-6 lg:mt-0">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-4 lg:mb-6">
          Popular <span className="text-yellow-400">MyTineraries</span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-300">Loading cities...</p>
        ) : (
          <Slider {...settings}>
            {Array.from({ length: Math.ceil(cities.length / 4) }).map((_, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 lg:gap-6 p-4 lg:p-6">
                {cities.slice(i * 4, i * 4 + 4).map((city) => (
                  <CityCard key={city._id} city={city} />
                ))}
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};


const CityCard = ({ city }) => {
  const [imageSrc, setImageSrc] = useState("");
  const formats = ["avif", "jpg", "jpeg", "webp"];

  useEffect(() => {
    const cityFormatted = city.name.toLowerCase().replace(/\s+/g, "-");

    const checkImages = async () => {
      for (const ext of formats) {
        const url = `${backendURL}/images/cities/${cityFormatted}.${ext}`;
        try {
          const response = await fetch(url, { method: "HEAD" });
          if (response.ok) {
            setImageSrc(url);
            return;
          }
        } catch (err) {
          console.error("Error loading image:", err);
        }
      }
      setImageSrc("https://dummyimage.com/400x300/cccccc/000000&text=No+Image");
    };

    checkImages();
  }, [city.name]);

  return (
    <div className="relative group">
      <img
        src={imageSrc}
        alt={city.name}
        className="w-full h-28 lg:h-36 object-cover rounded-lg shadow-md transition-transform duration-300 transform group-hover:scale-105"
      />
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-xs lg:text-sm">
        {city.name}
      </div>
    </div>
  );
};

// Flechas del carrusel
const CustomPrevArrow = (props) => (
  <button
    {...props}
    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-3 md:-left-4 lg:-left-5 xl:-left-7 z-20 
    bg-black bg-opacity-50 p-0.5 sm:p-1 md:p-1 lg:p-1.5 xl:p-2 rounded-full hover:bg-opacity-80 transition"
  >
    <ChevronLeft className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
  </button>
);

const CustomNextArrow = (props) => (
  <button
    {...props}
    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-3 md:-right-4 lg:-right-5 xl:-right-7 z-20 
    bg-black bg-opacity-50 p-0.5 sm:p-1 md:p-1 lg:p-1.5 xl:p-2 rounded-full hover:bg-opacity-80 transition"
  >
    <ChevronRight className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
  </button>
);

export default Home;
