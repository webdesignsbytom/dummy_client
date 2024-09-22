import React, { useState } from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
// Components
import { HelmetItem } from '../../components/utils/HelmetItem';
import SideNavbar from '../../components/nav/SideNavbar';

function HomePageSideNav() {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <>
      {/* Tab Data */}
      <HelmetItem PageName={'Home'} desc={`Home page of ${CompanyName}.`} />

      {/* Page */}
      <div
        className={`grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden ${
          darkTheme
            ? 'bg-main-background-dark text-text-colour-dark'
            : 'bg-main-background'
        } font-poppins`}
      >
        <div className='grid grid-cols-reg'>
          {/* Navigation */}
          <SideNavbar darkTheme={darkTheme} />

          {/* Main page content */}
          <main role='main' className='grid w-full h-full'>
            <div className='p-4'>home Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti tempore assumenda eum provident quos illum, ipsum asperiores odit id blanditiis commodi labore distinctio ipsam magnam numquam alias in itaque reprehenderit!</div>
          </main>
        </div>
      </div>
    </>
  );
}

export default HomePageSideNav;
