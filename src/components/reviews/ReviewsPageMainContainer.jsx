import React, { useEffect, useState } from 'react';
// Api
import client from '../../api/client';
// Constants
import { DELETE_REVIEW_API, GET_REVIEWS_API } from '../../utils/ApiRoutes';
import { CompanyName } from '../../utils/Constants';
// Components
import ReviewItem from './ReviewItem';
import ConfirmModal from '../modals/ConfirmModal';

function ReviewsPageMainContainer() {
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [modalContent, setModalContent] = useState({ header: '', message: '' });

  useEffect(() => {
    fetchCallbackForms();
  }, []);

  const fetchCallbackForms = () => {
    client
      .get(GET_REVIEWS_API, false)
      .then((res) => {
        if (res?.data?.reviews) {
          setReviews(res.data.reviews);
        } else {
          console.error('No reviews found');
        }
      })
      .catch((err) => {
        console.error('Unable to retrieve callback form data', err);
      });
  };

  const confirmAction = ({ action, header, message }) => {
    setPendingAction(() => action);
    setModalContent({ header, message });
    setModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (pendingAction) pendingAction();
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    confirmAction({
      header: 'Delete Callback Form',
      message: 'Are you sure you want to delete this callback form?',
      action: () => {
        client
          .delete(`${DELETE_REVIEW_API}/${id}`, false)
          .then(() => {
            setReviews((prev) => prev.filter((form) => form.id !== id));
          })
          .catch((err) => {
            console.error('Failed to delete callback form', err);
          });
      },
    });
  };

  return (
    <main role='main' className='grid w-full h-full overflow-hidden'>
      <section className='grid w-full'>
        <div className='grid grid-rows-reg gap-y-4 w-full px-8 py-8 lg:container lg:mx-auto'>
          <section
            className='grid w-full p-1'
            aria-label={`List of submitted reviews for ${CompanyName}`}
          >
            <ul className='grid gap-y-2'>
              {reviews.map((review, index) => {
                return (
                  <li key={review.id}>
                    <ReviewItem
                      key={index}
                      review={review}
                      handleDelete={handleDelete}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </section>

      {/* Confirm Modal */}
      {modalOpen && (
        <ConfirmModal
          onClose={() => setModalOpen(false)}
          onConfirm={handleModalConfirm}
          header={modalContent.header}
          message={modalContent.message}
        />
      )}
    </main>
  );
}

export default ReviewsPageMainContainer;
