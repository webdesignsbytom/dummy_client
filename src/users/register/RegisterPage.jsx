import React from 'react';
// Utils
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import {
  registerPageAdditionalMeta,
  registerPageStructuredData,
} from '../../utils/data/MetaData';
// Components
import Navbar from '../../components/nav/Navbar';
import RegisterForm from '../../components/forms/RegisterForm';

function RegisterPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName='Register'
        desc={`Register with ${CompanyName} to access exclusive features.`}
        additionalMeta={registerPageAdditionalMeta}
        structuredData={registerPageStructuredData}
      />

      {/* Page */}
      <div className='grid h-screen min-h-screen max-h-screen overflow-hidden w-full main__bg font-poppins'>
        <div className='grid grid-rows-reg w-full h-full overflow-hidden'>
          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main role='main' className='grid w-full h-full overflow-hidden'>
            <div className='grid w-full h-full justify-center items-center p-2 overflow-hidden'>
              {/* Register component */}
              <section className='grid border-[1px] border-border-main border-solid rounded-xl shadow-cardShadow bg-white'>
                <div className='grid grid-rows-reg gap-4 w-full h-full px-8 py-6'>
                  {/* Header */}
                  <section className='text-center'>
                    <h1 className='text-2xl font-semibold'>Sign Up Now</h1>
                  </section>

                  {/* Register form */}
                  <section>
                    <RegisterForm />
                  </section>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
