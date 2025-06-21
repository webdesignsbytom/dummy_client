import React, { useEffect, useState } from 'react';

function NewsletterCreateAndEditComponent({
  editingNewsletter,
  setEditingNewsletter,
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

  return (
    <section className='w-full max-w-3xl mx-auto bg-white shadow rounded p-4 mt-4 space-y-4'>
      <h2 className='text-xl font-semibold text-colour8'>
        {editingNewsletter ? 'Edit Newsletter' : 'Create Newsletter'}
      </h2>

      <form className='grid gap-y-4' onSubmit={handleSubmit}>
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
        <div className='flex justify-between'>
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
            {editingNewsletter ? 'Update Newsletter' : 'Create Newsletter'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterCreateAndEditComponent;
