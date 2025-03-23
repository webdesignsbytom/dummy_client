import React, { useEffect, useState } from 'react';
// Api
import client from '../../../api/client';
// Constants
import { GET_BLOG_POSTS_API } from '../../../utils/Constants';
// Data
import { tempBlogPosts } from '../../../utils/data/BlogData';
// Components
import BlogPostPreview from './BlogPostPreview';
import BlogPaginationButtons from '../pagination/BlogPaginationButtons';
import SearchBarComponent from '../../search/SearchBarComponent';

function BlogPageMainContainer() {
  const [displayedBlogPosts, setDisplayedBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const postsPerPage = 10;

  useEffect(() => {
    client
      .get(
        `${GET_BLOG_POSTS_API}?page=${currentPage}&limit=${postsPerPage}`,
        false
      )
      .then((res) => {
        setDisplayedBlogPosts(res.data.posts);
        if (res.data.posts.length <= 0) {
          setDisplayedBlogPosts(tempBlogPosts);
          setTotalPages(tempBlogPosts.length);
        }
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        setDisplayedBlogPosts(tempBlogPosts);
        setTotalPages(tempBlogPosts.length);

        console.error('Unable to retrieve user data', err);
      });
  }, [currentPage]);

  return (
    <main role='main' className='grid gap-12 pb-12 w-full h-full'>
      {/* Blog Posts */}
      <section className='grid w-full'>
        <div className='grid px-6 sm:px-8 md:px-12 lg:px-20'>
          {/* Header */}
          <section className='grid w-full'>
            <article className='grid w-full'>
              <div className='py-4 text-start'>
                <h4 className=''>Lastest Articles</h4>
                <span className='text-colour2 font-semibold'>
                  Our Blog of Weird and Fun Projects
                </span>
                <div className='border-b-2 border-solid border-colour2 pt-2'></div>
              </div>
            </article>
          </section>

          {/* Post samples */}
          <section className='grid w-full'>
            <div className='grid w-full'>
              {/* Blog post cards */}
              <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {displayedBlogPosts.length > 0 ? (
                  displayedBlogPosts.map((post) => (
                    <BlogPostPreview key={post.id} post={post} />
                  ))
                ) : (
                  <p className='text-center col-span-full'>
                    No posts available
                  </p>
                )}
              </section>

              {/* Pagination */}
              <BlogPaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default BlogPageMainContainer;
