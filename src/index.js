// I'm importing the essential libraries to get my React app running.
import React from 'react';
import ReactDOM from 'react-dom/client';

// I'm importing my main App component and the global CSS file.
import App from './App';
import './index.css';

// Here, I'm bringing in the tools from Material-UI to create and provide a theme.
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// I'm creating my custom theme here. This lets me define colors, fonts, etc.,
// in one place, and all my components will use them automatically.
const theme = createTheme({
  palette: {
    background: {
      default: '#f4f6f8' // This sets the light grey background color for the whole app.
    },
    primary: {
      main: '#1976d2', // This is my main brand color (a nice blue).
    },
    secondary: {
      main: '#dc004e', // This is my secondary color for accents.
    },
  },
  typography: {
    // I'm setting a standard, clean font stack for the entire application.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

// This is the standard way to start a React 18 app.
// I'm telling React to find the HTML element with the id 'root' and render my app there.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* I'm wrapping my entire App in these two components from Material-UI:
      1. ThemeProvider: This passes my custom `theme` down to every component.
         Now any component can access my theme's colors and fonts.
      2. CssBaseline: This is a handy component that resets default browser
         styles (like margins and paddings) so my app looks consistent
         across all browsers.
    */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
