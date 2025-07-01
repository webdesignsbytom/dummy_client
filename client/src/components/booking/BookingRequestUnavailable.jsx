import React from 'react';
// Utils
import { formatDateHandler } from '../../utils/functions/BookingFunctions';

function BookingRequestUnavailable({ time, date }) {
  return (
    <section
      className='grid justify-center items-center'
      aria-labelledby='booking-unavailable-heading'
      role='alert'
    >
      <div className='bg-colour1 shadow-xl rounded-2xl p-6 max-w-sm text-center'>
        <h1
          id='booking-unavailable-heading'
          className='text-2xl font-semibold text-red-600 mb-4'
        >
          Booking Unavailable
        </h1>
        <p className='text-gray-600 mb-6'>
          The time slot <strong>{time}</strong> on{' '}
          <time dateTime={date}>{formatDateHandler(date)}</time> is not available.
        </p>
        <div className='flex justify-center'>
          <span
            className='inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full'
            aria-label='Try another booking time or date'
          >
            Please Try Another Time/Date
          </span>
        </div>
      </div>
    </section>
  );
}

export default BookingRequestUnavailable;
