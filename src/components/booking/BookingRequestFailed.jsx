import React from 'react';

function BookingRequestFailed() {
  return (
    <section
      className='grid justify-center items-center'
      aria-labelledby='booking-request-failed-heading'
      role='alert'
    >
      <div className='bg-colour1 shadow-xl rounded-2xl p-6 max-w-sm text-center'>
        <h1
          id='booking-request-failed-heading'
          className='text-2xl font-semibold text-red-600 mb-4'
        >
          Request Failed
        </h1>
        <p className='text-colour8 mb-6'>
          Unfortunately, your booking request couldn’t be sent. Please check your connection or try again in a moment.
        </p>
        <div className='flex justify-center'>
          <span
            className='inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full'
            aria-label='Retry booking request'
          >
            Please Try Again
          </span>
        </div>
      </div>
    </section>
  );
}

export default BookingRequestFailed;
