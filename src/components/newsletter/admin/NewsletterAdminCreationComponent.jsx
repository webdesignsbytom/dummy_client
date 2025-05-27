import React, { useState } from 'react';
// Api
import client from '../../../api/client';
// Constants
import { CREATE_NEW_NEWSLETTER_API } from '../../../utils/ApiRoutes';
// Components
import NewsletterCreationForm from '../../forms/NewsletterCreationForm';
import LoadingSpinner from '../../utils/LoadingSpinner';

function NewsletterAdminCreationComponent() {
  const [isCreatingNewNewsletter, setIsCreatingNewNewsletter] = useState(false);
  const [isNewsletterFormOpen, setIsNewsletterFormOpen] = useState(false);
  const [newsletterData, setNewsletterData] = useState({});
  console.log('newsletterData', newsletterData);
  const createNewNewsletter = () => {
    setIsCreatingNewNewsletter(true);

    client
      .post(CREATE_NEW_NEWSLETTER_API, null, false)
      .then((res) => {
        console.log('Created new newsletter');
        setIsNewsletterFormOpen(true);
        setIsCreatingNewNewsletter(false);
        setNewsletterData(res.data.newsletter);
      })
      .catch((err) => {
        console.error('Unable to create new newsletter', err);
        setIsCreatingNewNewsletter(false);
      });
  };

  return (
    <section className='grid w-full'>
      <div className='grid gap-y-4 w-full px-6'>
        <section className='grid h-fit'>
          <h2 className='text-2xl font-semibold'>Newsletter Admin</h2>
        </section>

        {/* Controls */}
        <section>
          <div>
            <button
              onClick={createNewNewsletter}
              className='py-1 px-4 bg-colour5'
            >
              Create +
            </button>
          </div>
        </section>

        {/* Loading */}
        {isCreatingNewNewsletter && (
          <section className='grid justify-center'>
            <LoadingSpinner md={true} />
          </section>
        )}

        {/* Create newsletter orm */}
        {isNewsletterFormOpen && (
          <section>
            <NewsletterCreationForm newsletterData={newsletterData} setNewsletterData={setNewsletterData} />
          </section>
        )}
      </div>
    </section>
  );
}

export default NewsletterAdminCreationComponent;
