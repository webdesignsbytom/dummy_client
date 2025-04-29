import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import ContactFormAdminPageMainContainer from '../../components/contact/admin/ContactFormAdminPageMainContainer'

function ContactFormAdminPage() {
  return (
    <>
      {/* Page */}
      <div className='grid min-h-screen bg-colour1 text-colour2 font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <ContactFormAdminPageMainContainer />
        </div>
      </div>
    </>
  );
}

export default ContactFormAdminPage;
