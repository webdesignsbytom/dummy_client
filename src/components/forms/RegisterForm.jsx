import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// API
import client from '../../api/client';
// Context
import { useUser } from '../../context/UserContext';
// Components
import LoadingSpinner from '../../components/utils/LoadingSpinner';
// Utils
import CountrySelect from '../../utils/user/CountrySelect';
// Constants
import { LOGIN_PAGE_URL, REGISTER_API } from '../../utils/Constants';
// Styles
import { ButtonStyle, InputStyle, LinkStyle } from '../../utils/Styles';

function RegisterForm() {
  const { setUser } = useUser();

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    country: '',
    agreedToTerms: true,
  });
  
  const [registerError, setRegisterError] = useState(false);
  const [registrationInProgress, setRegistrationInProgress] = useState(false);

  const handleSubmitRegisterForm = (event) => {
    event.preventDefault();
    setRegistrationInProgress(true);

    client
      .post(REGISTER_API, registerFormData, false)
      .then((res) => {
        console.log('');
        setRegistrationInProgress(false);
        setUser(res.data.data.user);
      })

      .catch((err) => {
        setRegisterError(true);
        setRegistrationInProgress(false);
        console.error('Unable to register new user', err);
      });
  };

  const handleChange = (event) => {
    setRegisterError(false);
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
      <div className='form-check flex justify-center items-center gap-4'>
        <input
          className='form-check-input h-4 w-4 border border-gray-300 rounded-sm transition duration-200 align-top float-left cursor-pointer'
          type='checkbox'
          id='agreedToTerms'
          name='agreedToTerms'
          checked={registerFormData.agreedToTerms}
          onChange={handleCheckboxChange}
          required
          aria-required='true'
          aria-label='I agree to all terms and conditions'
        />
        <label
          className='form-check-label inline-block cursor-pointer text-gray-800 no__highlights'
          htmlFor='agreedToTerms'
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
          className='text-center'
          id='form-error'
        >
          <span className='font-semibold text-error-red' id='register-error'>
            REGISTRATION FAILED
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
