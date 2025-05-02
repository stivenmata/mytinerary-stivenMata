import { useState, useEffect } from "react";

export const useCityImage = (city, cityName, backendURL) => {
  const [imageSrc, setImageSrc] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    const loadCityImage = async () => {
      try {
        if (city?.image) {
          const response = await fetch(`${backendURL}${city.image}`, { method: "HEAD" });
          if (response.ok) {
            setImageSrc(`${backendURL}${city.image}`);
            return;
          }
        }

        const formats = ["avif", "jpg", "jpeg", "webp", "png"];
        const cityFormatted = city?.name?.toLowerCase().replace(/\s+/g, "-");

        for (const ext of formats) {
          const url = `${backendURL}/images/cities/${cityFormatted}.${ext}`;
          const response = await fetch(url, { method: "HEAD" });
          if (response.ok) {
            setImageSrc(url);
            return;
          }
        }

        // Fallback image
        setImageSrc("https://dummyimage.com/800x400/cccccc/000000&text=No+Image");
      } catch (error) {
        console.error("Error loading city image:", error);
        setImageSrc("https://dummyimage.com/800x400/cccccc/000000&text=Error+Loading+Image");
      } finally {
        setLoadingImage(false);
      }
    };

    if (city && cityName) {
      loadCityImage();
    } else {
      setImageSrc("https://dummyimage.com/800x400/cccccc/000000&text=City+Not+Found");
      setLoadingImage(false);
    }
  }, [cityName, city, backendURL]);

  return { imageSrc, loadingImage };
};
