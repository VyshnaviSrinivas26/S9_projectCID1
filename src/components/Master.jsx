import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../components/styles.css";

function Master() {
  const [city, setCity] = useState("");

  // Load saved city on refresh
  useEffect(() => {
    const savedCity = localStorage.getItem("city");
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
    localStorage.setItem("city", e.target.value);
  };

  return (
    <>
      <div className="head">
        <Link to="/">Main</Link>
        <Link to="/temperature">Weather Page</Link>
      </div>

      <div className="page">
        <h3>Welcome to API access via Axios!!!!</h3>

        <input
          type="text"
          placeholder="Enter city name (eg: Guntur, Delhi)"
          value={city}
          onChange={handleChange}
          style={{
            width: "300px",
            padding: "10px",
            fontSize: "18px",
            marginTop: "20px"
          }}
        />
      </div>
    </>
  );
}

export default Master;