import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import { contactPageAdditionalMeta, contactPageStructuredData } from '../../utils/data/MetaData';

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
      <div className="grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins">
        <div className="grid grid-rows-reg">
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main role="main" className="grid w-full h-full">
           
          </main>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
