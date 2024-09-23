import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Api
import client from '../../api/client';
// Constants
import {
  LOGIN_API,
  RESET_PASS_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from '../../utils/Constants';
import LoadingSpinner from '../utils/LoadingSpinner';
// Styles
import { ButtonStyle, InputStyle } from '../../utils/Styles';

function LoginForm() {
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
    keepMeLoggedIn: false,
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginInProgress(true);
    setLoginError(null);

    try {
      const data = await client.post(LOGIN_API, loginFormData, false);
      localStorage.setItem(
        process.env.REACT_APP_USER_TOKEN,
        data.data.token
      );
      setLoginInProgress(false);
      // Optionally, update user context or redirect the user
    } catch (error) {
      setLoginError(error.message);
      setLoginInProgress(false);
    }
  };

  const handleChange = (event) => {
    setLoginError(null);
    const { name, value } = event.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleCheckedKeepMeLoggedIn = () => {
    setLoginFormData({
      ...loginFormData,
      keepMeLoggedIn: !loginFormData.keepMeLoggedIn,
    });
  };

  const handleLoginWithGoogle = () => {
    const popup = window.open('http://localhost:4000/auth/google', 'Google Login', 'width=600,height=600');
    
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        // Optionally, refresh the user state or redirect
        window.location.reload(); // or navigate to a specific route
      }
    }, 1000);
  };
  
  return (
    <form className='space-y-4 md:space-y-6' onSubmit={handleLogin}>
      <div>
        <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
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
          aria-invalid={loginError ? 'true' : 'false'}
          aria-describedby={loginError ? 'email-error' : undefined}
        />
      </div>
      <div>
        <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Password:
        </label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='••••••••'
          className={InputStyle}
          required
          onChange={handleChange}
          aria-invalid={loginError ? 'true' : 'false'}
          aria-describedby={loginError ? 'password-error' : undefined}
        />
      </div>
      <div className='grid gap-2 items-center justify-between'>
        <div className='form-check flex justify-center mb-6'>
          <input
            className='form-check-input h-4 w-4 border border-gray-300 rounded-sm transition duration-200 mt-1 align-top float-left mr-2 cursor-pointer'
            type='checkbox'
            id='keepMeLoggedIn'
            name='keepMeLoggedIn'
            checked={loginFormData.keepMeLoggedIn}
            onChange={handleCheckedKeepMeLoggedIn}
            aria-label='Keep me logged in'
          />
          <label className='form-check-label inline-block text-gray-800' htmlFor='keepMeLoggedIn'>
            Keep me logged in
          </label>
        </div>
      </div>
      <div className='grid justify-center'>
        <Link
          to={RESET_PASS_PAGE_URL}
          className='text-sm font-medium text-blue-600 hover:underline'
          aria-label='Forgot password?'
        >
          Forgot password?
        </Link>
      </div>

      <div>
        <button
          type='submit'
          className={ButtonStyle}
          aria-label='Sign in to your account'
          disabled={loginInProgress}
        >
          {loginInProgress ? (
            <LoadingSpinner sm={true} />
          ) : (
            <span>Sign in</span>
          )}
        </button>
      </div>

      <div className='text-center'>
        <p className='font-light text-gray-500 dark:text-gray-400'>
          Or sign in with
        </p>
        <button
          type='button'
          className={`${ButtonStyle} mt-2`}
          onClick={handleLoginWithGoogle}
        >
          Google
        </button>
      </div>

      {loginError && (
        <div role='alert' aria-live='assertive' className='text-error-red'>
          {loginError || 'Unable to login. Please check your credentials.'}
        </div>
      )}

      <div className='text-center'>
        <p className='font-light text-gray-500 dark:text-gray-400'>
          Don’t have an account yet?{' '}
          <Link
            to={SIGN_UP_PAGE_URL}
            className='font-medium text-blue-600 hover:underline'
            aria-label='Sign up for a new account'
          >
            Sign up now!
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
