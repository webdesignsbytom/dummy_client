import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// Constants
import { HOME_PAGE_URL } from './Constants';
// Context
import { UserContext } from '../context/UserContext';
// Utils
import LoggedInUser from './LoggedInUser';

export function AuthenticateUser({ children, redirectPath = HOME_PAGE_URL }) {
  if (!LoggedInUser()) {
    return <Navigate to={redirectPath} replace />;
  } else {
    return <>{children}</>;
  }
}

export function AuthenticateAdmin({ children, redirectPath = HOME_PAGE_URL }) {
  const { user } = useContext(UserContext);
  if (user.role !== 'ADMIN' && user.role !== 'DEVELOPER') {
    return <Navigate to={redirectPath} replace />;
  } else {
    return <>{children}</>;
  }
}

export function AuthenticateDeveloper({ children, redirectPath = HOME_PAGE_URL }) {
  const { user } = useContext(UserContext);
  if (user.role !== 'DEVELOPER') {
    return <Navigate to={redirectPath} replace />;
  } else {
    return <>{children}</>;
  }
}
