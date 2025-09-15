import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
// Api
import client from '../api/client';
// Constants
import { GET_LOGGED_IN_USER_API } from '../utils/ApiRoutes';
// Utils
import LoggedInUser from '../utils/user/LoggedInUser';
import { getToken } from '../utils/user/token';
import {
  ROLES,
  hasRole,
  hasPermission,
  isActive,
} from '../utils/user/Permissions';

// Create the context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // Keep your initial user however you want; using your test user here per your last paste
  const [user, setUser] = useState({
    id: 1,
    email: 't@g.com',
    role: 'ADMIN',
  });
  const [token, setToken] = useState(getToken());
  const [loading, setLoading] = useState(true); // added
  const [lastFetchedAt, setLastFetchedAt] = useState(null); // added

  // Use an isMounted flag instead of AbortController since we won't pass signal to client.get
  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleAuthError = () => {
    try {
      localStorage.removeItem(process.env.REACT_APP_USER_TOKEN);
    } catch {}
    setToken(null);
  };

  const fetchMe = () => {
    setLoading(true);
    client
      .get(GET_LOGGED_IN_USER_API, true) // << YOUR STYLE, UNCHANGED
      .then((res) => {
        if (!isMountedRef.current) return;
        setUser(res?.data?.user ?? null);
        setLastFetchedAt(Date.now());
        setLoading(false);
      })
      .catch((err) => {
        console.error('Unable to retrieve user data', err);
        if (!isMountedRef.current) return;
        if (err?.response?.status === 401) {
          handleAuthError();
        }
        // IMPORTANT: null (not {}) so downstream guards don't read props on {}
        setUser(null);
        setLastFetchedAt(null);
        setLoading(false);
      });
  };

  // Initial (re)hydrate on mount and whenever token changes
  useEffect(() => {
    const decoded = LoggedInUser(); // your JWT decode util
    if (!token || !decoded) {
      setUser(null);
      setLoading(false);
      return;
    }
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const logout = useMemo(
    () => () => {
      try {
        localStorage.removeItem(process.env.REACT_APP_USER_TOKEN);
      } catch {}
      setToken(null);
      setUser(null);
      setLastFetchedAt(null);
    },
    []
  );

  const refreshUser = useMemo(
    () => () => {
      // Manual refetch without page reload
      if (!token) return;
      fetchMe();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token]
  );

  // Authorization helpers (null-safe)
  const authz = useMemo(
    () => ({
      isAuthenticated: !!user,
      isActive: isActive(user),
      isAdmin: hasRole(user, ROLES.ADMIN),
      isDeveloper: hasRole(user, ROLES.DEVELOPER),
      hasRole: (...roles) => hasRole(user, ...roles),
      can: (perm) => hasPermission(user, perm),
    }),
    [user]
  );

  const value = useMemo(
    () => ({
      // state
      user,
      token,
      loading,
      isReady: !loading, // convenience alias
      lastFetchedAt,

      // setters
      setUser,
      setToken,

      // authz helpers
      ...authz,

      // actions
      refreshUser,
      logout,
    }),
    [user, token, loading, lastFetchedAt, authz, refreshUser, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;
