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
      <div>
        <BookingPageMainContainer />
      </div>
    </>
  );
}

export default BookingPage;
