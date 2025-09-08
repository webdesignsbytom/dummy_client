import React, { useMemo } from 'react';
import useNavigateToPage from '../../../hooks/useNavigateToPage';

function toBlocks(content) {
  if (!content) return [];

  // If it's already an array of blocks: [{type:'paragraph', text: '...'}]
  if (Array.isArray(content)) return content;

  // If it's a stringified JSON
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      return toBlocks(parsed);
    } catch {
      // plain string content -> treat as one paragraph
      return [{ type: 'paragraph', text: content }];
    }
  }

  // TipTap/ProseMirror doc: { type:'doc', content: [ ...nodes ] }
  if (typeof content === 'object' && Array.isArray(content.content)) {
    return content.content;
  }

  return [];
}

function extractFirstParagraphText(content, maxLen = 140) {
  const blocks = toBlocks(content);

  // Case 1: blocks like [{type:'paragraph', text:'...'}]
  const simplePara = blocks.find((b) => b?.type === 'paragraph' && typeof b?.text === 'string');
  if (simplePara?.text) {
    const t = simplePara.text.trim();
    return t.length > maxLen ? t.slice(0, maxLen) + '…' : t;
  }

  // Case 2: TipTap paragraph {type:'paragraph', content:[{type:'text', text:'...'}]}
  const tiptapPara = blocks.find((b) => b?.type === 'paragraph' && Array.isArray(b?.content));
  if (tiptapPara) {
    const text = tiptapPara.content
      .filter((n) => n?.type === 'text' && typeof n?.text === 'string')
      .map((n) => n.text)
      .join(' ')
      .trim();

    if (text) return text.length > maxLen ? text.slice(0, maxLen) + '…' : text;
  }

  return ''; // nothing to preview
}

function pickThumbnail(post) {
  // Prefer mediaLinks roles if present
  const links = Array.isArray(post?.mediaLinks) ? post.mediaLinks : [];
  const thumb = links.find((l) => l?.role === 'THUMBNAIL')?.media?.key;
  if (thumb) return thumb;

  const featured = links.find((l) => l?.role === 'FEATURED')?.media?.key;
  if (featured) return featured;

  // Fallback to legacy columns
  return post?.thumbnailImage || post?.featuredImage || '';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

const BlogPostPreview = ({ post }) => {
  const navigateToPage = useNavigateToPage();
console.log('[BlogPostPreview] post', post);
  const previewText = useMemo(() => extractFirstParagraphText(post?.content, 100), [post?.content]);
  const thumbSrc = useMemo(() => pickThumbnail(post), [post]);
  const published = useMemo(() => formatDate(post?.publishedAt), [post?.publishedAt]);

  const handleCardClick = () => {
    navigateToPage(`/blog/${post?.slug}`, post);
  };

  const handleReadMore = (e) => {
    e.stopPropagation(); // avoid double navigation
    navigateToPage(`/blog/${post?.slug}`, post);
  };

  return (
    <article
      aria-labelledby={`post-title-${post?.slug}`}
      aria-label={`Read more about ${post?.title ?? 'blog post'}`}
      title={`Read more about ${post?.title ?? 'blog post'}`}
      className="grid border px-6 py-5 rounded shadow-cardShadow hover:shadow-cardShadow cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Phone and desktop */}
      <div className="grid md:hidden lg:grid">
        <section>
          <div>
            <h2 id={`post-title-${post?.slug}`} className="text-xl font-bold text-colour2">
              {post?.title}
            </h2>
          </div>
          {post?.subTitle && (
            <div>
              <p className="text-sm text-colour2 font-medium">{post.subTitle}</p>
            </div>
          )}
        </section>

        <section className="grid lg:grid-cols-2 lg:gap-4">
          <section className="my-auto">
            {thumbSrc ? (
              <img
                src={thumbSrc}
                alt={`${post?.title ?? 'Blog'} thumbnail`}
                className="w-full h-auto mt-2 rounded-tr-lg rounded-bl-lg shadow-cardShadow"
              />
            ) : null}
          </section>

          <section>
            <section>
              {previewText && (
                <div className="py-4">
                  <p className="text-sm">{previewText}</p>
                </div>
              )}
              <div>
                <button
                  aria-label={`Read more about ${post?.title ?? 'blog post'}`}
                  className="text-hyperlink-colour underline mt-2 inline-block"
                  onClick={handleReadMore}
                >
                  Read More
                </button>
              </div>
            </section>

            <section className="text-colour7 text-xs mt-2">
              {post?.authorName && <span>By {post.authorName}</span>}
              {published && (
                <>
                  {' '}|{' '}
                  <time dateTime={post?.publishedAt} aria-label={`Published on ${published}`}>
                    {published}
                  </time>
                </>
              )}
            </section>
          </section>
        </section>
      </div>

      {/* Tablet layout */}
      <div className="hidden md:grid lg:hidden">
        <section className="grid lg:grid-cols-2 lg:gap-4">
          <section>
            <div>
              <h2 id={`post-title-${post?.slug}`} className="text-xl font-bold text-colour2">
                {post?.title}
              </h2>
            </div>
            {post?.subTitle && (
              <div>
                <p className="text-sm text-colour2 font-medium">{post.subTitle}</p>
              </div>
            )}
            {previewText && (
              <div className="py-4">
                <p className="text-sm">{previewText}</p>
              </div>
            )}
            <div>
              <button
                aria-label={`Read more about ${post?.title ?? 'blog post'}`}
                className="text-hyperlink-colour underline mt-2 inline-block"
                onClick={handleReadMore}
              >
                Read More
              </button>
            </div>

            <section className="text-colour7 text-xs mt-2">
              {post?.authorName && <span>By {post.authorName}</span>}
              {published && (
                <>
                  <time dateTime={post?.publishedAt} aria-label={`Published on ${published}`}>
                    {published}
                  </time>
                </>
              )}
            </section>
          </section>

          <section className="grid my-auto">
            {thumbSrc ? (
              <img
                src={thumbSrc}
                alt={`${post?.title ?? 'Blog'} thumbnail`}
                className="w-full h-auto mt-2 rounded-tr-lg rounded-bl-lg shadow-cardShadow"
              />
            ) : null}
          </section>
        </section>
      </div>
    </article>
  );
};

export default BlogPostPreview;
