import React from 'react';
import { HelmetItem } from '../../components/utils/HelmetItem';
import { CompanyName } from '../../utils/Constants';
import Navbar from '../../components/nav/Navbar';

function HomePage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem PageName={'Home'} desc={`Home page of ${CompanyName}.`} />

      {/* Page */}
      <div className='grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-slate-50'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main role='main'>HomePage</main>
        </div>
      </div>
    </>
  );
}

export default HomePage;
