import React, { useState } from 'react';

function CreateBlogPostForm({ onSubmit }) {
  const [blogPost, setBlogPost] = useState({
    title: '',
    subTitle: '',
    subject: '',
    location: '',
    content: [],
    authorName: '',
    tags: '',
    isPublished: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogPost((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddContent = (type) => {
    setBlogPost((prev) => ({
      ...prev,
      content: [
        ...prev.content,
        { type, text: '', imageUrl: '', videoUrl: '' },
      ],
    }));
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...blogPost.content];
    updatedContent[index][field] = value;
    setBlogPost((prev) => ({ ...prev, content: updatedContent }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(blogPost);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='grid gap-6 px-4 py-8 bg-colour3 shadow-cardShadow rounded'
    >
      {/* Main Form */}
      <section className='grid gap-4'>
        {/* General info */}
        <section className='grid gap-3 w-full'>
          <input
            type='text'
            name='title'
            placeholder='Title'
            value={blogPost.title}
            onChange={handleChange}
            className='border p-2'
          />
          <input
            type='text'
            name='subTitle'
            placeholder='Subtitle'
            value={blogPost.subTitle}
            onChange={handleChange}
            className='border p-2'
          />
          <input
            type='text'
            name='subject'
            placeholder='Subject'
            value={blogPost.subject}
            onChange={handleChange}
            className='border p-2'
          />
          <input
            type='text'
            name='location'
            placeholder='Location'
            value={blogPost.location}
            onChange={handleChange}
            className='border p-2'
          />
          <input
            type='text'
            name='authorName'
            placeholder='Author Name'
            value={blogPost.authorName}
            onChange={handleChange}
            className='border p-2'
          />
          <input
            type='text'
            name='tags'
            placeholder='Tags (comma-separated)'
            value={blogPost.tags}
            onChange={handleChange}
            className='border p-2'
          />
          {/* <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            name='isPublished'
            checked={blogPost.isPublished}
            onChange={handleChange}
          />
          Publish Now
        </label> */}
        </section>

        {/* Content */}
        <section className='grid w-full'>
          <div className='grid gap-2'>
            <div className='grid h-fit text-center'>
              <h3 className='font-semibold'>Content Sections:</h3>
            </div>
            {blogPost.content.map((item, index) => (
              <div key={index} className='border p-2'>
                {item.type === 'paragraph' && (
                  <textarea
                    placeholder='Paragraph Text'
                    value={item.text}
                    onChange={(e) =>
                      handleContentChange(index, 'text', e.target.value)
                    }
                    className='border p-2 w-full'
                  />
                )}
                {item.type === 'image' && (
                  <input
                    type='text'
                    placeholder='Image URL'
                    value={item.imageUrl}
                    onChange={(e) =>
                      handleContentChange(index, 'imageUrl', e.target.value)
                    }
                    className='border p-2 w-full'
                  />
                )}
                {item.type === 'video' && (
                  <input
                    type='text'
                    placeholder='Video URL'
                    value={item.videoUrl}
                    onChange={(e) =>
                      handleContentChange(index, 'videoUrl', e.target.value)
                    }
                    className='border p-2 w-full'
                  />
                )}
              </div>
            ))}

            {/* <div className='mb-4'>
              <label className='block mb-2 text-colour2'>
                Upload Media Image:
              </label>
              <div
                className={`border-dashed border-2 p-6 text-center rounded-lg ${
                  isDragging ? 'border-blue-500' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
              >
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                {mediaItem.mediaSource ? (
                  <img
                    src={thumbnailPreview}
                    alt='Media Preview'
                    className='w-64 h-40 object-cover rounded mx-auto'
                  />
                ) : (
                  <p className='text-gray-500'>
                    Drag and drop an image, or click to select a file.
                  </p>
                )}
              </div>
            </div> */}

            {/* Add item buttons */}
            <section className='grid gap-3 w-full'>
              <div className='grid h-fit text-center'>
                <p>
                  Add items in the order you want them to appear in the blog
                  post.
                </p>
              </div>
              <div className='grid gap-2'>
                <button
                  type='button'
                  onClick={() => handleAddContent('paragraph')}
                  className='bg-blue-500 text-colour1 p-2 rounded'
                >
                  Add Paragraph
                </button>
                <button
                  type='button'
                  onClick={() => handleAddContent('image')}
                  className='bg-green-500 text-colour1 p-2 rounded'
                >
                  Add Image
                </button>
                <button
                  type='button'
                  onClick={() => handleAddContent('video')}
                  className='bg-red-500 text-colour1 p-2 rounded'
                >
                  Add Video
                </button>
              </div>
            </section>
          </div>
        </section>
      </section>

      {/* Submit button */}
      <section className='grid w-full'>
        <div className='grid'>
          <button
            type='submit'
            className='bg-colour2 text-colour1 px-2 py-3 rounded'
          >
            Submit Post
          </button>
        </div>
      </section>
    </form>
  );
}

export default CreateBlogPostForm;
