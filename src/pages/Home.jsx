import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const cities = [
    { name: "New York", image: "/assets/nyc.jpg" },
    { name: "Paris", image: "/assets/paris.jpg" },
    { name: "Tokyo", image: "/assets/tokyo.jpg" },
    { name: "London", image: "/assets/london.jpg" },
    { name: "Rome", image: "/assets/rome.jpg" },
    { name: "Barcelona", image: "/assets/barcelona.jpg" },
    { name: "Sydney", image: "/assets/sydney.jpg" },
    { name: "Dubai", image: "/assets/dubai.jpg" },
    { name: "Berlin", image: "/assets/berlin.jpg" },
    { name: "Amsterdam", image: "/assets/amsterdam.jpg" },
    { name: "Buenos Aires", image: "/assets/buenosaires.jpg" },
    { name: "Los Angeles", image: "/assets/la.jpg" },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-8 bg-gray-100">
      {/* Hero Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Find Your Perfect Trip Designed by insiders who know and love their cities!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
        Our app will help you find the perfect path for your next trip. With an easy-to-use interface and a host of itinerary options, planning your next trip has never been easier.
        </p>
        <Link to="/cities" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
          Explore Cities
        </Link>
      </div>
      {/* Carrusel */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Popular Mytineraries
        </h2>
        <Slider {...settings}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              {cities.slice(i * 4, i * 4 + 4).map((city, index) => (
                <div key={index} className="relative">
                  <img src={city.image} alt={city.name} className="w-full h-40 object-cover rounded-lg shadow-md" />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                    {city.name}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
