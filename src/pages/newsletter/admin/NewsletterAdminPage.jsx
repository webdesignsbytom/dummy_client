import React from 'react';
// Components
import Navbar from '../../../components/nav/Navbar';
import NewsletterAdminPageMainContainer from '../../../components/newsletter/admin/NewsletterAdminPageMainContainer';
import { HelmetItem } from '../../../components/utils/HelmetItem';

function NewsletterAdminPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Newsletter Admin'
        desc='Internal admin page for managing newsletter subscriptions.'
        noIndex={true}
      />

      {/* Page */}
      <div
        className='grid min-h-screen overflow-hidden bg-colour1 dark:bg-colour2 text-colour2 dark:text-colour1 font-poppins'
        aria-label='Newsletter Admin Page'
      >
        <div className='grid grid-rows-reg overflow-hidden'>
          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main role='main'>
            <NewsletterAdminPageMainContainer />
          </main>
        </div>
      </div>
    </>
  );
}

export default NewsletterAdminPage;
