import React, { useEffect, useState } from 'react';
// Api
import client from '../../../api/client';
// Constants
import {
  GET_ALL_NEWSLETTER_SUBSCRIBERS_API,
  GET_ALL_PUBLISHED_NEWSLETTERS_API,
  GET_ALL_DRAFT_NEWSLETTERS_API,
} from '../../../utils/ApiRoutes';
// Components
import ConfirmModal from '../../modals/ConfirmModal';
import NewsletterAdminSubscriberSection from './NewsletterAdminSubscriberSection';
import NewsletterAdminPublicationsSection from './NewsletterAdminPublicationsSection';
import NewsletterCreateAndEditComponent from './NewsletterCreateAndEditComponent';
import useConfirmAction from '../../../hooks/useConfirmAction';
import NewsletterDisplayComponent from './NewsletterDisplayComponent';

const layoutOptions = [
  { key: 'subscribers', label: 'Subscribers' },
  { key: 'newsletters', label: 'Newsletters' },
  { key: 'create', label: 'Create +' },
];

function NewsletterAdminPageMainContainer() {
  const confirmActionState = useConfirmAction();

  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]);
  const [publishedNewslettersArray, setPublishedNewslettersArray] = useState(
    []
  );
  const [draftNewslettersArray, setDraftNewslettersArray] = useState([]);
  const [editingNewsletter, setEditingNewsletter] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState('subscribers');
  const [viewingNewsletter, setViewingNewsletter] = useState(null);

  const [isLoadingPublishedArray, setIsLoadingPublishedArray] = useState(false);
  const [isLoadingDraftArray, setIsLoadingDraftArray] = useState(false);

  const [isLoadingSubscriberList, setIsLoadingSubscriberList] = useState(false);

  useEffect(() => {
    fetchPublishedNewsletters();
    fetchDraftNewsletters();
    fetchNewsletterSubscribers();
  }, []);

  const fetchNewsletterSubscribers = () => {
    setIsLoadingSubscriberList(true);

    client
      .get(GET_ALL_NEWSLETTER_SUBSCRIBERS_API, false)
      .then((res) => {
        setNewsletterSubscribers(res.data.subscribers);
        setTimeout(() => {
          setIsLoadingSubscriberList(false);
        }, 500); // 0.5 second delay
      })
      .catch((err) => {
        console.error('Unable to retrieve callback form data', err);
        setTimeout(() => {
          setIsLoadingSubscriberList(false);
        }, 500); // 0.5 second delay on error too
      });
  };

  const fetchPublishedNewsletters = () => {
    setIsLoadingPublishedArray(true);

    client
      .get(GET_ALL_PUBLISHED_NEWSLETTERS_API, false)
      .then((res) => {
        setTimeout(() => {
          setPublishedNewslettersArray(res.data.newsletters);
          setIsLoadingPublishedArray(false);
        }, 500);
      })
      .catch((err) => {
        console.error('Unable to retrieve published newsletters array', err);
        setTimeout(() => {
          setPublishedNewslettersArray([]);
          setIsLoadingPublishedArray(false);
        }, 500);
      });
  };

  const fetchDraftNewsletters = () => {
    setIsLoadingDraftArray(true);

    client
      .get(GET_ALL_DRAFT_NEWSLETTERS_API, false)
      .then((res) => {
        setTimeout(() => {
          setDraftNewslettersArray(res.data.drafts);
          setIsLoadingDraftArray(false);
        }, 500);
      })
      .catch((err) => {
        console.error('Unable to retrieve draft newsletters array', err);
        setTimeout(() => {
          setDraftNewslettersArray([]);
          setIsLoadingDraftArray(false);
        }, 500);
      });
  };

  return (
    <main
      role='main'
      className='grid grid-rows-reg w-full h-full overflow-hidden'
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

      <section className='grid w-full overflow-y-auto'>
        {selectedLayout === 'subscribers' && (
          <NewsletterAdminSubscriberSection
            newsletterSubscribers={newsletterSubscribers}
            setNewsletterSubscribers={setNewsletterSubscribers}
            {...confirmActionState}
            fetchNewsletterSubscribers={fetchNewsletterSubscribers}
            isLoadingSubscriberList={isLoadingSubscriberList}
          />
        )}

        {selectedLayout === 'newsletters' && (
          <NewsletterAdminPublicationsSection
            publishedNewslettersArray={publishedNewslettersArray}
            setPublishedNewslettersArray={setPublishedNewslettersArray}
            draftNewslettersArray={draftNewslettersArray}
            setDraftNewslettersArray={setDraftNewslettersArray}
            setSelectedLayout={setSelectedLayout}
            setEditingNewsletter={setEditingNewsletter}
            {...confirmActionState}
            setViewingNewsletter={setViewingNewsletter}
            fetchPublishedNewsletters={fetchPublishedNewsletters}
            fetchDraftNewsletters={fetchDraftNewsletters}
            isLoadingDraftArray={isLoadingDraftArray}
            isLoadingPublishedArray={isLoadingPublishedArray}
          />
        )}

        {selectedLayout === 'create' && (
          <NewsletterCreateAndEditComponent
            editingNewsletter={editingNewsletter}
            setEditingNewsletter={setEditingNewsletter}
            setPublishedNewslettersArray={setPublishedNewslettersArray}
            setSelectedLayout={setSelectedLayout}
            {...confirmActionState}
            setDraftNewslettersArray={setDraftNewslettersArray}
          />
        )}

        {selectedLayout === 'newsletter' && (
          <NewsletterDisplayComponent viewingNewsletter={viewingNewsletter} />
        )}
      </section>

      {/* Confirm Modal */}
      {confirmActionState.modalOpen && (
        <ConfirmModal
          onClose={() => confirmActionState.setModalOpen(false)}
          onConfirm={confirmActionState.handleModalConfirm}
          header={confirmActionState.modalContent.header}
          message={confirmActionState.modalContent.message}
        />
      )}
    </main>
  );
}

export default NewsletterAdminPageMainContainer;
