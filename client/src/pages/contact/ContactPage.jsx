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

      {/* Page */}
      <div className='grid min-h-screen overflow-hidden bg-colour1 text-colour2 dark:bg-colour2 dark:text-colour1 font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />
          {/* Header */}
          <header className='grid w-full'>
            <div className='grid w-full px-6 lg:container lg:mx-auto text-center py-6'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Contact Us
              </h1>
            </div>
          </header>
        </div>

        {/* Main page content */}
        <ContactPageMainContainer />
      </div>
    </>
  );
}

export default ContactPage;
