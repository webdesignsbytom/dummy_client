import React from 'react';

function BookingRequestReceivedCard() {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking Request Received</h2>
        <p className="text-gray-600 mb-6">
          Your booking request has been sent successfully. Please await confirmation from the owner — we’ll notify you as soon as it’s confirmed.
        </p>
        <div className="flex justify-center">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
            Awaiting Confirmation
          </span>
        </div>
      </div>
    </section>
  );
}

export default BookingRequestReceivedCard;
