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
        PageName={'Maintenance'}
        desc={`Maintenance page of ${CompanyName}.`}
      />

      {/* Page */}
      <div className='grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main role='main'>Page is down for maintenance</main>
        </div>
      </div>
    </>
  );
}

export default MaintenancePage;
