import React, { useEffect, useMemo, useState } from 'react';
// Api
import client from '../../../api/client';
// Constants
import {
  DELETE_ALL_SUBSCRIBERS_API,
  DELETE_SUBSCRIBER_BY_ID_API,
  GET_ALL_NEWSLETTER_SUBSCRIBERS_API,
} from '../../../utils/ApiRoutes';
import { CompanyName } from '../../../utils/Constants';
// Components
import NewsletterSubscriberItem from './NewsletterSubscriberItem';
import SearchBarComponent from '../../search/SearchBarComponent';

function NewsletterAdminSubscriberSection({
  newsletterSubscribers,
  setNewsletterSubscribers,
  setPendingAction,
  setModalContent,
  setModalOpen,
}) {
  useEffect(() => {
    fetchNewsletterSubscribers();
  }, []);

  const fetchNewsletterSubscribers = () => {
    client
      .get(GET_ALL_NEWSLETTER_SUBSCRIBERS_API, false)
      .then((res) => {
        setNewsletterSubscribers(res.data.subscribers);
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

  const [searchQuery, setSearchQuery] = useState('');

  // Filter subscribers based on search
  const filteredSubscribers = useMemo(() => {
    return newsletterSubscribers.filter((subscriber) => {
      const query = searchQuery.toLowerCase();
      return (
        subscriber.email.toLowerCase().includes(query) ||
        subscriber.name?.toLowerCase().includes(query)
      );
    });
  }, [newsletterSubscribers, searchQuery]);

  const handleDelete = (id) => {
    confirmAction({
      header: 'Delete Subscriber',
      message: 'Are you sure you want to delete this subscriber?',
      action: () => {
        client
          .delete(`${DELETE_SUBSCRIBER_BY_ID_API}/${id}`, false)
          .then(() => {
            setNewsletterSubscribers((prev) =>
              prev.filter((form) => form.id !== id)
            );
          })
          .catch((err) => {
            console.error('Failed to delete subscriber', err);
          });
      },
    });
  };

  const handleDeleteAll = () => {
    confirmAction({
      header: 'Delete All Subscribers',
      message:
        'Are you sure you want to delete all subscribers? This cannot be undone.',
      action: () => {
        client
          .delete(DELETE_ALL_SUBSCRIBERS_API, false)
          .then(() => {
            setNewsletterSubscribers([]);
          })
          .catch((err) => {
            console.error('Failed to delete all subscribers', err);
          });
      },
    });
  };

  return (
    <section className='grid w-full'>
      <div className='grid grid-rows-reg gap-y-2 w-full lg:container lg:mx-auto'>
        {/* Header */}
        <div>
          <section
            className='grid w-full bg-colour5 px-2 py-2'
            aria-label='Callback form admin header'
          >
            <div className='grid grid-flow-col items-center justify-between'>
              <h1 className='md:text-xl'>
                Subscribers ({newsletterSubscribers.length})
              </h1>
              {newsletterSubscribers.length > 0 && (
                <>
                  <button
                    onClick={handleDeleteAll}
                    className='bg-red-500 hover:bg-red-700 text-colour1 font-bold py-1 px-4 rounded'
                    aria-describedby='delete-all-description'
                  >
                    Delete All
                  </button>
                  <span id='delete-all-description' className='sr-only'>
                    Deletes all stored newsletter subscribers permanently
                  </span>
                </>
              )}
            </div>
          </section>

          {/* Search bar */}
          <section>
            <SearchBarComponent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder={`Search email or name..`}
            />
          </section>
        </div>

        <div className='grid gap-y-2 grid-rows-reg'>
          {/* Email Copy Section */}
          {newsletterSubscribers.length > 0 && (
            <section className='grid w-full px-2'>
              <div className='grid w-full bg-colour1 px-2 py-4 h-fit rounded shadow max-h-48 overflow-y-auto'>
                <h2 className='font-semibold text-sm mb-2'>
                  All Emails (comma-separated):
                </h2>
                <div className='text-xxs text-black break-words'>
                  {newsletterSubscribers.map((s) => s.email).join(', ')}
                </div>
              </div>
            </section>
          )}

          {/* Subscribers */}
          <section
            className='grid w-full px-2'
            aria-label={`List of submitted subscribers for ${CompanyName}`}
          >
            {filteredSubscribers.length === 0 ? (
              <section
                className='grid items-center justify-center h-full w-full'
                role='status'
                aria-live='polite'
              >
                <p>No subscribers found.</p>
              </section>
            ) : (
              <ul className='grid gap-y-1 h-fit'>
                {filteredSubscribers.map((subscriber, index) => (
                  <li key={subscriber.id}>
                    <NewsletterSubscriberItem
                      id={index}
                      subscriber={subscriber}
                      handleDelete={handleDelete}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

export default NewsletterAdminSubscriberSection;
