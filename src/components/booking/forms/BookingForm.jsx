import React, { useState } from 'react';
// Api
import client from '../../../api/client';
// Constants
import { CREATE_NEW_BOOKING_API } from '../../../utils/Constants';
// Components
import LoadingSpinner from '../../utils/LoadingSpinner';

function BookingForm({ bookingForm, setBookingForm, setShowBookingForm }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState({});

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

    // You can add logic to handle form submission, like calling an API
    console.log('Booking submitted:', bookingForm);
    // If it's the 'time' input, extract just the hour as a number
    // bookingForm.time = parseInt(bookingForm.time.split(':')[0], 10);
    
    client
      .post(CREATE_NEW_BOOKING_API, bookingForm, false)
      .then((res) => {
        setResult(res.data.booking);
        setIsSubmitting(false);
        setShowBookingForm(false);
      })
      .catch((err) => {
        console.error('Unable to create new booking', err);
        setIsSubmitting(false);
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2); // last two digits

    return `${day}/${month}/${year}`;
  };

  return (
    <section className='grid bg-colour1 shadow-lg rounded-md p-4'>
      <div className='grid w-full px-8 lg:container lg:mx-auto'>
        <h3>Booking Form</h3>
        <form>
          <label htmlFor='fullName'>Full Name</label>
          <input
            id='fullName'
            name='fullName'
            type='text'
            value={bookingForm.fullName}
            onChange={handleInputChange}
            placeholder='Enter your full name'
            className='w-full p-2 mb-2 border border-gray-300 rounded'
          />

          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            value={bookingForm.email}
            onChange={handleInputChange}
            placeholder='Enter your email'
            className='w-full p-2 mb-2 border border-gray-300 rounded'
          />

          <label htmlFor='phoneNumber'>Phone</label>
          <input
            id='phoneNumber'
            name='phoneNumber'
            type='tel'
            value={bookingForm.phone}
            onChange={handleInputChange}
            placeholder='Enter your phone number'
            className='w-full p-2 mb-2 border border-gray-300 rounded'
          />

          <div>
            <label htmlFor='date'>Select Date</label>
            <p>{formatDate(bookingForm.date)}</p>
          </div>

          <label htmlFor='time'>Select Time</label>
          <input
            id='time'
            name='time'
            type='time'
            value={bookingForm.time}
            onChange={handleInputChange}
            className='w-full p-2 mb-2 border border-gray-300 rounded'
          />

          <button
            type='submit'
            onClick={handleSubmit}
            className='w-full bg-blue-500 active:bg-green-500 text-white py-2 mt-4 rounded'
          >
            {isSubmitting ? (
              <div className='grid justify-center mx-auto'>
                <LoadingSpinner xs={true} />
              </div>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;
