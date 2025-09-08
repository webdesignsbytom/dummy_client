import React, { useRef, useState } from 'react';
import { FiUploadCloud, FiTrash2, FiEdit2, FiArrowUp, FiArrowDown } from 'react-icons/fi';

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

  const fileInputRefs = useRef({ image: [], video: [] });

  const MAX_IMAGE_SIZE_MB = 5;
  const MAX_VIDEO_SIZE_MB = 15;
  const IMAGE_ACCEPT = 'image/*';
  const VIDEO_ACCEPT = 'video/*';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogPost((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAddContent = (type) => {
    setBlogPost((prev) => ({
      ...prev,
      content: [...prev.content, { type, text: '', imageUrl: '', videoUrl: '', file: null }],
    }));
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...blogPost.content];
    updatedContent[index][field] = value;
    setBlogPost((prev) => ({ ...prev, content: updatedContent }));
  };

  const isObjectURL = (url) => typeof url === 'string' && url.startsWith('blob:');

  const validateFile = (file, kind) => {
    if (!file) return { ok: false, reason: 'No file' };
    const isImage = kind === 'image';
    if (isImage && !file.type.startsWith('image/')) return { ok: false, reason: 'Please select an image file.' };
    if (!isImage && !file.type.startsWith('video/')) return { ok: false, reason: 'Please select a video file.' };
    const sizeMB = file.size / (1024 * 1024);
    const limit = isImage ? MAX_IMAGE_SIZE_MB : MAX_VIDEO_SIZE_MB;
    if (sizeMB > limit) return { ok: false, reason: `File too large (>${limit}MB).` };
    return { ok: true };
  };

  const assignFileToItem = (index, kind, file) => {
    const ok = validateFile(file, kind);
    if (!ok.ok) return alert(ok.reason);

    setBlogPost((prev) => {
      const updated = [...prev.content];
      const prevUrl = kind === 'image' ? updated[index].imageUrl : updated[index].videoUrl;
      if (isObjectURL(prevUrl)) URL.revokeObjectURL(prevUrl);

      const url = URL.createObjectURL(file);
      if (kind === 'image') updated[index].imageUrl = url;
      else updated[index].videoUrl = url;
      updated[index].file = file;
      return { ...prev, content: updated };
    });
  };

  const handleDrop = (e, index, kind) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (file) assignFileToItem(index, kind, file);
  };

  const handleDragOver = (e) => e.preventDefault();

  const openFileDialog = (index, kind) => {
    const input = fileInputRefs.current[kind][index];
    if (input) input.click();
  };

  const handleFileSelect = (e, index, kind) => {
    const file = e.target.files?.[0];
    if (file) assignFileToItem(index, kind, file);
    e.target.value = '';
  };

  const deleteContentItem = (index) => {
    setBlogPost((prev) => {
      const item = prev.content[index];
      if (item) {
        if (isObjectURL(item.imageUrl)) URL.revokeObjectURL(item.imageUrl);
        if (isObjectURL(item.videoUrl)) URL.revokeObjectURL(item.videoUrl);
      }
      const updated = prev.content.filter((_, i) => i !== index);
      return { ...prev, content: updated };
    });

    // also remove the corresponding refs position to keep alignment
    fileInputRefs.current.image.splice(index, 1);
    fileInputRefs.current.video.splice(index, 1);
  };

  // === Reordering ===
  const reorderArray = (arr, from, to) => {
    const copy = [...arr];
    const [spliced] = copy.splice(from, 1);
    copy.splice(to, 0, spliced);
    return copy;
  };

  const moveItem = (from, direction) => {
    const to = from + direction; // -1 up, +1 down
    if (to < 0 || to >= blogPost.content.length) return;

    setBlogPost((prev) => ({
      ...prev,
      content: reorderArray(prev.content, from, to),
    }));

    // keep refs aligned with content indices
    fileInputRefs.current.image = reorderArray(fileInputRefs.current.image, from, to);
    fileInputRefs.current.video = reorderArray(fileInputRefs.current.video, from, to);
  };

  // Count per-type number up to given index
  const getTypeNumber = (type, index) =>
    blogPost.content.slice(0, index + 1).filter((c) => c.type === type).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(blogPost);
  };

  return (
    <form onSubmit={handleSubmit} className='grid gap-6 px-4 py-8 bg-colour1 shadow-cardShadow rounded'>
      {/* General info */}
      <section className='grid gap-2 w-full'>
        <div className='grid text-center font-semibold'>
          <h3>Enter your blog information</h3>
        </div>

        <input type='text' name='title' placeholder='Title' value={blogPost.title}
          onChange={handleChange} className='border-solid border-colour8 border-2 px-2 py-2 rounded-md' />
        <input type='text' name='subTitle' placeholder='Subtitle' value={blogPost.subTitle}
          onChange={handleChange} className='border-solid border-colour8 border-2 px-2 py-2 rounded-md' />
        <input type='text' name='subject' placeholder='Subject' value={blogPost.subject}
          onChange={handleChange} className='border-solid border-colour8 border-2 px-2 py-2 rounded-md' />
        <input type='text' name='location' placeholder='Location' value={blogPost.location}
          onChange={handleChange} className='border-solid border-colour8 border-2 px-2 py-2 rounded-md' />
        <input type='text' name='authorName' placeholder='Author Name' value={blogPost.authorName}
          onChange={handleChange} className='border-solid border-colour8 border-2 px-2 py-2 rounded-md' />
        <input type='text' name='tags' placeholder='Tags (comma-separated)' value={blogPost.tags}
          onChange={handleChange} className='border-solid border-colour8 border-2 px-2 py-2 rounded-md' />
      </section>

      {/* Content Sections */}
      <section className='grid w-full gap-3'>
        <div className='grid h-fit text-center'>
          <h3 className='font-semibold'>Content Sections:</h3>
        </div>

        {blogPost.content.map((item, index) => {
          const number = getTypeNumber(item.type, index);
          const atTop = index === 0;
          const atBottom = index === blogPost.content.length - 1;

          return (
            <div key={index} className='grid gap-2'>
              {/* Header row: label + up/down */}
              <div className='grid grid-flow-col auto-cols-max gap-2 items-center justify-between'>
                <div className='font-semibold'>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {number}
                </div>
                <div className='grid grid-flow-col auto-cols-max gap-2 items-center justify-end'>
                  <button
                    type='button'
                    title='Move up'
                    onClick={() => moveItem(index, -1)}
                    disabled={atTop}
                    className={`grid grid-flow-col auto-cols-max items-center gap-2 p-2 rounded border-2 border-colour8 ${
                      atTop ? 'opacity-50 cursor-not-allowed' : 'hover:bg-colourLight/50'
                    }`}
                  >
                    <FiArrowUp className='text-base' />
                  </button>
                  <button
                    type='button'
                    title='Move down'
                    onClick={() => moveItem(index, +1)}
                    disabled={atBottom}
                    className={`grid grid-flow-col auto-cols-max items-center gap-2 p-2 rounded border-2 border-colour8 ${
                      atBottom ? 'opacity-50 cursor-not-allowed' : 'hover:bg-colourLight/50'
                    }`}
                  >
                    <FiArrowDown className='text-base' />
                  </button>
                </div>
              </div>

              {/* Paragraph */}
              {item.type === 'paragraph' && (
                <div className='grid gap-2'>
                  <textarea
                    placeholder='Paragraph Text'
                    value={item.text}
                    onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                    className='border-solid border-colour8 border-2 px-2 py-2 rounded-md w-full'
                  />
                  <div className='grid grid-flow-col auto-cols-max gap-2 items-center justify-start'>
                    <button
                      type='button'
                      onClick={() => deleteContentItem(index)}
                      className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 p-2 rounded whitespace-nowrap'
                    >
                      <FiTrash2 className='text-base' /> Delete
                    </button>
                  </div>
                </div>
              )}

              {/* Image */}
              {item.type === 'image' && (
                <div className='grid gap-2'>
                  {!item.imageUrl && (
                    <div
                      className='grid place-items-center gap-1 w-full p-4 border-2 border-dashed border-colour6 rounded text-sm text-center cursor-pointer hover:bg-colourLight/50 transition'
                      onClick={() => openFileDialog(index, 'image')}
                      onDrop={(e) => handleDrop(e, index, 'image')}
                      onDragOver={handleDragOver}
                    >
                      <FiUploadCloud className='justify-self-center text-xl' />
                      <span className='whitespace-nowrap'>
                        Drag & drop an image here, or click to upload (max {MAX_IMAGE_SIZE_MB}MB)
                      </span>
                    </div>
                  )}

                  {/* persistent hidden input so Change always works */}
                  <input
                    type='file'
                    accept={IMAGE_ACCEPT}
                    className='hidden'
                    ref={(el) => (fileInputRefs.current.image[index] = el)}
                    onChange={(e) => handleFileSelect(e, index, 'image')}
                  />

                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt='Selected'
                      className='w-full h-auto rounded-md border-2 border-colour8'
                    />
                  )}

                  <div className='grid grid-flow-col auto-cols-max gap-2 items-center justify-start'>
                    <button
                      type='button'
                      onClick={() => deleteContentItem(index)}
                      className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 p-2 rounded whitespace-nowrap'
                    >
                      <FiTrash2 className='text-base' /> Delete
                    </button>
                    <button
                      type='button'
                      onClick={() => openFileDialog(index, 'image')}
                      className='grid grid-flow-col auto-cols-max items-center gap-2 bg-yellow-500 text-colour1 p-2 rounded whitespace-nowrap'
                    >
                      <FiEdit2 className='text-base' /> Change
                    </button>
                  </div>
                </div>
              )}

              {/* Video */}
              {item.type === 'video' && (
                <div className='grid gap-2'>
                  {!item.videoUrl && (
                    <div
                      className='grid place-items-center gap-1 w-full p-4 border-2 border-dashed border-colour6 rounded text-sm text-center cursor-pointer hover:bg-colourLight/50 transition'
                      onClick={() => openFileDialog(index, 'video')}
                      onDrop={(e) => handleDrop(e, index, 'video')}
                      onDragOver={handleDragOver}
                    >
                      <FiUploadCloud className='justify-self-center text-xl' />
                      <span className='whitespace-nowrap'>
                        Drag & drop a video here, or click to upload (max {MAX_VIDEO_SIZE_MB}MB)
                      </span>
                    </div>
                  )}

                  {/* persistent hidden input */}
                  <input
                    type='file'
                    accept={VIDEO_ACCEPT}
                    className='hidden'
                    ref={(el) => (fileInputRefs.current.video[index] = el)}
                    onChange={(e) => handleFileSelect(e, index, 'video')}
                  />

                  {item.videoUrl && (
                    <video
                      src={item.videoUrl}
                      controls
                      className='w-full rounded-md border-2 border-colour8'
                    />
                  )}

                  <div className='grid grid-flow-col auto-cols-max gap-2 items-center justify-start'>
                    <button
                      type='button'
                      onClick={() => deleteContentItem(index)}
                      className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 p-2 rounded whitespace-nowrap'
                    >
                      <FiTrash2 className='text-base' /> Delete
                    </button>
                    <button
                      type='button'
                      onClick={() => openFileDialog(index, 'video')}
                      className='grid grid-flow-col auto-cols-max items-center gap-2 bg-yellow-500 text-colour1 p-2 rounded whitespace-nowrap'
                    >
                      <FiEdit2 className='text-base' /> Change
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add item buttons */}
        <section className='grid gap-2 w-full'>
          <div className='grid h-fit text-center'>
            <p>Add items in the order you want them to appear in the blog post.</p>
          </div>
          <div className='grid gap-2'>
            <button type='button' onClick={() => handleAddContent('paragraph')}
              className='bg-blue-500 text-colour1 p-2 rounded hover:brightness-90'>Add Paragraph</button>
            <button type='button' onClick={() => handleAddContent('image')}
              className='bg-green-500 text-colour1 p-2 rounded hover:brightness-90'>Add Image</button>
            <button type='button' onClick={() => handleAddContent('video')}
              className='bg-orange-500 text-colour1 p-2 rounded hover:brightness-90'>Add Video</button>
          </div>
        </section>
      </section>

      {/* Submit */}
      <section className='grid w-full'>
        <div className='grid'>
          <button type='submit' className='bg-colour5 text-colour1 px-2 py-2 rounded hover:brightness-90'>
            Submit Post
          </button>
        </div>
      </section>
    </form>
  );
}

export default CreateBlogPostForm;
