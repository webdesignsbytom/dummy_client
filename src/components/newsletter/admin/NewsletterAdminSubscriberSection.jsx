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
// Icons
import { IoMdRefreshCircle } from 'react-icons/io';
// Utils
import LoadingSpinner from '../../utils/LoadingSpinner';
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
  const [isLoadingSubscriberList, setIsLoadingSubscriberList] = useState(false);

  useEffect(() => {
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
    <section className='grid w-full pb-4'>
      <div className='grid grid-rows-reg gap-y-2 w-full'>
        {/* Header */}
        <div>
          <section
            className='grid w-full bg-colour5 px-2 py-2'
            aria-label='Callback form admin header'
          >
            <div className='grid grid-flow-col items-center justify-between'>
              <h1 className='text-sm md:text-xl' id='subscriber-list-heading'>
                Subscribers ({newsletterSubscribers.length})
              </h1>
              {newsletterSubscribers.length > 0 && (
                <aside className='grid grid-flow-col gap-x-2'>
                  <div>
                    <button
                      onClick={fetchNewsletterSubscribers}
                      className='flex items-center h-full hover:brightness-125 text-2xl text-colour1 active:scale-95'
                      aria-describedby='delete-all-description'
                      title='Refresh subscriber list'
                    >
                      <IoMdRefreshCircle />
                    </button>
                    <span
                      id='refresh-subscriber-list-description'
                      className='sr-only'
                    >
                      Refresh subscriber list
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={handleDeleteAll}
                      className='bg-red-500 hover:bg-red-700 text-colour1 font-medium py-1 px-4 text-xs h-full rounded'
                      aria-label='Delete all subscribers permanently'
                    >
                      Delete All
                    </button>
                    <span id='delete-all-description' className='sr-only'>
                      Deletes all stored newsletter subscribers permanently
                    </span>
                  </div>
                </aside>
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

        <div
          className={`grid gap-y-2 ${
            newsletterSubscribers.length > 0 ? 'grid-rows-reg' : ''
          }`}
        >
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
            className='grid w-full px-2 h-full'
            aria-label={`List of submitted subscribers for ${CompanyName}`}
          >
            {isLoadingSubscriberList ? (
              <section className='grid h-full items-center justify-center'>
                <LoadingSpinner lg={true} />
              </section>
            ) : (
              <>
                {filteredSubscribers.length === 0 ? (
                  <section
                    className='grid items-center justify-center h-full w-full'
                    role='status'
                    aria-live='polite'
                  >
                    <p>No subscribers found.</p>
                  </section>
                ) : (
                  <ul className='grid gap-y-1 lg:grid-cols-3 gap-x-2 h-fit'>
                    {filteredSubscribers.map((subscriber, index) => (
                      <li key={subscriber.id}>
                        <NewsletterSubscriberItem
                          id={index}
                          subscriber={subscriber}
                          handleDelete={handleDelete}
                        />
                      </li>
                    ))}
                    {filteredSubscribers.map((subscriber, index) => (
                      <li key={subscriber.id}>
                        <NewsletterSubscriberItem
                          id={index}
                          subscriber={subscriber}
                          handleDelete={handleDelete}
                        />
                      </li>
                    ))}
                    {filteredSubscribers.map((subscriber, index) => (
                      <li key={subscriber.id}>
                        <NewsletterSubscriberItem
                          id={index}
                          subscriber={subscriber}
                          handleDelete={handleDelete}
                        />
                      </li>
                    ))}
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
              </>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

export default NewsletterAdminSubscriberSection;
