import React, { useState } from 'react';
// Api
import client from '../../api/client';
// Constants
import { SUBSCRIBE_TO_NEWSLETTER_API } from '../../utils/ApiRoutes';
// Components
import LoadingSpinner from '../utils/LoadingSpinner';

function NewsletterForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setSubmitError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    client
      .post(SUBSCRIBE_TO_NEWSLETTER_API, formData, false)
      .then((res) => {
        setSubmitSuccess(true);
        console.log('res.news', res.data);
        setFormData({ name: '', email: '' });
        setIsSubmitting(false);
      })
      .catch((err) => {
        setSubmitError('Subscription failed. Please try again later.');
        setIsSubmitting(false);
      });
  };

  return (
    <form className='grid gap-y-4 md:gap-y-6' onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor='name'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Your name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          className='bg-colour9 w-full rounded-md py-1 px-1'
          placeholder='John Doe'
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor='email'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Enter your email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          className='bg-colour9 w-full rounded-md py-1 px-1'
          placeholder='your@email.com'
          value={formData.email}
          onChange={handleChange}
          required
          aria-invalid={submitError ? 'true' : 'false'}
        />
      </div>

      <div className='grid h-fit w-full'>
        <button
          type='submit'
          className='bg-colour5 text-colour1 py-1 rounded-md hover:brightness-110 active:scale-95 active:brightness-90'
          aria-label='Subscribe to newsletter'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className='flex justify-center'>
              <LoadingSpinner xs={true} />
            </div>
          ) : (
            <span>Subscribe</span>
          )}
        </button>
      </div>

      {submitSuccess && (
        <div className='text-green-600 text-center' role='status'>
          Thank you for subscribing!
        </div>
      )}

      {submitError && (
        <div
          className='text-error-red text-center'
          role='alert'
          aria-live='assertive'
        >
          {submitError}
        </div>
      )}
    </form>
  );
}

export default NewsletterForm;
