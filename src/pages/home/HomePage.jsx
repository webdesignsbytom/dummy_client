import React, { lazy, Suspense } from 'react';
// Analytics
import { usePageTracking } from '../../hooks/useAnalytics';
// Constants
import { CompanyName } from '../../utils/Constants';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import FooterComponent from '../../components/footer/FooterComponent';
import SocialMediaCTA from '../../components/socialMedia/SocialMediaCTA';
import SearchBarComponent from '../../components/search/SearchBarComponent';

// Lazy-loaded ChatBotComponent
const ChatBotComponent = lazy(() =>
  import('../../components/chat/ChatBotComponent')
);

const HomePage = React.memo(() => {
  usePageTracking(); // Tracks page views

  return (
    <>
      {/* Tab Data */}
      <HelmetItem PageName={'Home'} desc={`Home page of ${CompanyName}.`} />

      {/* Lazy-loaded ChatBot */}
      {/* <Suspense>
        <ChatBotComponent />
      </Suspense> */}

      {/* Page */}
      <div className='grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main role='main'>
            <div>
              <div>home</div>
              <div>
                <SearchBarComponent />
              </div>
            </div>

            {/* Footer */}
            <FooterComponent />
          </main>
        </div>
      </div>
    </>
  );
});

export default HomePage;
