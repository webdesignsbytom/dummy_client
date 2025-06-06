import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Api
import client from '../../api/client';
// Constants
import {
  HOME_PAGE_URL,
  RESET_PASS_PAGE_URL,
  SIGN_UP_PAGE_URL,
} from '../../utils/Routes';
import { LOGIN_API } from '../../utils/ApiRoutes';
// Components
import LoadingSpinner from '../utils/LoadingSpinner';
// Context
import { useUser } from '../../context/UserContext';
// Hooks
import useNavigateToPage from '../../hooks/useNavigateToPage';

function LoginForm() {
  const { setUser } = useUser();
  const navigateToPage = useNavigateToPage();

  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState(null); // Set null initially for error message
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
    keepMeLoggedIn: false,
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginInProgress(true);
    setLoginError(null); // Reset error state

    client
      .post(LOGIN_API, loginFormData, false)
      .then((res) => {
        setUser(res.data.existingUser);
        console.log('USER', res.data.existingUser);
        localStorage.setItem(process.env.REACT_APP_USER_TOKEN, res.data.token);
        setLoginInProgress(false);
      })
      .then(() => navigateToPage(HOME_PAGE_URL))
      .catch((err) => {
        setLoginError(err.message);
        setLoginInProgress(false);
      });
  };

  const handleChange = (event) => {
    setLoginError(null); // Reset error state when user types
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

  const handleLoginWith = (service) => {
    switch (service) {
      case 'facebook':
        // Call Facebook login API
        console.log('Logging in with Facebook');
        break;
      case 'instagram':
        // Call Instagram login API
        console.log('Logging in with Instagram');
        break;
      case 'google':
        // Call Google login API
        console.log('Logging in with Google');
        break;
      case 'github':
        // Call GitHub login API
        console.log('Logging in with GitHub');
        break;
      case 'apple':
        // Call Apple login API
        console.log('Logging in with Apple');
        break;
      case 'x':
        // Call X login API
        console.log('Logging in with X');
        break;
      default:
        console.log('Unsupported service');
    }
  };

  return (
    <form className='grid gap-y-4 md:gap-y-6' onSubmit={handleLogin}>
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
          className={`bg-colour9 w-full rounded-md py-1 px-1`}
          placeholder='name@email.com'
          onChange={handleChange}
          required
          aria-invalid={loginError ? 'true' : 'false'}
          aria-describedby={loginError ? 'email-error' : undefined}
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Password:
        </label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='••••••••'
          className={`bg-colour9 w-full rounded-md py-1 px-1`}
          required
          onChange={handleChange}
          aria-invalid={loginError ? 'true' : 'false'}
          aria-describedby={loginError ? 'password-error' : undefined}
        />
      </div>
      <div className='grid gap-2 items-center justify-center'>
        <div className='form-check flex mb-6'>
          <input
            className='form-check-input h-4 w-4 border border-gray-300 rounded-sm transition duration-200 mt-1 align-top float-left mr-2 cursor-pointer accent-colour5'
            type='checkbox'
            id='keepMeLoggedIn'
            name='keepMeLoggedIn'
            checked={loginFormData.keepMeLoggedIn}
            onChange={handleCheckedKeepMeLoggedIn}
            aria-label='Keep me logged in'
          />
          <label
            className='form-check-label inline-block text-gray-800'
            htmlFor='keepMeLoggedIn'
          >
            Keep me logged in
          </label>
        </div>
      </div>
      <div className='grid justify-center'>
        <Link
          to={RESET_PASS_PAGE_URL}
          className='text-sm font-medium text-colour5 hover:underline'
          aria-label='Forgot password?'
        >
          Forgot password?
        </Link>
      </div>

      <div className='grid h-fit w-full'>
        <button
          type='submit'
          className={`bg-colour5 text-colour1 py-1 rounded-md hover:brightness-110 active:scale-95 active:brightness-90`}
          aria-label='Sign in to your account'
          disabled={loginInProgress}
        >
          {loginInProgress ? (
            <div className='flex justify-center'>
              <LoadingSpinner xs={true} />
            </div>
          ) : (
            <span>Sign in</span>
          )}
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
            className='font-medium text-colour5 hover:underline'
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
