import React from 'react';
// Constants
import {
  CompanyName,
  LocationCity,
  LocationCountry,
} from '../../utils/Constants';
// Data
import {
  blogPageAdditionalMeta,
  blogPageStructuredData,
} from '../../utils/data/MetaData';
// Components
import { HelmetItem } from '../../components/utils/HelmetItem';
import Navbar from '../../components/nav/Navbar';
import BlogPageMainContainer from '../../components/blog/blogPage/BlogPageMainContainer';
import BlogPageHeader from '../../components/blog/blogPage/BlogPageHeader';

function BlogPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Blog'
        desc={`Explore the latest articles, insights, and updates from ${CompanyName} covering a variety of topics.`}
        keywords={`blog, articles, insights, updates, ${CompanyName}, ${LocationCity}, ${LocationCountry}, news, tips`}
        additionalMeta={blogPageAdditionalMeta}
        structuredData={blogPageStructuredData}
      />

      {/* Page */}
      <div className='grid min-h-screen overflow-hidden bg-colour1 text-colour2 dark:bg-colour2 dark:text-colour1 font-poppins'>
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />
          {/* Header */}
          <div className='grid grid-rows-reg'>
          <BlogPageHeader />

          {/* Main page content */}
          <BlogPageMainContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPage;
