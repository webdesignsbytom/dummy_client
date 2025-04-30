import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import CallbackFormAdminPageMainContainer from '../../components/contact/admin/CallbackFormAdminPageMainContainer';

function CallbackFormAdminPage() {
  return (
    <>
      {/* Document-level semantic wrapper */}
      <div
        className='grid min-h-screen overflow-hidden bg-colour1 dark:bg-colour2 text-colour2 dark:text-colour1 font-poppins'
        role='document'
        aria-label='Admin Callback Form Page'
      >
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <CallbackFormAdminPageMainContainer />
        </div>
      </div>
    </>
  );
}

export default CallbackFormAdminPage;
