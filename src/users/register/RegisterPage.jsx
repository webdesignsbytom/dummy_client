import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import RegisterCard from '../../components/user/RegisterCard';
// Utils
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';

function RegisterPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName="Register"
        desc={`Create a ${CompanyName} account to access personalized simulations, tools, and exclusive features.`}
        keywords="register, sign up, create account, simulations, tools, exclusive features"
        additionalMeta={[
          { property: 'og:title', content: `Register - ${CompanyName}` },
          { property: 'og:description', content: `Sign up for a ${CompanyName} account and unlock exclusive access to simulations and tools.` },
          { property: 'og:image', content: 'https://localhost:9000/user/register-preview.jpg' }, // Relevant registration page image
          { property: 'og:url', content: 'https://yourwebsite.com/register' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Register - ${CompanyName}` },
          { name: 'twitter:description', content: `Join ${CompanyName} and gain access to personalized simulations and tools.` },
          { name: 'twitter:image', content: 'https://localhost:9000/user/register-preview.jpg' },
          { name: 'robots', content: 'noindex, nofollow' }, // Prevents indexing for privacy
        ]}
      />

      {/* Page */}
      <div className="grid h-screen min-h-screen max-h-screen overflow-hidden w-full main__bg font-poppins">
        <div className="grid grid-rows-reg w-full h-full overflow-hidden">
          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main role="main" className="grid w-full h-full overflow-hidden">
            <div className="grid w-full h-full justify-center items-center p-2 overflow-hidden">
              {/* Register component */}
              <RegisterCard />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
