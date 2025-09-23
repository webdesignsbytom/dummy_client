import React from 'react';
// Components
import ContactForm from '../forms/ContactForm';

function ContactPageMainContainer() {
  return (
    <main role='main' className='grid w-full h-full pb-12'>
      {/* Form section */}
      <section className='grid w-full'>
        <div className='grid w-full px-6 lg:container lg:mx-auto'>
          <section className='grid border-[1px] border-border-main border-solid rounded-xl shadow-2xl bg-colou1'>
            <div className='grid gap-4 w-full h-full px-8 py-6'>
              {/* Contact form */}
              <section id='main-content'>
                <ContactForm />
              </section>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default ContactPageMainContainer;
