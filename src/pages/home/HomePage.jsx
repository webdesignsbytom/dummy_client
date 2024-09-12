import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import ChatBotComponent from '../../components/chat/ChatBotComponent';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
// Analytics
import { usePageTracking } from '../../hooks/useAnalytics';

function HomePage() {
  usePageTracking(); // Tracks page views

  return (
    <>
      {/* Tab Data */}
      <HelmetItem PageName={'Home'} desc={`Home page of ${CompanyName}.`} />

      <ChatBotComponent />
      {/* Page */}
      <div className='grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main role='main'>HomePage</main>
        </div>
      </div>
    </>
  );
}

export default HomePage;
