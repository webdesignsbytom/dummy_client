import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Api
import client from '../../api/client';
// Components
import LoadingSpinner from '../utils/LoadingSpinner';
// Constants
import {
  RESET_PASSWORD_API,
  SIGN_UP_PAGE_URL,
} from '../../utils/Constants';
// Styles
import { ButtonStyle, InputStyle, LinkStyle } from '../../utils/Styles';

function ForgotPasswordForm() {
  const [resetRequestInProgress, setResetRequestInProgress] = useState(false);
  const [resetRequestError, setResetRequestError] = useState(false);
  const [resetRequestSuccess, setResetRequestSuccess] = useState(false); // New state for success message
  const [resetFormData, setResetFormData] = useState({
    email: '',
  });

  const handleResetRequest = (event) => {
    event.preventDefault();
    setResetRequestInProgress(true);
    setResetRequestError(false);
    setResetRequestSuccess(false); // Reset success message on new request

    client
      .post(RESET_PASSWORD_API, resetFormData, false)
      .then((res) => {
        setResetRequestInProgress(false);
        setResetRequestSuccess(true); // Show success message on success
      })
      .catch((err) => {
        setResetRequestError(true);
        setResetRequestInProgress(false);
        console.error('Unable to request password reset', err);
      });
  };

  const handleChange = (event) => {
    setResetRequestError(false);
    setResetRequestSuccess(false); // Reset success message on new input
    const { name, value } = event.target;

    setResetFormData({
      ...resetFormData,
      [name]: value,
    });
  };

  return (
    <form className='space-y-4 md:space-y-6' onSubmit={handleResetRequest}>
      <div>
        <label
          htmlFor='email'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Your email:
        </label>
        <input
          type='email'
          name='email'
          id='email'
          className={InputStyle}
          placeholder='name@email.com'
          onChange={handleChange}
          required
          aria-invalid={resetRequestError ? 'true' : 'false'}
          aria-describedby={resetRequestError ? 'email-error' : undefined}
        />
      </div>

      <div>
        <button
          type='submit'
          className={ButtonStyle}
          aria-label='Request a password reset'
          disabled={resetRequestInProgress}
        >
          {resetRequestInProgress ? (
            <LoadingSpinner sm={true} />
          ) : (
            <span>Reset Password</span>
          )}
        </button>
      </div>

      <div>
        <p className='font-light text-gray-500 dark:text-gray-400'>
          Don’t have an account yet?
          <Link
            to={SIGN_UP_PAGE_URL}
            className={LinkStyle}
            aria-label='Sign up for a new account'
          >
            Sign up
          </Link>
        </p>
      </div>

      {resetRequestError && (
        <div role='alert' aria-live='assertive' className='text-error-red'>
          Unable to request password reset. Please try again.
        </div>
      )}

      {resetRequestSuccess && (
        <div role='alert' aria-live='polite' className='text-green-600'>
          Password reset link has been sent to your email.
        </div>
      )}
    </form>
  );
}

export default ForgotPasswordForm;
