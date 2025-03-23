import React from 'react';

function BlogArticle({ post }) {
  if (!post) return <p>Loading...</p>;

  return (
    <article className='grid w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg dark:bg-gray-900'>
      {/* Title & Subtitle */}
      <header className='mb-4 text-center'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>{post.title}</h1>
        <h2 className='text-lg text-gray-500 dark:text-gray-300'>{post.subTitle}</h2>
      </header>

      {/* Meta Info */}
      <div className='text-gray-600 dark:text-gray-400 text-sm mb-4 flex justify-between'>
        <span>By {post.authorName}</span>
        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className='w-full h-64 object-cover rounded-lg mb-4'
        />
      )}

      {/* Blog Content */}
      <section className='text-gray-800 dark:text-gray-200 space-y-4'>
        {post.content.map((block, index) => {
          if (block.type === 'paragraph') {
            return <p key={index}>{block.text}</p>;
          }
          if (block.type === 'image') {
            return (
              <figure key={index} className='text-center'>
                <img src={block.imageUrl} alt={block.imageTitle} className='w-full rounded-lg' />
                {block.description && <figcaption className='text-sm mt-2'>{block.description}</figcaption>}
              </figure>
            );
          }
          if (block.type === 'video') {
            return (
              <div key={index} className='text-center'>
                <video controls className='w-full rounded-lg'>
                  <source src={block.videoUrl} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
                {block.description && <p className='text-sm mt-2'>{block.description}</p>}
              </div>
            );
          }
          return null;
        })}
      </section>

      {/* Tags */}
      <div className='mt-6'>
        <h3 className='text-lg font-semibold mb-2'>Tags:</h3>
        <div className='flex flex-wrap gap-2'>
          {post.tags.map((tag, index) => (
            <span key={index} className='bg-blue-500 text-white px-3 py-1 text-sm rounded-full'>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default BlogArticle;
