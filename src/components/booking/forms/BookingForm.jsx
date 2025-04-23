import React, { useState } from 'react';
// Api
import client from '../../../api/client';
// Constants
import { CREATE_NEW_BOOKING_API } from '../../../utils/ApiRoutes';
// Data
import { formatDateHandler } from '../../../utils/functions/BookingFunctions';
// Utils
import LoadingSpinner from '../../utils/LoadingSpinner';

function BookingForm({
  bookingForm,
  setBookingForm,
  setShowBookingForm,
  setSubmittingSuccesful,
  setSubmittingFailed,
  setBookingUnavailable,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBookingForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    client
      .post(CREATE_NEW_BOOKING_API, bookingForm, false)
      .then((res) => {
        setIsSubmitting(false);
        setShowBookingForm(false);
        setSubmittingSuccesful(true);
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          setBookingUnavailable(true);
          setIsSubmitting(false);
          setSubmittingFailed(true);
        } else {
          console.error('Unable to create new booking', err);
          setIsSubmitting(false);
          setSubmittingFailed(true);
        }
      });
  };

  return (
    <section
      className='grid bg-colour1 shadow-lg rounded-md p-4'
      aria-labelledby='booking-form-heading'
    >
      <div className='grid w-full px-8 lg:container lg:mx-auto'>
        <h1
          id='booking-form-heading'
          className='text-2xl font-semibold text-colour7 mb-4'
        >
          Booking Form
        </h1>
        <form onSubmit={handleSubmit} aria-describedby='form-instructions'>
          <p id='form-instructions' className='sr-only'>
            Complete all fields before submitting your booking.
          </p>

          <label htmlFor='fullName' className='block font-medium mb-1'>
            Full Name
          </label>
          <input
            id='fullName'
            name='fullName'
            type='text'
            value={bookingForm.fullName}
            onChange={handleInputChange}
            placeholder='Enter your full name'
            required
            className='w-full p-2 mb-4 border border-gray-300 rounded'
          />

          <label htmlFor='email' className='block font-medium mb-1'>
            Email Address
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={bookingForm.email}
            onChange={handleInputChange}
            placeholder='Enter your email'
            required
            className='w-full p-2 mb-4 border border-gray-300 rounded'
          />

          <label htmlFor='phoneNumber' className='block font-medium mb-1'>
            Phone Number
          </label>
          <input
            id='phoneNumber'
            name='phoneNumber'
            type='tel'
            value={bookingForm.phoneNumber}
            onChange={handleInputChange}
            placeholder='Enter your phone number'
            required
            className='w-full p-2 mb-4 border border-gray-300 rounded'
          />

          <div className='mb-4'>
            <label htmlFor='date' className='block font-medium mb-1'>
              Selected Date
            </label>
            <p id='date' className='text-colour8'>
              {formatDateHandler(bookingForm.date)}
            </p>
          </div>

          <label htmlFor='time' className='block font-medium mb-1'>
            Select Time
          </label>
          <input
            id='time'
            name='time'
            type='time'
            value={bookingForm.displayTime}
            onChange={handleInputChange}
            required
            className='w-full p-2 mb-4 border border-gray-300 rounded'
          />

          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-600 active:bg-green-500 text-white py-2 mt-4 rounded transition'
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <div className='grid justify-center mx-auto'>
                <LoadingSpinner xs={true} />
                <span className='sr-only'>Submitting booking request…</span>
              </div>
            ) : (
              'Submit Booking'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;
