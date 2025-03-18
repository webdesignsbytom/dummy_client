import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// API
import client from '../../api/client';
// Context
import { useUser } from '../../context/UserContext';
// Components
import LoadingSpinner from '../../components/utils/LoadingSpinner';
// Utils
import CountrySelect from '../utils/CountrySelect';
// Constants
import { LOGIN_PAGE_URL, REGISTER_API } from '../../utils/Constants';
// Styles
import { ButtonStyle, InputStyle, LinkStyle } from '../../utils/Styles';
// Hooks
import useNavigateToPage from '../../hooks/useNavigateToPage';

function RegisterForm() {
  const { setUser } = useUser();

  const navigateToPage = useNavigateToPage();

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    country: '',
    agreedToTerms: true,
  });

  const [registerError, setRegisterError] = useState(null); // Store error message or null
  const [registrationInProgress, setRegistrationInProgress] = useState(false);

  const handleSubmitRegisterForm = async (event) => {
    event.preventDefault();

    setRegistrationInProgress(true);
    setRegisterError(null); 

    client
    .post(REGISTER_API, registerFormData, false)
    .then((res) => {
      setUser(res.data.existingUser);
      setRegistrationInProgress(false);
    })
    .then(() => navigateToPage(LOGIN_PAGE_URL))
    .catch((err) => {
      setRegisterError(err.message);
      setRegistrationInProgress(false);
    });
  };

  const handleChange = (event) => {
    setRegisterError(null); // Reset error when input changes
    const { name, value } = event.target;

    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setRegisterFormData({
      ...registerFormData,
      agreedToTerms: !registerFormData.agreedToTerms,
    });
  };

  const handleRegisterWith = (service) => {
    switch (service) {
      case 'facebook':
        // Call Facebook login API
        console.log('Register with Facebook');
        break;
      case 'instagram':
        // Call Instagram login API
        console.log('Register with Instagram');
        break;
      case 'google':
        // Call Google login API
        console.log('Register with Google');
        break;
      case 'github':
        // Call GitHub login API
        console.log('Register with GitHub');
        break;
      case 'apple':
        // Call Apple login API
        console.log('Register with Apple');
        break;
      case 'x':
        // Call X login API
        console.log('Register with X');
        break;
      default:
        console.log('Unsupported service');
    }
  };

  return (
    <form
      className='grid gap-4'
      onSubmit={handleSubmitRegisterForm}
      aria-busy={registrationInProgress}
    >
      <div className=''>
        <label htmlFor='username' className='sr-only'>
          Username
        </label>
        <input
          type='text'
          className={InputStyle}
          placeholder='Username'
          id='username'
          name='username'
          onChange={handleChange}
          required
          aria-required='true'
        />
      </div>
      <div>
        <label htmlFor='email' className='sr-only'>
          Email address
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className={InputStyle}
          placeholder='Email address'
          onChange={handleChange}
          required
          aria-required='true'
          aria-describedby={registerError ? 'email-error' : undefined}
        />
      </div>
      <div>
        <label htmlFor='password' className='sr-only'>
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className={InputStyle}
          placeholder='Password'
          onChange={handleChange}
          required
          aria-required='true'
          aria-describedby={registerError ? 'password-error' : undefined}
        />
      </div>
      <div>
        <label htmlFor='confirmPassword' className='sr-only'>
          Confirm Password
        </label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          className={InputStyle}
          placeholder='Confirm Password'
          onChange={handleChange}
          required
          aria-required='true'
          aria-describedby={
            registerError ? 'confirm-password-error' : undefined
          }
        />
      </div>
      <div className=''>
        <label htmlFor='country' className='sr-only'>
          Country
        </label>
        <CountrySelect />
      </div>
      <div className='form-check flex justify-center mb-6'>
        <input
          className='form-check-input h-4 w-4 border border-gray-300 rounded-sm transition duration-200 mt-1 align-top float-left mr-2 cursor-pointer checked:bg-colour2'
          type='checkbox'
          value=''
          id='termsChecked'
          name='termsChecked'
          aria-label='Agree to terms and conditions'
          style={{ accentColor: '#ff0000' }} // Using `accent-color` here
          checked={registerFormData.agreedToTerms}
          onChange={handleCheckboxChange}
        />
        <label
          className='form-check-label inline-block text-gray-800'
          htmlFor='termsChecked'
        >
          I agree to all terms and conditions.
        </label>
      </div>
      {/* Submit button */}
      <div>
        <button
          type='submit'
          data-mdb-ripple='true'
          data-mdb-ripple-color='light'
          className={ButtonStyle}
          disabled={registrationInProgress}
          aria-disabled={registrationInProgress}
          aria-label='Register your account'
        >
          {registrationInProgress ? (
            <LoadingSpinner />
          ) : (
            <span>Register Now</span>
          )}
        </button>
      </div>

      {registerError && (
        <div
          role='alert'
          aria-live='assertive'
          className='text-center text-error-red'
          id='form-error'
        >
          <span className='font-semibold' id='register-error'>
            {registerError || 'REGISTRATION FAILED'}
          </span>
        </div>
      )}

      <div className='grid justify-center'>
        <p className='font-light text-gray-500 dark:text-gray-400'>
          Already a member?{' '}
          <Link
            to={LOGIN_PAGE_URL}
            className={LinkStyle}
            aria-label='Go to login page'
          >
            Login Now
          </Link>
        </p>
      </div>
    </form>
  );
}

export default RegisterForm;
