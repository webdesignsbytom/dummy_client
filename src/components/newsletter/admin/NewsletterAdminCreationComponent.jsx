import React from 'react';
import NewsletterCreationForm from '../../forms/NewsletterCreationForm';

function NewsletterAdminCreationComponent() {
  return (
    <section className='grid w-full'>
      <div className='grid w-full px-6'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Send Newsletter</h2>
        </div>

        {/* Form */}
        <section>
          <NewsletterCreationForm />
        </section>
      </div>
    </section>
  );
}

export default NewsletterAdminCreationComponent;
