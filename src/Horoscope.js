// Horoscope.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Horoscope = () => {
  const [sign, setSign] = useState('aries');
  const [day, setDay] = useState('today');
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [error, setError] = useState(null);



  const fetchHoroscopeData = async () => {
    try {
      const response = await axios.post(`https://aztro.sameerkumar.website?sign=${sign}&day=${day}`, null, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setHoroscopeData(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching horoscope data');
      setHoroscopeData(null);
    }
  };

  useEffect(() => {
    fetchHoroscopeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sign, day]);

  return (
    <div>
      <h1>Horoscope App</h1>
      <div>
        <label>Select Sign: </label>
        <select value={sign} onChange={(e) => setSign(e.target.value)}>
          <option value="aries">Aries</option>
          <option value="taurus">Taurus</option>
          <option value="gemini">Gemini</option>
          <option value="cancer">Cancer</option>
          <option value="leo">Leo</option>
          <option value="virgo">Virgo</option>
          <option value="libra">Libra</option>
          <option value="scorpio">Scorpio</option>
          <option value="sagittarius">Sagittarius</option>
          <option value="capricorn">Capricorn</option>
          <option value="aquarius">Aquarius</option>
          <option value="pisces">Pisces</option>
          {/* Add other sign options */}
        </select>
      </div>
      <div>
        <label>Select Day: </label>
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          {/* You can add 'yesterday' if needed */}
        </select>
      </div>
      <button onClick={fetchHoroscopeData}>Get Horoscope</button>

      {error && <p>{error}</p>}

      {horoscopeData && (
        <div>
          <h2>{horoscopeData.current_date}</h2>
          <p>Compatibility: {horoscopeData.compatibility}</p>
          <p>Lucky Number: {horoscopeData.lucky_number}</p>
          <p>Lucky Time: {horoscopeData.lucky_time}</p>
          <p>Color: {horoscopeData.color}</p>
          <p>Date Range: {horoscopeData.date_range}</p>
          <p>Mood: {horoscopeData.mood}</p>
          <p>Description: {horoscopeData.description}</p>
        </div>
      )}
    </div>
  );
};

export default Horoscope;
