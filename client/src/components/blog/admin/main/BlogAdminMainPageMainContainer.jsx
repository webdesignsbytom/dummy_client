import React from 'react';
import BlogSummaryComponent from './BlogSummaryComponent';
import { CREATE_BLOG_POST_PAGE_URL } from '../../../../utils/Routes';
import { Link } from 'react-router-dom';

function BlogAdminMainPageMainContainer() {
  return (
    <main role='main' className='grid w-full pt-8'>
      <div className='grid grid-rows-reg gap-y-8'>
        <section className='grid px-8 text-center'>
          <Link
            to={CREATE_BLOG_POST_PAGE_URL}
            className='items-center bg-colour5 text-colour1 text-center px-4 py-2 text-xs font-medium rounded border-2 border-solid border-colour2 hover:brightness-90'
          >
            Create New Blog +
          </Link>
        </section>
        <BlogSummaryComponent />
      </div>
    </main>
  );
}

export default BlogAdminMainPageMainContainer;
