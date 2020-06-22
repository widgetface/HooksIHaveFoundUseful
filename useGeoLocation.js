import React, { useEffect, useState } from "react";

const initialState = { location: null, error: false };
const defaultOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 500,
};

const useGeoLocation = () => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    if (navigator && navigator.geolocation) {
      getLocation().then((location) => setState({ location, error: false }));
    } else {
      setState({ error: true });
    }
  }, []);

  function getLocation() {
    let options = options || defaultOptions;
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            longtitude: position.coords.longitude,
            latitude: position.coords.latitude,
            error: false,
          });
        },
        (e) => {
          reject({
            longtitude: null,
            latitude: null,
            error: true,
          });
        },
        options
      );
    });
  }

  return [state];
};

export default useGeoLocation;
