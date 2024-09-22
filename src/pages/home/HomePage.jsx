import React, { lazy, Suspense } from 'react';
// Analytics
import { usePageTracking } from '../../hooks/useAnalytics';
// Constants
import { CompanyName } from '../../utils/Constants';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import FooterComponent from '../../components/footer/FooterComponent';
import SearchBarComponent from '../../components/search/SearchBarComponent';
import SocialMediaCTA from '../../components/socialMedia/SocialMediaCTA';
// Icons
import { IoSunny, IoMoon } from 'react-icons/io5';
// Lazy-loaded ChatBotComponent
const ChatBotComponent = lazy(() =>
  import('../../components/chat/ChatBotComponent')
);

const HomePage = React.memo(() => {
  usePageTracking(); // Tracks page views

  const [dark, setDark] = React.useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle('dark');
  };

  return (
    <>
      {/* Tab Data */}
      <HelmetItem PageName={'Home'} desc={`Home page of ${CompanyName}.`} />

      {/* Page */}
      <div className='grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background dark:bg-blue-900 font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main role='main'>
            <div>
              <div>home</div>
              <div>
                <button onClick={() => darkModeHandler()}>
                  {
                    dark && <IoSunny /> // render sunny when dark is true
                  }
                  {
                    !dark && <IoMoon /> // render moon when dark is false
                  }
                </button>
                <SearchBarComponent />
                <SocialMediaCTA />
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
