import React, { useState } from 'react';
// Api
import client from '../../api/client';
// Data
import { emptyContactFormData } from '../../utils/data/FormData';
// Style
import { ButtonStyle } from '../../utils/Styles';
// Utils
import LoadingSpinner from '../utils/LoadingSpinner';
import { SUBMIT_CONTACT_FORM_API } from '../../utils/Constants';

function ContactForm() {
  const submitStates = ['waiting', 'inprogress', 'failed', 'success'];

  const [formData, setFormData] = useState(emptyContactFormData);
  const [submitState, setSubmitState] = useState(submitStates[0]); // Default to "waiting"
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSubmitState(submitStates[0]); // "inprogress"

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState(submitStates[1]); // "inprogress"

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      client
        .post(SUBMIT_CONTACT_FORM_API, formData, false)
        .then((res) => {
          setSubmitState(submitStates[3]); // "success"
        })
        .catch((err) => {
          console.error('Unable to submit contact request', err);
          setSubmitState(submitStates[2]); // "failed"
        });

      setFormData(emptyContactFormData);
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
      <section className='lg:grid lg:grid-cols-2 gap-2'>
        <div className=''>
          <label
            className='block text-gray-700 text-sm font-bold'
            htmlFor='firstName'
          >
            First Name <span className='text-error-red'>*</span>
          </label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            autoComplete='on'
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.firstName ? 'border-error-red' : ''
            }`}
            required
            aria-required='true'
            aria-invalid={errors.firstName ? 'true' : 'false'}
            aria-describedby='firstNameError'
          />
          {errors.firstName && (
            <p id='firstNameError' className='text-error-red text-xs italic'>
              {errors.firstName}
            </p>
          )}
        </div>
        <div className=''>
          <label
            className='block text-gray-700 text-sm font-bold'
            htmlFor='lastName'
          >
            Last Name <span className='text-error-red'>*</span>
          </label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            autoComplete='on'
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.lastName ? 'border-error-red' : ''
            }`}
            required
            aria-required='true'
            aria-invalid={errors.lastName ? 'true' : 'false'}
            aria-describedby='lastNameError'
          />
          {errors.lastName && (
            <p id='lastNameError' className='text-error-red text-xs italic'>
              {errors.lastName}
            </p>
          )}
        </div>
      </section>
      <div className=''>
        <label
          className='block text-gray-700 text-sm font-bold'
          htmlFor='email'
        >
          Email <span className='text-error-red'>*</span>
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          autoComplete='on'
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.email ? 'border-error-red' : ''
          }`}
          required
          aria-required='true'
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby='emailError'
        />
        {errors.email && (
          <p id='emailError' className='text-error-red text-xs italic'>
            {errors.email}
          </p>
        )}
      </div>
      <section className='lg:grid lg:grid-cols-2 gap-2'>
        <div className=''>
          <label
            className='block text-gray-700 text-sm font-bold'
            htmlFor='businessName'
          >
            Business Name (optional)
          </label>
          <input
            type='text'
            id='businessName'
            name='businessName'
            value={formData.businessName}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
      </section>
      <section className='lg:grid lg:grid-cols-2 gap-2'>
        <div className=''>
          <label
            className='block text-gray-700 text-sm font-bold'
            htmlFor='phoneNumber'
          >
            Phone Number (optional)
          </label>
          <input
            type='tel'
            id='phoneNumber'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className=''>
          <label
            className='block text-gray-700 text-sm font-bold'
            htmlFor='location'
          >
            Location (optional)
          </label>
          <input
            type='text'
            id='location'
            name='location'
            value={formData.location}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
      </section>
      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold'
          htmlFor='message'
        >
          Message <span className='text-error-red'>*</span>
        </label>
        <textarea
          id='message'
          name='message'
          value={formData.message}
          rows={6}
          onChange={handleChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.message ? 'border-error-red' : ''
          }`}
          required
          aria-required='true'
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby='messageError'
        />
        {errors.message && (
          <p id='messageError' className='text-error-red text-xs italic'>
            {errors.message}
          </p>
        )}
      </div>
      <div className='grid items-center'>
        <button
          type='submit'
          className={ButtonStyle}
          aria-label='Submit your form'
          disabled={submitState === submitStates[1]} // "inprogress"
        >
          {submitState === submitStates[1] ? (
            <LoadingSpinner sm={true} />
          ) : (
            <span>Submit</span>
          )}
        </button>
      </div>

      {submitState === submitStates[2] && ( // "failed"
        <div role='alert' aria-live='assertive' className='text-error-red mt-4'>
          Unable to submit the form. Please try again.
        </div>
      )}
      {submitState === submitStates[3] && ( // "success"
        <div role='alert' aria-live='polite' className='text-green-500 mt-4'>
          Form submitted successfully!
        </div>
      )}
    </form>
  );
}

export default ContactForm;
