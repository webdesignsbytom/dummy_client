import React from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import {
  newsletterPageStructuredData,
  newsletterPageAdditionalMeta,
} from '../../utils/data/MetaData';
// Components
import NewsletterSignUpPageMainContainer from '../../components/newsletter/NewsletterSignUpPageMainContainer';
import { HelmetItem } from '../../components/utils/HelmetItem';
import Navbar from '../../components/nav/Navbar';

function NewsletterSignUpPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Newsletter Sign-Up'
        desc={`Stay updated with the latest from ${CompanyName}. Subscribe to our newsletter for news, updates, and special offers on web and circuit design services.`}
        keywords={`newsletter, subscribe, updates, web design news, circuit design news, ${CompanyName}, email sign-up`}
        additionalMeta={newsletterPageAdditionalMeta}
        structuredData={newsletterPageStructuredData}
      />

      <div className='grid min-h-screen bg-colour1 overflow-hidden font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />
          <header className='grid w-full'>
            <div className='grid w-full px-8 text-center lg:container lg:mx-auto py-6'>
              <h1 className='text-xl font-semibold'>Newsletter Sign Up</h1>
            </div>
          </header>
        </div>

        {/* Main */}
        <NewsletterSignUpPageMainContainer />
      </div>
    </>
  );
}

export default NewsletterSignUpPage;
