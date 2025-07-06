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
  const { bookingId, uniqueString } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const approveBookingHandler = async () => {
      setIsSubmitting(true);
      setErrorMessage(null);

      if (!uniqueString) {
        return;
      }

      client
        .patch(`${CONFIRM_BOOKING_API}/${bookingId}`, { uniqueString }, false)
        .then((res) => {
          console.log(res.data.message);
          setBookingStatus('complete');
          setIsSubmitting(false);
        })
        .catch((err) => {
          console.error('Unable to approve booking', err);
          setBookingStatus('failed');
          setErrorMessage(
            'Booking approval failed. Please try again later.'
          );
          setIsSubmitting(false);
        });
    };

    approveBookingHandler();
  }, []);

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Approve Booking'
        desc={`Approve a new booking request.`}
        keywords={`booking, admin, approval`}
        additionalMeta={[]}
        structuredData={[]}
      />

      <div className='grid min-h-screen bg-colour1 overflow-hidden font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />
          <header className='grid w-full'>
            <div className='grid w-full px-8 text-center lg:container lg:mx-auto py-6'>
              <h1 className='text-xl font-semibold'>Approve Booking Request</h1>
            </div>
          </header>
        </div>

        {/* Main */}
        <div className='px-8 text-center py-6'>
          {isSubmitting ? (
            <div className='text-lg font-medium text-gray-500'>
              Approving the booking...
            </div>
          ) : bookingStatus === 'complete' ? (
            <div className='text-lg font-medium text-green-500'>
              The booking has been successfully approved!
            </div>
          ) : bookingStatus === 'failed' ? (
            <div className='text-lg font-medium text-red-500'>
              {errorMessage ||
                'There was an issue approving the booking. Please try again.'}
            </div>
          ) : (
            <div className='text-lg font-medium text-gray-500'>
              Waiting to approve the booking...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ConfirmBookingAutoPage;
