import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';

function MaintenancePage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName="Maintenance"
        desc={`The ${CompanyName} website is currently undergoing maintenance. We will be back shortly.`}
        keywords="maintenance, downtime, website updates"
        additionalMeta={[
          { property: 'og:title', content: `Maintenance - ${CompanyName}` },
          { property: 'og:description', content: `Our website is temporarily down for maintenance. Please check back soon.` },
          { property: 'og:image', content: 'https://localhost:9000/maintenance/maintenance-preview.jpg' }, // Use a generic maintenance image
          { property: 'og:url', content: 'https://yourwebsite.com/maintenance' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Maintenance - ${CompanyName}` },
          { name: 'twitter:description', content: `We’re currently performing scheduled maintenance. Thank you for your patience.` },
          { name: 'twitter:image', content: 'https://localhost:9000/maintenance/maintenance-preview.jpg' },
          { name: 'robots', content: 'noindex, nofollow' }, // Prevents indexing as this is temporary
        ]}
      />

      {/* Page */}
      <div className="grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins">
        <div className="grid grid-rows-reg">
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main role="main" className="grid place-items-center text-center">
            <h1 className="text-2xl font-bold">We'll be back soon!</h1>
            <p className="text-lg mt-2">
              Our site is currently undergoing scheduled maintenance.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Thank you for your patience.
            </p>
          </main>
        </div>
      </div>
    </>
  );
}

export default MaintenancePage;
