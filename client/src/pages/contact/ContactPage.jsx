import React from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import {
  contactPageAdditionalMeta,
  contactPageStructuredData,
} from '../../utils/data/MetaData';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import ContactPageMainContainer from '../../components/contact/ContactPageMainContainer';
import ContactPageHeader from '../../components/contact/ContactPageHeader';

function ContactPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Contact'
        desc={`Get in touch with ${CompanyName} for expert web and circuit design services. We're here to help with your inquiries, quotes, or support needs.`}
        keywords={`contact, web design, circuit design, ${CompanyName}, customer support, inquiries, quotes, UK`}
        additionalMeta={contactPageAdditionalMeta}
        structuredData={contactPageStructuredData}
      />

      {/* Skip link (a11y) */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-2 focus:outline-none focus:ring-2'
      >
        Skip to main content
      </a>

      {/* Page */}
      <div className='grid min-h-screen overflow-hidden bg-colour1 text-colour2 dark:bg-colour2 dark:text-colour1 font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />
          {/* Header */}
          <ContactPageHeader />
        </div>

        {/* Main page content */}
        <ContactPageMainContainer />
      </div>
    </>
  );
}

export default ContactPage;
