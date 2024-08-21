import React, { useContext, useState } from 'react';
// Context
import { UserContext } from '../../context/UserContext';
// API
import client from '../../api/client';
// Components
import Navbar from '../../components/nav/Navbar';
import LoginForm from '../../components/forms/LoginForm';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName, LOGIN_API } from '../../utils/Constants';

function LoginPage() {
  const { setUser } = useContext(UserContext);

  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
    keepMeLoggedIn: false,
  });

  const handleLogin = (event) => {
    event.preventDefault();

    setLoginInProgress(true);
    client
      .post(LOGIN_API, loginFormData, false)
      .then((res) => {
        localStorage.setItem(
          process.env.REACT_APP_USER_TOKEN,
          res.data.data.token
        );
        setLoginInProgress(false);
        setUser(res.data.data.existingUser);
      })

      .catch((err) => {
        setLoginError(true);
        console.error('Unable to login', err);
      });
  };

  const handleChange = (event) => {
    setLoginError(false);
    const { name, value } = event.target;

    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleCheckedKeepMeLoggedIn = (event) => {
    setLoginFormData({
      ...loginFormData,
      keepMeLoggedIn: true,
    });
  };

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName={'Login'}
        desc={`Log in to your ${CompanyName} account to access exclusive features.`}
      />

      {/* Page */}
      <div className='h-screen overflow-hidden grid bg-gray-50 dark:bg-black dark:text-gray-100'>
        <div className='grid grid-rows-reg lg:grid-cols-reg lg:grid-rows-1 h-full w-full'>
          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main
            role='main'
            className='bg-white main__bg grid items-center justify-center'
          >
            <div className='grid justify-center items-center w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                {/* Header */}
                <header>
                  <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                    Sign in to your account
                  </h1>
                </header>

                {/* Login form */}
                <section>
                  <LoginForm
                    handleCheckedKeepMeLoggedIn={handleCheckedKeepMeLoggedIn}
                    handleLogin={handleLogin}
                    handleChange={handleChange}
                  />
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
