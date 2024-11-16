import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
import ContactForm from '../../components/forms/ContactForm';

function ContactPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName="Contact"
        desc={`Get in touch with ${CompanyName} to discuss your needs, ask questions, or provide feedback.`}
        keywords="contact, support, help, feedback, inquiries, customer service"
        additionalMeta={[
          { property: 'og:title', content: `Contact - ${CompanyName}` },
          { property: 'og:description', content: `Reach out to ${CompanyName} for any questions, support, or inquiries.` },
          { property: 'og:image', content: 'https://localhost:9000/contact/contact-preview.jpg' }, // Relevant contact page image
          { property: 'og:url', content: 'https://yourwebsite.com/contact' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `Contact - ${CompanyName}` },
          { name: 'twitter:description', content: `Contact ${CompanyName} for support, questions, or feedback.` },
          { name: 'twitter:image', content: 'https://localhost:9000/contact/contact-preview.jpg' },
        ]}
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
