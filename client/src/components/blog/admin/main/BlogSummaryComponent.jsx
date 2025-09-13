import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../../../../api/client';
import { DELETE_BLOG_POST_API } from '../../../../utils/ApiRoutes';
import { formatDate } from '../../../../utils/functions/FormatDate';
import { EDIT_BLOG_POST_PAGE_URL } from '../../../../utils/Routes';
import { useBlog, useBlogSummaries } from '../../../../context/BlogContext';

function BlogSummaryComponent() {
  // keep your existing delete path (updates the cached summaries list)
  const { setBlogSummaryData } = useBlog();
  // cached summaries + background refresh
  const { summaries, loading, error, refresh } = useBlogSummaries();

  const [deleting, setDeleting] = useState({}); // { [postId]: true }
  const [errMsg, setErrMsg] = useState(error || '');
  const [successMsg, setSuccessMsg] = useState('');
  const [showAll, setShowAll] = useState(false);

  // keep local error in sync with hook error
  useEffect(() => {
    setErrMsg(error || '');
  }, [error]);

  // delete handler
  const deleteBlogPost = async (id, title) => {
    setDeleting((d) => ({ ...d, [id]: true }));
    setErrMsg('');
    setSuccessMsg('');

    try {
      const res = await client.delete(`${DELETE_BLOG_POST_API}/${id}`, true);
      // remove from cached list
      setBlogSummaryData((prev) => prev.filter((b) => b.id !== id));
      setSuccessMsg(res?.data?.message || `Deleted “${title || 'post'}”.`);
      // optional background refresh to stay in sync with server
      // await refresh();
    } catch (err) {
      console.error('Unable to delete blog post', err);
      const apiMsg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'Unable to delete blog post.';
      setErrMsg(
        typeof apiMsg === 'string' ? apiMsg : 'Unable to delete blog post.'
      );
    } finally {
      setDeleting((d) => {
        const next = { ...d };
        delete next[id];
        return next;
      });
    }
  };

  const displayed = useMemo(
    () => (showAll ? summaries : summaries.slice(0, 5)),
    [showAll, summaries]
  );
  const canToggle = summaries.length > 5;

  if (loading) {
    return (
      <section className="grid gap-2 h-fit px-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-12 rounded bg-colour1 border-2 border-solid border-colour2"
          />
        ))}
      </section>
    );
  }

  if (errMsg && !summaries.length) {
    return (
      <section className="p-4 rounded bg-colour1 border-2 border-solid border-colour2 text-colour2">
        {errMsg}
      </section>
    );
  }

  if (!summaries.length) {
    return (
      <section className="p-4 rounded bg-colour1 border-2 border-solid border-colour2 text-colour2">
        No blog posts yet.
      </section>
    );
  }

  return (
    <section className="grid gap-2 grid-rows-reg px-8">
      <article className="grid text-center">
        <h3>Summary of blogs</h3>
      </article>

      <div className="grid gap-y-2 w-full h-fit">
        {/* alerts */}
        {successMsg ? (
          <div className="px-4 py-2 h-fit rounded border-2 border-solid border-green-600 text-green-700 bg-green-50">
            {successMsg}
          </div>
        ) : null}
        {errMsg ? (
          <div className="px-4 py-2 h-fit rounded border-2 border-solid border-red-600 text-red-700 bg-red-50">
            {errMsg}
          </div>
        ) : null}

        <ul className="grid gap-2">
          {displayed.map((p) => {
            const published = p.publishedAt ? formatDate(p.publishedAt) : '';
            const created = p.createdAt ? formatDate(p.createdAt) : '';
            const isPublished = Boolean(p.publishedAt);
            const isRowDeleting = !!deleting[p.id];

            return (
              <li
                key={p.id}
                className="flex items-center justify-between gap-2 h-fit rounded px-4 py-2 bg-colour1 border-2 border-solid border-colour2 shadow-cardShadow"
                aria-label={`Summary for ${p.title}`}
                title={p.title}
              >
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-colour2 truncate">
                    {p.title}
                  </h3>
                  <p className="text-xs text-colour7 mt-1">
                    {isPublished ? (
                      <>
                        <span className="inline-flex items-center">
                          <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-600" />
                          Published
                        </span>
                        {published && <> · {published}</>}
                      </>
                    ) : (
                      <>
                        <span className="inline-flex items-center">
                          <span className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-600" />
                          Draft
                        </span>
                        {created && <> · Created {created}</>}
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 h-fit">
                  <div className="hidden sm:block text-xs text-colour7 whitespace-nowrap">
                    {isPublished ? published : created}
                  </div>

                  <Link
                    to={EDIT_BLOG_POST_PAGE_URL}
                    state={{ postId: p.id }}
                    className={`inline-flex items-center px-4 py-1 text-xs font-medium rounded border-2 border-solid border-colour2 hover:bg-colour1 ${
                      isRowDeleting ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    aria-label={`Edit ${p.title}`}
                    title={`Edit ${p.title}`}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteBlogPost(p.id, p.title)}
                    className="inline-flex items-center gap-2 px-4 py-1 text-xs font-medium rounded border-2 border-solid border-colour2 hover:bg-colour1 disabled:opacity-50"
                    aria-label={`Delete ${p.title}`}
                    title={`Delete ${p.title}`}
                    disabled={isRowDeleting}
                  >
                    {isRowDeleting ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Deleting…
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {canToggle && (
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded border-2 border-solid border-colour2 hover:bg-colour1"
          >
            {showAll ? 'Show less' : `Show all ${summaries.length}`}
            <svg
              className={`h-4 w-4 transition-transform ${
                showAll ? 'rotate-180' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

export default BlogSummaryComponent;
