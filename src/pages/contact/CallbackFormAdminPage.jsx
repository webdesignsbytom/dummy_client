import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import CallbackFormAdminPageMainContainer from '../../components/contact/admin/CallbackFormAdminPageMainContainer';

function CallbackFormAdminPage() {
  return (
    <>
      {/* Page */}
      <div className='grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <CallbackFormAdminPageMainContainer />
        </div>
      </div>
    </>
  );
}

export default CallbackFormAdminPage;
