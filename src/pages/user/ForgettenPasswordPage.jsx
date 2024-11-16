import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';

function ForgettenPasswordPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName="Reset Password"
        desc={`Reset your password for ${CompanyName} to regain access to your account.`}
        keywords={`reset password, forgot password, account recovery, ${CompanyName}`}
        additionalMeta={[
          { property: 'og:title', content: `Reset Password - ${CompanyName}` },
          { property: 'og:description', content: `Securely reset your ${CompanyName} account password.` },
          { property: 'og:image', content: 'https://localhost:9000/user/reset-password-preview.jpg' }, // A relevant reset password image
          { property: 'og:url', content: 'https://yourwebsite.com/reset-password' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Reset Password - ${CompanyName}` },
          { name: 'twitter:description', content: `Follow the steps to reset your ${CompanyName} password securely.` },
          { name: 'twitter:image', content: 'https://localhost:9000/user/reset-password-preview.jpg' },
          { name: 'robots', content: 'noindex, nofollow' }, // Prevents indexing for security
        ]}
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
