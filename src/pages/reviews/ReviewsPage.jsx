import React from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import {
  reviewsPageAdditionalMeta,
  reviewsPageStructuredData,
} from '../../utils/data/MetaData';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import ReviewsPageMainContainer from '../../components/reviews/ReviewsPageMainContainer';

function ReviewsPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Reviews'
        desc={`Get in touch with ${CompanyName} for expert web and circuit design services. We're here to help with your inquiries, quotes, or support needs.`}
        keywords={`contact, web design, circuit design, ${CompanyName}, customer support, inquiries, quotes, UK`}
        additionalMeta={reviewsPageAdditionalMeta}
        structuredData={reviewsPageStructuredData}
      />

      {/* Page */}
      <div className='grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />
          {/* Header */}
          <header className='grid px-6 text-center lg:px-10'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Contact Us
            </h1>
          </header>
        </div>

        {/* Main page content */}
        <ReviewsPageMainContainer />
      </div>
    </>
  );
}

export default ReviewsPage;
