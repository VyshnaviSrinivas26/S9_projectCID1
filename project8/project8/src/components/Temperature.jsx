import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../components/styles.css";

const Temperature = () => {

    // 1️⃣ Store city name typed by user
    const [city, setCity] = useState("");

    // 2️⃣ Store temperature value
    const [temp, setTemp] = useState(0);

    // 3️⃣ This function runs when button is clicked
    const fetchTemperature = () => {

        // If user did not enter city, stop
        if (!city) return;

        // STEP 1: Get latitude & longitude using city name
        axios.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            {
                params: {
                    name: city,
                    count: 1
                }
            }
        )
        .then(res => {

            // Take latitude and longitude from API
            const { latitude, longitude } = res.data.results[0];

            // STEP 2: Get temperature using lat & lon
            return axios.get(
                "https://api.open-meteo.com/v1/forecast",
                {
                    params: {
                        latitude: latitude,
                        longitude: longitude,
                        current_weather: true
                    }
                }
            );
        })
        .then(res => {

            // Save temperature in state
            setTemp(res.data.current_weather.temperature);
        })
        .catch(err => {
            console.log("Error fetching data", err);
        });
    };

    return (
        <div>

            {/* Navigation links */}
            <div className="head">
                <Link to="/">Main Page</Link> |{" "}
                <Link to="/temperature">Weather Page</Link>
                <h3>Weather App using Axios</h3>
            </div>

            <br />

            {/* Input box for city */}
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            {/* Button to fetch temperature */}
            <button onClick={fetchTemperature}>
                Get Temperature
            </button>

            <br /><br />

            {/* Display temperature */}
            <h1>Temperature is {temp} °C</h1>

        </div>
    );
};

export default Temperature;
