import React from 'react';
// Constants
import { CompanyName } from '../../../utils/Constants';
// Components
import Navbar from '../../../components/nav/Navbar';
import CallbackFormAdminPageMainContainer from '../../../components/contact/admin/CallbackFormAdminPageMainContainer';
import { HelmetItem } from '../../../components/utils/HelmetItem';

function CallbackFormAdminPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Admin Callback Forms'
        desc={`Administrative dashboard for managing callback form submissions to ${CompanyName}. Review, respond, and track inquiries efficiently.`}
        keywords={`admin callback form, ${CompanyName} admin, message management, inquiries dashboard, customer support admin`}
        additionalMeta={[]}
        structuredData={[]}
      />

      {/* Document-level semantic wrapper */}
      <div
        className='grid min-h-screen overflow-hidden bg-colour1 dark:bg-colour2 text-colour2 dark:text-colour1 font-poppins'
        role='document'
        aria-label='Admin Callback Form Page'
      >
        <div className='grid grid-rows-reg'>
          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <CallbackFormAdminPageMainContainer />
        </div>
      </div>
    </>
  );
}

export default CallbackFormAdminPage;
