import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import LoginCard from '../../components/user/LoginCard';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import { loginPageAdditionalMeta, loginPageStructuredData } from '../../utils/data/PageData';

function LoginPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName="Login"
        desc={`Log in to your ${CompanyName} account to access exclusive features.`}
        additionalMeta={loginPageAdditionalMeta}
        structuredData={loginPageStructuredData}
      />

      {/* Page */}
      <div className="grid h-screen min-h-screen max-h-screen overflow-hidden w-full main__bg font-poppins">
        <div className="grid grid-rows-reg w-full h-full overflow-hidden">
          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main role="main" className="grid w-full h-full overflow-hidden">
            <div className="grid w-full h-full justify-center items-center p-2 overflow-hidden">
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
