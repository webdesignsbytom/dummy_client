import React from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import {
  forgottenPasswordPageAdditionalMeta,
  forgottenPasswordPageStructuredData,
} from '../../utils/data/MetaData';
// Components
import Navbar from '../../components/nav/Navbar';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';
import { HelmetItem } from '../../components/utils/HelmetItem';

function ForgettenPasswordPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Reset Password'
        desc={`Reset your password for your ${CompanyName} account.`}
        additionalMeta={forgottenPasswordPageAdditionalMeta}
        structuredData={forgottenPasswordPageStructuredData}
      />

      {/* Page */}
      <div className='grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Header */}
          <header className='grid text-center'>
            <h1
              id='reset-password-heading'
              className='text-3xl font-bold leading-tight tracking-tight font-gladolia text-colour2 md:text-2xl dark:text-colour6'
              aria-live='polite' // Screen reader will announce updates
            >
              Reset Password
            </h1>
          </header>
          
          {/* Main page content */}
          <main role='main' className='grid w-full h-full overflow-hidden'>
            <div className='grid w-full h-full items-center py-2 px-10 overflow-hidden'>
              <section className='grid border-[1px] border-colour6 border-solid rounded-xl shadow-cardShadow w-full bg-colour1'>
                <div className='grid grid-rows-reg gap-4 w-full h-full px-6 py-6'>
                  {/* Forgot Password Form */}
                  <section>
                    <ForgotPasswordForm />
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

export default ForgettenPasswordPage;
