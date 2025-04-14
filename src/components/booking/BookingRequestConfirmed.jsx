import React from 'react';

function BookingRequestReceivedCard() {
  return (
    <section
      className='grid justify-center items-center'
      aria-labelledby='booking-request-received-heading'
      role='status'
    >
      <div className='bg-colour1 shadow-xl rounded-2xl p-6 max-w-sm text-center'>
        <h1
          id='booking-request-received-heading'
          className='text-2xl font-semibold text-colour7 mb-4'
        >
          Booking Request Received
        </h1>
        <p className='text-colour8 mb-6'>
          Your booking request has been sent successfully. Please await confirmation from the owner — we’ll notify you as soon as it’s confirmed.
        </p>
        <div className='flex justify-center'>
          <span
            className='inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full'
            aria-label='Awaiting confirmation from the owner'
          >
            Awaiting Confirmation
          </span>
        </div>
      </div>
    </section>
  );
}

export default BookingRequestReceivedCard;
