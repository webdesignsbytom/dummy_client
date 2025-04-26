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
        PageName='Customer Reviews'
        desc={`Read reviews from our satisfied customers about ${CompanyName}'s expert web and circuit design services. Discover how we’ve helped businesses with innovative solutions, support, and more.`}
        keywords={`reviews, customer feedback, web design, circuit design, ${CompanyName}, testimonials, UK, client experiences, expert services`}
        additionalMeta={reviewsPageAdditionalMeta}
        structuredData={reviewsPageStructuredData}
      />

      {/* Page */}
      <div className='grid min-h-screen bg-colour1 dark:bg-colour2 text-colour1 dark:text-colour2 font-poppins'>
        <div className='grid h-fit'>
          {/* Navigation */}
          <Navbar />
          
          {/* Header */}
          <header className='grid px-6 text-center'>
            <h1 className='text-xl md:text-2xl lg:text-3xl font-titleFont font-bold text-colour7'>
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
