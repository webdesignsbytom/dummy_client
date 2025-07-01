import React from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import {
  bookingPageAdditionalMeta,
  bookingPageStructuredData,
} from '../../utils/data/MetaData';
// Components
import BookingPageMainContainer from '../../components/booking/BookingPageMainContainer';
import { HelmetItem } from '../../components/utils/HelmetItem';
import Navbar from '../../components/nav/Navbar';

function BookingPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Booking'
        desc={`Book a consultation or service with ${CompanyName}. Secure your spot today for professional web and circuit design solutions tailored to your needs.`}
        keywords={`booking, schedule, consultation, web design, circuit design, ${CompanyName}, services, UK`}
        additionalMeta={bookingPageAdditionalMeta}
        structuredData={bookingPageStructuredData}
      />

      <div className='grid min-h-screen bg-colour1 overflow-hidden font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />
          <header className='grid w-full'>
            <div className='grid w-full px-8 text-center lg:container lg:mx-auto py-6'>
              <h1 className='text-xl font-semibold'>Book Now</h1>
            </div>
          </header>
        </div>

        {/* Main */}
        <BookingPageMainContainer />
      </div>
    </>
  );
}

export default BookingPage;
