import React from 'react';
// Constants
import { CompanyName } from '../../../utils/Constants';
// Components
import { HelmetItem } from '../../../components/utils/HelmetItem';
import Navbar from '../../../components/nav/Navbar';
import BlogPostCreationPageMainContainer from '../../../components/blog/admin/createBlogPage/BlogPostCreationPageMainContainer';

function BlogPostCreationPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Create Post'
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
                <h1 className='font-semibold text-lg'>Create Blog Post</h1>
                <p>
                  Create a new blog post by adding text, images or video in the
                  order you want them displayed
                </p>
              </div>
            </header>
          </div>

          {/* Main page content */}
          <BlogPostCreationPageMainContainer />
        </div>
      </div>
    </>
  );
}

export default BlogPostCreationPage;
