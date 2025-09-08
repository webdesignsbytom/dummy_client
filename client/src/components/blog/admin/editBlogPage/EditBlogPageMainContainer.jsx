import React, { useEffect, useState } from 'react';
// Api
import client from '../../../../api/client';
// Constants
import { GET_BLOG_POST_BY_ID_API } from '../../../../utils/ApiRoutes';

function EditBlogPageMainContainer({ postId }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!postId) {
      setErrMsg('Missing blog post ID.');
      setLoading(false);
      return;
    }

    setLoading(true);
    client
      .get(`${GET_BLOG_POST_BY_ID_API}/${postId}`, false)
      .then((res) => {
        setPost(res?.data?.post || null);
        setErrMsg('');
      })
      .catch((err) => {
        console.error('Unable to retrieve blog post by ID', err);
        const apiMsg =
          err?.response?.data?.message ||
          err?.response?.data ||
          err?.message ||
          'Unable to retrieve blog post.';
        setErrMsg(
          typeof apiMsg === 'string' ? apiMsg : 'Unable to retrieve blog post.'
        );
      })
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) {
    return (
      <main className='grid w-full p-6'>
        <div className='h-24 rounded bg-colour1 border-2 border-solid border-colour2' />
      </main>
    );
  }

  if (errMsg) {
    return (
      <main className='grid w-full p-6'>
        <section className='p-4 rounded bg-colour1 border-2 border-solid border-colour2 text-colour2'>
          {errMsg}
        </section>
      </main>
    );
  }

  if (!post) {
    return (
      <main className='grid w-full p-6'>
        <section className='p-4 rounded bg-colour1 border-2 border-solid border-colour2 text-colour2'>
          Blog post not found.
        </section>
      </main>
    );
  }

  return (
    <main className='grid w-full pt-6'>
      <div className='grid w-full px-8 gap-y-4'>
        <section className='grid gap-2 rounded bg-colour1 border-2 border-solid border-colour2'>
          <div>
            <span className='font-semibold'>Title:</span> {post.title}
          </div>
          <div>
            <span className='font-semibold'>Slug:</span> {post.slug}
          </div>
          <div>
            <span className='font-semibold'>Author:</span> {post.authorName}
          </div>
          <div>
            <span className='font-semibold'>Published:</span>{' '}
            {post.publishedAt ? 'Yes' : 'No'}
          </div>
        </section>

        <section className='grid gap-3 p-4 rounded bg-colour1 border-2 border-solid border-colour2'>
          <h2 className='text-lg font-semibold'>Edit Form</h2>
          <p className='text-sm text-colour7'>
            Build your fields here (title, content, tags, media, etc.).
          </p>
        </section>
      </div>
    </main>
  );
}

export default EditBlogPageMainContainer;
