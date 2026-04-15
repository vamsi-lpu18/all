
import { useState, useCallback } from "react";
import Historyloader from "./Historyloader";
import styles from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWeatherData(null); // Reset previous weather data
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=844ba84cf75cc656b143abb44dc789c0&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found. Please try again.");
      }

      const fetchData = await response.json();
      setWeatherData(fetchData);

      // Update history, keeping it to the latest 5 searches
      setHistory((prevHistory) => [fetchData, ...prevHistory.slice(0, 4)]);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderHistory = useCallback(() => {
    return <Historyloader history={history} />;
  }, [history]);

  return (
    <>
      <div className={styles.container}>
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="city">Enter City Name:</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City here"
            style={{ marginLeft: "10px" }}
          />
          <button type="submit" style={{ marginLeft: "10px" }}>
            Search
          </button>
        </form>

        <div className={styles.loader}>{loading && <p>Loading...</p>}</div>

        {weatherData && (
          <div className={styles.card}>
            <h2>{weatherData.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              style={{ width: "100px", height: "100px" }}
            />
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>

      <div className={styles.history}>{renderHistory()}</div>

      <ToastContainer />
    </>
  );
}

export default App;
