import React from 'react';
// Components
import LoadingSpinner from './LoadingSpinner';
import Navbar from '../nav/Navbar';

function LoadingScreen() {
  return (
    <div
      id='loading-screen'
      className='grid h-screen w-full overflow-hidden'
      aria-live='polite'
      aria-busy='true'
      role='alert'
      aria-labelledby='loading-description'
    >
      <div className='grid grid-rows-reg'>
        <Navbar />

        <main className='grid justify-center items-center'>
          <article className='grid gap-2 h-fit'>
            <div>
              {/* Providing a descriptive aria label for screen readers */}
              <p id='loading-description'>
                The content is loading, please wait...
              </p>
            </div>
            <div className='grid justify-center'>
              {/* Spinner for visual feedback */}
              <LoadingSpinner lg={true} />
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

export default LoadingScreen;
