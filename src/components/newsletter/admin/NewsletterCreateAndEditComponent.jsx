import React, { useEffect, useState } from 'react';
import {
  DELETE_NEWSLETTER_BY_ID_API,
  PUBLISH_NEWSLETTER_API,
} from '../../../utils/ApiRoutes';
import client from '../../../api/client';
import LoadingSpinner from '../../utils/LoadingSpinner';

function NewsletterCreateAndEditComponent({
  editingNewsletter,
  setEditingNewsletter,
  confirmAction,
  setPublishedNewslettersArray,
  setSelectedLayout,
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublishingNewsletter, setIsPublishingNewsletter] = useState('');

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

  const updateAndSaveDraft = (e) => {
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
            console.log('deleted');
            setPublishedNewslettersArray((prev) =>
              prev.filter((n) => n.id !== editingNewsletter.id)
            );
            setSelectedLayout('newsletters');
          })
          .catch((err) => {
            console.error('Failed to delete newsletter', err);
          });
      },
    });
  };

  const createNewNewsletter = () => {
    setEditingNewsletter(false); // Reset editing mode
    setTitle(''); // Clear title field
    setContent(''); // Clear content field
  };

  const publishNewsletter = (e) => {
    e.preventDefault();
    if (!editingNewsletter?.id) {
      console.error('No newsletter selected for publishing.');
      return;
    }

    setIsPublishingNewsletter(true);
    let newsletterId = editingNewsletter.id;

    confirmAction({
      header: 'Publish Newsletter',
      message:
        'Are you sure you want to publish this newsletter? Once published, it can no longer be edited.',
      action: () => {
        client
          .patch(`${PUBLISH_NEWSLETTER_API}`, { newsletterId }, false)
          .then(() => {
            console.log('Newsletter published successfully.');
            setIsPublishingNewsletter(false);
            setEditingNewsletter(false);
            setSelectedLayout('newsletters');
          })
          .catch((err) => {
            console.error('Failed to publish newsletter:', err);
            setIsPublishingNewsletter(false);
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
            <button
              onClick={createNewNewsletter}
              className='text-colour1 text-xs bg-blue-600 rounded-md hover:bg-blue-700 transition'
            >
              Create New
            </button>
          )}
          <button
            onClick={deleteNewsletter}
            className='text-colour1 text-xs bg-red-600 rounded-md hover:bg-red-700 transition'
          >
            Delete
          </button>
        </div>
      </section>

      <form
        className={`grid relative gap-y-4 h-full bg-green-300 w-full pb-1 mx-auto ${
          isPublishingNewsletter
            ? 'blur-sm pointer-events-none select-none'
            : ''
        }`}
        aria-busy={isPublishingNewsletter ? 'true' : 'false'}
      >
        {/* Submitting */}
        {isPublishingNewsletter && (
          <section
            className='absolute grid h-full items-center justify-center w-full'
            aria-live='assertive'
          >
            <LoadingSpinner lg={true} />
          </section>
        )}

        {/* Inputs */}
        <section className='grid grid-rows-reg gap-y-4 w-full bg-geen-300'>
          {/* Title */}
          <div>
            <label className='block text-sm font-medium mb-1' htmlFor='title'>
              Title
            </label>
            <input
              type='text'
              id='title'
              className='w-full rounded border shadow px-2 py-1 text-sm'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter newsletter title'
              required
              aria-describedby='newsletter-title-description'
            />
            <small id='newsletter-title-description' className='sr-only'>
              Enter a descriptive title for the newsletter
            </small>
          </div>

          {/* Content */}
          <div className='grid grid-rows-reg h-full'>
            <label className='block text-sm font-medium mb-1' htmlFor='content'>
              Content
            </label>
            <textarea
              id='content'
              className='w-full rounded shadow border px-2 py-1 text-sm font-mono'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder='<p>Your newsletter content here</p>'
              required
              aria-describedby='newsletter-content-description'
            />
            <small id='newsletter-content-description' className='sr-only'>
              Use valid HTML tags for formatting
            </small>
          </div>
        </section>

        {/* Action Buttons */}
        <section className='grid items-end h-fit gap-y-1'>
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
              onClick={updateAndSaveDraft}
              className='px-4 py-2 rounded bg-blue-600 text-colour1 hover:bg-blue-700 text-sm'
            >
              {editingNewsletter ? 'Update' : 'Create'}
            </button>
          </div>

          {/* Publish button */}
          <div className='grid w-full'>
            <button
              type='submit'
              className='px-4 py-2 rounded bg-blue-600 text-colour1 hover:bg-blue-700 text-sm'
              onClick={publishNewsletter}
            >
              Publish
            </button>
          </div>
        </section>
      </form>
    </section>
  );
}

export default NewsletterCreateAndEditComponent;
