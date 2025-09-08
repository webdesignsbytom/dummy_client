import React from 'react';
// Context
import { useUser } from '../../../context/UserContext';
// Constants
import { EDIT_BLOG_POST_PAGE_URL } from '../../../utils/Routes';
// Components
import BlogArticle from '../article/BlogArticle';
import { Link } from 'react-router-dom';

function BlogPostPageMainContainer({ post }) {
  const { isAdmin, isDeveloper } = useUser();
  return (
    <main className='grid relative w-full pt-8 pb-12' role='main'>
      {isAdmin ||
        (isDeveloper && (
          <Link
            to={EDIT_BLOG_POST_PAGE_URL}
            className='border-colour5 border-solid border-2 px-4 py-2 absolute right-6 top-6'
          >
            EDIT
          </Link>
        ))}
      {/* Article */}
      <BlogArticle post={post} />
    </main>
  );
}

export default BlogPostPageMainContainer;
