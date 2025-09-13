import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FiUploadCloud,
  FiTrash2,
  FiEdit2,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi';
import client from '../../../../api/client';
import { UPDATE_BLOG_POST_API } from '../../../../utils/ApiRoutes';
import { presignAndUpload } from '../../../../utils/media/uploadViaMediaService';
import {
  IMAGE_ACCEPT,
  MAX_IMAGE_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
  VIDEO_ACCEPT,
} from '../../../../utils/media/mediaConstants';
import { mediaUrlFrom } from '../../../../utils/media/mediaUrl';

const AUTOSAVE_MS = 600; // debounce

function toInitialStateFromPost(post) {
  const tagsCsv = Array.isArray(post?.tags)
    ? post.tags
        .map((t) => (typeof t === 'string' ? t : t?.name))
        .filter(Boolean)
        .join(',')
    : '';

  const mediaLinks = Array.isArray(post?.mediaLinks) ? post.mediaLinks : [];
  const thumbLink = mediaLinks.find((l) => l?.role === 'THUMBNAIL');
  const thumbnailKey = thumbLink?.media?.key || post?.thumbnailImage || null;

  const blocks = Array.isArray(post?.content) ? post.content : [];
  const content = blocks.map((b) => {
    if (b?.type === 'paragraph') {
      return {
        type: 'paragraph',
        text: String(b?.text || ''),
        file: null,
        previewUrl: '',
        isThumbnail: false,
      };
    }
    if (b?.type === 'image') {
      const key = b?.key || '';
      return {
        type: 'image',
        text: '',
        file: null,
        key,
        previewUrl: key ? mediaUrlFrom({ objectKey: key }) : '',
        isThumbnail: thumbnailKey ? key === thumbnailKey : false,
      };
    }
    if (b?.type === 'video') {
      const key = b?.key || '';
      return {
        type: 'video',
        text: '',
        file: null,
        key,
        previewUrl: key ? mediaUrlFrom({ objectKey: key }) : '',
        isThumbnail: false,
      };
    }
    return {
      type: 'paragraph',
      text: '',
      file: null,
      previewUrl: '',
      isThumbnail: false,
    };
  });

  return {
    title: post?.title || '',
    slug: post?.slug || '',
    subTitle: post?.subTitle || '',
    subject: post?.subject || '',
    location: post?.location || '',
    authorName: post?.authorName || '',
    tags: tagsCsv,
    content,
  };
}

function EditBlogPostForm({ initialPost }) {
  // -----------------------
  // DRAFT: key & helpers
  // -----------------------
  const DRAFT_KEY = useMemo(
    () => (initialPost?.id ? `editBlogPostDraft:${initialPost.id}` : null),
    [initialPost?.id]
  );

  const isObjectURL = (url) =>
    typeof url === 'string' && url.startsWith('blob:');

  const serializeForDraft = (state) => ({
    ...state,
    content: state.content.map((item) => {
      if (item.type === 'paragraph') {
        return { type: 'paragraph', text: item.text || '' };
      }
      if (item.type === 'image' || item.type === 'video') {
        const out = {
          type: item.type,
          text: item.text || '',
          isThumbnail: !!item.isThumbnail,
        };
        if (item.key) out.key = item.key; // keep remote key
        if (item.previewUrl && !isObjectURL(item.previewUrl)) {
          out.previewUrl = item.previewUrl; // keep remote preview
        }
        return out;
      }
      return { type: item.type };
    }),
  });

  const deepEqualSerialized = (a, b) =>
    JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

  // -----------------------
  // State
  // -----------------------
  const [blogPost, setBlogPost] = useState(() =>
    toInitialStateFromPost(initialPost)
  );
  const [submitting, setSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [okMsg, setOkMsg] = useState('');
  const fileInputRefs = useRef({ image: [], video: [] });
  const okMsgRef = useRef(null);

  // Keep a baseline to detect unsaved changes (vs loaded initial/draft)
  const baselineRef = useRef(
    serializeForDraft(toInitialStateFromPost(initialPost))
  );
  const autosaveTimerRef = useRef(null);

  // Re-init when initialPost changes: prefer local draft if present
  useEffect(() => {
    const init = toInitialStateFromPost(initialPost);
    let next = init;
    try {
      if (DRAFT_KEY) {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (raw) {
          const draft = JSON.parse(raw);
          // merge draft over init to keep any new server fields
          next = { ...init, ...draft, content: draft?.content ?? init.content };
        }
      }
    } catch {
      // ignore malformed draft
    }
    setBlogPost(next);
    baselineRef.current = serializeForDraft(next);
    // clear any pending timer when switching posts
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
  }, [initialPost, DRAFT_KEY]);

  // Are there unsaved changes?
  const hasUnsaved = useMemo(() => {
    const current = serializeForDraft(blogPost);
    return !deepEqualSerialized(current, baselineRef.current);
  }, [blogPost]);

  // DRAFT: autosave with debounce
  useEffect(() => {
    if (!DRAFT_KEY) return;
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      try {
        const serialized = serializeForDraft(blogPost);
        if (hasUnsaved) {
          localStorage.setItem(DRAFT_KEY, JSON.stringify(serialized));
        } else {
          localStorage.removeItem(DRAFT_KEY);
        }
      } catch {
        /* ignore quota errors */
      }
    }, AUTOSAVE_MS);
    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [blogPost, hasUnsaved, DRAFT_KEY]);

  // Warn on page close if there are unsaved edits
  useEffect(() => {
    const handler = (e) => {
      if (submitting || !hasUnsaved) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasUnsaved, submitting]);

  const discardDraft = () => {
    if (DRAFT_KEY) localStorage.removeItem(DRAFT_KEY);
    const reset = toInitialStateFromPost(initialPost);
    setBlogPost(reset);
    baselineRef.current = serializeForDraft(reset);
    setErrMsg('');
    setOkMsg('');
  };

  // -----------------------
  // Your existing editor logic
  // -----------------------
  useEffect(() => {
    // if initial changes (navigating between posts), re-init handled above
  }, [initialPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogPost((prev) => ({ ...prev, [name]: value }));
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
      updated[index] = {
        ...updated[index],
        file,
        previewUrl: url,
        key: undefined, // replacing any existing remote key
      };
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

  const setThumbnailIndex = (idx) => {
    setBlogPost((prev) => ({
      ...prev,
      content: prev.content.map((c, i) =>
        c.type === 'image' ? { ...c, isThumbnail: i === idx } : c
      ),
    }));
  };

  async function submitUploadsAndBuildContent() {
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

      if (item.type === 'image') {
        let key = item.key;
        if (item.file) {
          const { key: uploadedKey } = await presignAndUpload({
            resource: 'blog',
            file: item.file,
            filename: item.file.name,
          });
          key = uploadedKey;
        }
        if (key) {
          galleryKeys.push(key);
          if (item.isThumbnail && !thumbnailImageKey) thumbnailImageKey = key;
          orderedContent.push({ type: 'image', key });
        }
        continue;
      }

      if (item.type === 'video') {
        let key = item.key;
        if (item.file) {
          const { key: uploadedKey } = await presignAndUpload({
            resource: 'blog',
            file: item.file,
            filename: item.file.name,
          });
          key = uploadedKey;
        }
        if (key) {
          embedKeys.push(key);
          orderedContent.push({ type: 'video', key });
        }
        continue;
      }
    }

    const uniq = (arr) => Array.from(new Set(arr));
    return {
      orderedContent,
      galleryKeys: uniq(galleryKeys),
      embedKeys: uniq(embedKeys),
      thumbnailImageKey,
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setOkMsg('');
    setSubmitting(true);

    try {
      const id = initialPost?.id;
      const { title, slug, authorName } = blogPost;

      if (!id) {
        setErrMsg('Missing post id.');
        setSubmitting(false);
        return;
      }
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
        slug,
        subTitle: blogPost.subTitle || null,
        subject: blogPost.subject || null,
        location: blogPost.location || null,
        authorName: authorName || null,
        replaceTagsWith: tagNames,
        content: orderedContent,
        thumbnailImageKey: thumbnailImageKey ?? null,
        galleryKeys,
        embedKeys,
      };

      const resp = await client.patch(
        `${UPDATE_BLOG_POST_API}/${id}`,
        payload,
        true
      );

      if (!resp?.data?.post) {
        setErrMsg('Update failed.');
        setSubmitting(false);
        return;
      }

      // SUCCESS: clear draft and reset baseline to the new saved state
      if (DRAFT_KEY) localStorage.removeItem(DRAFT_KEY);
      const savedState = toInitialStateFromPost(resp.data.post);
      setBlogPost(savedState);
      baselineRef.current = serializeForDraft(savedState);

      setOkMsg(`Updated: ${resp.data.post.title}`);
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        okMsgRef.current?.focus?.();
      });
    } catch (err) {
      console.error('Update blog error', err);
      const apiMsg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'Update blog failed.';
      setErrMsg(typeof apiMsg === 'string' ? apiMsg : 'Update blog failed.');
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        okMsgRef.current?.focus?.();
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={okMsgRef}
      className='grid gap-6 px-4 py-8 bg-colour1 rounded border-2 border-solid border-colour2'
    >
      <section className='grid text-center'>
        <h3 className='font-semibold'>Edit Blog Post</h3>
      </section>

      {errMsg && (
        <section className='p-2 text-center font-semibold rounded border-2 border-solid border-colour2 text-red-700'>
          {errMsg}
        </section>
      )}
      {okMsg && (
        <section className='p-2 text-center font-semibold rounded border-2 border-solid border-colour2 text-green-700'>
          {okMsg}
        </section>
      )}

      {/* Draft banner */}
      {hasUnsaved && (
        <section className='p-2 text-center font-semibold rounded border-2 border-solid border-colour2 text-colour7'>
          Draft changes are being autosaved.{' '}
          <button
            type='button'
            onClick={discardDraft}
            className='underline underline-offset-2'
          >
            Discard draft
          </button>
        </section>
      )}


      {/* core fields */}
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
                      className='grid place-items-center gap-1 w-full p-4 bg-colour4/50 border-2 border-dashed border-colour2 rounded text-sm text-center cursor-pointer'
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
                      className='grid place-items-center gap-1 w-full p-4 bg-colour4/50 border-2 border-dashed border-colour2 rounded text-sm text-center cursor-pointer'
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

        <div className='grid lg:grid-cols-3 gap-2'>
          <button
            type='button'
            onClick={() => handleAddContent('paragraph')}
            className='bg-blue-600 text-colour1 px-2 py-2 rounded shadow-cardShadow'
          >
            Add Paragraph
          </button>
          <button
            type='button'
            onClick={() => handleAddContent('image')}
            className='bg-green-600 text-colour1 px-2 py-2 rounded shadow-cardShadow'
          >
            Add Image
          </button>
          <button
            type='button'
            onClick={() => handleAddContent('video')}
            className='bg-orange-600 text-colour1 px-2 py-2 rounded shadow-cardShadow'
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
          {submitting ? 'Updating…' : 'Update Post'}
        </button>
      </section>
    </form>
  );
}

export default EditBlogPostForm;
