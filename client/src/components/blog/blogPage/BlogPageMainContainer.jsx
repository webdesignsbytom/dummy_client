import React, { useState } from 'react';
import { useBlogPosts } from '../../../context/BlogContext';
import BlogPostPreview from './BlogPostPreview';
import BlogPaginationButtons from '../pagination/BlogPaginationButtons';
import LoadingSpinner from '../../utils/LoadingSpinner';

function BlogPageMainContainer() {
  const postsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const { posts, totalPages, loading } = useBlogPosts(currentPage, postsPerPage);

  return (
    <main role='main' className='grid gap-12 pb-12 w-full h-full'>
      <section className='grid h-full w-full'>
        <div className='grid px-6 sm:px-8 md:px-12 lg:px-20'>
          {/* Header */}
          <section className='grid w-full'>
            <article className='grid w-full'>
              <div className='py-4 text-start'>
                <h4>Lastest Articles</h4>
                <span className='text-colour2 font-semibold'>
                  Our Blog of Weird and Fun Projects
                </span>
                <div className='border-b-2 border-solid border-colour2 pt-2' />
              </div>
            </article>
          </section>

          {/* Posts */}
          <section className='grid w-full'>
            {loading ? (
              <section className='grid justify-center items-center h-full text-center'>
                <div><p>Loading...</p></div>
                <div className='grid justify-center items-center h-fit'>
                  <LoadingSpinner lg />
                </div>
              </section>
            ) : (
              <div className='grid w-full'>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {posts.length > 0 ? (
                    posts.map((post) => <BlogPostPreview key={post.id} post={post} />)
                  ) : (
                    <p className='text-center col-span-full'>No posts available</p>
                  )}
                </section>

                <BlogPaginationButtons
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default BlogPageMainContainer;
