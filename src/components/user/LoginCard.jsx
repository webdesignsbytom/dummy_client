import React from 'react';
// Components
import LoginForm from '../forms/LoginForm';

function LoginCard() {
  return (
    <section className='grid border-[1px] border-border-main border-solid rounded-xl shadow-2xl bg-white'>
      <div className='grid grid-rows-reg gap-4 w-full h-full px-8 py-6'>
        {/* Header */}
        <header className='grid text-center'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Sign in to your account
          </h1>
        </header>

        {/* Login form */}
        <section>
          <LoginForm />
        </section>
      </div>
    </section>
  );
}

export default LoginCard;
