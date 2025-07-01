import React from 'react';
// Icons
import { IoIosCloseCircleOutline } from 'react-icons/io';

function ContactFormItem({ form, handleDelete }) {
  return (
    <article
      className='grid grid-cols-rev bg-colour1 border px-4 py-4 h-fit rounded shadow'
      aria-label={`Contact form submission from ${form.firstName} ${form.lastName}`}
    >
      {/* Content Section */}
      <section aria-labelledby={`contact-heading-${form.id}`}>
        <h2 id={`contact-heading-${form.id}`} className='sr-only'>
          Contact Form Submission Details
        </h2>
        <p>
          <strong>Name:</strong> {form.firstName} {form.lastName}
        </p>
        <p>
          <strong>Email:</strong> <a href={`mailto:${form.email}`}>{form.email}</a>
        </p>
        <p>
          <strong>Phone:</strong>{' '}
          <a href={`tel:${form.phoneNumber}`}>{form.phoneNumber}</a>
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
        <p className='text-sm text-colour7'>
          <strong>Submitted:</strong>{' '}
          {new Date(form.createdAt).toLocaleString()}
        </p>
      </section>

      {/* Delete Button */}
      <section className='flex justify-end items-start'>
        <button
          onClick={() => handleDelete(form.id)}
          className='text-red-600 hover:text-red-800'
          title={`Delete submission from ${form.firstName} ${form.lastName}`}
          aria-label={`Delete contact form from ${form.firstName} ${form.lastName}`}
        >
          <IoIosCloseCircleOutline size={35} />
        </button>
      </section>
    </article>
  );
}

export default ContactFormItem;
