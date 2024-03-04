import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [dailyForecastData, setDailyForecastData] = useState(null);
  const [hourlyForecastData, setHourlyForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [moonPhase, setMoonPhase] = useState(null);
  const [moonIllumination, setMoonIllumination] = useState(null);
  const [constellations, setConstellations] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);


  const apiKey = '7cffbb1f87c4e20a62eca44d387c4cbf';
  //const visualCrossingApiKey = '4ULMW6H6YRQP9TVB9W88SB7Z7';



  const fetchWeatherData = async () => {
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      setWeatherData(weatherResponse.data);

      // Fetch daily forecast data using One Call API
      const oneCallResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherResponse.data.coord.lat}&lon=${weatherResponse.data.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`);
      setDailyForecastData(oneCallResponse.data.daily);

      // Fetch hourly forecast data for the current day
      const hourlyForecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
      setHourlyForecastData(hourlyForecastResponse.data.list);

      const today = new Date();
    const timestamps = Array.from({ length: 7 }, (_, day) =>
      Math.floor(today.getTime() / 1000) + day * 86400
    );

    // Fetch lunar phase data for the next 7 days
    const lunarPhasePromises = timestamps.map(timestamp =>
      axios.get(`https://api.farmsense.net/v1/moonphases/?d[]=${timestamp}`)
    );

    const lunarPhaseResponses = await Promise.all(lunarPhasePromises);
    const lunarPhases = lunarPhaseResponses.map(response => response.data[0]?.Phase);

    setMoonPhase(lunarPhases);

    {/*const issPositionResponse = await axios.get('http://api.open-notify.org/iss-now.json');
      const issLatitude = issPositionResponse.data.iss_position.latitude;
      const issLongitude = issPositionResponse.data.iss_position.longitude;
      const constellationsResponse = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/constellations?lat=${issLatitude}&lng=${issLongitude}&limit=5`);
      setConstellations(constellationsResponse.data.constellations);*/}

      setError(null);
    } catch (error) {
      setError('Error fetching weather data');
      setWeatherData(null);
      setDailyForecastData(null);
      setHourlyForecastData(null);
      setMoonPhase(null);
      //setConstellations([]);
    }
  };



  const kelvinToFahrenheit = (kelvin) => {
    return Math.round(((kelvin - 273.15) * 9/5) + 32);
  };

  const calculateHoursUntilDusk = (sunsetTimestamp) => {
    const now = new Date();
    const sunsetTime = new Date(sunsetTimestamp * 1000);
    const hoursUntilDusk = Math.floor((sunsetTime - now) / (1000 * 60 * 60));
    return hoursUntilDusk;
  };

  const handleCityChange = (e) => {
    const inputCity = e.target.value;
    setCity(inputCity);
    // Fetch city suggestions
    fetchCitySuggestions(inputCity);
  };



  const fetchCitySuggestions = async (inputCity) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${inputCity}&appid=${apiKey}`);
      const suggestions = response.data.list.map(city => ({
        name: city.name,
        state: city.state,
        country: city.sys.country,
      }));
      setCitySuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setCitySuggestions([]);
    }
  };

  const fetchMoonIllumination = async (timestamp) => {
    try {
      const moonIlluminationResponse = await axios.get(
        `https://api.farmsense.net/v1/moonphases/?d[]=${timestamp}`
      );
      return moonIlluminationResponse.data[0]?.Illumination;
    } catch (error) {
      console.error('Error fetching moon illumination data:', error);
      return null;
    }
  };





  useEffect(() => {
    if (city === '') {
      setCitySuggestions([]);
    }
  }, [city]);




  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
      />
      {citySuggestions.length > 0 && (
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {citySuggestions.map((suggestion, index) => (
            <option key={index} value={suggestion.name}>{`${suggestion.name}, ${suggestion.state}, ${suggestion.country}`}</option>
          ))}
        </select>
      )}
      <button onClick={fetchWeatherData}>Get Weather</button>

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {kelvinToFahrenheit(weatherData.main.temp)} °F</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Conditions: {weatherData.weather[0]?.description}</p>
          {/* Add more information as needed */}
        </div>
      )}

      {dailyForecastData && (
        <div>
          <h2>Daily Forecast (Next 7 Days)</h2>
          {dailyForecastData.map((forecast, index) => (
            <div key={index}>
              <p>Date: {new Date(forecast.dt * 1000).toLocaleDateString()}</p>
              <p>Temperature: {kelvinToFahrenheit(forecast.temp.day)} °F</p>
              {index === 0 && ( // Display "Hours Until Dusk" only for the current day
                <>
                  <p>Sunrise: {new Date(forecast.sunrise * 1000).toLocaleTimeString()}</p>
                  <p>Sunset: {new Date(forecast.sunset * 1000).toLocaleTimeString()}</p>
                  <p>Hours Until Dusk: {calculateHoursUntilDusk(forecast.sunset)}</p>
                </>
              )}
              {/* Add more daily forecast information as needed */}
            </div>
          ))}
        </div>
      )}

      {hourlyForecastData && (
        <div>
          <h2>Hourly Forecast (Current Day)</h2>
          {hourlyForecastData.map((forecast, index) => (
            <div key={index}>
              <p>Time: {new Date(forecast.dt * 1000).toLocaleTimeString()}</p>
              <p>Temperature: {kelvinToFahrenheit(forecast.main.temp)} °F</p>
              <p>Conditions: {forecast.weather[0]?.description}</p>
              {typeof moonIllumination !== 'undefined' ? (
                  <p>Moon Illumination: {moonIllumination * 100}%</p>
                ) : (
                  <p>Moon Illumination: N/A</p>
                )}
              {/* Add more hourly forecast information as needed */}
            </div>
          ))}

        </div>
      )}
      {moonPhase && (
      <div>
        <h2>Lunar Phases (Next 7 Days)</h2>
        {moonPhase.map((phase, index) => (
          <div key={index}>
            <p>Day {index + 1}: {phase}</p>
          </div>
        ))}
      </div>
    )}

    {/*{constellations && constellations.length > 0 && (
        <div>
          <h2>Constellations in the Sky</h2>
          <ul>
            {constellations.map((constellation, index) => (
              <li key={index}>{constellation}</li>
            ))}
          </ul>
        </div>
      )}*/}




    </div>

  );
};

export default Weather;
