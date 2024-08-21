import React, { useContext, useEffect } from 'react';
// Components
import RegisterForm from '../../components/forms/RegisterForm';
import Navbar from '../../components/nav/Navbar';
// Context
// Constants
import { SIGN_UP_PAGE_URL } from '../../utils/Constants';

function RegisterPage() {
  return (
    <div className='bg-black main__bg h-screen grid'>
      <div className='grid grid-rows-reg lg:grid-cols-reg lg:grid-rows-1 h-full w-full'>
        <Navbar />
        <main className='grid bg-white h-full items-center justify-center'>
          <section className='bg-white rounded p-4 shadow-xl my-10 lg:my-0 grid justify-center'>
            <article className='text-center my-4'>
              <h1 className='text-2xl font-semibold'>Sign Up Now</h1>
              <h2 className='text-xl font-semibold'>Join</h2>
            </article>
            <RegisterForm />
          </section>
        </main>
      </div>
    </div>
  );
}

export default RegisterPage;
