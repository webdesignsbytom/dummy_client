import React, { useEffect, useState } from 'react';
// Api
import client from '../../../api/client';
// Constants
import {
  GET_ALL_NEWSLETTER_SUBSCRIBERS_API,
  DELETE_ALL_SUBSCRIBERS_API,
  DELETE_SUBSCRIBER_BY_ID_API,
} from '../../../utils/ApiRoutes';
import { CompanyName } from '../../../utils/Constants';
// Components
import ConfirmModal from '../../modals/ConfirmModal';
import NewsletterSubscriberItem from './NewsletterSubscriberItem';
import NewsletterAdminSubscriberSection from './NewsletterAdminSubscriberSection';

function NewsletterAdminPageMainContainer() {
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [modalContent, setModalContent] = useState({ header: '', message: '' });

  const confirmAction = ({ action, header, message }) => {
    setPendingAction(() => action);
    setModalContent({ header, message });
    setModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (pendingAction) pendingAction();
    setModalOpen(false);
  };

  return (
    <main
      role='main'
      className='grid w-full h-full'
      aria-label='Admin newsletter main contaiber'
    >
      <NewsletterAdminSubscriberSection
        newsletterSubscribers={newsletterSubscribers}
        setNewsletterSubscribers={setNewsletterSubscribers}
        setPendingAction={setPendingAction}
        setModalContent={setModalContent}
        setModalOpen={setModalOpen}
      />

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

export default NewsletterAdminPageMainContainer;
