import React from 'react';
// Components
import RegisterForm from '../../components/forms/RegisterForm';
import Navbar from '../../components/nav/Navbar';
// Utils
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';

function RegisterPage() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName={'Login'}
        desc={`Log in to your ${CompanyName} account to access exclusive features.`}
      />

      {/* Page */}
      <div className='grid h-screen min-h-screen max-h-screen overflow-hidden w-full bg-main-background'>
        <div className='grid grid-rows-reg w-full h-full overflow-hidden'>
          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main role='main' className='grid w-full h-full overflow-hidden'>
            <div className='grid w-full h-full justify-center items-center p-2 overflow-hidden'>
              {/* Login component */}
              <section className='grid border-[1px] border-border-main border-solid rounded-xl shadow-2xl bg-white'>
                <div className='grid grid-rows-reg gap-4 w-full h-full px-8 py-6'>
                  <header className='text-center'>
                    <h1 className='text-2xl font-semibold'>Sign Up Now</h1>
                  </header>

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
