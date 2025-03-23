import React from 'react';
// Components
import BlogArticle from '../article/BlogArticle';

function BlogPostPageMainContainer({ post }) {
  return (
    <main className='grid w-full pt-8 pb-12' role='main'>
      {/* Article */}
      <BlogArticle post={post} />
    </main>
  );
}

export default BlogPostPageMainContainer;
