import React from 'react';
// Hooks
import useNavigateToPage from '../../../hooks/useNavigateToPage';

const BlogPostPreview = ({ post }) => {
  const navigateToPage = useNavigateToPage();

  return (
    <article
      aria-labelledby={`post-title-${post.slug}`}
      aria-label={`Read more about ${post.title}`}
      title={`Read more about ${post.title}`}
      className='grid border px-6 py-5 rounded shadow-cardShadow hover:shadow-cardShadow cursor-pointer'
      onClick={() => {
        navigateToPage(`/blog/${post.slug}`, post);
      }}
    >
      {/* Phone and desktop */}
      <div className='grid md:hidden lg:grid'>
        <section>
          <div>
            <h2
              id={`post-title-${post.slug}`}
              className='text-xl font-bold text-colour2'
            >
              {post.title}
            </h2>
          </div>
          <div>
            <p className='text-sm text-colour2 font-medium'>{post.subTitle}</p>
          </div>
        </section>

        <section className='grid lg:grid-cols-2 lg:gap-4'>
          <section className='my-auto'>
            <img
              src={post.thumbnailImage}
              alt={`${post.title} thumbnail`}
              className='w-full h-auto mt-2 rounded-tr-lg rounded-bl-lg shadow-cardShadow'
            />
          </section>
          <section>
            {/* Sample paragraph */}
            <section>
              <div className='py-4'>
                {post.content.find((item) => item.type === 'paragraph')
                  ?.text && (
                  <p className='text-sm'>
                    {post.content
                      .find((item) => item.type === 'paragraph')
                      .text.slice(0, 100)}
                    ...
                  </p>
                )}
              </div>

              <div>
                <button
                  aria-label={`Read more about ${post.title}`}
                  className='text-hyperlink-colour underline mt-2 inline-block'
                  onClick={() => {
                    navigateToPage(`/blog/${post.slug}`, post);
                  }}
                >
                  Read More
                </button>
              </div>
            </section>

            <section className='text-colour7 text-xs mt-2'>
              <span>By {post.authorName}</span> |{' '}
              <time
                dateTime={post.publishedAt}
                aria-label={`Published on ${new Date(
                  post.publishedAt
                ).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}`}
              >
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            </section>
          </section>
        </section>
      </div>

      {/* Phone and desktop */}
      <div className='hidden md:grid lg:hidden'>
        <section className='grid lg:grid-cols-2 lg:gap-4'>
          {/* Article */}
          <section>
            <section>
              <div>
                <h2
                  id={`post-title-${post.slug}`}
                  className='text-xl font-bold text-colour2'
                >
                  {post.title}
                </h2>
              </div>
              <div>
                <p className='text-sm text-colour2 font-medium'>
                  {post.subTitle}
                </p>
              </div>
            </section>
            {/* Sample paragraph */}
            <section>
              <div className='py-4'>
                {post.content.find((item) => item.type === 'paragraph')
                  ?.text && (
                  <p className='text-sm'>
                    {post.content
                      .find((item) => item.type === 'paragraph')
                      .text.slice(0, 100)}
                    ...
                  </p>
                )}
              </div>

              <div>
                <button
                  aria-label={`Read more about ${post.title}`}
                  className='text-hyperlink-colour underline mt-2 inline-block'
                  onClick={() => {
                    navigateToPage(`/blog/${post.slug}`, post);
                  }}
                >
                  Read More
                </button>
              </div>
            </section>

            <section className='text-colour7 text-xs mt-2'>
              <span>By {post.authorName}</span> |{' '}
              <time
                dateTime={post.publishedAt}
                aria-label={`Published on ${new Date(
                  post.publishedAt
                ).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}`}
              >
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            </section>
          </section>

          {/* Image */}
          <section className='grid my-auto'>
            <img
              src={post.thumbnailImage}
              alt={`${post.title} thumbnail`}
              className='w-full h-auto mt-2 rounded-tr-lg rounded-bl-lg shadow-cardShadow'
            />
          </section>
        </section>
      </div>
    </article>
  );
};

export default BlogPostPreview;
