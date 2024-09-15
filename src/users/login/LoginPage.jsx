import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import LoginCard from '../../components/user/LoginCard';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';

function LoginPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName={'Login'}
        desc={`Log in to your ${CompanyName} account to access exclusive features.`}
      />

      {/* Page */}
      <div className='grid h-screen min-h-screen max-h-screen overflow-hidden w-full bg-main-background font-poppins'>
        <div className='grid grid-rows-reg w-full h-full overflow-hidden'>
          {/* Navigation */}
          <Navbar />
          <button
            type='button'
            onClick={() => {
              throw new Error('Sentry Test Error');
            }}
          >
            Break the world
          </button>
          ;{/* Main content */}
          <main role='main' className='grid w-full h-full overflow-hidden'>
            <div className='grid w-full h-full justify-center items-center p-2 overflow-hidden'>
              {/* Login component */}
              <LoginCard />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
