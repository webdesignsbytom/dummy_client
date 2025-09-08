import React from 'react';
// Constants
import { CompanyName } from '../../../utils/Constants';
// Components
import { HelmetItem } from '../../../components/utils/HelmetItem';
import Navbar from '../../../components/nav/Navbar';
import BlogAdminMainPageMainContainer from '../../../components/blog/admin/main/BlogAdminMainPageMainContainer';

function BlogAdminMainPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Blog Admin'
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
                <h1 className='font-semibold text-lg'>Admin - Blog Posts</h1>
                <h2>Create, edit and review you current blog</h2>
              </div>
            </header>
          </div>

          {/* Main page content */}
          <BlogAdminMainPageMainContainer />
        </div>
      </div>
    </>
  );
}

export default BlogAdminMainPage;
