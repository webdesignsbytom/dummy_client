import React from 'react';
import { Navigate } from 'react-router-dom';
// Constants
import { HOME_PAGE_URL, LOGIN_PAGE_URL } from '../Routes';
// Context
import { useUser } from '../../context/UserContext';
// Utils
import LoggedInUser from './LoggedInUser';
// Optional: a tiny inline loader (or import your LoadingScreen)
function GuardSpinner() {
  return <div style={{ padding: 16 }} />;
}

export function AuthenticateUser({ children, redirectPath = LOGIN_PAGE_URL }) {
  const { user, loading } = useUser?.() || {};

  // While user state is being restored (e.g., from localStorage / API)
  if (loading) return <GuardSpinner />;

  // Fallback to your existing util, but prefer context if available
  const isLoggedIn = !!user || !!LoggedInUser();
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{children}</>;
}

export function AuthenticateAdmin({ children, redirectPath = HOME_PAGE_URL }) {
  const { user, loading } = useUser?.() || {};

  if (loading) return <GuardSpinner />;

  // If there's no user at all, send to login
  if (!user) {
    return <Navigate to={LOGIN_PAGE_URL} replace />;
  }

  // Null-safe role check
  const role = user?.role;
  const isAdmin = role === 'ADMIN' || role === 'DEVELOPER';

  if (!isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

export function AuthenticateDeveloper({ children, redirectPath = HOME_PAGE_URL }) {
  const { user, loading } = useUser?.() || {};

  if (loading) return <GuardSpinner />;

  if (!user) {
    return <Navigate to={LOGIN_PAGE_URL} replace />;
  }

  if (user?.role !== 'DEVELOPER') {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
