import React from 'react';
import AppAnchor from '../utils/AppAnchor';
// Components

function HomePageMainContainer() {
  return (
    <main role='main' className='grid w-full h-full'>
      <div>
        <AppAnchor
          href='https://instagram.com/sivrenate'
          ariaLabel='Visit Siv Renate on Instagram'
          titleAttr='Instagram — Siv Renate'
          target='_blank'
          rel='noopener noreferrer nofollow'
        >
          <span>Instagram</span>
        </AppAnchor>
      </div>
    </main>
  );
}

export default HomePageMainContainer;
