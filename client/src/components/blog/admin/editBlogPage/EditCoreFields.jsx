import React from 'react';

function EditCoreFields({ blogPost, handleChange }) {
  return (
    <section className='grid gap-2'>
      <input
        type='text'
        name='title'
        placeholder='Title'
        value={blogPost.title}
        onChange={handleChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='slug'
        placeholder='Slug'
        value={blogPost.slug}
        onChange={handleChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='subTitle'
        placeholder='Subtitle'
        value={blogPost.subTitle}
        onChange={handleChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='subject'
        placeholder='Subject'
        value={blogPost.subject}
        onChange={handleChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='location'
        placeholder='Location'
        value={blogPost.location}
        onChange={handleChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='authorName'
        placeholder='Author Name'
        value={blogPost.authorName}
        onChange={handleChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='tags'
        placeholder='Tags (comma-separated)'
        value={blogPost.tags}
        onChange={handleChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
    </section>
  );
}

export default EditCoreFields;
