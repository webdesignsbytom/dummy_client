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
      className='border px-6 py-5 rounded shadow-cardShadow hover:shadow-cardShadow cursor-pointer'
      onClick={() => {
        navigateToPage(`/blog/${post.slug}`, post);
      }}
    >
      <section className='pb-1'>
        <h2
          id={`post-title-${post.slug}`}
          className='text-xl font-bold text-colour3'
        >
          {post.title}
        </h2>
        <p className='text-sm text-colour5 font-medium'>{post.subTitle}</p>
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
          <div className='py-4'>
            <p className='text-sm'>{post.content[0].slice(0, 100)}...</p>
          </div>
          <button
            aria-label={`Read more about ${post.title}`}
            className='text-hyperlink-blue underline mt-2 inline-block'
            onClick={() => {
              navigateToPage(`/blog/${post.slug}`, post);
            }}
          >
            Read More
          </button>
          <div className='text-gray-400 text-xs mt-2'>
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
          </div>
        </section>
      </section>
    </article>
  );
};

export default BlogPostPreview;
