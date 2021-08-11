import React, { useEffect } from "react";

type GeolocationCoords = {
  latitude: number;
  longitude: number;
};

const useGeolocation = () => {
  const [userLocation, setUserLocation] = React.useState<GeolocationCoords>({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude.toFixed(6); //6, because the geo loc from API is also 6
        const long = position.coords.longitude.toFixed(6);
        setUserLocation({
          latitude: parseFloat(lat),
          longitude: parseFloat(long),
        });
      });
    } else {
      setError("Geolocation is not available");
    }
  }, []);

  return { ...userLocation, error };
};

export default useGeolocation;
