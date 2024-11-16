import React, { lazy, Suspense } from 'react';
// Analytics
import { usePageTracking } from '../../hooks/useAnalytics';
// Constants
import { CompanyName } from '../../utils/Constants';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import FooterComponent from '../../components/footer/FooterComponent';
import HomePageMainContainer from '../../components/home/HomePageMainContainer';

// Lazy-loaded ChatBotComponent
const ChatBotComponent = lazy(() =>
  import('../../components/chat/ChatBotComponent')
);

const HomePage = React.memo(() => {
  usePageTracking(); // Tracks page views

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName="Home"
        desc={`Welcome to ${CompanyName}, your destination for the best simulations, tools, and insights. Discover our extensive library and engage with our community.`}
        keywords="home, simulations, tools, community, gaming"
        additionalMeta={[
          { property: 'og:title', content: `Welcome to ${CompanyName}` },
          { property: 'og:description', content: 'Explore our simulations and tools for optimal gaming experiences.' },
          { property: 'og:image', content: 'https://localhost:9000/brand/logo.png' },
          { property: 'og:url', content: 'https://yourwebsite.com/' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Welcome to ${CompanyName}` },
          { name: 'twitter:description', content: 'Discover simulations and tools for optimal gaming experiences.' },
          { name: 'twitter:image', content: 'https://localhost:9000/brand/logo.png' },
        ]}
      />

      {/* Page */}
      <div className="grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins">
        <div className="grid grid-rows-reg">
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <HomePageMainContainer />

          {/* Footer */}
          <FooterComponent />
        </div>
      </div>
    </>
  );
});

export default HomePage;
