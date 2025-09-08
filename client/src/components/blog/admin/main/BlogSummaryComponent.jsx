import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Api
import client from '../../../../api/client';
// Constants
import { GET_BLOG_SUMMARIES_API } from '../../../../utils/ApiRoutes';
import { formatDate } from '../../../../utils/functions/FormatDate';
import { EDIT_BLOG_POST_PAGE_URL } from '../../../../utils/Routes';

function BlogSummaryComponent() {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    client
      .get(GET_BLOG_SUMMARIES_API, false)
      .then((res) => {
        setSummaries(Array.isArray(res?.data?.posts) ? res.data.posts : []);
        setErrMsg('');
      })
      .catch((err) => {
        console.error('Unable to retrieve blog post data', err);
        const apiMsg =
          err?.response?.data?.message ||
          err?.response?.data ||
          err?.message ||
          'Unable to retrieve blog post data.';
        setErrMsg(
          typeof apiMsg === 'string'
            ? apiMsg
            : 'Unable to retrieve blog post data.'
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const displayed = useMemo(
    () => (showAll ? summaries : summaries.slice(0, 5)),
    [showAll, summaries]
  );

  const canToggle = summaries.length > 5;

  if (loading) {
    return (
      <section className='grid gap-3'>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='h-12 rounded bg-colour1 border-2 border-solid border-colour2'
          />
        ))}
      </section>
    );
  }

  if (errMsg) {
    return (
      <section className='p-4 rounded bg-colour1 border-2 border-solid border-colour2 text-colour2'>
        {errMsg}
      </section>
    );
  }

  if (!summaries.length) {
    return (
      <section className='p-4 rounded bg-colour1 border-2 border-solid border-colour2 text-colour2'>
        No blog posts yet.
      </section>
    );
  }

  return (
    <section className='grid gap-2 grid-rows-reg px-8'>
      <article className='grid text-center'>
        <h3>Summary of blogs</h3>
      </article>

      <div className='grid w-full h-fit'>
        <ul className='grid gap-2'>
          {displayed.map((p) => {
            const published = p.publishedAt ? formatDate(p.publishedAt) : '';
            const created = p.createdAt ? formatDate(p.createdAt) : '';
            const isPublished = Boolean(p.publishedAt);

            return (
              <li
                key={p.id}
                className='flex items-center justify-between gap-3 rounded px-4 py-3 bg-colour1 border-2 border-solid border-colour2 shadow-cardShadow'
                aria-label={`Summary for ${p.title}`}
                title={p.title}
              >
                <div className='min-w-0'>
                  <h3 className='text-sm sm:text-base font-semibold text-colour2 truncate'>
                    {p.title}
                  </h3>
                  <p className='text-xs text-colour7 mt-1'>
                    {isPublished ? (
                      <>
                        <span className='inline-flex items-center'>
                          <span className='mr-1 inline-block h-2 w-2 rounded-full bg-green-600' />
                          Published
                        </span>
                        {published && <> · {published}</>}
                      </>
                    ) : (
                      <>
                        <span className='inline-flex items-center'>
                          <span className='mr-1 inline-block h-2 w-2 rounded-full bg-amber-600' />
                          Draft
                        </span>
                        {created && <> · Created {created}</>}
                      </>
                    )}
                  </p>
                </div>

                {/* Right-side: date + Edit button */}
                <div className='flex items-center gap-3'>
                  <div className='hidden sm:block text-xs text-colour7 whitespace-nowrap'>
                    {isPublished ? published : created}
                  </div>

                  <Link
                    to={EDIT_BLOG_POST_PAGE_URL} 
                    state={{ postId: p.id }}
                    className='inline-flex items-center px-3 py-1 text-xs font-medium rounded border-2 border-solid border-colour2 hover:bg-colour1'
                    aria-label={`Edit ${p.title}`}
                    title={`Edit ${p.title}`}
                  >
                    Edit
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {canToggle && (
        <div className='mt-2 flex justify-center'>
          <button
            type='button'
            onClick={() => setShowAll((s) => !s)}
            aria-expanded={showAll}
            className='inline-flex items-center gap-2 px-4 py-2 text-sm rounded border-2 border-solid border-colour2 hover:bg-colour1'
          >
            {showAll ? 'Show less' : `Show all ${summaries.length}`}
            <svg
              className={`h-4 w-4 transition-transform ${
                showAll ? 'rotate-180' : ''
              }`}
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

export default BlogSummaryComponent;
