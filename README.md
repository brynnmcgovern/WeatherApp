# Weather App
## Overview
This Weather App is a web application that allows users to get current weather information, daily forecasts, hourly forecasts, lunar phases, and moon illumination for a selected city. 

## Technologies Used
React.js

Axios (for API requests)

OpenWeatherMap API

Farmsense API (for lunar phase and moon illumination data)



## Getting Started

### Prerequisites

Node.js and npm installed on your machine.

### Installation

Clone the repository:


git clone <repository_url>

Navigate to the project directory:


cd weather-app

Install dependencies:


npm install

Running the App

Start the development server:

npm start

Open your browser and go to http://localhost:3000.

## Usage

Enter the city name in the input field.

Select the desired city from the suggestions.

Click the "Get Weather" button to fetch and display weather information.

## Testing

This section provides instructions on running tests for the Weather App. The testing suite is set up using Jest and React Testing Library.

### Prerequisites

Before running the tests, ensure that you have the following installed:

Node.js and npm

Installation

Clone the repository:

git clone <repository_url>

Navigate to the project directory:

cd weather-app

Install dependencies:

npm install

Running Tests

To execute the test suite, run the following command in the project directory:

npm test

This will trigger Jest to run the tests and display the results in the terminal.

### Test Overview

The testing suite includes the following test cases:

renders Weather component: Tests the rendering of the main Weather component and data fetching.

renders daily forecast data correctly: Verifies the correct rendering of daily forecast data.

renders hourly forecast data correctly: Ensures the correct rendering of hourly forecast data for the current day.

renders lunar phase data correctly: Checks if lunar phase data is rendered correctly for the next 7 days.

renders moon illumination data correctly: Validates the accurate rendering of moon illumination data.

Add more tests: Feel free to add more tests for different components and functionalities as needed.

### Test Customization

You can customize the test data and assertions in the Weather.test.js file to match your specific requirements. Update the mock data and assertions based on your expected UI and behavior.

## Additional Information

If you encounter any issues or failures during testing, ensure that the mock data and assertions are correctly configured and that the API URLs in the mock implementation match the URLs used in the actual application.

For more details on Jest and React Testing Library, refer to their respective documentation:

Jest Documentation

React Testing Library Documentation

