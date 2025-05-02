import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItinerariesByCity, likeItinerary } from "../redux/features/itinerariesSlice";
import { fetchCities } from "../redux/features/citiesSlice";


import HeroSection from "../components/city/HeroSection";
import CityFeatures from "../components/city/CityFeatures";
import ItinerariesSection from "../components/city/ItinerariesSection";
import FooterNavigation from "../components/city/FooterNavigation";


import { useCityImage } from "../components/hooks/useCityImage.js";

const backendURL = "http://localhost:5000";

const CityDetails = () => {
  const { cityName } = useParams();
  const dispatch = useDispatch();
  const [warningShown, setWarningShown] = useState({});

  
  const itineraries = useSelector((state) => state.itineraries.items || []);
  const loadingItineraries = useSelector((state) => state.itineraries.loading);
  const cities = useSelector((state) => state.cities.allCities);
  const isLoadingCities = useSelector((state) => state.cities.loading);

  
  const city = Array.isArray(cities)
    ? cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase())
    : null;

  
  const { imageSrc, loadingImage } = useCityImage(city, cityName, backendURL);

  
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  
  useEffect(() => {
    if (city?._id) {
      dispatch(fetchItinerariesByCity(city._id));
    }
  }, [dispatch, city]);

  // Handlers
  const handleViewMoreClick = (id) => {
    setWarningShown((prev) => ({ 
      ...prev, 
      [id]: !prev[id] 
    }));
  };

  const handleLike = (id) => {
    dispatch(likeItinerary(id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <HeroSection 
        cityName={cityName} 
        city={city} 
        isLoadingCities={isLoadingCities} 
        loadingImage={loadingImage} 
        imageSrc={imageSrc} 
      />
      
      <CityFeatures 
        city={city} 
        isLoadingCities={isLoadingCities} 
        cityName={cityName} 
      />
      
      <ItinerariesSection 
        loadingItineraries={loadingItineraries}
        itineraries={itineraries}
        cityName={cityName}
        handleViewMoreClick={handleViewMoreClick}
        handleLike={handleLike}
        warningShown={warningShown}
      />
      
      <FooterNavigation />
    </div>
  );
};

export default CityDetails;