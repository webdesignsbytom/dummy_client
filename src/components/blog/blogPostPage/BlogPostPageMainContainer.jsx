import React from 'react';
// Components
import BlogArticle from '../article/BlogArticle';

function BlogPostPageMainContainer({ post }) {
  return (
    <main className='grid w-full' role='main'>
      {/* Article */}
      <BlogArticle post={post} />
    </main>
  );
}

export default BlogPostPageMainContainer;
