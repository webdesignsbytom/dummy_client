import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Api
import client from '../../../api/client';
// Constants
import { CONFIRM_BOOKING_API } from '../../../utils/ApiRoutes';
// Components
import { HelmetItem } from '../../../components/utils/HelmetItem';
import Navbar from '../../../components/nav/Navbar';

function ConfirmBookingAutoPage() {
  const { bookingId } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Simulating booking confirmation through a useEffect hook (ideally you'd get the bookingId from URL params)
  useEffect(() => {
    const confirmBookingHandler = async () => {
      setIsSubmitting(true);
      setErrorMessage(null); // Reset any previous error message

      client
        .patch(`${CONFIRM_BOOKING_API}/${bookingId}`, null, false)
        .then((res) => {
          console.log(res.data.message);
          setBookingStatus('complete');
          setIsSubmitting(false);
        })
        .catch((err) => {
          console.error('Unable to retrieve booking data', err);
          setBookingStatus('failed');
          setErrorMessage(
            'Booking confirmation failed. Please try again later.'
          );
          setIsSubmitting(false);
        });
    };

    confirmBookingHandler();
  }, []);

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Confirm Booking'
        desc={`Confirm your booking with Mistress Victoria.`}
        keywords={`booking, confirmation, kink, BDSM`}
        additionalMeta={[]}
        structuredData={[]}
      />

      <div className='grid min-h-screen bg-colour1 overflow-hidden font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />
          <header className='grid w-full'>
            <div className='grid w-full px-8 text-center lg:container lg:mx-auto py-6'>
              <h1 className='text-xl font-semibold'>Confirm Your Booking</h1>
            </div>
          </header>
        </div>

        {/* Main */}
        <div className='px-8 text-center py-6'>
          {isSubmitting ? (
            <div className='text-lg font-medium text-gray-500'>
              Confirming your booking...
            </div>
          ) : bookingStatus === 'complete' ? (
            <div className='text-lg font-medium text-green-500'>
              Your booking has been successfully confirmed! We look forward to
              seeing you.
            </div>
          ) : bookingStatus === 'failed' ? (
            <div className='text-lg font-medium text-red-500'>
              {errorMessage ||
                'There was an issue confirming your booking. Please try again.'}
            </div>
          ) : (
            <div className='text-lg font-medium text-gray-500'>
              Waiting to confirm your booking...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ConfirmBookingAutoPage;
