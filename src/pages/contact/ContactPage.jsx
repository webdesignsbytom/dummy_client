import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import ContactForm from '../../components/forms/ContactForm';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import { contactPageAdditionalMeta, contactPageStructuredData } from '../../utils/data/PageData';

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
          <main role="main" className="grid w-full h-full overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_2fr] w-full h-full justify-center items-center p-2 overflow-hidden">
              {/* Header */}
              <header className="grid px-6 text-center lg:px-10">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Contact Us
                </h1>
              </header>
              {/* Contact component */}
              <div className="grid pr-10">
                <section className="grid border-[1px] border-border-main border-solid rounded-xl shadow-2xl bg-white">
                  <div className="grid gap-4 w-full h-full px-8 py-6">
                    {/* Contact form */}
                    <section>
                      <ContactForm />
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
