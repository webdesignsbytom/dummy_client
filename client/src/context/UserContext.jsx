import React, { createContext, useContext, useEffect, useState } from 'react';
// Api
import client from '../api/client';
// Constants
import { GET_LOGGED_IN_USER_API } from '../utils/ApiRoutes';
// Utils
import LoggedInUser from '../utils/user/LoggedInUser';
import { getToken } from '../utils/user/token';

// Create the context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    email: 't@g.com',
    role: 'ADMIN',
  });

  const [token, setToken] = useState(getToken());

  console.log('user', user);
  
  // useEffect(() => {
  //   // 1) Decode (and sanity-check) the token
  //   const decoded = LoggedInUser();
  //   // 2) If there’s no valid token, bail out immediately
  //   if (!decoded) {
  //     setUser({});
  //     console.log('!!!decoded');
  //     return;
  //   }

  //   // 3) Otherwise, fetch the real user exactly once per new token
  //   client
  //     .get(GET_LOGGED_IN_USER_API, true)
  //     .then((res) => setUser(res.data.user))
  //     .catch((err) => {
  //       console.error('Unable to retrieve user data', err);
  //       // If it’s a 401, clear token so we don’t keep retrying
  //       if (err.response?.status === 401) {
  //         localStorage.removeItem(process.env.REACT_APP_USER_TOKEN);
  //         setToken(null);
  //       }
  //       setUser({});
  //     });
  // }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
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
