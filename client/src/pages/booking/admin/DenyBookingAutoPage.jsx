import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Api
import client from '../../../api/client';
// Constants
import { DENY_BOOKING_API } from '../../../utils/ApiRoutes';
// Components
import { HelmetItem } from '../../../components/utils/HelmetItem';
import Navbar from '../../../components/nav/Navbar';

function DenyBookingAutoPage() {
  const { bookingId, uniqueString } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Handle the denial of booking on mount
  useEffect(() => {
    const denyBookingHandler = async () => {
      setIsSubmitting(true);
      setErrorMessage(null); // Reset any previous error message

      if (!uniqueString) {
        return
      }

      client
        .patch(`${DENY_BOOKING_API}/${bookingId}`, { uniqueString }, false)
        .then((res) => {
          console.log(res.data.message);
          setBookingStatus('denied');
          setIsSubmitting(false);
        })
        .catch((err) => {
          console.error('Unable to deny booking data', err);
          setBookingStatus('failed');
          setErrorMessage('Booking denial failed. Please try again later.');
          setIsSubmitting(false);
        });
    };

    denyBookingHandler();
  }, [bookingId]);

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Deny Booking'
        desc='Deny your booking with Mistress Victoria.'
        keywords='booking, denial, kink, BDSM'
        additionalMeta={[]}
        structuredData={[]}
      />

      <div className='grid min-h-screen bg-colour1 overflow-hidden font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />
          <header className='grid w-full'>
            <div className='grid w-full px-8 text-center lg:container lg:mx-auto py-6'>
              <h1 className='text-xl font-semibold'>Deny Your Booking</h1>
            </div>
          </header>
        </div>

        {/* Main */}
        <div className='px-8 text-center py-6'>
          {isSubmitting ? (
            <div className='text-lg font-medium text-gray-500'>
              Denying your booking...
            </div>
          ) : bookingStatus === 'denied' ? (
            <div className='text-lg font-medium text-green-500'>
              Your booking has been successfully denied. If you need assistance,
              feel free to reach out.
            </div>
          ) : bookingStatus === 'failed' ? (
            <div className='text-lg font-medium text-green-500'>
              {errorMessage ||
                'There was an issue denying your booking. Please try again.'}
            </div>
          ) : (
            <div className='text-lg font-medium text-gray-500'>
              Waiting to deny your booking...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DenyBookingAutoPage;
