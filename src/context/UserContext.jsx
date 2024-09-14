import React, { createContext, useState, useEffect, useContext } from 'react';
// Models
import LoggedInUser from '../utils/LoggedInUser';
import client from '../api/client';
import { GET_LOGGED_IN_USER_API, HOME_PAGE_URL } from '../utils/Constants';
import useNavigateToPage from '../hooks/useNavigateToPage';

// Create the context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigateToPage = useNavigateToPage();
  
  // Define states
  const [user, setUser] = useState(null); // Initial user state can be null
  const [hasAgreedToCookies, setHasAgreedToCookies] = useState(false);
  const [token, setToken] = useState(localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || '');

  useEffect(() => {
    const decodedUserData = LoggedInUser();

    if (decodedUserData !== null) {
      const userId = decodedUserData.id;

      client
        .get(`${GET_LOGGED_IN_USER_API}/${userId}`)
        .then((res) => {
          setUser(res.data.data.user); // Set user state based on API response
        })
        .then(() => navigateToPage(HOME_PAGE_URL)) // Navigate to home page
        .catch((err) => {
          console.error('Unable to retrieve user data', err);
        });
    }

    const cookie = localStorage.getItem('CookiePolicy');
    if (cookie) {
      setHasAgreedToCookies(true); // Set cookie agreement status
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
