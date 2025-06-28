import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Api
import client from '../../api/client';
// Constants
import { CompanyName } from '../../utils/Constants';
import { NEWSLETTER_UNSUBSCRIBE_API } from '../../utils/ApiRoutes';
// Data
import {
  newsletterValidationAdditionalMeta,
  newsletterValidationStructuredData,
} from '../../utils/data/MetaData';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import LoadingSpinner from '../../components/utils/LoadingSpinner';

function NewsletterUnsubscribePage() {
  const { subId, uniqueString } = useParams();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [retryStatus, setRetryStatus] = useState(null); // null, 'loading', 'success', 'error'

  const handleRetryUnsubscribe = async () => {
    setRetryStatus('loading');

    client
      .delete(`${NEWSLETTER_UNSUBSCRIBE_API}/${subId}/${uniqueString}`, false)
      .then(() => {
        setStatus('success');
      })
      .catch((err) => {
        console.error('Failed to unsubscribe:', err);
        setStatus('error');
      });
  };

  useEffect(() => {
    client
      .delete(`${NEWSLETTER_UNSUBSCRIBE_API}/${subId}/${uniqueString}`, false)
      .then(() => {
        setStatus('success');
      })
      .catch((err) => {
        console.error('Failed to process unsubscribe:', err);
        setStatus('error');
      });
  }, [subId, uniqueString]);

  return (
    <>
      <HelmetItem
        PageName='Unsubscribe - Newsletter'
        desc={`Unsubscribe from the ${CompanyName} newsletter. Manage your preferences and stop receiving updates.`}
        keywords={`unsubscribe, ${CompanyName} newsletter, stop emails, email preferences`}
        additionalMeta={newsletterValidationAdditionalMeta}
        structuredData={newsletterValidationStructuredData}
      />

      <div className='grid grid-rows-reg min-h-screen bg-colour1 overflow-hidden font-poppins'>
        <div className='grid grid-rows-reg'>
          <Navbar />
          <header className='grid w-full' role='banner'>
            <div className='grid gap-y-4 w-full px-8 text-center lg:container lg:mx-auto py-6'>
              <h1 className='text-xl font-semibold'>
                Unsubscribe Confirmation
              </h1>
              <p className='text-sm text-gray-700 mt-2 max-w-2xl mx-auto'>
                This page processes your request to unsubscribe from the{' '}
                {CompanyName} newsletter.
                <br />
                We’re sorry to see you go, but you can always resubscribe at any
                time.
              </p>
            </div>
          </header>
        </div>

        <main className='grid place-items-center px-4' role='main'>
          <section
            className='grid gap-3 text-center'
            role='status'
            aria-live='polite'
            aria-busy={status === 'loading' || retryStatus === 'loading'}
          >
            {status === 'loading' && (
              <>
                <p className='mb-2'>
                  Processing your unsubscribe request, please wait...
                </p>
                <div className='flex justify-center mx-auto'>
                  <LoadingSpinner lg={true} />
                </div>
              </>
            )}

            {status === 'success' && (
              <>
                <p className='text-green-600 font-medium'>
                  ✅ You have been successfully unsubscribed!
                </p>
                <p className='text-gray-800 text-sm max-w-md'>
                  You will no longer receive emails from the {CompanyName}{' '}
                  newsletter.
                </p>
                <p className='text-gray-600 text-sm'>
                  If this was a mistake or you change your mind, you’re always
                  welcome to subscribe again.
                </p>
              </>
            )}

            {status === 'error' && (
              <>
                <p className='text-red-600 font-medium'>
                  ❌ Unsubscribe request failed or the link is invalid/expired.
                </p>
                <p className='text-gray-800 text-sm max-w-md'>
                  If you believe this is an error, you can retry the unsubscribe
                  request below.
                </p>
                <button
                  onClick={handleRetryUnsubscribe}
                  disabled={retryStatus === 'loading'}
                  className='text-sm text-blue-600 underline hover:text-blue-800 disabled:opacity-50'
                  aria-label='Retry unsubscribe request'
                >
                  {retryStatus === 'loading' ? (
                    <div className='flex justify-center mx-auto'>
                      <LoadingSpinner xs={true} />
                    </div>
                  ) : (
                    'Retry unsubscribe'
                  )}
                </button>
                {retryStatus === 'success' && (
                  <p className='text-green-600 text-sm'>
                    ✅ Your unsubscribe request was successful.
                  </p>
                )}
                {retryStatus === 'error' && (
                  <p className='text-red-600 text-sm'>
                    ❌ Failed to process unsubscribe. Please try again shortly.
                  </p>
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default NewsletterUnsubscribePage;
