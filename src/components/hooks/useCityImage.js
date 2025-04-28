import { useState, useEffect } from "react";

export const useCityImage = (city, cityName, backendURL) => {
  const [imageSrc, setImageSrc] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);

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
      const cityFormatted = city.name.toLowerCase().replace(/\s+/g, "-");

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

    if (cityName && city) {
      loadCityImage();
    }
  }, [cityName, city, backendURL]);

  return { imageSrc, loadingImage };
};