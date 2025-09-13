import React, { useEffect, useState } from 'react';
import client from '../../../../api/client';
import { GET_BLOG_POST_BY_ID_API } from '../../../../utils/ApiRoutes';
import EditBlogPostForm from './EditBlogPostForm';

function EditBlogPageMainContainer({ postId, initialPost = null }) {
  // If we already have a post via router state, start with it and skip spinner.
  const [post, setPost] = useState(initialPost);
  const [loading, setLoading] = useState(!initialPost);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    // If we have an initialPost, do nothing.
    if (initialPost) return;

    if (!postId) {
      setErrMsg('Missing blog post ID.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrMsg('');
    client
      .get(`${GET_BLOG_POST_BY_ID_API}/${postId}`, false)
      .then((res) => {
        setPost(res?.data?.post || null);
      })
      .catch((err) => {
        console.error('Unable to retrieve blog post by ID', err);
        const apiMsg =
          err?.response?.data?.message ||
          err?.response?.data ||
          err?.message ||
          'Unable to retrieve blog post.';
        setErrMsg(typeof apiMsg === 'string' ? apiMsg : 'Unable to retrieve blog post.');
      })
      .finally(() => setLoading(false));
  }, [postId, initialPost]);

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
        <EditBlogPostForm initialPost={post} />
      </div>
    </main>
  );
}

export default EditBlogPageMainContainer;
