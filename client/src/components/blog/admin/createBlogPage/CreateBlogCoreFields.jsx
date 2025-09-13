import React from 'react';

function CreateBlogCoreFields({ blogPost, onChange, onTitleBlur }) {
  return (
    <section className='grid gap-2'>
      <input
        type='text'
        name='title'
        placeholder='Title'
        value={blogPost.title}
        onChange={onChange}
        onBlur={onTitleBlur}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='slug'
        placeholder='Slug'
        value={blogPost.slug}
        onChange={onChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='subTitle'
        placeholder='Subtitle'
        value={blogPost.subTitle}
        onChange={onChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='subject'
        placeholder='Subject'
        value={blogPost.subject}
        onChange={onChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='location'
        placeholder='Location'
        value={blogPost.location}
        onChange={onChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='authorName'
        placeholder='Author Name'
        value={blogPost.authorName}
        onChange={onChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
      <input
        type='text'
        name='tags'
        placeholder='Tags (comma-separated)'
        value={blogPost.tags}
        onChange={onChange}
        className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
      />
    </section>
  );
}

export default CreateBlogCoreFields;
