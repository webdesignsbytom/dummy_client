import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import client from '../api/client';
import { GET_BLOG_POSTS_API, GET_BLOG_SUMMARIES_API } from '../utils/ApiRoutes';

const STALE_MS = 60 * 1000; // consider fresh for 60s

export const BlogContext = createContext(null);

const makeKey = (page, limit) => `${limit}:${page}`;

// Tries both shapes your API has used in examples
function extractPostsAndPages(res) {
  const d = res?.data ?? {};
  const posts = d.posts ?? d.data?.posts ?? [];
  const totalPages = d.pagination?.totalPages ?? d.totalPages ?? 1;
  return { posts, totalPages };
}

const BlogProvider = ({ children }) => {
  // =========================
  // Paged posts cache
  // =========================
  // Cache of page -> { posts, totalPages, fetchedAt }
  const [pages, setPages] = useState({});
  // key -> boolean (avoid duplicate fetches)
  const pendingRef = useRef({});

  const setPageData = useCallback((page, limit, payload) => {
    const key = makeKey(page, limit);
    setPages((prev) => ({
      ...prev,
      [key]: {
        posts: payload.posts,
        totalPages: payload.totalPages,
        fetchedAt: Date.now(),
      },
    }));
  }, []);

  const fetchPage = useCallback(
    async (page, limit) => {
      const key = makeKey(page, limit);
      if (pendingRef.current[key]) return; // already fetching

      pendingRef.current[key] = true;
      try {
        const res = await client.get(
          `${GET_BLOG_POSTS_API}?page=${page}&limit=${limit}`,
          false
        );
        const { posts, totalPages } = extractPostsAndPages(res);
        setPageData(page, limit, { posts, totalPages });
      } catch (err) {
        // Swallow the error and provide a safe fallback so the UI doesn't crash
        console.error(
          'Unable to retrieve blog posts:',
          err?.response?.data?.message || err?.message || err
        );
        // Cache an empty page so `loading` becomes false and your UI renders "No posts available"
        setPageData(page, limit, { posts: [], totalPages: 1 });
      } finally {
        pendingRef.current[key] = false;
      }
    },
    [setPageData]
  );

  // NOTE: default alwaysBackground=false to avoid fetch loops
  const ensurePage = useCallback(
    (page, limit, { alwaysBackground = false } = {}) => {
      const key = makeKey(page, limit);
      const cached = pages[key];

      if (!cached) {
        // First time -> fetch and let UI show its initial spinner
        fetchPage(page, limit);
        return;
      }

      // Have cache: optionally refresh in background if stale (or if explicitly forced)
      const isStale = Date.now() - cached.fetchedAt > STALE_MS;
      if ((alwaysBackground || isStale) && !pendingRef.current[key]) {
        fetchPage(page, limit);
      }
    },
    [pages, fetchPage]
  );

  const invalidatePage = useCallback((page, limit) => {
    const key = makeKey(page, limit);
    setPages((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const invalidateAll = useCallback(() => {
    setPages({});
  }, []);

  // =========================
  // Summaries cache
  // =========================
  const [blogSummaryData, setBlogSummaryData] = useState([]);
  const [summariesFetchedAt, setSummariesFetchedAt] = useState(0);
  const [summariesError, setSummariesError] = useState('');
  const summariesPendingRef = useRef(false);

  const fetchSummaries = useCallback(async () => {
    if (summariesPendingRef.current) return;
    summariesPendingRef.current = true;
    setSummariesError('');
    try {
      const res = await client.get(GET_BLOG_SUMMARIES_API, false);
      const posts = Array.isArray(res?.data?.posts) ? res.data.posts : [];
      setBlogSummaryData(posts);
      setSummariesFetchedAt(Date.now());
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'Unable to retrieve blog post data.';
      setSummariesError(
        typeof msg === 'string' ? msg : 'Unable to retrieve blog post data.'
      );
    } finally {
      summariesPendingRef.current = false;
    }
  }, []);

  // NOTE: default alwaysBackground=false to avoid fetch loops
  const ensureSummaries = useCallback(
    ({ alwaysBackground = false } = {}) => {
      // First visit: no data -> fetch and let UI show its initial spinner
      if (!blogSummaryData.length && summariesFetchedAt === 0) {
        fetchSummaries();
        return;
      }
      // Later visits: do a silent background refresh if stale (or if explicitly forced)
      const isStale = Date.now() - summariesFetchedAt > STALE_MS;
      if ((alwaysBackground || isStale) && !summariesPendingRef.current) {
        fetchSummaries();
      }
    },
    [blogSummaryData.length, summariesFetchedAt, fetchSummaries]
  );

  const invalidateSummaries = useCallback(() => {
    setBlogSummaryData([]);
    setSummariesFetchedAt(0);
  }, []);

  const value = useMemo(
    () => ({
      // paged posts cache + controls
      pages,
      ensurePage,
      fetchPage,
      invalidatePage,
      invalidateAll,

      // summaries cache + controls
      blogSummaryData,
      setBlogSummaryData, // used by your delete flow
      summariesFetchedAt,
      summariesError,
      ensureSummaries,
      fetchSummaries,
      invalidateSummaries,
    }),
    [
      pages,
      ensurePage,
      fetchPage,
      invalidatePage,
      invalidateAll,
      blogSummaryData,
      summariesFetchedAt,
      summariesError,
      ensureSummaries,
      fetchSummaries,
      invalidateSummaries,
    ]
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogContext = () => {
  const ctx = useContext(BlogContext);
  if (!ctx)
    throw new Error('useBlogContext must be used within a BlogProvider');
  return ctx;
};

/**
 * Hook used by pages with pagination:
 * returns { posts, totalPages, loading, refresh }
 * - First visit (no cache): loading=true, fetch happens.
 * - Later visits (have cache): loading=false immediately, background refresh runs if stale.
 */
export function useBlogPosts(page, limit) {
  const { pages, ensurePage, fetchPage } = useBlogContext();
  const key = makeKey(page, limit);
  const cached = pages[key];

  React.useEffect(() => {
    // background refresh only if stale
    ensurePage(page, limit);
  }, [page, limit, ensurePage]);

  return {
    posts: cached?.posts ?? [],
    totalPages: cached?.totalPages ?? 1,
    loading: !cached, // only show spinner on very first load of this page
    refresh: () => fetchPage(page, limit),
  };
}

/**
 * Hook for summaries:
 * returns { summaries, loading, error, refresh }
 * - First visit: loading=true, fetch happens.
 * - Later visits: loading=false immediately, background refresh runs if stale.
 */
export function useBlogSummaries() {
  const {
    blogSummaryData,
    summariesFetchedAt,
    summariesError,
    ensureSummaries,
    fetchSummaries,
  } = useBlogContext();

  const firstLoad =
    summariesFetchedAt === 0 && blogSummaryData.length === 0 && !summariesError;

  React.useEffect(() => {
    // background refresh only if stale
    ensureSummaries();
  }, [ensureSummaries]);

  return {
    summaries: blogSummaryData,
    loading: firstLoad,
    error: summariesError,
    refresh: fetchSummaries,
  };
}

export default BlogProvider;

// Back-compat alias so your existing imports keep working:
export const useBlog = useBlogContext;
