import React, { lazy, Suspense } from 'react';
// Analytics
import { usePageTracking } from '../../hooks/useAnalytics';
// Components
import Navbar from '../../components/nav/Navbar';
import SocialMediaAuth from '../../components/socialMedia/SocialMediaAuth';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';

// Lazy-loaded ChatBotComponent
const ChatBotComponent = lazy(() =>
  import('../../components/chat/ChatBotComponent')
);

const HomePage = React.memo(() => {
  usePageTracking(); // Tracks page views

  const handleLoginWith = (service) => {
    switch (service) {
      case 'facebook':
        // Call Facebook login API
        console.log('Logging in with Facebook');
        break;
      case 'instagram':
        // Call Instagram login API
        console.log('Logging in with Instagram');
        break;
      case 'google':
        // Call Google login API
        console.log('Logging in with Google');
        break;
      case 'github':
        // Call GitHub login API
        console.log('Logging in with GitHub');
        break;
      case 'apple':
        // Call Apple login API
        console.log('Logging in with Apple');
        break;
      case 'x':
        // Call X login API
        console.log('Logging in with X');
        break;
      default:
        console.log('Unsupported service');
    }
  };

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
            <div>home</div>
            <SocialMediaAuth func={handleLoginWith} text={'Login with'} />
          </main>
        </div>
      </div>
    </>
  );
});

export default HomePage;
