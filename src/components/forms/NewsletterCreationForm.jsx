import React, { useState } from 'react';
// Api
import client from '../../api/client';
// Constants
import { CREATE_NEW_NEWSLETTER_API } from '../../utils/ApiRoutes';
import LoadingSpinner from '../utils/LoadingSpinner';

function NewsletterCreationForm() {
  const [newsletterData, setNewsletterData] = useState({
    subject: '',
    body: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsletterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    console.log('save');
    e.preventDefault();
    setIsSavingDraft(true);
  };

  const handleSubmit = (e) => {
    console.log('suss');
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    client
      .post(CREATE_NEW_NEWSLETTER_API, newsletterData, false)
      .then(() => {
        setSubmitSuccess(true);
        setIsSubmitting(false);
        setNewsletterData({ subject: '', body: '' });
      })
      .catch((err) => {
        console.error('Unable to create new newsletter', err);
        setSubmitError('Failed to send newsletter.');
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type='text'
        name='subject'
        placeholder='Subject'
        value={newsletterData.subject}
        onChange={handleChange}
        required
        className='bg-colour9 w-full rounded-md py-1 px-1'
      />
      <textarea
        name='body'
        placeholder='Write your newsletter here...'
        value={newsletterData.body}
        onChange={handleChange}
        rows={10}
        required
        className='bg-colour9 w-full rounded-md py-1 px-1'
      />

      <div className='grid h-fit w-full'>
        <button
          onClick={handleSave}
          className='bg-colour5 text-colour1 py-1 rounded-md hover:brightness-110 active:scale-95 active:brightness-90'
          aria-label='Send newsletter'
          disabled={isSavingDraft}
        >
          {isSavingDraft ? (
            <div className='flex justify-center'>
              <LoadingSpinner xs={true} />
            </div>
          ) : (
            <span className='mx-auto'>Save</span>
          )}
        </button>
      </div>

      <div className='grid h-fit w-full'>
        <button
          type='submit'
          className='bg-colour5 text-colour1 py-1 rounded-md hover:brightness-110 active:scale-95 active:brightness-90'
          aria-label='Send newsletter'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className='flex justify-center'>
              <LoadingSpinner xs={true} />
            </div>
          ) : (
            <span>Send Newsletter</span>
          )}
        </button>
      </div>

      {submitSuccess && (
        <div className='text-green-600 text-center' role='status'>
          Newsletter sent successfully!
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

export default NewsletterCreationForm;
