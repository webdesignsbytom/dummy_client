import React, { useEffect, useState } from 'react';
import { DELETE_NEWSLETTER_BY_ID_API } from '../../../utils/ApiRoutes';
import client from '../../../api/client';

function NewsletterCreateAndEditComponent({
  editingNewsletter,
  setEditingNewsletter,
  confirmAction,
  setPublishedNewslettersArray,
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Prefill fields if editing
  useEffect(() => {
    if (editingNewsletter) {
      setTitle(editingNewsletter.title || '');
      setContent(editingNewsletter.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNewsletter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your save logic here
    console.log('Saving:', { title, content });
  };

  const handleCancel = () => {
    setEditingNewsletter(null); // clear editing state
  };

  const deleteNewsletter = () => {
    confirmAction({
      header: 'Delete Newsletter',
      message: 'Are you sure you want to delete this newsletter?',
      action: () => {
        client
          .delete(
            `${DELETE_NEWSLETTER_BY_ID_API}/${editingNewsletter.id}`,
            false
          )
          .then(() => {
            setPublishedNewslettersArray((prev) =>
              prev.filter((n) => n.id !== editingNewsletter.id)
            );
          })
          .catch((err) => {
            console.error('Failed to delete newsletter', err);
          });
      },
    });
  };

  return (
    <section className='grid grid-rows-reg w-full px-2'>
      <section className='grid grid-flow-col py-2 px-1'>
        <div>
          <h2 className='lg:text-xl font-semibold text-colour8'>
            {editingNewsletter ? 'Edit Newsletter' : 'Create Newsletter'}
          </h2>
        </div>
        <div className='grid grid-flow-col gap-x-1'>
          {editingNewsletter && (
            <button className='text-white text-xs bg-blue-600 rounded-md hover:bg-blue-700 transition'>
              Create New
            </button>
          )}
          <button
            onClick={deleteNewsletter}
            className='text-white text-xs bg-red-600 rounded-md hover:bg-red-700 transition'
          >
            Delete
          </button>
        </div>
      </section>

      <form
        className='grid gap-y-4 w-full pb-1 mx-auto bg-white shadow rounded py-4'
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <div>
          <label className='block text-sm font-medium mb-1' htmlFor='title'>
            Title
          </label>
          <input
            type='text'
            id='title'
            className='w-full rounded border px-2 py-1 text-sm'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter newsletter title'
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className='block text-sm font-medium mb-1' htmlFor='content'>
            Content (HTML)
          </label>
          <textarea
            id='content'
            className='w-full h-48 rounded border px-2 py-1 text-sm font-mono'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='<p>Your newsletter content here</p>'
            required
          />
        </div>

        {/* Action Buttons */}
        <div className='grid items-end h-fit grid-cols-2 gap-x-1 justify-between'>
          <button
            type='button'
            onClick={handleCancel}
            className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm'
          >
            {editingNewsletter ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterCreateAndEditComponent;
