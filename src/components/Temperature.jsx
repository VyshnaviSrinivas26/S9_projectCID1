import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../components/styles.css";

const Temperature = () => {
  const [temp, setTemp] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    const storedCity = localStorage.getItem("city") || "guntur";
    setCity(storedCity);

    // Step 1: City → Lat/Lon
    axios
      .get("https://geocoding-api.open-meteo.com/v1/search", {
        params: { name: storedCity, count: 1 }
      })
      .then((res) => {
        if (!res.data.results) {
          throw new Error("City not found");
        }

        const { latitude, longitude } = res.data.results[0];

        // Step 2: Weather API
        return axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude,
            longitude,
            current_weather: true
          }
        });
      })
      .then((res) => {
        setTemp(res.data.current_weather.temperature);
      })
      .catch((err) => {
        console.error(err);
        setTemp(null);
      });
  }, []);

  return (
    <div>
      <div className="head">
        <Link to="/">Main Page</Link>
        <Link to="/temperature">Weather Page</Link>
      </div>

      <div className="page">
        <h3>Weather Information</h3>

        <h2>City: {city}</h2>

        {temp !== null ? (
          <h1>Temperature is {temp} °C</h1>
        ) : (
          <h1>Temperature not available</h1>
        )}
      </div>
    </div>
  );
};

export default Temperature;