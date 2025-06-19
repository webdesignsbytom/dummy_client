import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// Api
import client from '../../api/client';
// Constants
import { CompanyName } from '../../utils/Constants';
import { NEWSLETTER_VALIDATE_EMAIL_API } from '../../utils/ApiRoutes';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';

function NewsletterValidationPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'

  const userId = searchParams.get('userId');
  const verificationId = searchParams.get('tokenId');
  const uniqueString = searchParams.get('uniqueString');
  console.log('userId', userId);
  console.log('verificationId', verificationId);
  console.log('uniqueString', uniqueString);
  
  useEffect(() => {
    const verifyEmail = async () => {
      if (!userId || !verificationId || !uniqueString) {
        setStatus('error');
        return;
      }

      client
        .patch(
          `${NEWSLETTER_VALIDATE_EMAIL_API}/${userId}/${verificationId}/${uniqueString}`,
          null,
          false
        )
        .then((res) => {
          if (res.status === 200) {
            setStatus('success');
          } else {
            setStatus('error');
          }
        })
        .catch((err) => {
          console.error('Email verification failed:', err);
          setStatus('error');
        });
    };

    verifyEmail();
  }, [userId, verificationId, uniqueString]);

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
          {status === 'loading' && <p>Validating your email...</p>}
          {status === 'success' && (
            <p className='text-green-600'>
              ✅ Your email has been successfully confirmed. Thank you!
            </p>
          )}
          {status === 'error' && (
            <p className='text-red-600'>
              ❌ This verification link is invalid or has expired.
            </p>
          )}
        </main>
      </div>
    </>
  );
}

export default NewsletterValidationPage;
