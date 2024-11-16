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
        PageName="Login"
        desc={`Log in to your ${CompanyName} account to access exclusive features, including personalized simulations and tools.`}
        keywords="login, account, user, access, simulations, tools"
        additionalMeta={[
          { property: 'og:title', content: `Login - ${CompanyName}` },
          { property: 'og:description', content: `Access your ${CompanyName} account to explore exclusive simulations and tools.` },
          { property: 'og:image', content: 'https://localhost:9000/user/login-preview.jpg' }, // Relevant login page image
          { property: 'og:url', content: 'https://yourwebsite.com/login' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Login - ${CompanyName}` },
          { name: 'twitter:description', content: `Log in to your ${CompanyName} account and unlock exclusive features.` },
          { name: 'twitter:image', content: 'https://localhost:9000/user/login-preview.jpg' },
          { name: 'robots', content: 'noindex, nofollow' }, // Prevent indexing for security reasons
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
