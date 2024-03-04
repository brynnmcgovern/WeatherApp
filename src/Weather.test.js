// Weather.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Weather from './Weather';

// Mocking axios for unit tests
jest.mock('axios');

// Mock data for axios responses
const mockWeatherData = {
  data: {
    name: 'MockCity',
    main: { temp: 300, humidity: 50 },
    weather: [{ description: 'Clear' }],
  },
};

const mockDailyForecastData = {
  data: {
    daily: [
      {
        dt: 1677835200, // Replace with an actual timestamp
        temp: { day: 302 },
        sunrise: 1677800400, // Replace with an actual timestamp
        sunset: 1677843600, // Replace with an actual timestamp
      },
    ],
  },
};

const mockHourlyForecastData = {
  data: {
    list: [
      {
        dt: 1677838800, // Replace with an actual timestamp
        main: { temp: 301 },
        weather: [{ description: 'Clear' }],
      },
    ],
  },
};

const mockMoonPhaseData = [
  { Phase: 'New Moon' },
  // Add more moon phase data for the next 6 days
];

const mockMoonIlluminationData = [
  { Illumination: 0.25 },
  // Add more moon illumination data for the next 6 days
];

describe('Weather App', () => {
  beforeEach(() => {
    // Mocking axios responses
    axios.get.mockImplementation((url) => {
      if (url.includes('weather')) return Promise.resolve(mockWeatherData);
      if (url.includes('onecall')) return Promise.resolve(mockDailyForecastData);
      if (url.includes('forecast')) return Promise.resolve(mockHourlyForecastData);
      if (url.includes('moonphases')) {
        return Promise.resolve({ data: mockMoonPhaseData });
      }
      return Promise.reject(new Error('Unhandled URL in axios mock: ' + url));
    });
  });

  test('renders Weather component', async () => {
    render(<Weather />);

    // Mock user input and fetch data
    fireEvent.change(screen.getByPlaceholderText('Enter city name'), { target: { value: 'MockCity' } });
    fireEvent.click(screen.getByText('Get Weather'));

    // Wait for the data to be fetched and displayed
    await waitFor(() => {
      expect(screen.findByText('MockCity')).not.toBe(null);
      expect(screen.findByText('Temperature: 300°F')).not.toBe(null); // Replace with actual expected temperature
      // Add more assertions based on your UI
    });
  });

  test('renders daily forecast data correctly', async () => {
  render(<Weather />);

  // Mock user input and fetch data
  fireEvent.change(screen.getByPlaceholderText('Enter city name'), { target: { value: 'MockCity' } });
  fireEvent.click(screen.getByText('Get Weather'));

  // Wait for the data to be fetched and displayed
  await waitFor(() => {
    expect(screen.findByText('Daily Forecast (Next 7 Days)')).not.toBe(null);
    expect(screen.findByText('Date:')).not.toBe(null);
    expect(screen.findByText('Temperature: 302°F')).not.toBe(null); // Replace with actual expected temperature
    // Add more assertions based on your UI
  });
});

test('renders hourly forecast data correctly', async () => {
  render(<Weather />);

  // Mock user input and fetch data
  fireEvent.change(screen.getByPlaceholderText('Enter city name'), { target: { value: 'MockCity' } });
  fireEvent.click(screen.getByText('Get Weather'));

  // Wait for the data to be fetched and displayed
  await waitFor(() => {
    expect(screen.findByText('Hourly Forecast (Current Day)')).not.toBe(null);
    expect(screen.findByText('Time:')).not.toBe(null);
    expect(screen.findByText('Temperature: 301°F')).not.toBe(null); // Replace with actual expected temperature
    // Add more assertions based on your UI
  });
});

test('renders lunar phase data correctly', async () => {
  render(<Weather />);

  // Mock user input and fetch data
  fireEvent.change(screen.getByPlaceholderText('Enter city name'), { target: { value: 'MockCity' } });
  fireEvent.click(screen.getByText('Get Weather'));

  // Wait for the data to be fetched and displayed
  await waitFor(() => {
    expect(screen.findByText('Lunar Phases (Next 7 Days)')).not.toBe(null);
    expect(screen.findByText('Day 1: New Moon')).not.toBe(null);
    // Add more assertions based on your UI
  });
});

test('renders moon illumination data correctly', async () => {
  render(<Weather />);

  // Mock user input and fetch data
  fireEvent.change(screen.getByPlaceholderText('Enter city name'), { target: { value: 'MockCity' } });
  fireEvent.click(screen.getByText('Get Weather'));

  // Wait for the data to be fetched and displayed
  await waitFor(() => {
    expect(screen.findByText('Moon Illumination: 25%')).not.toBe(null); // Replace with actual expected moon illumination
    // Add more assertions based on your UI
  });
});

  // Add more tests for different components and functionalities
});
