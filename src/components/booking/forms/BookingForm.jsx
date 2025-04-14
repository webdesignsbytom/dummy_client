import React from 'react';

function BookingForm({ bookingForm, setBookingForm }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic to handle form submission, like calling an API
    console.log('Booking submitted:', bookingForm);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year.slice(2)}`; // Return dd/mm/yy format
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

          <label htmlFor='phone'>Phone</label>
          <input
            id='phone'
            name='phone'
            type='tel'
            value={bookingForm.phone}
            onChange={handleInputChange}
            placeholder='Enter your phone number'
            className='w-full p-2 mb-2 border border-gray-300 rounded'
          />

          <label htmlFor='date'>Select Date</label>
          <input
            id='date'
            name='date'
            type='date'
            value={bookingForm.date}
            onChange={handleInputChange}
            className='w-full p-2 mb-2 border border-gray-300 rounded'
          />

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
            className='w-full bg-blue-500 text-white py-2 mt-4 rounded'
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;
