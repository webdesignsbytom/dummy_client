import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import { maintenancePageAdditionalMeta, maintenancePageStructuredData } from '../../utils/data/MetaData';

function MaintenancePage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName="Maintenance"
        desc={`The ${CompanyName} website is currently undergoing maintenance. We’ll be back shortly with exciting updates.`}
        keywords={`maintenance, ${CompanyName}, website down, updates`}
        additionalMeta={maintenancePageAdditionalMeta}
        structuredData={maintenancePageStructuredData}
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
