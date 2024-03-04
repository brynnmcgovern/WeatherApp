
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Weather from './Weather';
import Horoscope from './Horoscope';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Weather />} />
        <Route exact path="/horoscope" element={<Horoscope />} />
      </Routes>
    </Router>
  );
}

export default App;
