import React from 'react';
// Components
import RegisterForm from '../forms/RegisterForm';

function RegisterCard() {
  return (
    <section className='grid border-[1px] border-border-main border-solid rounded-xl shadow-cardShadow bg-white'>
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
  );
}

export default RegisterCard;
