import React, { useState } from 'react';
import * as Sentry from '@sentry/react';  // Import Sentry
// Analytics
import { usePageTracking } from '../../hooks/useAnalytics';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';

function HomePage() {
  usePageTracking(); // Tracks page views

  const [hasError, setHasError] = useState(false);

  const triggerError = () => {
    try {
      throw new Error('Manually triggered error on HomePage');
    } catch (error) {
      setHasError(true);
      
      // Manually capture the error using Sentry
      Sentry.captureException(error);
    }
  };

  return (
    <>
      {/* Tab Data */}
      <HelmetItem PageName={'Home'} desc={`Home page of ${CompanyName}.`} />

      {/* Page */}
      <div className='grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main role='main'>
            <p>HomePage</p>
            {/* Button to trigger an error */}
            <button onClick={triggerError} className="btn btn-danger">
              Trigger Error
            </button>
            {hasError && <p style={{ color: 'red' }}>An error has been triggered!</p>}
          <button onClick={() => methodDoesNotExist()}>Break the world</button>;

          </main>
        </div>
      </div>
    </>
  );
}

export default HomePage;
