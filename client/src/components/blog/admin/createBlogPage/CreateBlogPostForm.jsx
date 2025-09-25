import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { FiUploadCloud, FiTrash2, FiEdit2, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import client from '../../../../api/client';
import { CREATE_BLOG_POST_API } from '../../../../utils/ApiRoutes';
import { UPLOAD_CONCURRENCY } from '../../../../utils/Constants';
import { presignAndUpload } from '../../../../utils/media/uploadViaMediaService';
import { IMAGE_ACCEPT, MAX_IMAGE_SIZE_MB, MAX_VIDEO_SIZE_MB, VIDEO_ACCEPT } from '../../../../utils/media/mediaConstants';
import { useUser } from '../../../../context/UserContext';
import CreateBlogCoreFields from './CreateBlogCoreFields';
import { runWithConcurrencyLimit } from '../../../../utils/functions/RunWithConcurrencyLimit';

const DRAFT_KEY = 'createBlogPostDraft:v1';
const AUTOSAVE_MS = 600;

function slugify(s = '') {
  return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const emptyState = {
  title: '',
  slug: '',
  subTitle: '',
  subject: '',
  location: '',
  // content supports: paragraph | heading | list | image | video | link
  content: [],
  authorName: '',
  tags: '',
};

function CreateBlogPostForm() {
  const { user } = useUser();
  const okMsgRef = useRef(null);

  const [blogPost, setBlogPost] = useState(emptyState);
  const [submitting, setSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [okMsg, setOkMsg] = useState('');

  const fileInputRefs = useRef({ image: [], video: [] });

  // --- DRAFT helpers ---
  const isObjectURL = (url) => typeof url === 'string' && url.startsWith('blob:');

  const serializeForDraft = (state) => {
    const draft = {
      ...state,
      content: state.content.map((item) => {
        if (item.type === 'paragraph' || item.type === 'heading') {
          return { type: item.type, text: item.text || '' };
        }
        if (item.type === 'list') {
          const items = Array.isArray(item.items) ? item.items.map(String).map(s => s.trim()).filter(Boolean) : [];
          return { type: 'list', items };
        }
        if (item.type === 'link') {
          const text = String(item.text || '').trim();
          const href = String(item.href || '').trim();
          const internal = !!item.internal;
          return { type: 'link', text, href, internal };
        }
        if (item.type === 'image' || item.type === 'video') {
          const out = { type: item.type, text: item.text || '', isThumbnail: !!item.isThumbnail };
          if (item.key) out.key = item.key;
          if (item.previewUrl && !isObjectURL(item.previewUrl)) out.previewUrl = item.previewUrl;
          return out;
        }
        return { type: item.type };
      }),
    };
    return draft;
  };

  const hasMeaningfulData = (state) => {
    if (!state) return false;
    if (state.title || state.slug || state.subTitle || state.subject || state.location || state.authorName || state.tags) {
      return true;
    }
    return state.content && state.content.length > 0;
  };

  // Load draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') setBlogPost({ ...emptyState, ...parsed });
      }
    } catch {}
  }, []);

  // AUTOSAVE (debounced) — with "skip once" protection
  const autosaveTimerRef = useRef(null);
  const skipNextAutosaveRef = useRef(false);

  useEffect(() => {
    if (skipNextAutosaveRef.current) { skipNextAutosaveRef.current = false; return; }
    if (!hasMeaningfulData(blogPost) || submitting) return;

    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      try {
        const draft = serializeForDraft(blogPost);
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch {}
    }, AUTOSAVE_MS);

    return () => {
      if (autosaveTimerRef.current) { clearTimeout(autosaveTimerRef.current); autosaveTimerRef.current = null; }
    };
  }, [blogPost, submitting]);

  // Warn on unload if there's work
  useEffect(() => {
    const handler = (e) => {
      if (submitting) return;
      if (hasMeaningfulData(blogPost)) { e.preventDefault(); e.returnValue = ''; }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [blogPost, submitting]);

  const discardDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setBlogPost(emptyState);
    setErrMsg('');
    setOkMsg('');
  };

  // --- editor logic ---
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
    const base = { type, text: '', file: null, previewUrl: '', isThumbnail: false };
    let block = base;

    if (type === 'list') {
      block = { type: 'list', items: [''] };
    } else if (type === 'link') {
      block = { type: 'link', text: '', href: '', internal: true }; // internal true means external=false
    }

    setBlogPost((prev) => ({ ...prev, content: [...prev.content, block] }));
  };

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
      const prevUrl = updated[index]?.previewUrl;
      if (isObjectURL(prevUrl)) URL.revokeObjectURL(prevUrl);
      const url = URL.createObjectURL(file);
      updated[index] = { ...updated[index], file, previewUrl: url };
      return { ...prev, content: updated };
    });
  };

  const handleDrop = (e, index, kind) => { e.preventDefault(); e.stopPropagation(); const f = e.dataTransfer?.files?.[0]; if (f) assignFileToItem(index, kind, f); };
  const handleDragOver = (e) => e.preventDefault();
  const openFileDialog = (index, kind) => { const input = fileInputRefs.current[kind][index]; if (input) input.click(); };
  const handleFileSelect = (e, index, kind) => { const f = e.target.files?.[0]; if (f) assignFileToItem(index, kind, f); e.target.value = ''; };

  const deleteContentItem = (index) => {
    setBlogPost((prev) => {
      const item = prev.content[index];
      if (item?.previewUrl && isObjectURL(item.previewUrl)) URL.revokeObjectURL(item.previewUrl);
      const updated = prev.content.filter((_, i) => i !== index);
      return { ...prev, content: updated };
    });
    fileInputRefs.current.image.splice(index, 1);
    fileInputRefs.current.video.splice(index, 1);
  };

  const reorderArray = (arr, from, to) => { const copy = [...arr]; const [spliced] = copy.splice(from, 1); copy.splice(to, 0, spliced); return copy; };
  const moveItem = (from, direction) => {
    const to = from + direction; if (to < 0 || to >= blogPost.content.length) return;
    setBlogPost((prev) => ({ ...prev, content: reorderArray(prev.content, from, to) }));
    fileInputRefs.current.image = reorderArray(fileInputRefs.current.image, from, to);
    fileInputRefs.current.video = reorderArray(fileInputRefs.current.video, from, to);
  };

  const getTypeNumber = (type, index) => blogPost.content.slice(0, index + 1).filter((c) => c.type === type).length;

  const setThumbnailIndex = (idx) => {
    setBlogPost((prev) => ({ ...prev, content: prev.content.map((c, i) => (c.type === 'image' ? { ...c, isThumbnail: i === idx } : c)) }));
  };

  // list item helpers
  const addListItem = (blockIdx) => {
    setBlogPost((p) => {
      const c = [...p.content];
      const items = Array.isArray(c[blockIdx].items) ? [...c[blockIdx].items] : [];
      items.push('');
      c[blockIdx] = { ...c[blockIdx], items };
      return { ...p, content: c };
    });
  };
  const updateListItem = (blockIdx, itemIdx, val) => {
    setBlogPost((p) => {
      const c = [...p.content];
      const items = [...(c[blockIdx].items || [])];
      items[itemIdx] = val;
      c[blockIdx] = { ...c[blockIdx], items };
      return { ...p, content: c };
    });
  };
  const removeListItem = (blockIdx, itemIdx) => {
    setBlogPost((p) => {
      const c = [...p.content];
      const items = [...(c[blockIdx].items || [])];
      items.splice(itemIdx, 1);
      c[blockIdx] = { ...c[blockIdx], items };
      return { ...p, content: c };
    });
  };

  async function submitUploadsAndBuildContent() {
    const { content } = blogPost;

    // 1) Collect items that need uploads (new files only)
    const pending = [];
    for (let i = 0; i < content.length; i++) {
      const item = content[i];
      if ((item.type === 'image' || item.type === 'video') && item.file) {
        pending.push({ index: i, type: item.type, file: item.file, isThumb: !!item.isThumbnail });
      }
    }

    // 2) Upload in parallel with a cap
    const uploadResults = await runWithConcurrencyLimit(
      UPLOAD_CONCURRENCY,
      pending,
      async (p) => {
        const { key } = await presignAndUpload({
          resource: 'blog',
          file: p.file,
          filename: p.file.name,
        });
        return { index: p.index, type: p.type, key, isThumb: p.isThumb };
      }
    );

    // 3) Make a map: contentIndex -> uploaded key
    const uploadedKeyByIndex = new Map(uploadResults.map(r => [r.index, r.key]));

    // 4) Build orderedContent + key lists in one pass (preserve original order)
    const orderedContent = [];
    const galleryKeys = [];
    const embedKeys = [];
    let thumbnailImageKey = null;

    for (let i = 0; i < content.length; i++) {
      const item = content[i];

      if (item.type === 'paragraph' || item.type === 'heading') {
        const text = String(item.text || '').trim();
        if (text) orderedContent.push({ type: item.type, text });
        continue;
      }

      if (item.type === 'list') {
        const items = Array.isArray(item.items)
          ? item.items.map((s) => String(s).trim()).filter(Boolean)
          : [];
        if (items.length) orderedContent.push({ type: 'list', items });
        continue;
      }

      if (item.type === 'link') {
        const text = String(item.text || '').trim();
        const href = String(item.href || '').trim();
        const internal = !!item.internal; // true = internal, false = external
        if (text && href) {
          orderedContent.push({ type: 'link', text, href, internal });
        }
        continue;
      }

      if (item.type === 'image' || item.type === 'video') {
        const key = item.key || uploadedKeyByIndex.get(i);
        if (!key) continue;

        if (item.type === 'image') {
          galleryKeys.push(key);
          if (item.isThumbnail && !thumbnailImageKey) thumbnailImageKey = key;
          orderedContent.push({ type: 'image', key });
        } else {
          embedKeys.push(key);
          orderedContent.push({ type: 'video', key });
        }
        continue;
      }
    }

    return { orderedContent, galleryKeys, embedKeys, thumbnailImageKey };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg(''); setOkMsg(''); setSubmitting(true);

    try {
      const { title, slug, authorName } = blogPost;
      if (!title || !slug) { setErrMsg('Please provide both a title and a slug.'); setSubmitting(false); return; }

      const { orderedContent, galleryKeys, embedKeys, thumbnailImageKey } = await submitUploadsAndBuildContent();

      const tagNames = blogPost.tags.split(',').map((t) => t.trim()).filter(Boolean);

      const payload = {
        title,
        subTitle: blogPost.subTitle || null,
        subject: blogPost.subject || null,
        location: blogPost.location || null,
        slug,
        content: orderedContent,
        authorId: user?.id ?? null,
        authorName: authorName || null,
        tags: tagNames,
        thumbnailImageKey,
        galleryKeys,
        embedKeys,
      };

      const resp = await client.post(CREATE_BLOG_POST_API, payload, true);
      if (!resp?.data?.post) { setErrMsg('Create failed.'); setSubmitting(false); return; }

      // SUCCESS: clear draft + skip next autosave tick
      if (autosaveTimerRef.current) { clearTimeout(autosaveTimerRef.current); autosaveTimerRef.current = null; }
      localStorage.removeItem(DRAFT_KEY);
      skipNextAutosaveRef.current = true;

      setOkMsg(`Created blog post: ${resp.data.post.title}`);
      requestAnimationFrame(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); okMsgRef.current?.focus?.(); });
    } catch (err) {
      const apiMsg = err?.response?.data?.message || err?.response?.data || err?.message || 'Create blog failed.';
      setErrMsg(typeof apiMsg === 'string' ? apiMsg : 'Create blog failed.');
      requestAnimationFrame(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); okMsgRef.current?.focus?.(); });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form ref={okMsgRef} onSubmit={handleSubmit} className='grid gap-6 px-4 py-8 bg-colour1 rounded border-2 border-solid border-colour2'>
      <section className='grid text-center'><h3 className='font-semibold'>Create Blog Post</h3></section>

      {errMsg && <section className='p-2 text-center font-semibold rounded border-2 border-solid border-colour2 text-red-700'>{errMsg}</section>}
      {okMsg && <section className='p-2 text-center font-semibold rounded border-2 border-solid border-colour2 text-green-700'>{okMsg}</section>}

      {hasMeaningfulData(blogPost) && !okMsg && (
        <section className='p-2 text-center font-semibold rounded border-2 border-solid border-colour2 text-colour7'>
          Draft is being autosaved.{' '}
          <button type='button' onClick={discardDraft} className='underline underline-offset-2'>Click to discard draft</button>
        </section>
      )}

      {/* Core fields */}
      <CreateBlogCoreFields blogPost={blogPost} onChange={handleChange} onTitleBlur={handleTitleBlur} />

      {/* Content builder */}
      <section className='grid gap-3'>
        <div className='grid text-center'><h3 className='font-semibold'>Content Sections</h3></div>

        {blogPost.content.map((item, index) => {
          const number = getTypeNumber(item.type, index);
          const atTop = index === 0;
          const atBottom = index === blogPost.content.length - 1;

          return (
            <div key={index} className='grid gap-2 border-2 border-solid border-colour2 rounded p-3'>
              <div className='grid grid-flow-col auto-cols-max items-center justify-between'>
                <div className='font-semibold'>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {number}
                </div>
                <div className='grid grid-flow-col auto-cols-max gap-2'>
                  <button type='button' title='Move up' onClick={() => moveItem(index, -1)} disabled={atTop}
                    className={`grid place-items-center px-2 py-1 rounded border-2 border-solid border-colour2 ${atTop ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    <FiArrowUp />
                  </button>
                  <button type='button' title='Move down' onClick={() => moveItem(index, +1)} disabled={atBottom}
                    className={`grid place-items-center px-2 py-1 rounded border-2 border-solid border-colour2 ${atBottom ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    <FiArrowDown />
                  </button>
                </div>
              </div>

              {/* paragraph */}
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
                    <button type='button' onClick={() => deleteContentItem(index)} className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 px-2 py-1 rounded'>
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              )}

              {/* heading */}
              {item.type === 'heading' && (
                <div className='grid gap-2'>
                  <input
                    type='text'
                    placeholder='Heading text'
                    value={item.text || ''}
                    onChange={(e) => {
                      const updated = [...blogPost.content];
                      updated[index].text = e.target.value;
                      setBlogPost((prev) => ({ ...prev, content: updated }));
                    }}
                    className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
                  />
                  <div className='grid grid-flow-col auto-cols-max gap-2 justify-start'>
                    <button type='button' onClick={() => deleteContentItem(index)} className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 px-2 py-1 rounded'>
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              )}

              {/* list */}
              {item.type === 'list' && (
                <div className='grid gap-2'>
                  <div className='grid gap-2'>
                    {(item.items || []).map((val, iIdx) => (
                      <div key={iIdx} className='grid grid-flow-col auto-cols-fr gap-2'>
                        <input
                          type='text'
                          placeholder={`List item ${iIdx + 1}`}
                          value={val}
                          onChange={(e) => updateListItem(index, iIdx, e.target.value)}
                          className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
                        />
                        <button
                          type='button'
                          onClick={() => removeListItem(index, iIdx)}
                          className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 px-2 py-1 rounded'
                        >
                          <FiTrash2 /> Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className='grid grid-flow-col auto-cols-max gap-2 justify-start'>
                    <button type='button' onClick={() => addListItem(index)} className='bg-blue-600 text-colour1 px-2 py-1 rounded'>Add item</button>
                    <button type='button' onClick={() => deleteContentItem(index)} className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 px-2 py-1 rounded'>
                      <FiTrash2 /> Delete block
                    </button>
                  </div>
                </div>
              )}

              {/* link */}
              {item.type === 'link' && (
                <div className='grid gap-2'>
                  <div className='grid gap-2'>
                    <input
                      type='text'
                      placeholder='Link text (what readers see)'
                      value={item.text || ''}
                      onChange={(e) => {
                        const updated = [...blogPost.content];
                        updated[index].text = e.target.value;
                        setBlogPost((prev) => ({ ...prev, content: updated }));
                      }}
                      className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
                    />
                    <input
                      type='text'
                      placeholder={item.internal ? 'Internal path (e.g., /about)' : 'External URL (e.g., https://example.com)'}
                      value={item.href || ''}
                      onChange={(e) => {
                        const updated = [...blogPost.content];
                        updated[index].href = e.target.value;
                        setBlogPost((prev) => ({ ...prev, content: updated }));
                      }}
                      className='border-2 border-solid border-colour2 px-2 py-2 rounded-md'
                    />

                    <div className='grid grid-flow-col auto-cols-max gap-4 items-center'>
                      <label className='inline-flex items-center gap-2'>
                        <input
                          type='checkbox'
                          checked={!!item.internal}
                          onChange={() => {
                            const updated = [...blogPost.content];
                            updated[index].internal = true; // internal = true
                            setBlogPost((prev) => ({ ...prev, content: updated }));
                          }}
                        />
                        <span>Internal</span>
                      </label>

                      <label className='inline-flex items-center gap-2'>
                        <input
                          type='checkbox'
                          checked={!item.internal}
                          onChange={() => {
                            const updated = [...blogPost.content];
                            updated[index].internal = false; // internal = false => external
                            setBlogPost((prev) => ({ ...prev, content: updated }));
                          }}
                        />
                        <span>External</span>
                      </label>
                    </div>

                    <div className='text-sm text-colour7'>
                      {item.internal
                        ? 'Will be rendered with internal link to a page of your site.'
                        : 'Will be rendered with link to a different website.'}
                    </div>
                  </div>
                  <div className='grid grid-flow-col auto-cols-max gap-2 justify-start'>
                    <button type='button' onClick={() => deleteContentItem(index)} className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 px-2 py-1 rounded'>
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              )}

              {/* image */}
              {item.type === 'image' && (
                <div className='grid gap-2'>
                  {!item.previewUrl && (
                    <div
                      className='grid place-items-center gap-1 w-full p-4 border-2 bg-colour4/50 border-dashed border-colour2 rounded text-sm text-center cursor-pointer'
                      onClick={() => openFileDialog(index, 'image')}
                      onDrop={(e) => handleDrop(e, index, 'image')}
                      onDragOver={handleDragOver}
                    >
                      <FiUploadCloud className='justify-self-center text-xl' />
                      <span>Click or drop an image (max {MAX_IMAGE_SIZE_MB}MB)</span>
                    </div>
                  )}

                  <input type='file' accept={IMAGE_ACCEPT} className='hidden' ref={(el) => (fileInputRefs.current.image[index] = el)} onChange={(e) => handleFileSelect(e, index, 'image')} />

                  {item.previewUrl && <img src={item.previewUrl} alt='Selected' className='w-full h-auto rounded-md border-2 border-solid border-colour2' />}

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
                    <button type='button' onClick={() => deleteContentItem(index)} className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 px-2 py-1 rounded'>
                      <FiTrash2 /> Delete
                    </button>
                    <button type='button' onClick={() => openFileDialog(index, 'image')} className='grid grid-flow-col auto-cols-max items-center gap-2 bg-yellow-500 text-colour1 px-2 py-1 rounded'>
                      <FiEdit2 /> Change
                    </button>
                  </div>
                </div>
              )}

              {/* video */}
              {item.type === 'video' && (
                <div className='grid gap-2'>
                  {!item.previewUrl && (
                    <div
                      className='grid place-items-center gap-1 w-full p-4 border-2 bg-colour4/50 border-dashed border-colour2 rounded text-sm text-center cursor-pointer'
                      onClick={() => openFileDialog(index, 'video')}
                      onDrop={(e) => handleDrop(e, index, 'video')}
                      onDragOver={handleDragOver}
                    >
                      <FiUploadCloud className='justify-self-center text-xl' />
                      <span>Click or drop a video (max {MAX_VIDEO_SIZE_MB}MB)</span>
                    </div>
                  )}

                  <input type='file' accept={VIDEO_ACCEPT} className='hidden' ref={(el) => (fileInputRefs.current.video[index] = el)} onChange={(e) => handleFileSelect(e, index, 'video')} />

                  {item.previewUrl && <video src={item.previewUrl} controls className='w-full rounded-md border-2 border-solid border-colour2' />}

                  <div className='grid grid-flow-col auto-cols-max gap-2 justify-start'>
                    <button type='button' onClick={() => deleteContentItem(index)} className='grid grid-flow-col auto-cols-max items-center gap-2 bg-red-600 text-colour1 px-2 py-1 rounded'>
                      <FiTrash2 /> Delete
                    </button>
                    <button type='button' onClick={() => openFileDialog(index, 'video')} className='grid grid-flow-col auto-cols-max items-center gap-2 bg-yellow-500 text-colour1 px-2 py-1 rounded'>
                      <FiEdit2 /> Change
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className='grid lg:grid-cols-3 gap-2'>
          <button type='button' onClick={() => handleAddContent('paragraph')} className='bg-blue-600 text-colour1 px-2 py-2 rounded shadow-cardShadow'>Add Paragraph</button>
          <button type='button' onClick={() => handleAddContent('image')} className='bg-green-600 text-colour1 px-2 py-2 rounded shadow-cardShadow'>Add Image</button>
          <button type='button' onClick={() => handleAddContent('video')} className='bg-orange-600 text-colour1 px-2 py-2 rounded shadow-cardShadow'>Add Video</button>
        </div>
        <div className='grid lg:grid-cols-3 gap-2'>
          <button type='button' onClick={() => handleAddContent('heading')} className='bg-blue-600 text-colour1 px-2 py-2 rounded shadow-cardShadow'>Add Heading</button>
          <button type='button' onClick={() => handleAddContent('list')} className='bg-green-600 text-colour1 px-2 py-2 rounded shadow-cardShadow'>Add List</button>
          <button type='button' onClick={() => handleAddContent('link')} className='bg-purple-600 text-colour1 px-2 py-2 rounded shadow-cardShadow'>Add Link</button>
        </div>
      </section>

      <section className='grid'>
        <button type='submit' disabled={submitting} className='bg-colour5 text-colour1 px-3 py-2 rounded border-2 border-solid border-colour2 shadow-cardShadow'>
          {submitting ? 'Submitting…' : 'Submit Post'}
        </button>
      </section>
    </form>
  );
}

export default CreateBlogPostForm;
