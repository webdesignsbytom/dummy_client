import React from 'react';
import { useEffect, useState } from 'react';
// Api
import client from '../api/client';
// Constants
import { HOME_PAGE_URL } from '../utils/Constants';
// Helpers
import LoggedInUser from '../utils/LoggedInUser';
// Hooks
import useNavigateToPage from '../hooks/useNavigateToPage';

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const navigateToPage = useNavigateToPage();

  const [user, setUser] = useState({});
  console.log('USER >>> userContext >>> state = user');

  const [token, setToken] = useState(
    localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || ''
  );

  const [toggleCookiePolicy, setToggleCookiePolicy] = useState(false);

  useEffect(() => {
    const decodedUserData = LoggedInUser();
    console.log('DecodedUserData >>> useEffect() UserContext: ', decodedUserData);

    if (decodedUserData !== null) {
      const userId = decodedUserData.id;
      client
        .get(`/users/user/userId/${userId}`)
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
      setToggleCookiePolicy(true);
    }
  }, []);


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        toggleCookiePolicy,
        setToggleCookiePolicy,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
