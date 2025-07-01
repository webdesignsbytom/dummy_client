import React from 'react';
// Images
import CatNotFound from '../../assets/images/pages/404-page-not-found-cat.png';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Data
import { errorPageAdditionalMeta, errorPageStructuredData } from '../../utils/data/MetaData';

function Error404() {
  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName="Error"
        desc="The requested page could not be found. Visit our homepage to find what you’re looking for."
        additionalMeta={errorPageAdditionalMeta}
        structuredData={errorPageStructuredData}
      />

      {/* Page */}
      <div className="grid min-h-screen h-screen max-h-screen overflow-hidden w-full bg-main-background font-poppins">
        <div className="grid grid-rows-reg h-full w-full overflow-hidden">
          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main
            role="main"
            className="relative grid w-full h-full overflow-hidden"
          >
            <section className="grid absolute w-full text-center h-full items-center justify-center z-10">
              <section className="grid gap-2 px-2">
                <article className="outline outline-2 font-semibold outline-black -mt-10 rounded bg-white">
                  <div className="p-4">
                    <h1 className="text-2xl lg:text-4xl text-left">
                      ERROR <span className="text-red-500">404</span>
                    </h1>
                    <h2 className="text-2xl lg:text-4xl">PAGE NOT FOUND</h2>
                  </div>
                  <article className="text-red-500 text-left pl-4 border-t-2 border-solid border-black p-2">
                    <h3 className="uppercase">But you found a friend 💖</h3>
                  </article>
                </article>
              </section>
            </section>

            <section className="flex justify-end lg:mr-20">
              <img
                src={CatNotFound}
                alt="A funny and cute lost cat for the error page."
              />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default Error404;
