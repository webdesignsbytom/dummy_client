import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import { forgottenPasswordPageAdditionalMeta, forgottenPasswordPageStructuredData } from '../../utils/data/PageData';

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
      <div className="grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins">
        <div className="grid grid-rows-reg">
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main role="main">
            <ForgotPasswordForm />
          </main>
        </div>
      </div>
    </>
  );
}

export default ForgettenPasswordPage;
