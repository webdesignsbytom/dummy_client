import React, { useState } from 'react';
// Api
import client from '../../api/client';
// Constants
import { SUBSCRIBE_TO_NEWSLETTER_API } from '../../utils/ApiRoutes';
// Components
import LoadingSpinner from '../utils/LoadingSpinner';

function NewsletterForm() {
  const [formData, setFormData] = useState({ email: '' });
  const [submissionInProgress, setSubmissionInProgress] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setSubmitError(null);
    setFormData({ email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionInProgress(true);
    setSubmitError(null);

    client
      .post(SUBSCRIBE_TO_NEWSLETTER_API, formData, false)
      .then((res) => {
        setSubmitSuccess(true);
        setFormData({ email: '' });
         setSubmissionInProgress(false);
      })
      .catch((err) => {
        setSubmitError('Subscription failed. Please try again later.');
         setSubmissionInProgress(false);
      });
  };

  return (
    <form className='grid gap-y-4 md:gap-y-6' onSubmit={handleSubmit}>
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
          disabled={submissionInProgress}
        >
          {submissionInProgress ? (
            <LoadingSpinner sm={true} />
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
        <div className='text-error-red text-center' role='alert' aria-live='assertive'>
          {submitError}
        </div>
      )}
    </form>
  );
}

export default NewsletterForm;
