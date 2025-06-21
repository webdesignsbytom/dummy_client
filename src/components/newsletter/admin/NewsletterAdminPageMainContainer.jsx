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
import NewsletterAdminSubscriberSection from './NewsletterAdminSubscriberSection';
import NewsletterAdminPublicationsSection from './NewsletterAdminPublicationsSection';
import NewsletterCreateAndEditComponent from './NewsletterCreateAndEditComponent';

const layoutOptions = [
  { key: 'subscribers', label: 'Subscribers' },
  { key: 'newsletters', label: 'Newsletters' },
  { key: 'create', label: 'Create +' },
];

function NewsletterAdminPageMainContainer() {
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]);
  const [publishedNewslettersArray, setPublishedNewslettersArray] = useState(
    []
  );
  const [draftNewslettersArray, setDraftNewslettersArray] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [modalContent, setModalContent] = useState({ header: '', message: '' });
  const [selectedLayout, setSelectedLayout] = useState('subscribers');
  const [editingNewsletter, setEditingNewsletter] = useState(null);

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
      className='grid grid-rows-reg w-full h-full'
      aria-label='Admin newsletter main contaiber'
    >
      <section className='grid grid-cols-3 px-1 py-1 gap-x-1'>
        {layoutOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedLayout(key)}
            className={`py-2 rounded transition-all duration-200 bg-colour5 h-fit text-xs ${
              selectedLayout === key ? 'bg-colour6' : ''
            }`}
          >
            {label}
          </button>
        ))}
      </section>

      <section className='grid w-full'>
        {selectedLayout === 'subscribers' && (
          <NewsletterAdminSubscriberSection
            newsletterSubscribers={newsletterSubscribers}
            setNewsletterSubscribers={setNewsletterSubscribers}
            setPendingAction={setPendingAction}
            setModalContent={setModalContent}
            setModalOpen={setModalOpen}
          />
        )}

        {selectedLayout === 'newsletters' && (
          <NewsletterAdminPublicationsSection
            publishedNewslettersArray={publishedNewslettersArray}
            setPublishedNewslettersArray={setPublishedNewslettersArray}
            draftNewslettersArray={draftNewslettersArray}
            setDraftNewslettersArray={setDraftNewslettersArray}
            confirmAction={confirmAction}
            setSelectedLayout={setSelectedLayout}
            setEditingNewsletter={setEditingNewsletter}
          />
        )}

        {selectedLayout === 'create' && (
          <NewsletterCreateAndEditComponent
            editingNewsletter={editingNewsletter}
            setEditingNewsletter={setEditingNewsletter}
            confirmAction={confirmAction}
            setPublishedNewslettersArray={setPublishedNewslettersArray}
          />
        )}
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

export default NewsletterAdminPageMainContainer;
