import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// Context
import { UserContext } from '../../context/UserContext';
// Constants
import { POLICIES_PAGE_URL } from '../../utils/Constants';
// Styles
import { ButtonStyle, CancelButtonStyle, LinkStyle } from '../../utils/Styles';

function CookieConsentModal() {
  const { hasAgreedToCookies, setHasAgreedToCookies } = useContext(UserContext);
  console.log('aaaaaaa');

  const handleAgree = () => {
    localStorage.setItem('CookiePolicy', 'true');
    setHasAgreedToCookies(true);
  };

  const handleDisagree = () => {
    setHasAgreedToCookies(true);
  };

  if (hasAgreedToCookies) {
    return null; // Don't render if the user has already agreed
  } else {
    return (
      <section
        aria-label='Cookie policy consent form'
        className='grid fixed transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-max'
      >
        <div className='grid rounded-xl px-4 py-6 shadow-xl h-full w-full bg-white'>
          <article className='grid gap-4 h-full w-full grid-rows-rev'>
            <div className='grid gap-4 w-full h-full'>
              <div className='text-center'>
                <h2 className='text-lg font-medium'>Cookie Consent</h2>
              </div>
              <div className='grid gap-2 h-full w-full px-2'>
                <p>
                  We use cookies to improve your experience on our site. Please
                  accept cookies before continuing.
                </p>
                <p>
                  We currently use <span className='text-green-600'>{0}</span>{' '}
                  cookies.
                </p>
                <p>
                  You can read futher and find out more about our policies and
                  how we use your data by{' '}
                  <Link
                    to={POLICIES_PAGE_URL}
                    className={LinkStyle}
                    aria-label='Forgot password?'
                  >
                    Following this Link.
                  </Link>
                </p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-2 w-full h-fit'>
              <div>
                <button className={CancelButtonStyle} onClick={handleDisagree}>
                  Disagree
                </button>
              </div>
              <div>
                <button className={ButtonStyle} onClick={handleAgree}>
                  I Agree
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }
}

export default CookieConsentModal;
