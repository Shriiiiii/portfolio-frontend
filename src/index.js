import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// I'm importing my new ThemeProvider instead of creating the theme here.
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* I'm wrapping my entire App in the ThemeProvider.
      Now, any component inside App can access the theme and the toggle function.
    */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
