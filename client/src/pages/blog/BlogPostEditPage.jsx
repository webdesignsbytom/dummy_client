import React from 'react';
// Constants
import { CompanyName } from '../../utils/Constants';
// Components
import { HelmetItem } from '../../components/utils/HelmetItem';
import Navbar from '../../components/nav/Navbar';

function BlogPostEditPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Edit Blog Post'
        desc={`${CompanyName} offers expert web and circuit design solutions in England. Discover our services and featured projects.`}
        keywords={`web design, circuit design, ${CompanyName}, England, UK, custom solutions`}
        // additionalMeta={homePageAdditionalMeta}
        // structuredData={homePageStructuredData}
      />

      {/* Page */}
      <div className='grid min-h-screen overflow-hidden bg-colour1 text-colour2 dark:bg-colour2 dark:text-colour1 font-poppins'>
        <div className='grid'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
        </div>
      </div>
    </>
  );
}

export default BlogPostEditPage;
