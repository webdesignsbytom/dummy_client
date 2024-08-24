import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';

function ForgettenPasswordPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem PageName={'Reset Password'} desc={`Reset your password for ${CompanyName}.`} />

      {/* Page */}
      <div className='grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-slate-50'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main role='main'>ForgettenPasswordPage</main>
        </div>
      </div>
    </>
  );
}

export default ForgettenPasswordPage;
