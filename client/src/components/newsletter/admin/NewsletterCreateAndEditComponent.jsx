import React, { useEffect, useState } from 'react';
import {
  CREATE_SAVE_NEW_NEWSLETTER_API,
  DELETE_NEWSLETTER_BY_ID_API,
  PUBLISH_NEWSLETTER_API,
  SAVE_NEWSLETTER_API,
} from '../../../utils/ApiRoutes';
import client from '../../../api/client';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ContentInput from './ContentInput';

function NewsletterCreateAndEditComponent({
  editingNewsletter,
  setEditingNewsletter,
  setPublishedNewslettersArray,
  setSelectedLayout,
  confirmAction,
  setDraftNewslettersArray,
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublishingNewsletter, setIsPublishingNewsletter] = useState('');
  const [publishFeedback, setPublishFeedback] = useState(null); // null | 'success' | 'error'
  const [isSavingNewsletter, setIsSavingNewsletter] = useState('');
  const [saveFeedback, setSaveFeedback] = useState(null); // null | 'success' | 'error'

  console.log('editingNewsletter', editingNewsletter);
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

  const isFormValid = () => {
    if (!title.trim()) {
      confirmAction({
        header: 'Missing Title',
        message: 'Please enter a title before saving or publishing.',
        action: () => {},
      });
      return false;
    }

    if (!content.trim()) {
      confirmAction({
        header: 'Missing Content',
        message: 'Please enter newsletter content before saving or publishing.',
        action: () => {},
      });
      return false;
    }

    return true;
  };

  const updateAndSaveDraft = (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    setIsSavingNewsletter(true);

    const payload = {
      id: editingNewsletter?.id,
      title: title.trim(),
      content: content.trim(),
    };

    client
      .patch(`${SAVE_NEWSLETTER_API}`, payload, false)
      .then(() => {
        console.log('Newsletter saved successfully.');
        setIsSavingNewsletter(false);
        setSaveFeedback('success');
      })
      .catch((err) => {
        console.error('Failed to save newsletter:', err);
        setIsSavingNewsletter(false);
        setSaveFeedback('error');
      });
  };

  const createAndSave = (e) => {
    e.preventDefault();

    console.log('PPPPPPPPPPPPP');
    if (!isFormValid()) return;

    setIsSavingNewsletter(true);

    const payload = {
      title: title.trim(),
      content: content.trim(),
    };

    client
      .post(`${CREATE_SAVE_NEW_NEWSLETTER_API}`, payload, false)
      .then((res) => {
        console.log('res', res.data);
        console.log('Newsletter saved successfully.');
        setIsSavingNewsletter(false);
        setSaveFeedback('success');
        setEditingNewsletter(res.data.newsletter);
        setDraftNewslettersArray((prev) => [...prev, res.data.newsletter]);
      })
      .catch((err) => {
        console.error('Failed to save newsletter:', err);
        setIsSavingNewsletter(false);
        setSaveFeedback('error');
      });
  };

  const handleCancel = () => {
    if (!title.trim() && !content.trim()) {
      setEditingNewsletter(null);
      setSelectedLayout('newsletters');
      return;
    }

    confirmAction({
      header: 'Discard Changes?',
      message:
        'You have unsaved changes. Are you sure you want to cancel? All data will be lost.',
      action: () => {
        setEditingNewsletter(null);
        setSelectedLayout('newsletters');
      },
    });
  };

  const deleteNewsletter = () => {
    if (!editingNewsletter) return;

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

            // Remove from published array
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
    setEditingNewsletter(null); // Reset editing mode
    setTitle(''); // Clear title field
    setContent(''); // Clear content field
  };

  const publishNewsletter = (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

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
          .then((res) => {
            console.log('rexxxs', res.data);
            console.log('Newsletter published successfully.');
            setIsPublishingNewsletter(false);
            setEditingNewsletter(null);
            setPublishFeedback('success');
            setPublishedNewslettersArray((prev) => [
              ...prev,
              res.data.newsletter,
            ]);
          })
          .catch((err) => {
            console.error('Failed to publish newsletter:', err);
            setIsPublishingNewsletter(false);
            setPublishFeedback('error');
          });
      },
    });
  };

  return (
    <section className='grid grid-rows-reg gap-y-4 w-full h-full px-2 lg:px-4 lg:py-4 overflow-hidden'>
      <section className='grid grid-flow-col'>
        <div>
          <h2 className='lg:text-xl font-semibold text-colour8'>
            {editingNewsletter ? 'Edit Newsletter' : 'Create Newsletter'}
          </h2>
        </div>
        <div className='grid grid-flow-col justify-end gap-x-1'>
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
            className='text-colour1 text-xs bg-red-600 rounded-md hover:bg-red-700 transition min-w-16 lg:min-w-24 px-2'
          >
            Delete
          </button>
        </div>
      </section>

      <form
        className={`grid grid-rows-rev relative gap-y-4 h-full overflow-hidden w-full pb-1 mx-auto ${
          isPublishingNewsletter || isSavingNewsletter
            ? 'blur-sm pointer-events-none select-none'
            : ''
        }`}
        aria-busy={
          isPublishingNewsletter || isSavingNewsletter ? 'true' : 'false'
        }
      >
        {/* Submitting */}
        {(isPublishingNewsletter || isSavingNewsletter) && (
          <section
            className='absolute grid h-full items-center justify-center w-full z-20'
            aria-live='assertive'
          >
            <LoadingSpinner lg={true} />
          </section>
        )}

        {/* Publish feedback */}
        {publishFeedback && (
          <div
            className='fixed inset-0 z-30 flex items-center justify-center'
            onClick={() => setPublishFeedback(null)}
          >
            <div
              className={`rounded-lg px-6 py-4 text-white shadow-md text-center text-lg ${
                publishFeedback === 'success' ? 'bg-green-600' : 'bg-red-600'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {publishFeedback === 'success'
                ? 'Newsletter published!'
                : 'Failed to publish newsletter.'}
            </div>
          </div>
        )}

        {/* Save feedback */}
        {saveFeedback && (
          <div
            className='fixed inset-0 z-30 flex items-center justify-center'
            onClick={() => setSaveFeedback(null)}
          >
            <div
              className={`rounded-lg px-6 py-4 text-white shadow-md text-center text-lg ${
                saveFeedback === 'success' ? 'bg-green-600' : 'bg-red-600'
              }`}
              onClick={(e) => e.stopPropagation()} // prevent modal from closing when clicking inside
            >
              {saveFeedback === 'success'
                ? 'Draft saved successfully!'
                : 'Failed to save draft.'}
            </div>
          </div>
        )}

        {/* Inputs */}
        <section className='grid grid-rows-reg gap-y-4 h-full w-full overflow-hidden '>
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
          <ContentInput content={content} setContent={setContent} />
        </section>

        {/* Action Buttons */}
        <section className='grid items-end lg:justify-end h-fit gap-y-1 pb-2'>
          <div className='grid items-end h-fit grid-cols-2 gap-x-1 justify-between lg:min-w-[50vw]'>
            <button
              type='button'
              onClick={handleCancel}
              className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm'
            >
              Cancel
            </button>
            <button
              type='submit'
              onClick={editingNewsletter ? updateAndSaveDraft : createAndSave}
              className='px-4 py-2 rounded bg-blue-600 text-colour1 hover:bg-blue-700 text-sm'
            >
              {editingNewsletter ? 'Update' : 'Create'}
            </button>
          </div>

          {/* Publish button */}
          {editingNewsletter?.id && (
            <div className='grid w-full'>
              <button
                type='submit'
                className='px-4 py-2 rounded bg-blue-600 text-colour1 hover:bg-blue-700 text-sm'
                onClick={publishNewsletter}
              >
                Publish
              </button>
            </div>
          )}
        </section>
      </form>
    </section>
  );
}

export default NewsletterCreateAndEditComponent;
