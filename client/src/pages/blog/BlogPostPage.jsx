import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Constants
import { CompanyName } from '../../utils/Constants';
// Components
import { HelmetItem } from '../../components/utils/HelmetItem';
import Navbar from '../../components/nav/Navbar';
import BlogPostPageMainContainer from '../../components/blog/blogPostPage/BlogPostPageMainContainer';
// Data
import { blogPostAdditionalMeta, blogPostStructuredData } from '../../utils/data/MetaData';

function BlogPostPage() {
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!post);
  const [error, setError] = useState(null);
console.log('[BlogPostPage] post', post);
  return (
    <>
      {/* Tab Data */}
      {post && (
        <HelmetItem
          PageName={post.title}
          desc={post.subject || `${CompanyName} offers expert insights in web and circuit design.`}
          keywords={`blog, web design, circuit design, ${CompanyName}, UK`}
          additionalMeta={blogPostAdditionalMeta(post)}
          structuredData={blogPostStructuredData(post)}
        />
      )}

      {/* Page */}
      <div className='grid min-h-screen overflow-hidden bg-colour1 text-colour2 dark:bg-colour2 dark:text-colour1 font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <BlogPostPageMainContainer post={post} />
        </div>
      </div>
    </>
  );
}

export default BlogPostPage;
