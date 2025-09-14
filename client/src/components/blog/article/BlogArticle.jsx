import React from 'react';
import { mediaUrlFrom } from '../../../utils/media/mediaUrl'; // adjust path if needed

function resolveMediaSrc(key) {
  if (!key) return '';
  return mediaUrlFrom({ objectKey: key });
}

function BlogArticle({ post }) {
  if (!post) return <p>Loading...</p>;

  const blocks = Array.isArray(post.content) ? post.content : [];

  // Build a quick map: key -> media.id (for signed URLs) – currently unused
  const mediaIdByKey = new Map(
    (Array.isArray(post.mediaLinks) ? post.mediaLinks : [])
      .map((l) => [l?.media?.key, l?.media?.id])
      .filter(([k, v]) => k && v)
  );

  return (
    <section className='grid w-full'>
      <div className='grid w-full px-6 sm:px-8 md:px-12 lg:px-20 lg:container lg:mx-auto'>
        <article className='grid gap-4 w-full max-w-3xl mx-auto py-8 px-4 sm:px-8 bg-colour4 shadow-cardShadow shadow-colour6/80 rounded-lg'>
          {/* Title & Subtitle */}
          <header className='grid h-fit text-center'>
            <div className='grid gap-4'>
              <h1 className='text-3xl font-bold text-colour2 dark:text-colour1'>
                {post.title}
              </h1>
              {post.subTitle ? (
                <h2 className='text-lg text-colour2'>{post.subTitle}</h2>
              ) : null}
            </div>
          </header>

          {/* Meta */}
          <section className='grid grid-flow-col py-4 text-colour2 dark:text-colour2 text-sm justify-between'>
            <span>{post.authorName ? `By ${post.authorName}` : ''}</span>
            <span>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString()
                : ''}
            </span>
          </section>

          {/* Ordered Content */}
          <section className='grid gap-4 text-colour2 dark:text-gray-200 space-y-4'>
            {blocks.map((block, index) => {
              // Paragraph
              if (block?.type === 'paragraph' && typeof block?.text === 'string') {
                return (
                  <p className='text-center lg:text-left' key={index}>
                    {block.text}
                  </p>
                );
              }

              // Heading (new)
              if (block?.type === 'heading' && typeof block?.text === 'string') {
                return (
                  <h3
                    key={index}
                    className='text-xl font-semibold text-colour2 dark:text-colour1 text-center lg:text-left'
                  >
                    {block.text}
                  </h3>
                );
              }

              // List (new)
              if (block?.type === 'list' && Array.isArray(block?.items)) {
                const items = block.items.filter((s) => typeof s === 'string' && s.trim().length);
                if (!items.length) return null;
                return (
                  <ul key={index} className='list-disc list-inside text-left space-y-1'>
                    {items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                );
              }

              // Image
              if (block?.type === 'image' && typeof block?.key === 'string') {
                const src = resolveMediaSrc(block.key, mediaIdByKey);
                return (
                  <figure key={index} className='grid gap-2 text-center'>
                    <img src={src} alt='' className='w-full rounded-lg' />
                    {block.description && (
                      <figcaption className='text-sm'>{block.description}</figcaption>
                    )}
                  </figure>
                );
              }

              // Video
              if (block?.type === 'video' && typeof block?.key === 'string') {
                const src = resolveMediaSrc(block.key, mediaIdByKey);
                return (
                  <aside key={index} className='grid gap-4 text-center'>
                    <video controls className='w-full rounded-lg'>
                      <source src={src} type='video/mp4' />
                    </video>
                    {block.description && (
                      <div><p className='text-sm'>{block.description}</p></div>
                    )}
                  </aside>
                );
              }

              return null;
            })}
          </section>

          {/* Tags */}
          {Array.isArray(post.tags) && post.tags.length ? (
            <div className='mt-6'>
              <h3 className='text-lg font-semibold mb-2 text-colour2 dark:text-colour2'>
                Tags:
              </h3>
              <div className='flex flex-wrap gap-2'>
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className='bg-colour5 text-colour1 dark:bg-colour5 dark:text-colour1 px-3 py-1 text-sm rounded-full shadow-cardShadow shadow-colour6/80'
                  >
                    {typeof tag === 'string' ? tag : tag?.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}

export default BlogArticle;
