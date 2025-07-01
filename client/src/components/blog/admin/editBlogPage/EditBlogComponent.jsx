import React, { useState } from 'react';

function EditBlogComponent({ post, onUpdate }) {
  const [editablePost, setEditablePost] = useState(post);

  const handleEdit = (index, field, value) => {
    const updatedContent = [...editablePost.content];
    updatedContent[index][field] = value;
    setEditablePost({ ...editablePost, content: updatedContent });
  };

  const handleSave = () => {
    onUpdate(editablePost);
    alert('Post updated successfully!');
  };

  return (
    <div className='max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg dark:bg-gray-900'>
      {/* Title */}
      <div className='mb-4'>
        <input
          type='text'
          value={editablePost.title}
          onChange={(e) => setEditablePost({ ...editablePost, title: e.target.value })}
          className='w-full text-3xl font-bold bg-transparent border-b border-gray-300 focus:outline-none dark:text-white'
        />
      </div>

      {/* Subtitle */}
      <div className='mb-4'>
        <input
          type='text'
          value={editablePost.subTitle}
          onChange={(e) => setEditablePost({ ...editablePost, subTitle: e.target.value })}
          className='w-full text-lg bg-transparent border-b border-gray-300 focus:outline-none dark:text-gray-300'
        />
      </div>

      {/* Blog Content */}
      <section className='space-y-4'>
        {editablePost.content.map((block, index) => (
          <div key={index} className='border p-3 rounded-md bg-gray-100 dark:bg-gray-800'>
            {block.type === 'paragraph' && (
              <>
                <textarea
                  value={block.text}
                  onChange={(e) => handleEdit(index, 'text', e.target.value)}
                  className='w-full p-2 bg-transparent border rounded-md focus:outline-none dark:text-white'
                />
              </>
            )}
            {block.type === 'image' && (
              <>
                <input
                  type='text'
                  value={block.imageUrl}
                  onChange={(e) => handleEdit(index, 'imageUrl', e.target.value)}
                  className='w-full p-2 bg-transparent border rounded-md focus:outline-none dark:text-white'
                  placeholder='Image URL'
                />
                {block.imageUrl && <img src={block.imageUrl} alt={block.imageTitle} className='mt-2 w-full rounded-lg' />}
              </>
            )}
            {block.type === 'video' && (
              <>
                <input
                  type='text'
                  value={block.videoUrl}
                  onChange={(e) => handleEdit(index, 'videoUrl', e.target.value)}
                  className='w-full p-2 bg-transparent border rounded-md focus:outline-none dark:text-white'
                  placeholder='Video URL'
                />
                {block.videoUrl && (
                  <video controls className='mt-2 w-full rounded-lg'>
                    <source src={block.videoUrl} type='video/mp4' />
                  </video>
                )}
              </>
            )}
          </div>
        ))}
      </section>

      {/* Save Button */}
      <div className='mt-6 text-right'>
        <button
          onClick={handleSave}
          className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditBlogComponent;
