import React from 'react';

function NewsletterDisplayComponent({ viewingNewsletter }) {
  if (!viewingNewsletter) {
    return (
      <div className='grid items-center justify-center px-4 py-4'>
        <p className='text-sm text-colour7'>No newsletter selected.</p>
      </div>
    );
  }

  const { title, content, publishedAt } = viewingNewsletter;

  return (
    <section className='grid w-full bg-green-500 px-2 py-2'>
      <article className='grid grid-rows-reg w-full lg:max-w-4xl lg:mx-auto bg-colour1'>
        <div>
          <h1 className='text-xl font-semibolmb-2'>{title}</h1>
          {publishedAt && (
            <p className='text-xs text-gray-500 mb-4'>
              Published:{' '}
              {new Date(publishedAt).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>

        <section>
          <div
            className='prose text-sm'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </article>
    </section>
  );
}

export default NewsletterDisplayComponent;
