import React from 'react';
// Utils
import { formatDateHandler } from '../../utils/functions/BookingFunctions';

function BookingRequestUnavailable({ time, date }) {
  return (
    <section className='flex justify-center items-center'>
      <div className='bg-colour1 shadow-xl rounded-2xl p-6 max-w-sm text-center'>
        <h2 className='text-2xl font-semibold text-red-600 mb-4'>
          Booking Unavailable
        </h2>
        <p className='text-gray-600 mb-6'>
          The Time Slot {time} on {formatDateHandler(date)} is not available
        </p>
        <div className='flex justify-center'>
          <span className='inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full'>
            Please Try Another Time/Date
          </span>
        </div>
      </div>
    </section>
  );
}

export default BookingRequestUnavailable;
