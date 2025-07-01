import React, { useEffect, useState } from 'react';
// Api
import client from '../../api/client';
// Icons
import { FaTrash } from 'react-icons/fa';
// Constants
import {
  GET_ALL_CONTACT_FROMS_API,
  DELETE_CONTACT_FORM_API,
} from '../../utils/ApiRoutes';

function RecievedContactFormContainer() {
  const [contactForms, setContactForms] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState([]);

  useEffect(() => {
    fetchContactForms();
  }, []);

  const fetchContactForms = () => {
    setIsLoading(true);

    client
      .get(`${GET_ALL_CONTACT_FROMS_API}`, true)
      .then((res) => {
        setContactForms(res.data.contactForms);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Unable to retrieve form data', err);
        setIsLoading(false);
      });
  };

  const handleDelete = (formId) => {
    if (!window.confirm('Are you sure you want to delete this form?')) return;
    setIsSubmitting(true);
    client
      .delete(`${DELETE_CONTACT_FORM_API}/${formId}`, true)
      .then(() => {
        setContactForms((prevForms) =>
          prevForms.filter((form) => form._id !== formId)
        );
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error('Failed to delete form', err);
        setIsSubmitting(false);
      });
  };

  return (
    <section className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800' aria-level='1'>
        Received Contact Forms
      </h1>

      {contactForms.length === 0 ? (
        <p className='text-gray-600'>No contact forms found.</p>
      ) : (
        <ul className='grid gap-y-4' aria-label='List of contact forms'>
          {contactForms.map((form, index) => (
            <li
              key={index}
              className='border border-gray-300 rounded-xl p-4 flex justify-between items-start bg-colour1 shadow-sm'
            >
              <div className='text-sm text-gray-700 space-y-1'>
                <p>
                  <span className='font-medium'>Name:</span> {form.name}
                </p>
                <p>
                  <span className='font-medium'>Email:</span> {form.email}
                </p>
                <p>
                  <span className='font-medium'>Message:</span> {form.message}
                </p>
              </div>
              <button
                onClick={() => handleDelete(form.id)}
                title='Delete form'
                aria-label={`Delete contact form from ${form.name}`}
                className='text-red-600 hover:text-red-800 transition-colors'
              >
                <FaTrash size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default RecievedContactFormContainer;
