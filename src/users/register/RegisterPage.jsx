import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import RegisterCard from '../../components/user/RegisterCard';
// Utils
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import { registerPageAdditionalMeta, registerPageStructuredData } from '../../utils/data/MetaData';

function RegisterPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Register'
        desc={`Register with ${CompanyName} to access exclusive features.`}
        additionalMeta={registerPageAdditionalMeta}
        structuredData={registerPageStructuredData}
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
