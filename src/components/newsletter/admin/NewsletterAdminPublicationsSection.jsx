import React, { useEffect, useMemo, useState } from 'react';
// Api
import client from '../../../api/client';
// Constants
import {
  DELETE_NEWSLETTER_BY_ID_API,
  GET_ALL_DRAFT_NEWSLETTERS_API,
  GET_ALL_PUBLISHED_NEWSLETTERS_API,
} from '../../../utils/ApiRoutes';
// Icons
import { IoMdRefreshCircle } from 'react-icons/io';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
// Utils
import LoadingSpinner from '../../utils/LoadingSpinner';
// Components
import SearchBarComponent from '../../search/SearchBarComponent';

function NewsletterAdminPublicationsSection({
  publishedNewslettersArray,
  setPublishedNewslettersArray,
  draftNewslettersArray,
  setDraftNewslettersArray,
  confirmAction,
  setSelectedLayout,
  setEditingNewsletter,
}) {
  const [isLoadingPublishedArray, setIsLoadingPublishedArray] = useState(false);
  const [isLoadingDraftArray, setIsLoadingDraftArray] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPublishedNewsletters();
    fetchDraftNewsletters();
  }, []);

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

  const filteredDrafts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return (draftNewslettersArray || []).filter((n) =>
      n.title?.toLowerCase().includes(query)
    );
  }, [draftNewslettersArray, searchQuery]);

  const filteredPublished = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return (publishedNewslettersArray || []).filter((n) =>
      n.title?.toLowerCase().includes(query)
    );
  }, [publishedNewslettersArray, searchQuery]);

  const deleteNewsletter = (id) => {
    confirmAction({
      header: 'Delete Newsletter',
      message: 'Are you sure you want to delete this newsletter?',
      action: () => {
        client
          .delete(`${DELETE_NEWSLETTER_BY_ID_API}/${id}`, false)
          .then(() => {
            setPublishedNewslettersArray((prev) =>
              prev.filter((n) => n.id !== id)
            );
          })
          .catch((err) => {
            console.error('Failed to delete newsletter', err);
          });
      },
    });
  };

  const editNewsletter = (draft) => {
    // Replace with real edit logic or navigation
    setEditingNewsletter(draft);
    setSelectedLayout('create');
    console.log(`Edit draft newsletter with ID: ${draft.id}`);
  };

  return (
    <section className='grid w-full'>
      <div className='grid grid-rows-reg w-full'>
        {/* Header */}
        <div>
          <section className='grid w-full bg-colour5 px-2 py-2'>
            <div className='grid grid-flow-col items-center justify-between'>
              <h1 className='text-sm md:text-xl'>Newsletters</h1>
              <aside className='grid grid-flow-col gap-x-2'>
                <button
                  onClick={() => {
                    fetchPublishedNewsletters();
                    fetchDraftNewsletters();
                  }}
                  className='flex items-center h-full hover:brightness-125 text-2xl text-colour1 active:scale-95'
                  title='Refresh newsletters'
                >
                  <IoMdRefreshCircle />
                </button>
              </aside>
            </div>
          </section>

          {/* Search */}
          <section>
            <SearchBarComponent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder='Search newsletter title...'
            />
          </section>
        </div>

        {/* Results */}
        <div>
          {/* Drafts Section */}
          <section className='grid grid-rows-reg gap-y-2 w-full px-2 py-2 min-h-36'>
            <h2 className='font-semibold text-sm'>
              Draft Newsletters ({(draftNewslettersArray || []).length})
            </h2>

            {isLoadingDraftArray ? (
              <div className='grid items-center justify-center'>
                <LoadingSpinner />
              </div>
            ) : filteredDrafts.length === 0 ? (
              <p className='text-xs text-colour8'>No drafts found.</p>
            ) : (
              <ul className='grid gap-y-1 h-fit pb-1 overflow-hidden'>
                {filteredDrafts.map((draft) => (
                  <li
                    key={draft.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <p
                      className='overflow-hidden whitespace-nowrap text-ellipsis'
                      title={draft.title}
                    >
                      <strong>Title:</strong>{' '}
                      <span className='text-xxs'>{draft?.title}</span>
                    </p>
                    <button
                      onClick={() => editNewsletter(draft)}
                      className='text-blue-600 min-w-4 hover:text-blue-800 text-sm pl-1'
                      title='Edit Draft'
                    >
                      <FiEdit />
                    </button>
                  </li>
                ))}
                {filteredDrafts.map((draft) => (
                  <li
                    key={draft.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <p
                      className='overflow-hidden whitespace-nowrap text-ellipsis'
                      title={draft.title}
                    >
                      <strong>Title:</strong>{' '}
                      <span className='text-xxs'>{draft?.title}</span>
                    </p>
                    <button
                      onClick={() => editNewsletter(draft)}
                      className='text-blue-600 min-w-4 hover:text-blue-800 text-sm pl-1'
                      title='Edit Draft'
                    >
                      <FiEdit />
                    </button>
                  </li>
                ))}
                {filteredDrafts.map((draft) => (
                  <li
                    key={draft.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <p
                      className='overflow-hidden whitespace-nowrap text-ellipsis'
                      title={draft.title}
                    >
                      <strong>Title:</strong>{' '}
                      <span className='text-xxs'>{draft?.title}</span>
                    </p>
                    <button
                      onClick={() => editNewsletter(draft)}
                      className='text-blue-600 min-w-4 hover:text-blue-800 text-sm pl-1'
                      title='Edit Draft'
                    >
                      <FiEdit />
                    </button>
                  </li>
                ))}
                {filteredDrafts.map((draft) => (
                  <li
                    key={draft.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <p
                      className='overflow-hidden whitespace-nowrap text-ellipsis'
                      title={draft.title}
                    >
                      <strong>Title:</strong>{' '}
                      <span className='text-xxs'>{draft?.title}</span>
                    </p>
                    <button
                      onClick={() => editNewsletter(draft)}
                      className='text-blue-600 min-w-4 hover:text-blue-800 text-sm pl-1'
                      title='Edit Draft'
                    >
                      <FiEdit />
                    </button>
                  </li>
                ))}
                {filteredDrafts.map((draft) => (
                  <li
                    key={draft.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <p
                      className='overflow-hidden whitespace-nowrap text-ellipsis'
                      title={draft.title}
                    >
                      <strong>Title:</strong>{' '}
                      <span className='text-xxs'>{draft?.title}</span>
                    </p>
                    <button
                      onClick={() => editNewsletter(draft)}
                      className='text-blue-600 min-w-4 hover:text-blue-800 text-sm pl-1'
                      title='Edit Draft'
                    >
                      <FiEdit />
                    </button>
                  </li>
                ))}
                {filteredDrafts.map((draft) => (
                  <li
                    key={draft.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <p
                      className='overflow-hidden whitespace-nowrap text-ellipsis'
                      title={draft.title}
                    >
                      <strong>Title:</strong>{' '}
                      <span className='text-xxs'>{draft?.title}</span>
                    </p>
                    <button
                      onClick={() => editNewsletter(draft)}
                      className='text-blue-600 min-w-4 hover:text-blue-800 text-sm pl-1'
                      title='Edit Draft'
                    >
                      <FiEdit />
                    </button>
                  </li>
                ))}
                {filteredDrafts.map((draft) => (
                  <li
                    key={draft.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <p
                      className='overflow-hidden whitespace-nowrap text-ellipsis'
                      title={draft.title}
                    >
                      <strong>Title:</strong>{' '}
                      <span className='text-xxs'>{draft?.title}</span>
                    </p>
                    <button
                      onClick={() => editNewsletter(draft)}
                      className='text-blue-600 min-w-4 hover:text-blue-800 text-sm pl-1'
                      title='Edit Draft'
                    >
                      <FiEdit />
                    </button>
                  </li>
                ))}
                {filteredDrafts.map((draft) => (
                  <li
                    key={draft.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <p
                      className='overflow-hidden whitespace-nowrap text-ellipsis'
                      title={draft.title}
                    >
                      <strong>Title:</strong>{' '}
                      <span className='text-xxs'>{draft?.title}</span>
                    </p>
                    <button
                      onClick={() => editNewsletter(draft)}
                      className='text-blue-600 min-w-4 hover:text-blue-800 text-sm pl-1'
                      title='Edit Draft'
                    >
                      <FiEdit />
                    </button>
                  </li>
                ))}
                {filteredDrafts.map((draft) => (
                  <li
                    key={draft.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <p
                      className='overflow-hidden whitespace-nowrap text-ellipsis'
                      title={draft.title}
                    >
                      <strong>Title:</strong>{' '}
                      <span className='text-xxs'>{draft?.title}</span>
                    </p>
                    <button
                      onClick={() => editNewsletter(draft)}
                      className='text-blue-600 min-w-4 hover:text-blue-800 text-sm pl-1'
                      title='Edit Draft'
                    >
                      <FiEdit />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Published Section */}
          <section className='grid grid-rows-reg gap-y-2 h-fit w-full px-2 py-2 min-h-36'>
            <h2 className='font-semibold text-sm'>
              Published Newsletters ({(publishedNewslettersArray || []).length})
            </h2>

            {isLoadingPublishedArray ? (
              <div className='grid items-center justify-center'>
                <LoadingSpinner />
              </div>
            ) : filteredPublished.length === 0 ? (
              <p className='text-xs text-gray-600'>
                No published newsletters found.
              </p>
            ) : (
              <ul className='grid gap-y-1 h-fit pb-1 overflow-hidden'>
                {filteredPublished.map((pub) => (
                  <li
                    key={pub.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <div className='grid'>
                      <p
                        className='overflow-hidden whitespace-nowrap text-ellipsis'
                        title={pub.title}
                      >
                        <strong>Title:</strong>{' '}
                        <span className='text-xxs'>{pub?.title}</span>
                      </p>
                      <p id={`subscriber-${pub?.id}`}>
                        <strong>Date:</strong>{' '}
                        <span className='text-xxs'>
                          {pub?.publishedAt &&
                            new Date(pub.publishedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNewsletter(pub.id)}
                      className='text-red-600 min-w-4 hover:text-red-800 text-sm'
                      title='Delete Published Newsletter'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
                {filteredPublished.map((pub) => (
                  <li
                    key={pub.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <div className='grid'>
                      <p
                        className='overflow-hidden whitespace-nowrap text-ellipsis'
                        title={pub.title}
                      >
                        <strong>Title:</strong>{' '}
                        <span className='text-xxs'>{pub?.title}</span>
                      </p>
                      <p id={`subscriber-${pub?.id}`}>
                        <strong>Date:</strong>{' '}
                        <span className='text-xxs'>
                          {pub?.publishedAt &&
                            new Date(pub.publishedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNewsletter(pub.id)}
                      className='text-red-600 min-w-4 hover:text-red-800 text-sm'
                      title='Delete Published Newsletter'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
                {filteredPublished.map((pub) => (
                  <li
                    key={pub.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <div className='grid'>
                      <p
                        className='overflow-hidden whitespace-nowrap text-ellipsis'
                        title={pub.title}
                      >
                        <strong>Title:</strong>{' '}
                        <span className='text-xxs'>{pub?.title}</span>
                      </p>
                      <p id={`subscriber-${pub?.id}`}>
                        <strong>Date:</strong>{' '}
                        <span className='text-xxs'>
                          {pub?.publishedAt &&
                            new Date(pub.publishedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNewsletter(pub.id)}
                      className='text-red-600 min-w-4 hover:text-red-800 text-sm'
                      title='Delete Published Newsletter'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
                {filteredPublished.map((pub) => (
                  <li
                    key={pub.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <div className='grid'>
                      <p
                        className='overflow-hidden whitespace-nowrap text-ellipsis'
                        title={pub.title}
                      >
                        <strong>Title:</strong>{' '}
                        <span className='text-xxs'>{pub?.title}</span>
                      </p>
                      <p id={`subscriber-${pub?.id}`}>
                        <strong>Date:</strong>{' '}
                        <span className='text-xxs'>
                          {pub?.publishedAt &&
                            new Date(pub.publishedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNewsletter(pub.id)}
                      className='text-red-600 min-w-4 hover:text-red-800 text-sm'
                      title='Delete Published Newsletter'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
                {filteredPublished.map((pub) => (
                  <li
                    key={pub.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <div className='grid'>
                      <p
                        className='overflow-hidden whitespace-nowrap text-ellipsis'
                        title={pub.title}
                      >
                        <strong>Title:</strong>{' '}
                        <span className='text-xxs'>{pub?.title}</span>
                      </p>
                      <p id={`subscriber-${pub?.id}`}>
                        <strong>Date:</strong>{' '}
                        <span className='text-xxs'>
                          {pub?.publishedAt &&
                            new Date(pub.publishedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNewsletter(pub.id)}
                      className='text-red-600 min-w-4 hover:text-red-800 text-sm'
                      title='Delete Published Newsletter'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
                {filteredPublished.map((pub) => (
                  <li
                    key={pub.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <div className='grid'>
                      <p
                        className='overflow-hidden whitespace-nowrap text-ellipsis'
                        title={pub.title}
                      >
                        <strong>Title:</strong>{' '}
                        <span className='text-xxs'>{pub?.title}</span>
                      </p>
                      <p id={`subscriber-${pub?.id}`}>
                        <strong>Date:</strong>{' '}
                        <span className='text-xxs'>
                          {pub?.publishedAt &&
                            new Date(pub.publishedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNewsletter(pub.id)}
                      className='text-red-600 min-w-4 hover:text-red-800 text-sm'
                      title='Delete Published Newsletter'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
                {filteredPublished.map((pub) => (
                  <li
                    key={pub.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <div className='grid'>
                      <p
                        className='overflow-hidden whitespace-nowrap text-ellipsis'
                        title={pub.title}
                      >
                        <strong>Title:</strong>{' '}
                        <span className='text-xxs'>{pub?.title}</span>
                      </p>
                      <p id={`subscriber-${pub?.id}`}>
                        <strong>Date:</strong>{' '}
                        <span className='text-xxs'>
                          {pub?.publishedAt &&
                            new Date(pub.publishedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNewsletter(pub.id)}
                      className='text-red-600 min-w-4 hover:text-red-800 text-sm'
                      title='Delete Published Newsletter'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
                {filteredPublished.map((pub) => (
                  <li
                    key={pub.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <div className='grid'>
                      <p
                        className='overflow-hidden whitespace-nowrap text-ellipsis'
                        title={pub.title}
                      >
                        <strong>Title:</strong>{' '}
                        <span className='text-xxs'>{pub?.title}</span>
                      </p>
                      <p id={`subscriber-${pub?.id}`}>
                        <strong>Date:</strong>{' '}
                        <span className='text-xxs'>
                          {pub?.publishedAt &&
                            new Date(pub.publishedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNewsletter(pub.id)}
                      className='text-red-600 min-w-4 hover:text-red-800 text-sm'
                      title='Delete Published Newsletter'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
                {filteredPublished.map((pub) => (
                  <li
                    key={pub.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <div className='grid'>
                      <p
                        className='overflow-hidden whitespace-nowrap text-ellipsis'
                        title={pub.title}
                      >
                        <strong>Title:</strong>{' '}
                        <span className='text-xxs'>{pub?.title}</span>
                      </p>
                      <p id={`subscriber-${pub?.id}`}>
                        <strong>Date:</strong>{' '}
                        <span className='text-xxs'>
                          {pub?.publishedAt &&
                            new Date(pub.publishedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNewsletter(pub.id)}
                      className='text-red-600 min-w-4 hover:text-red-800 text-sm'
                      title='Delete Published Newsletter'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
                {filteredPublished.map((pub) => (
                  <li
                    key={pub.id}
                    className='bg-colour1 grid grid-flow-col h-fit gap-x-1 rounded shadow px-2 py-2 text-xs justify-between items-center overflow-hidden'
                  >
                    <div className='grid'>
                      <p
                        className='overflow-hidden whitespace-nowrap text-ellipsis'
                        title={pub.title}
                      >
                        <strong>Title:</strong>{' '}
                        <span className='text-xxs'>{pub?.title}</span>
                      </p>
                      <p id={`subscriber-${pub?.id}`}>
                        <strong>Date:</strong>{' '}
                        <span className='text-xxs'>
                          {pub?.publishedAt &&
                            new Date(pub.publishedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNewsletter(pub.id)}
                      className='text-red-600 min-w-4 hover:text-red-800 text-sm'
                      title='Delete Published Newsletter'
                    >
                      <FiTrash2 />
                    </button>
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

export default NewsletterAdminPublicationsSection;
