import React from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import {
  loginPageAdditionalMeta,
  loginPageStructuredData,
} from '../../utils/data/MetaData';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import LoginForm from '../../components/forms/LoginForm';

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
              <section
                className="grid border-[1px] border-border-main border-solid rounded-xl shadow-2xl bg-white"
                aria-labelledby="login-form-heading"
              >
                <div className="grid grid-rows-reg gap-4 w-full h-full px-8 py-6">
                  {/* Header */}
                  <section className="grid text-center">
                    <h1
                      id="login-form-heading"
                      className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                    >
                      Sign in to your account
                    </h1>
                  </section>

                  {/* Login form */}
                  <section>
                    <LoginForm />
                  </section>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
