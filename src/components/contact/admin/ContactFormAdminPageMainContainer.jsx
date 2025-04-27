import React, { useEffect, useState } from 'react';
// Api
import client from '../../../api/client';
// Constants
import {
  GET_ALL_CONTACT_FROMS_API,
  DELETE_CONTACT_FORM_API,
  DELETE_ALL_CONTACT_FORM_API,
} from '../../../utils/ApiRoutes';

function ContactFormAdminPageMainContainer() {
  const [contactForms, setContactForms] = useState([]);

  useEffect(() => {
    fetchContactForms();
  }, []);

  const fetchContactForms = () => {
    client
      .get(GET_ALL_CONTACT_FROMS_API, false)
      .then((res) => {
        if (res?.data?.contactForms) {
          setContactForms(res.data.contactForms);
        } else {
          console.error('No contact forms found');
        }
      })
      .catch((err) => {
        console.error('Unable to retrieve contact form data', err);
      });
  };

  const handleDelete = async (id) => {
    const formId = id;

    client
      .delete(`${DELETE_CONTACT_FORM_API}/${formId}`, false)
      .then((res) => {
        setContactForms((prev) => prev.filter((form) => form.id !== id));
      })
      .catch((err) => {
        console.error('Failed to delete contact form', err);
      });
  };

  const handleDeleteAll = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete all contact forms? This cannot be undone.'
      )
    ) {
      return;
    }

    client
      .delete(DELETE_ALL_CONTACT_FORM_API, false)
      .then((res) => {
        setContactForms([]);
      })
      .catch((err) => {
        console.error('Failed to delete all contact forms', err);
      });
  };

  return (
    <main role='main' className='grid w-full h-full p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Contact Forms</h1>
        {contactForms.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            Delete All
          </button>
        )}
      </div>

      {contactForms.length === 0 ? (
        <p>No contact forms found.</p>
      ) : (
        <div className='grid gap-4'>
          {contactForms.map((form) => (
            <div
              key={form.id}
              className='border p-4 rounded shadow flex justify-between items-start'
            >
              <div>
                <p>
                  <strong>Name:</strong> {form.firstName} {form.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {form.email}
                </p>
                <p>
                  <strong>Phone:</strong> {form.phoneNumber}
                </p>
                <p>
                  <strong>Location:</strong> {form.location}
                </p>
                <p>
                  <strong>Business:</strong> {form.businessName}
                </p>
                <p>
                  <strong>Message:</strong> {form.message}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Submitted:</strong>{' '}
                  {new Date(form.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(form.id)}
                className='text-red-600 hover:text-red-800'
                title='Delete'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ContactFormAdminPageMainContainer;
