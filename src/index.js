import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';
import * as Sentry from "@sentry/react"; // Import Sentry
// App
import App from './App';
// Context
import UserProvider from './context/UserContext';
// Styles
import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';
// Sentry
import { SentryHelper } from './utils/SentryHelper';

// Initialize Google Analytics with your tracking ID
ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID);

// Initialize Sentry
SentryHelper()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
