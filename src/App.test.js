import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App';

test('renders weather link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Weather App/);
  expect(linkElement).toBeInTheDocument();
});
