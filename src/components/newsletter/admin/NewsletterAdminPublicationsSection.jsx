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
// Utils
import LoadingSpinner from '../../utils/LoadingSpinner';
// Components
import SearchBarComponent from '../../search/SearchBarComponent';

function NewsletterAdminPublicationsSection({
  publishedNewslettersArray,
  setPublishedNewslettersArray,
  draftNewslettersArray,
  setDraftNewslettersArray,
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
          setDraftNewslettersArray(res.data.newsletters);
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

  return (
    <section className='grid w-full'>
      <div className='grid grid-rows-reg gap-y-2 w-full'>
        {/* Header */}
        <div>
          <section
            className='grid w-full bg-colour5 px-2 py-2'
            aria-label='Newsletter admin header'
          >
            <div className='grid grid-flow-col items-center justify-between'>
              <h1 className='text-sm md:text-xl' id='newsletter-list-heading'>
                Newsletters
              </h1>
              <aside className='grid grid-flow-col gap-x-2'>
                <button
                  onClick={() => {
                    fetchPublishedNewsletters();
                    fetchDraftNewsletters();
                  }}
                  className='flex items-center h-full hover:brightness-125 text-2xl text-colour1 active:scale-95'
                  aria-label='Refresh newsletter lists'
                  title='Refresh newsletters'
                >
                  <IoMdRefreshCircle />
                </button>
              </aside>
            </div>
          </section>

          {/* Search bar */}
          <section>
            <SearchBarComponent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder='Search newsletter title...'
            />
          </section>
        </div>

        {/* Drafts Section */}
        <section
          className='grid w-full px-2'
          aria-labelledby='draft-newsletters-heading'
          role='region'
        >
          <h2 id='draft-newsletters-heading' className='font-semibold text-sm'>
            Draft Newsletters ({(draftNewslettersArray || []).length})
          </h2>

          {isLoadingDraftArray ? (
            <div className='grid items-center justify-center h-24'>
              <LoadingSpinner />
            </div>
          ) : filteredDrafts.length === 0 ? (
            <p className='text-xs text-gray-600'>No drafts found.</p>
          ) : (
            <ul className='grid gap-y-2'>
              {filteredDrafts.map((draft) => (
                <li
                  key={draft.id}
                  className='bg-white rounded shadow px-2 py-1 text-xs'
                >
                  <strong>Title:</strong> {draft.title}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Published Section */}
        <section
          className='grid w-full px-2 mt-4'
          aria-labelledby='published-newsletters-heading'
          role='region'
        >
          <h2
            id='published-newsletters-heading'
            className='font-semibold text-sm'
          >
            Published Newsletters ({(publishedNewslettersArray || []).length})
          </h2>

          {isLoadingPublishedArray ? (
            <div className='grid items-center justify-center h-24'>
              <LoadingSpinner />
            </div>
          ) : filteredPublished.length === 0 ? (
            <p className='text-xs text-gray-600'>
              No published newsletters found.
            </p>
          ) : (
            <ul className='grid gap-y-2'>
              {filteredPublished.map((pub) => (
                <li
                  key={pub.id}
                  className='bg-white rounded shadow px-2 py-1 text-xs'
                >
                  <strong>Title:</strong> {pub.title}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  );
}

export default NewsletterAdminPublicationsSection;
