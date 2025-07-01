import React from 'react';

function BlogArticle({ post }) {
  if (!post) return <p>Loading...</p>;

  return (
    <section className='grid w-full'>
      <div className='grid w-full px-6 sm:px-8 md:px-12 lg:px-20 lg:container lg:mx-auto'>
        <article className='grid gap-4 w-full max-w-3xl mx-auto py-8 px-4 sm:px-8 bg-colour4 shadow-cardShadow shadow-colour6/80 rounded-lg'>
          {/* Title & Subtitle */}
          <header className='grid h-fit text-center'>
            <div className='grid gap-4'>
              <h1 className='text-3xl font-bold text-colour6 dark:text-colour1'>
                {post.title}
              </h1>
              <h2 className='text-lg text-colour9'>{post.subTitle}</h2>
            </div>
          </header>

          {/* Meta Info */}
          <section className='grid grid-flow-col py-4 text-colour6 dark:text-colour6 text-sm justify-between'>
            <span>By {post.authorName}</span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </section>

          {/* Featured Image */}
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className='w-full h-64 object-cover rounded-lg'
            />
          )}

          {/* Blog Content */}
          <section className='grid gap-4 text-colour9 dark:text-gray-200 space-y-4'>
            {post.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p className='text-center lg:text-left' key={index}>
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'heading') {
                return (
                  <h2 key={index} className='text-xl font-semibold text-colour6 dark:text-colour1'>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={index} className='list-disc pl-5 grid gap-y-2'>
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'image') {
                return (
                  <figure key={index} className='grid gap-2 text-center'>
                    <img
                      src={block.imageUrl}
                      alt={block.imageTitle}
                      className='w-full rounded-lg'
                    />
                    {block.description && (
                      <figcaption className='text-sm'>
                        {block.description}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              if (block.type === 'video') {
                return (
                  <aside key={index} className='grid gap-4 text-center'>
                    <video controls className='w-full rounded-lg'>
                      <source src={block.videoUrl} type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>
                    {block.description && (
                      <div className=''>
                        <p className='text-sm'>{block.description}</p>
                      </div>
                    )}
                  </aside>
                );
              }
              return null;
            })}
          </section>

          {/* Tags */}
          <div className='mt-6'>
            <h3 className='text-lg font-semibold mb-2 text-colour6 dark:text-colour6'>
              Tags:
            </h3>
            <div className='flex flex-wrap gap-2'>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className='bg-colour5 text-colour1 dark:bg-colour5 dark:text-colour1 px-3 py-1 text-sm rounded-full shadow-cardShadow shadow-colour6/80'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default BlogArticle;
