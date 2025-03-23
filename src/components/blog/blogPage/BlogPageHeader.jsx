import React from 'react';
import { CompanyName } from '../../../utils/Constants';

function BlogPageHeader() {
  return (
    <header className='grid w-full'>
      <div className='grid w-full py-8'>
        <section className='grid w-full text-center'>
          <div>
            <h1 className='text-2xl font-semibold'>{CompanyName} Blog</h1>
          </div>
        </section>
      </div>
    </header>
  );
}

export default BlogPageHeader;
