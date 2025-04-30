import React from 'react';
// Icons
import { IoIosCloseCircleOutline } from 'react-icons/io';
// Hooks
import { useUser } from '../../context/UserContext';

function ReviewItem({ review, handleDelete }) {
  const { user } = useUser();
  return (
    <article
      className='grid grid-cols-rev bg-colour1 text-colour2 border px-4 py-4 h-fit rounded shadow'
      role='region'
      aria-label={`Review from ${review.firstName} ${review.lastName}`}
    >
      {/* Review Info */}
      <section>
        <p>
          <strong>Name:</strong> {review.firstName} {review.lastName}
        </p>
        <p>
          <strong>Rating:</strong> {'★'.repeat(review.rating)} {review.rating}/5
        </p>
        <p>
          <strong>Message:</strong> {review.message}
        </p>
        <p className='text-sm text-colour7'>
          <strong>Submitted:</strong>{' '}
          {new Date(review.createdAt).toLocaleString()}
        </p>
      </section>

      {/* Delete Button */}
      {(user?.role === 'ADMIN' || user?.role === 'DEVELOPER') && (
        <section>
          <button
            onClick={() => handleDelete(review.id)}
            className='text-red-600 hover:text-red-800'
            title='Delete Review'
            aria-label={`Delete review from ${review.firstName} ${review.lastName}`}
          >
            <IoIosCloseCircleOutline size={35} />
          </button>
        </section>
      )}
    </article>
  );
}

export default ReviewItem;
