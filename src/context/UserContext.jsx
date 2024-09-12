import React from 'react';
import { useEffect, useState } from 'react';
// Api
import client from '../api/client';
// Constants
import { GET_LOGGED_IN_USER_API, HOME_PAGE_URL } from '../utils/Constants';
// Helpers
import LoggedInUser from '../utils/LoggedInUser';
// Hooks
import useNavigateToPage from '../hooks/useNavigateToPage';

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const navigateToPage = useNavigateToPage();

  const [user, setUser] = useState({
    id: null,
  });

  const [hasAgreedToCookies, setHasAgreedToCookies] = useState(false);

  const [token, setToken] = useState(
    localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || ''
  );

  useEffect(() => {
    const decodedUserData = LoggedInUser();

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
    if (cookie) {
      setHasAgreedToCookies(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        hasAgreedToCookies,
        setHasAgreedToCookies,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
