import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // <-- Add this
// Constants
import { CompanyName } from '../../utils/Constants';
// Api
import client from '../../api/client';
// Constants
import { HOME_PAGE_URL } from '../../utils/Routes';
import { VERIFY_EMAIL_API } from '../../utils/ApiRoutes';
// Hooks
import useNavigateToPage from '../../hooks/useNavigateToPage';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';

function VerifyEmailPage() {
  const { userId, uniqueString } = useParams();
  const [hasFailed, setHasFailed] = useState(false);
  const navigateToPage = useNavigateToPage();

  useEffect(() => {
    if (!userId || !uniqueString) {
      setHasFailed(true);
      return;
    }

    client
      .get(`${VERIFY_EMAIL_API}/${userId}/${uniqueString}`)
      .then(() => navigateToPage(HOME_PAGE_URL))
      .catch((err) => {
        console.error('Unable to verify email address', err);
        setHasFailed(true);
      });
  }, [userId, uniqueString, navigateToPage]);

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Verify Email'
        desc={`Verify your email for your ${CompanyName} account.`}
        additionalMeta={[]}
        structuredData={[]}
      />

      {/* Page */}
      <div className='grid min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden bg-main-background font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Header */}
          <header className='grid text-center'>
            <h1
              id="verify-email-heading"
              className='text-3xl font-bold leading-tight tracking-tight font-gladolia text-colour2 md:text-2xl dark:text-colour6'
              aria-live="polite" // Announce changes to screen readers
            >
              {hasFailed ? 'Verification Failed' : 'Verifying Email...'}
            </h1>
          </header>
          
          {/* Main page content */}
          <main role='main' className='grid w-full h-full overflow-hidden'>
            <div className='grid w-full h-full items-center py-2 px-10 overflow-hidden'>
              <section
                className='grid border-[1px] border-colour6 border-solid rounded-xl shadow-cardShadow w-full bg-colour1'
                aria-labelledby="verify-email-heading" // Linking section to header
              >
                <div className='grid grid-rows-reg gap-4 w-full h-full px-6 py-6'>
                  {/* You can add a message indicating the process here */}
                  {hasFailed && (
                    <p role="alert" aria-live="assertive" className="text-red-600">
                      There was an issue verifying your email. Please try again later.
                    </p>
                  )}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default VerifyEmailPage;
