import React from 'react';
// Constants
import { CompanyName } from '../../../utils/Constants';
// Components
import Navbar from '../../../components/nav/Navbar';
import ContactFormAdminPageMainContainer from '../../../components/contact/admin/ContactFormAdminPageMainContainer';
import { HelmetItem } from '../../../components/utils/HelmetItem';

function ContactFormAdminPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Admin Contact Forms'
        desc={`Administrative dashboard for managing contact form submissions to ${CompanyName}. Review, respond, and track inquiries efficiently.`}
        keywords={`admin contact form, ${CompanyName} admin, message management, inquiries dashboard, customer support admin`}
        additionalMeta={[]}
        structuredData={[]}
      />

      {/* Document-level semantic wrapper */}
      <div
        className='grid min-h-screen overflow-hidden bg-colour1 dark:bg-colour2 text-colour2 dark:text-colour1 font-poppins'
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
