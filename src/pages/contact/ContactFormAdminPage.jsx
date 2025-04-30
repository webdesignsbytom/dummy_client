import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import ContactFormAdminPageMainContainer from '../../components/contact/admin/ContactFormAdminPageMainContainer';

function ContactFormAdminPage() {
  return (
    <>
      {/* Document-level semantic wrapper */}
      <div
        className='grid min-h-screen overflow-hidden bg-colour1 text-colour2 font-poppins'
        role='document'
        aria-label='Admin Contact Form Page'
      >
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <ContactFormAdminPageMainContainer />
        </div>
      </div>
    </>
  );
}

export default ContactFormAdminPage;
