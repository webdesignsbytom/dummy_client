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
        PageName='Newsletter Email Validation'
        desc={`Stay updated with the latest from ${CompanyName}. Subscribe to our newsletter for news, updates, and special offers.`}
        keywords={`newsletter, subscribe, email confirmation, ${CompanyName}`}
      />

      <div className='grid min-h-screen bg-colour1 overflow-hidden font-poppins'>
        <div className='grid grid-rows-reg'>
          <Navbar />
          <header className='grid w-full'>
            <div className='grid w-full px-8 text-center lg:container lg:mx-auto py-6'>
              <h1 className='text-xl font-semibold'>Newsletter Validation</h1>
            </div>
          </header>
        </div>

        <main className='grid place-items-center px-4 py-12'>
          {status === 'loading' && (
            <div className='grid justify-center'>
              <p>Validating your email...</p>
              <div className='flex justify-center mx-auto'>
                <LoadingSpinner lg={true} />
              </div>
            </div>
          )}

          {status === 'success' && (
            <p className='text-green-600'>
              ✅ Your email has been successfully confirmed. Thank you!
            </p>
          )}

          {status === 'error' && (
            <div className='grid gap-3 text-center'>
              <p className='text-red-600'>
                ❌ This verification link is invalid or has expired.
              </p>
              <button
                onClick={handleResendVerification}
                disabled={resendStatus === 'loading'}
                className='text-sm text-blue-600 underline hover:text-blue-800 disabled:opacity-50'
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
                  ❌ Failed to resend. Please try again later.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default NewsletterValidationPage;
