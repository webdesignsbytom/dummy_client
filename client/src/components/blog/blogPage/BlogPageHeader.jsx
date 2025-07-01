import React from 'react';
import { CompanyName } from '../../../utils/Constants';
import SearchBarComponent from '../../search/SearchBarComponent';

function BlogPageHeader() {
  return (
    <header className='grid w-full h-fit'>
      <div className='grid gap-4 w-full py-12 px-6 sm:px-8 md:px-12 lg:px-20'>
        <section className='grid gap-4 w-full text-center'>
          <div>
            <h1 className='text-2xl font-semibold'>{CompanyName} Blog</h1>
          </div>
          <div>
            <h2 className='font-semibold'>
              Read about my life and keep up to date with events.
            </h2>
          </div>
        </section>

        {/* Search */}
        <SearchBarComponent />
      </div>
    </header>
  );
}

export default BlogPageHeader;
