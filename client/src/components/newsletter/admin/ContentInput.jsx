import React from 'react';
import ReactQuill from 'react-quill';

function ContentInput({ content, setContent }) {
  return (
    <div className='grid grid-rows-reg h-full overflow-hidden'>
      <label className='block text-sm font-medium' htmlFor='content'>
        Content
      </label>
      <ReactQuill
        id='content'
        theme='snow'
        value={content}
        onChange={setContent}
        className='rounded border h-full overflow-hidden'
      />
    </div>
  );
}

export default ContentInput;
