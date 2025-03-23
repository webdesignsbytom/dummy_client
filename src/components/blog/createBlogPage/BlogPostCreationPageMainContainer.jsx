import React from 'react';
// Components
import CreateBlogPostForm from './CreateBlogPostForm';

function BlogPostCreationPageMainContainer() {
  return (
    <main role='main' className='grid w-full'>
      {/* Form section */}
      <section className='grid'>
        <div className='grid px-6 sm:px-8 md:px-12 lg:px-20 lg:container lg:mx-auto'>
          <CreateBlogPostForm />
        </div>
      </section>
    </main>
  );
}

export default BlogPostCreationPageMainContainer;
