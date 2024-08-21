import React from 'react';
// Images
import CatNotFound from '../../assets/images/pages/404-page-not-found-cat.png';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';

function Error404() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem PageName={'Error'} desc={`Not Found.`} />

      {/* Page */}
      <div className='grid min-h-screen h-screen max-h-screen overflow-hidden w-full bg-slate-50'>
        <div className='grid grid-rows-reg h-full w-full overflow-hidden'>
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main className='grid w-full h-full overflow-hidden'>
            <section className='grid w-full text-center h-full items-center justify-center z-10'>
              <div className='grid gap-2'>

                {/* Dialog */}
                <article className='outline outline-2 font-semibold outline-black -mt-10 p-2 rounded'>
                  <h1 className='text-4xl'>
                    ERROR <span className='text-red-500'>404</span>
                  </h1>
                  <h2 className='text-4xl'>PAGE NOT FOUND</h2>
                </article>

                <article className='outline outline-2 font-semibold outline-black rounded'>
                  <h3>But you found a friend 💖</h3>
                </article>
              </div>
            </section>

            <section className='flex lg:justify-end lg:mr-20'>
              <img src={CatNotFound} alt='Lost cat for error page that is funny and cute.' />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default Error404;
