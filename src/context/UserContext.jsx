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
  useEffect(() => {
    const decodedUserData = LoggedInUser();

    // if (decodedUserData !== null) {
    //   const userId = decodedUserData.id;

    //   client
    //     .get(`${GET_LOGGED_IN_USER_API}/${userId}`)
    //     .then((res) => {
    //       setUser(res.data.user); // Set user state based on API response
    //     })
    //     .catch((err) => {
    //       console.error('Unable to retrieve user data', err);
    //     });
    // }
  }, []);

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
