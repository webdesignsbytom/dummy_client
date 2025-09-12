import React from 'react';
import { useLocation } from 'react-router-dom';
// Constants
import { CompanyName } from '../../../utils/Constants';
// Components
import { HelmetItem } from '../../../components/utils/HelmetItem';
import Navbar from '../../../components/nav/Navbar';
import EditBlogPageMainContainer from '../../../components/blog/admin/editBlogPage/EditBlogPageMainContainer';

function BlogPostEditPage() {
  const location = useLocation();
  const postId = location.state?.postId || null;
console.log('postId', postId);
console.log('location.state', location.state);
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Edit Blog Post'
        desc={`${CompanyName} offers expert web and circuit design solutions in England. Discover our services and featured projects.`}
        keywords={`web design, circuit design, ${CompanyName}, England, UK, custom solutions`}
        additionalMeta={[]}
        structuredData={[]}
      />

      {/* Page */}
      <div className='grid min-h-screen overflow-hidden bg-colour1 text-colour2 dark:bg-colour2 dark:text-colour1 font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <div>
            <Navbar />
            <header className='grid w-full bg-colour5 h-fit'>
              <div className='grid w-full gap-y-2 py-4 text-center text-colour1'>
                <h1 className='font-semibold text-lg'>Edit Blog Post</h1>
                <h2>ID: {postId}</h2>
              </div>
            </header>
          </div>

          {/* Main page content */}
          <EditBlogPageMainContainer postId={postId} />
        </div>
      </div>
    </>
  );
}

export default BlogPostEditPage;
