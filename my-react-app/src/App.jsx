// src/App.jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const weatherData = await fetchWeatherData(latitude, longitude);
        setTemperature(weatherData.main.temp);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = '56dfd1e5fd2a5df8c13aa20cdd4d7bd4'; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    console.log('API URL:', apiUrl); // Log the API URL
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Weather data:', data); // Log the response data
    return data;
  };

  return (
    <div>
      {temperature && <h1>Temperature: {temperature}°C</h1>}
    </div>
  );
};

export default App;
