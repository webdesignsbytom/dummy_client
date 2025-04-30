import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

function CallbackFormItem({ form, handleDelete }) {
  return (
    <article
      className='grid grid-cols-rev bg-colour1 border px-4 py-4 h-fit rounded shadow'
      role='region'
      aria-label={`Callback request from ${form.name}`}
    >
      {/* Info Section */}
      <section>
        <p>
          <strong>Name:</strong> {form?.name}
        </p>
        <p>
          <strong>Phone:</strong> {form?.phoneNumber}
        </p>
        <p>
          <strong>Email:</strong> {form?.email}
        </p>
        <p>
          <strong>Preferred Time:</strong> {form?.preferredTime || 'Not specified'}
        </p>
        <p className='text-sm text-colour7'>
          <strong>Submitted:</strong>{' '}
          {new Date(form.createdAt).toLocaleString()}
        </p>
      </section>

      {/* Delete Button */}
      <section>
        <button
          onClick={() => handleDelete(form.id)}
          className='text-red-600 hover:text-red-800'
          title='Delete Callback Request'
          aria-label={`Delete callback request from ${form.name}`}
        >
          <IoIosCloseCircleOutline size={35} />
        </button>
      </section>
    </article>
  );
}

export default CallbackFormItem;
