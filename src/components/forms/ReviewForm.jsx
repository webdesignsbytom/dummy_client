import React, { useState } from 'react';
// Api
import client from '../../api/client';
// Constants
import { CREATE_NEW_REVIEW_API } from '../../utils/ApiRoutes';
// Icons
import { FaHeart } from 'react-icons/fa';

function ReviewForm({ setReviews }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    client
      .post(CREATE_NEW_REVIEW_API, formData, false)
      .then((res) => {
        setIsSubmitting(false);
        const newReview = {
          ...formData,
          createdAt: new Date().toISOString(), // Optional: add timestamp
          id: Date.now(), // Optional: temporary unique ID
        };

        setReviews((prevReviews) => [newReview, ...prevReviews]);

        // Clear the form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
          rating: 0,
        });
      })
      .catch((err) => {
        console.error('Unable to create new booking', err);
        setIsSubmitting(false);
      });
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='grid h-fit gap-y-4 max-w-2xl mx-auto'
    >
      {/* First Name */}
      <label className='block'>
        <span className='text-colour6 dark:text-colour6'>First Name</span>
        <input
          type='text'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
          required
          className='w-full p-2 mt-1 bg-colour7 dark:bg-colour7 rounded'
          placeholder='Your first name'
        />
      </label>

      {/* Last Name */}
      <label className='block'>
        <span className='text-colour6 dark:text-colour6'>Last Name</span>
        <input
          type='text'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
          required
          className='w-full p-2 mt-1 bg-colour7 dark:bg-colour7 rounded'
          placeholder='Your last name'
        />
      </label>

      {/* Email */}
      <label className='block'>
        <span className='text-colour6 dark:text-colour6'>Email</span>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          className='w-full p-2 mt-1 bg-colour7 dark:bg-colour7 rounded'
          placeholder='Your email'
        />
      </label>

      {/* Review */}
      <label className='block'>
        <span className='text-colour6 dark:text-colour6'>Review</span>
        <textarea
          name='message'
          value={formData.message}
          onChange={handleChange}
          className='w-full p-2 mt-1 bg-colour7 dark:bg-colour7 rounded'
          placeholder='Your review'
        />
      </label>

      {/* Star Rating */}
      <div className='flex items-center'>
        <span className='text-colour6 dark:text-colour6'>Rating: </span>
        {[1, 2, 3, 4, 5].map((heart) => (
          <button
            key={heart}
            type='button'
            onClick={() => handleRatingClick(heart)}
            className={`p-1 group ${
              formData.rating >= heart ? 'text-colour6' : 'text-colour1'
            }`}
          >
            <FaHeart
              className={`group-hover:text-colour6 ${
                formData.rating >= heart ? 'text-colour6' : 'text-colour1'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <section className='grid'>
        <button
          type='submit'
          className='bg-colour5 border-2 border-solid border-colour2 py-2 text-colour1 hover:bg-colour6 transition rounded-full shadow-cardShadowBold shadow-colour6/60 lg:max-w-fit lg:mx-auto lg:px-24'
        >
          Submit Review
        </button>
      </section>
    </form>
  );
}

export default ReviewForm;
