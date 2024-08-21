import React from 'react';
import { HelmetItem } from '../../components/utils/HelmetItem';
import { CompanyName } from '../../utils/Constants';
import Navbar from '../../components/nav/Navbar';

function HomePage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem PageName={'Login'} desc={`Home page of ${CompanyName}.`} />

      {/* Page */}
      <div className='grid min-h-screen bg-slate-50'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />
          HomePage
        </div>
      </div>
    </>
  );
}

export default HomePage;
