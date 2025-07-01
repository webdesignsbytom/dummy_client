import React from 'react';
// Icons
import { IoIosCloseCircleOutline } from 'react-icons/io';

function NewsletterSubscriberItem({ subscriber, handleDelete }) {
  return (
    <article
      className='flex items-center justify-between bg-colour1 border px-1 py-1 text-xs h-fit rounded shadow'
      role='region'
      aria-labelledby={`subscriber-${subscriber?.id}`}
    >
      {/* Email Info */}
      <div className='grid'>
        <p>
          <strong>Name:</strong>{' '}
          <span className='text-xxs'>{subscriber?.name}</span>
        </p>
        <p id={`subscriber-${subscriber?.id}`}>
          <strong>Email:</strong>{' '}
          <span className='text-xxs'>{subscriber?.email}</span>
        </p>
      </div>

      {/* Delete Button */}
      <button
        type='button'
        onClick={() => handleDelete(subscriber.id)}
        className='text-red-600 hover:text-red-800 text-lg'
        title='Delete Subscriber'
        aria-label='Delete subscriber'
        aria-describedby={`subscriber-${subscriber?.id}`}
      >
        <IoIosCloseCircleOutline />
      </button>
    </article>
  );
}

export default NewsletterSubscriberItem;
