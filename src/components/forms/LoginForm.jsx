import React from 'react';
import { Link } from 'react-router-dom';
import { RESET_PASS_PAGE_URL, SIGN_UP_PAGE_URL } from '../../utils/Constants';

function LoginForm({ handleLogin, handleChange, handleCheckedKeepMeLoggedIn, loginError }) {
  return (
    <form className='space-y-4 md:space-y-6' onSubmit={handleLogin}>
      <div>
        <label
          htmlFor='email'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Your email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600'
          placeholder='name@email.com'
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='••••••••'
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600 dark:focus:border-blue-600'
          required
          onChange={handleChange}
        />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-start'>
          <div className='flex items-center h-5'>
            <input
              className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
              type='checkbox'
              id='rememberMe'
              name='rememberMe'
              checked
              onChange={handleCheckedKeepMeLoggedIn}
            />
          </div>
          <div className='ml-3 text-sm'>
            <label
              htmlFor='remember'
              className='text-gray-500 dark:text-gray-300'
            >
              Remember me
            </label>
          </div>
        </div>
        <Link
          to={RESET_PASS_PAGE_URL}
          className='text-sm font-medium text-blue-600 hover:underline'
        >
          Forgot password?
        </Link>
      </div>
      
      <div>
        <button
          type='submit'
          className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
          aria-label='Sign in to your account'
        >
          <span>Sign in</span>
        </button>
      </div>

      <div>
        <p className='font-light text-gray-500 dark:text-gray-400'>
          Don’t have an account yet?
          <Link
            to={SIGN_UP_PAGE_URL}
            className='font-medium text-blue-600 hover:underline'
          >
            Sign up
          </Link>
        </p>
      </div>

      {loginError && (
  <div
    role="alert"
    aria-live="assertive"
    className="text-red-600"
  >
    Unable to login. Please check your credentials.
  </div>
)}
    </form>
  );
}

export default LoginForm;
