import React from 'react';
// Analytics
import { usePageTracking } from '../../hooks/useAnalytics';
// Data
import { homePageAdditionalMeta, homePageStructuredData } from '../../utils/data/MetaData';
// Components
import Navbar from '../../components/nav/Navbar';
import FooterComponent from '../../components/footer/FooterComponent';
import HomePageMainContainer from '../../components/home/HomePageMainContainer';
import { HelmetItem } from '../../components/utils/HelmetItem';
import { CompanyName } from '../../utils/Constants';
import HomePageHeader from '../../components/home/HomePageHeader';


const HomePage = React.memo(() => {
  usePageTracking();

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Home'
        desc={`Get in touch with ${CompanyName} for expert web and circuit design services. We're here to help with your inquiries, quotes, or support needs.`}
        keywords={`contact, web design, circuit design, ${CompanyName}, customer support, inquiries, quotes, UK`}
        additionalMeta={homePageAdditionalMeta}
        structuredData={homePageStructuredData}
      />

      {/* Page */}
      <div className='grid min-h-screen overflow-hidden bg-colour1 text-colour2 dark:bg-colour2 dark:text-colour1 font-poppins'>
        <div className='grid'>
          {/* Navigation */}
          <Navbar />
          <HomePageHeader />

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
