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

const layoutOptions = [
  { key: 'subscribers', label: 'Subscribers' },
  { key: 'newsletters', label: 'Newsletters' },
  { key: 'create', label: 'Create +' },
];

function NewsletterAdminPageMainContainer() {
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [modalContent, setModalContent] = useState({ header: '', message: '' });
  const [selectedLayout, setSelectedLayout] = useState('subscribers');

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
      className='grid grid-rows-reg w-full h-full bg-slate-400'
      aria-label='Admin newsletter main contaiber'
    >
      <section className='grid grid-cols-3 bg-green-300 px-1 py-1 gap-x-1'>
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

      <section className='grid'>
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
          <div>
            {/* TODO: Add your newsletter list or component here */}
            <p>Newsletter layout goes here.</p>
          </div>
        )}

        {selectedLayout === 'create' && (
          <div>
            {/* TODO: Add your create newsletter form here */}
            <p>Create new newsletter layout goes here.</p>
          </div>
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
