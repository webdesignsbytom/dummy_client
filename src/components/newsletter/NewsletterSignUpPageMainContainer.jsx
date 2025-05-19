import React from 'react';
// Components
import NewsletterForm from '../forms/NewsletterForm';

function NewsletterSignUpPageMainContainer() {
  return (
    <main role='main' className='grid w-full h-full pb-12'>
      {/* Form section */}
      <section className='grid w-full'>
        <div className='grid w-full px-6 lg:container lg:mx-auto'>
          <section className='grid border-[1px] h-fit border-border-main border-solid rounded-xl shadow-2xl w-full bg-colour1 max-w-2xl mx-auto'>
            <div className='grid gap-4 w-full h-full px-8 py-6'>
              {/* Contact form */}
              <section>
                <NewsletterForm />
              </section>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default NewsletterSignUpPageMainContainer;
