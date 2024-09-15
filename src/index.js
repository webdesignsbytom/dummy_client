import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Analytics
import ReactGA from 'react-ga4';
// App
import App from './App';
// Context
import UserProvider from './context/UserContext';
// Styles
import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';

// Initialize Google Analytics with your tracking ID
ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID);

// Lazy load Sentry inside the main component
function Main() {
  useEffect(() => {
    const loadSentry = async () => {
      const Sentry = await import('@sentry/react');
      Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration(),
        ],
        // Tracing
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [
          'localhost',
          /^https:\/\/yourserver\.io\/api/,
        ],
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
      });
    };

    // Conditionally load Sentry in production or specific environments
    if (process.env.NODE_ENV === 'production') {
      loadSentry();
    }
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
