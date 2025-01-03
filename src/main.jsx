import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './ThemeContext';
import { StyledEngineProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <ThemeProvider>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </ThemeProvider>
    </React.StrictMode>,
);
