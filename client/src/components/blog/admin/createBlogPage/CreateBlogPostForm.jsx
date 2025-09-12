import React, { useRef, useState } from 'react';
import {
  FiUploadCloud,
  FiTrash2,
  FiEdit2,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi';
// Api
import client from '../../../../api/client';
// Routes
import { CREATE_BLOG_POST_API } from '../../../../utils/ApiRoutes';
// Upload
import { presignAndUpload } from '../../../../utils/media/uploadViaMediaService';
// Media constraints
import {
  IMAGE_ACCEPT,
  MAX_IMAGE_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
  VIDEO_ACCEPT,
} from '../../../../utils/media/mediaConstants';
import { useUser } from '../../../../context/UserContext';

function slugify(s = '') {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function CreateBlogPostForm() {
  const { user } = useUser();
  const okMsgRef = useRef(null);

  const [blogPost, setBlogPost] = useState({
    title: '',
    slug: '',
    subTitle: '',
    subject: '',
    location: '',
    // [{ type:'paragraph'|'image'|'video', text?, file?, previewUrl?, isThumbnail? }]
    content: [],
    authorName: '',
    tags: '', // comma-separated
  });
  console.log('[CreateBlogPostForm], blogPosty', blogPost);

  const [submitting, setSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [okMsg, setOkMsg] = useState('');

  const fileInputRefs = useRef({ image: [], video: [] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleBlur = () => {
    if (!blogPost.slug && blogPost.title) {
      setBlogPost((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  };

  const handleAddContent = (type) => {
    setBlogPost((prev) => ({
      ...prev,
      content: [
        ...prev.content,
        { type, text: '', file: null, previewUrl: '', isThumbnail: false },
      ],
    }));
  };

  const isObjectURL = (url) =>
    typeof url === 'string' && url.startsWith('blob:');

  const validateFile = (file, kind) => {
    if (!file) return { ok: false, reason: 'No file' };
    const isImage = kind === 'image';
    if (isImage && !file.type.startsWith('image/'))
      return { ok: false, reason: 'Please select an image file.' };
    if (!isImage && !file.type.startsWith('video/'))
      return { ok: false, reason: 'Please select a video file.' };
    const sizeMB = file.size / (1024 * 1024);
    const limit = isImage ? MAX_IMAGE_SIZE_MB : MAX_VIDEO_SIZE_MB;
    if (sizeMB > limit)
      return { ok: false, reason: `File too large (>${limit}MB).` };
    return { ok: true };
  };

  const assignFileToItem = (index, kind, file) => {
    const ok = validateFile(file, kind);
    if (!ok.ok) return alert(ok.reason);

    setBlogPost((prev) => {
      const updated = [...prev.content];
      const prevUrl = updated[index]?.previewUrl;
      if (isObjectURL(prevUrl)) URL.revokeObjectURL(prevUrl);

      const url = URL.createObjectURL(file);
      updated[index] = { ...updated[index], file, previewUrl: url };
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
      if (item?.previewUrl && isObjectURL(item.previewUrl))
        URL.revokeObjectURL(item.previewUrl);
      const updated = prev.content.filter((_, i) => i !== index);
      return { ...prev, content: updated };
    });
    fileInputRefs.current.image.splice(index, 1);
    fileInputRefs.current.video.splice(index, 1);
  };

  const reorderArray = (arr, from, to) => {
    const copy = [...arr];
    const [spliced] = copy.splice(from, 1);
    copy.splice(to, 0, spliced);
    return copy;
  };
  const moveItem = (from, direction) => {
    const to = from + direction;
    if (to < 0 || to >= blogPost.content.length) return;
    setBlogPost((prev) => ({
      ...prev,
      content: reorderArray(prev.content, from, to),
    }));
    fileInputRefs.current.image = reorderArray(
      fileInputRefs.current.image,
      from,
      to
    );
    fileInputRefs.current.video = reorderArray(
      fileInputRefs.current.video,
      from,
      to
    );
  };

  const getTypeNumber = (type, index) =>
    blogPost.content.slice(0, index + 1).filter((c) => c.type === type).length;

  // if you ever want to enforce exactly one thumbnail, flip others off when one is set true.
  const setThumbnailIndex = (idx) => {
    setBlogPost((prev) => ({
      ...prev,
      content: prev.content.map((c, i) =>
        c.type === 'image' ? { ...c, isThumbnail: i === idx } : c
      ),
    }));
  };

  // Upload once, build ordered content for DB (paragraphs + {image|video, key}),
  // and return normalized key arrays for join table.
  async function submitUploadsAndBuildContent() {
    console.log('[CreateBlogPostForm] submitUploadsAndBuildContent()');
    const orderedContent = [];
    const galleryKeys = [];
    const embedKeys = [];
    let thumbnailImageKey = null;

    for (let i = 0; i < blogPost.content.length; i++) {
      const item = blogPost.content[i];

      if (item.type === 'paragraph') {
        const text = item.text?.trim();
        if (text) orderedContent.push({ type: 'paragraph', text });
        continue;
      }

      if (item.type === 'image' && item.file) {
        const { key } = await presignAndUpload({
          resource: 'blog',
          file: item.file,
          filename: item.file.name,
        });
        console.log('[upload:image] key', key);

        galleryKeys.push(key);
        if (item.isThumbnail && !thumbnailImageKey) thumbnailImageKey = key;
        orderedContent.push({ type: 'image', key });
        continue;
      }

      if (item.type === 'video' && item.file) {
        const { key } = await presignAndUpload({
          resource: 'blog',
          file: item.file,
          filename: item.file.name,
        });
        console.log('[upload:video] key', key);

        embedKeys.push(key);
        orderedContent.push({ type: 'video', key });
        continue;
      }
    }

    return { orderedContent, galleryKeys, embedKeys, thumbnailImageKey };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setOkMsg('');
    setSubmitting(true);
    console.log('handleSubmit');

    try {
      const { title, slug, authorName } = blogPost;
      console.log(
        'handleSubmit title, slug, authorName',
        title,
        slug,
        authorName
      );

      if (!title || !slug) {
        setErrMsg('Please provide both a title and a slug.');
        setSubmitting(false);
        return;
      }

      const { orderedContent, galleryKeys, embedKeys, thumbnailImageKey } =
        await submitUploadsAndBuildContent();

      const tagNames = blogPost.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title,
        subTitle: blogPost.subTitle || null,
        subject: blogPost.subject || null,
        location: blogPost.location || null,
        slug,
        content: orderedContent, // <— ordered mix of paragraphs/images/videos
        authorId: user?.id ?? null,
        authorName: authorName || null,
        tags: tagNames,
        thumbnailImageKey, // may be null
        galleryKeys,
        embedKeys,
      };

      console.log('payload', payload);
      const resp = await client.post(CREATE_BLOG_POST_API, payload, true);
      console.log('resp', resp);

      if (!resp?.data?.post) {
        setErrMsg('Create failed.');
        setSubmitting(false);
        return;
      }

      setOkMsg(`Created: ${resp.data.post.title}`);
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        okMsgRef.current?.focus?.();
      });

      // optional: reset form here
    } catch (err) {
      console.error('Create blog error', err);
      const apiMsg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'Create blog failed.';
      setErrMsg(typeof apiMsg === 'string' ? apiMsg : 'Create blog failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      ref={okMsgRef}
      onSubmit={handleSubmit}
      className='grid gap-6 px-4 py-8 bg-colour1 rounded border-2 border-solid border-colour2'
    >
      <section className='grid text-center'>
        <h3 className='font-semibold'>Create Blog Post</h3>
      </section>

      {errMsg && (
        <section className='p-3 rounded border-2 border-solid border-colour2 text-red-700'>
          {errMsg}
        </section>
      )}
      {okMsg && (
        <section className='p-3 rounded border-2 border-solid border-colour2 text-green-700'>
          {okMsg}
        </section>
      )}

      <section className='grid gap-2'>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={blogPost.title}
          onChange={handleChange}
          onBlur={handleTitleBlur}
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

      {/* content builder */}
      <section className='grid gap-3'>
        <div className='grid text-center'>
          <h3 className='font-semibold'>Content Sections</h3>
        </div>

        {blogPost.content.map((item, index) => {
          const number = getTypeNumber(item.type, index);
          const atTop = index === 0;
          const atBottom = index === blogPost.content.length - 1;

          return (
            <div
              key={index}
              className='grid gap-2 border-2 border-solid border-colour2 rounded p-3'
            >
              <div className='grid grid-flow-col auto-cols-max items-center justify-between'>
                <div className='font-semibold'>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}{' '}
                  {number}
                </div>
                <div className='grid grid-flow-col auto-cols-max gap-2'>
                  <button
                    type='button'
                    title='Move up'
                    onClick={() => moveItem(index, -1)}
                    disabled={atTop}
                    className={`grid place-items-center px-2 py-1 rounded border-2 border-solid border-colour2 ${
                      atTop ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    <FiArrowUp />
                  </button>
                  <button
                    type='button'
                    title='Move down'
                    onClick={() => moveItem(index, +1)}
                    disabled={atBottom}
                    className={`grid place-items-center px-2 py-1 rounded border-2 border-solid border-colour2 ${
                      atBottom ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    <FiArrowDown />
                  </button>
                </div>
              </div>

              {item.type === 'paragraph' && (
                <div className='grid gap-2'>
                  <textarea
                    placeholder='Paragraph text'
                    value={item.text}
                    onChange={(e) => {
                      const updated = [...blogPost.content];
                      updated[index].text = e.target.value;
                      setBlogPost((prev) => ({ ...prev, content: updated }));
                    }}
                    className='border-2 border-solid border-colour2 px-2 py-2 rounded-md w-full'
                  />
                  <div className='grid grid-flow-col auto-cols-max gap-2 justify-start'>
                    <button
                      type='button'
                      onClick={() => deleteContentItem(index)}
                      className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 px-2 py-1 rounded'
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              )}

              {item.type === 'image' && (
                <div className='grid gap-2'>
                  {!item.previewUrl && (
                    <div
                      className='grid place-items-center gap-1 w-full p-4 border-2 border-dashed border-colour2 rounded text-sm text-center cursor-pointer'
                      onClick={() => openFileDialog(index, 'image')}
                      onDrop={(e) => handleDrop(e, index, 'image')}
                      onDragOver={handleDragOver}
                    >
                      <FiUploadCloud className='justify-self-center text-xl' />
                      <span>
                        Click or drop an image (max {MAX_IMAGE_SIZE_MB}MB)
                      </span>
                    </div>
                  )}

                  <input
                    type='file'
                    accept={IMAGE_ACCEPT}
                    className='hidden'
                    ref={(el) => (fileInputRefs.current.image[index] = el)}
                    onChange={(e) => handleFileSelect(e, index, 'image')}
                  />

                  {item.previewUrl && (
                    <img
                      src={item.previewUrl}
                      alt='Selected'
                      className='w-full h-auto rounded-md border-2 border-solid border-colour2'
                    />
                  )}

                  {/* pick thumbnail here */}
                  <label className='inline-flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={!!item.isThumbnail}
                      onChange={(e) => {
                        const updated = [...blogPost.content];
                        updated[index].isThumbnail = e.target.checked;
                        setBlogPost((prev) => ({ ...prev, content: updated }));
                        if (e.target.checked) setThumbnailIndex(index);
                      }}
                    />
                    <span>Use as thumbnail</span>
                  </label>

                  <div className='grid grid-flow-col auto-cols-max gap-2 justify-start'>
                    <button
                      type='button'
                      onClick={() => deleteContentItem(index)}
                      className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 px-2 py-1 rounded'
                    >
                      <FiTrash2 /> Delete
                    </button>
                    <button
                      type='button'
                      onClick={() => openFileDialog(index, 'image')}
                      className='grid grid-flow-col auto-cols-max items-center gap-2 bg-yellow-500 text-colour1 px-2 py-1 rounded'
                    >
                      <FiEdit2 /> Change
                    </button>
                  </div>
                </div>
              )}

              {item.type === 'video' && (
                <div className='grid gap-2'>
                  {!item.previewUrl && (
                    <div
                      className='grid place-items-center gap-1 w-full p-4 border-2 border-dashed border-colour2 rounded text-sm text-center cursor-pointer'
                      onClick={() => openFileDialog(index, 'video')}
                      onDrop={(e) => handleDrop(e, index, 'video')}
                      onDragOver={handleDragOver}
                    >
                      <FiUploadCloud className='justify-self-center text-xl' />
                      <span>
                        Click or drop a video (max {MAX_VIDEO_SIZE_MB}MB)
                      </span>
                    </div>
                  )}

                  <input
                    type='file'
                    accept={VIDEO_ACCEPT}
                    className='hidden'
                    ref={(el) => (fileInputRefs.current.video[index] = el)}
                    onChange={(e) => handleFileSelect(e, index, 'video')}
                  />

                  {item.previewUrl && (
                    <video
                      src={item.previewUrl}
                      controls
                      className='w-full rounded-md border-2 border-solid border-colour2'
                    />
                  )}

                  <div className='grid grid-flow-col auto-cols-max gap-2 justify-start'>
                    <button
                      type='button'
                      onClick={() => deleteContentItem(index)}
                      className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 px-2 py-1 rounded'
                    >
                      <FiTrash2 /> Delete
                    </button>
                    <button
                      type='button'
                      onClick={() => openFileDialog(index, 'video')}
                      className='grid grid-flow-col auto-cols-max items-center gap-2 bg-yellow-500 text-colour1 px-2 py-1 rounded'
                    >
                      <FiEdit2 /> Change
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className='grid gap-2'>
          <button
            type='button'
            onClick={() => handleAddContent('paragraph')}
            className='bg-blue-600 text-colour1 px-2 py-2 rounded'
          >
            Add Paragraph
          </button>
          <button
            type='button'
            onClick={() => handleAddContent('image')}
            className='bg-green-600 text-colour1 px-2 py-2 rounded'
          >
            Add Image
          </button>
          <button
            type='button'
            onClick={() => handleAddContent('video')}
            className='bg-orange-600 text-colour1 px-2 py-2 rounded'
          >
            Add Video
          </button>
        </div>
      </section>

      <section className='grid'>
        <button
          type='submit'
          disabled={submitting}
          className='bg-colour5 text-colour1 px-3 py-2 rounded border-2 border-solid border-colour2'
        >
          {submitting ? 'Submitting…' : 'Submit Post'}
        </button>
      </section>
    </form>
  );
}

export default CreateBlogPostForm;
