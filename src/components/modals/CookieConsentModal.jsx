import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Context
import { useUser } from '../../context/UserContext';
// Constants
import { COOKIE_TIMER, NumberOfCookies, POLICIES_PAGE_URL } from '../../utils/Constants';
// Styles
import { ButtonStyle, CancelButtonStyle, LinkStyle } from '../../utils/Styles';

function CookieConsentModal() {
  const { hasAgreedToCookies, setHasAgreedToCookies } = useUser();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, COOKIE_TIMER);

    return () => clearTimeout(timer); // Clean up the timer when component unmounts
  }, []);

  const handleAgree = () => {
    localStorage.setItem('CookiePolicy', 'true');
    setHasAgreedToCookies(true);
  };

  const handleDisagree = () => {
    setHasAgreedToCookies(true);
  };

  if (hasAgreedToCookies || !isVisible) {
    return null;
  }

  return (
    <section
      aria-label='Cookie policy consent form'
      role="dialog"
      aria-modal="true"
      className='grid fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-max w-full justify-center px-2 md:px-0'
    >
      <div className='grid rounded-xl px-4 pt-6 pb-4 shadow-xl h-full w-full bg-main-background max-w-md'>
        <article className='grid gap-4 h-full w-full grid-rows-rev'>
          <div className='grid gap-4 w-full h-full'>
            <div className='text-center'>
              <h2 className='text-lg font-medium'>Cookie Consent</h2>
            </div>
            <div className='grid gap-2 h-full w-full px-2'>
              <p>
                We use cookies to improve your experience on our site.
                Please accept cookies before continuing.
              </p>
              <p>
                We currently use{' '}
                <span className='text-green-600 font-bold'>
                  {Number(NumberOfCookies)}
                </span>{' '}
                cookies.
              </p>
              <p>
                You can read further and find out more about our policies and
                how we use your data by{' '}
                <Link
                  to={POLICIES_PAGE_URL}
                  className={LinkStyle}
                  aria-label='Read our policies page'
                >
                  clicking here.
                </Link>
              </p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2 w-full h-fit'>
            <div>
              <button
                className={CancelButtonStyle}
                onClick={handleDisagree}
                aria-label="Disagree to cookie usage"
              >
                Disagree
              </button>
            </div>
            <div>
              <button
                className={ButtonStyle}
                onClick={handleAgree}
                aria-label="Agree to cookie usage"
              >
                I Agree
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default CookieConsentModal;
