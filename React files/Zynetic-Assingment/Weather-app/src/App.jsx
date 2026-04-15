import { useState, useCallback, useEffect } from "react";
import Historyloader from "./Historyloader";
import styles from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "light") {
      document.body.style.backgroundColor = "#f7f7f7";
      // document.body.style.color = "#000000";
    } else {
      document.body.style.backgroundColor = "#2e2e2e";
      // document.body.style.color = "#ffffff";
    }
  }, [theme]);

  const ThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.length === 0) {
      toast.error("Enter City Name");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=844ba84cf75cc656b143abb44dc789c0&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found.");
      }

      const fetchData = await response.json();
      setWeatherData(fetchData);
      setHistory([fetchData, ...history].slice(0, 5));
    } catch (err) {
      setError(err.message);
      toast.error("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderHistory = useCallback(() => {
    return <Historyloader history={history} />;
  }, [history]);

  return (
    <>
      <Header theme={theme} ThemeChange={ThemeChange} />
      {/* <button onClick={ThemeChange} className={theme==="light"?styles.light:styles.dark}>Switch to {theme==="light"?"dark":"light"}</button> */}
      <div className={`${styles.container}`}>

        <h1>Search city</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="city">Enter City Name:</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City here"
            style={{ marginLeft: "10px", color: "black" }}
          />
          <button type="submit" style={{ marginLeft: "10px" }}>
            Search
          </button>
        </form>
        <div className={styles.loader}>{loading && <p>Loading...</p>}</div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {weatherData && (
          <div className={styles.card}>
            <center>
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
            </center>
          </div>
        )}
      </div>
      <div className={styles.history}>{renderHistory()}</div>
      <ToastContainer />
    </>
  );
}

export default App;
