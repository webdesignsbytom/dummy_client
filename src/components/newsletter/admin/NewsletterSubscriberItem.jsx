import React from 'react';
// Icons
import { IoIosCloseCircleOutline } from 'react-icons/io';

function NewsletterSubscriberItem({ subscriber, handleDelete }) {
  return (
    <article
      className='flex items-center justify-between bg-colour1 border px-4 py-4 h-fit rounded shadow'
      role='region'
      aria-label={`Newsletter subscriber ${subscriber?.email}`}
    >
      {/* Email Info */}
      <p>
        <strong>Email:</strong> {subscriber?.email}
      </p>

      {/* Delete Button */}
      <button
        onClick={() => handleDelete(subscriber.id)}
        className='text-red-600 hover:text-red-800'
        title='Delete Subscriber'
        aria-label={`Delete subscriber ${subscriber?.email}`}
      >
        <IoIosCloseCircleOutline size={30} />
      </button>
    </article>
  );
}

export default NewsletterSubscriberItem;
