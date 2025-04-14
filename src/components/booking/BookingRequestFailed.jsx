import React from 'react';

function BookingRequestFailed() {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Request Failed</h2>
        <p className="text-gray-600 mb-6">
          Unfortunately, your booking request couldn’t be sent. Please check your connection or try again in a moment.
        </p>
        <div className="flex justify-center">
          <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
            Please Try Again
          </span>
        </div>
      </div>
    </section>
  );
}

export default BookingRequestFailed;
