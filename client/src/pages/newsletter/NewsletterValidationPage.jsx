import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Api
import client from '../../api/client';
// Constants
import { CompanyName } from '../../utils/Constants';
import {
  NEWSLETTER_RESEND_VALIDATE_EMAIL_API,
  NEWSLETTER_VALIDATE_EMAIL_API,
} from '../../utils/ApiRoutes';
// Data
import {
  newsletterValidationAdditionalMeta,
  newsletterValidationStructuredData,
} from '../../utils/data/MetaData';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
import LoadingSpinner from '../../components/utils/LoadingSpinner';

function NewsletterValidationPage() {
  const { userId, verificationTokenId, uniqueString } = useParams();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [resendStatus, setResendStatus] = useState(null); // null, 'loading', 'success', 'error'

  useEffect(() => {
    const verifyEmail = async () => {
      if (!userId || !verificationTokenId || !uniqueString) {
        setStatus('error');
        return;
      }

      client
        .patch(
          `${NEWSLETTER_VALIDATE_EMAIL_API}/${userId}/${verificationTokenId}/${uniqueString}`,
          null,
          false
        )
        .then((res) => {
          setStatus(res.status === 'success' ? 'success' : 'error');
        })
        .catch((err) => {
          console.error('Email verification failed:', err);
          setStatus('error');
        });
    };

    verifyEmail();
  }, []);

  const handleResendVerification = async () => {
    setResendStatus('loading');

    client
      .post(`${NEWSLETTER_RESEND_VALIDATE_EMAIL_API}/${userId}`, null, false)
      .then(() => {
        setResendStatus('success');
      })
      .catch((err) => {
        console.error('Failed to resend verification:', err);
        setResendStatus('error');
      });
  };

  return (
    <>
      <HelmetItem
        PageName='Confirm Your Email - Newsletter'
        desc={`Verify your email address to complete your subscription to the ${CompanyName} newsletter. Get updates, offers, and exclusive insights.`}
        keywords={`email verification, ${CompanyName} newsletter, confirm email, subscribe, updates`}
        additionalMeta={newsletterValidationAdditionalMeta}
        structuredData={newsletterValidationStructuredData}
      />

      <div className='grid grid-rows-reg min-h-screen bg-colour1 overflow-hidden font-poppins'>
        <div className='grid grid-rows-reg'>
          <Navbar />
          <header className='grid w-full' role='banner'>
            <div className='grid gap-y-4 w-full px-8 text-center lg:container lg:mx-auto py-6'>
              <h1 className='text-xl font-semibold'>Email Confirmation</h1>
              <p className='text-sm text-gray-700 mt-2 max-w-2xl mx-auto'>
                You're nearly done! This page confirms your subscription to the{' '}
                {CompanyName} newsletter. <br />
                Once validated, you’ll start receiving updates, offers, and
                helpful resources right in your inbox.
              </p>
            </div>
          </header>
        </div>

        <main className='grid place-items-center px-4' role='main'>
          <section
            className='grid gap-3 text-center'
            role='status'
            aria-live='polite'
            aria-busy={status === 'loading' || resendStatus === 'loading'}
          >
            {status === 'loading' && (
              <>
                <p className='mb-2'>Validating your email, please wait...</p>
                <div className='flex justify-center mx-auto'>
                  <LoadingSpinner lg={true} />
                </div>
              </>
            )}

            {status === 'success' && (
              <>
                <p className='text-green-600 font-medium'>
                  ✅ Your email has been successfully confirmed!
                </p>
                <p className='text-gray-800 text-sm max-w-md'>
                  You’re now subscribed to the {CompanyName} newsletter. Expect
                  occasional updates packed with useful content, special offers,
                  and news.
                </p>
                <p className='text-gray-600 text-sm'>
                  Thanks for confirming — we’re glad to have you on board!
                </p>
              </>
            )}

            {status === 'error' && (
              <>
                <p className='text-red-600 font-medium'>
                  ❌ This verification link is invalid or has expired.
                </p>
                <p className='text-gray-800 text-sm max-w-md'>
                  If the link was broken or has timed out, you can request a new
                  one below.
                </p>
                <button
                  onClick={handleResendVerification}
                  disabled={resendStatus === 'loading'}
                  className='text-sm text-blue-600 underline hover:text-blue-800 disabled:opacity-50'
                  aria-label='Resend newsletter verification email'
                >
                  {resendStatus === 'loading' ? (
                    <div className='flex justify-center mx-auto'>
                      <LoadingSpinner xs={true} />
                    </div>
                  ) : (
                    'Resend verification email'
                  )}
                </button>
                {resendStatus === 'success' && (
                  <p className='text-green-600 text-sm'>
                    ✅ A new verification email has been sent.
                  </p>
                )}
                {resendStatus === 'error' && (
                  <p className='text-red-600 text-sm'>
                    ❌ Failed to resend. Please try again shortly.
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

export default NewsletterValidationPage;
