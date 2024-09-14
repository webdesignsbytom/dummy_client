import React, { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';
// Api
import client from '../api/client';
// Constants
import { GET_LOGGED_IN_USER_API, HOME_PAGE_URL } from '../utils/Constants';
// Helpers
import LoggedInUser from '../utils/LoggedInUser';
// Hooks
import useNavigateToPage from '../hooks/useNavigateToPage';

// Create the context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigateToPage = useNavigateToPage();

  const [user, setUser] = useState({
    id: null,
  });

  const [hasAgreedToCookies, setHasAgreedToCookies] = useState(false);

  console.log('USER >>> userContext >>> state = user');

  const [token, setToken] = useState(
    localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || ''
  );

  useEffect(() => {
    const decodedUserData = LoggedInUser();
    console.log(
      'DecodedUserData >>> useEffect() UserContext: ',
      decodedUserData
    );

    if (decodedUserData !== null) {
      const userId = decodedUserData.id;

      client
        .get(`${GET_LOGGED_IN_USER_API}/${userId}`)
        .then((res) => {
          setUser(res.data.data.user);
        })
        .then(() => navigateToPage(HOME_PAGE_URL))

        .catch((err) => {
          console.error('Unable to retrieve user data', err);
        });
    }

    const cookie = localStorage.getItem('CookiePolicy');
    console.log('cookie', cookie);
    if (cookie) {
      setHasAgreedToCookies(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, hasAgreedToCookies, setHasAgreedToCookies }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;