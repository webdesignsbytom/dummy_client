import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import CallbackFormAdminPageMainContainer from '../../components/contact/admin/CallbackFormAdminPageMainContainer';

function CallbackFormAdminPage() {
  return (
    <>
      {/* Page */}
      <div className='grid min-h-screen bg-colour1 text-colour2 font-poppins'>
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
