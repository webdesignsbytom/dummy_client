import React, { useMemo } from 'react';
import useNavigateToPage from '../../../hooks/useNavigateToPage';
import { mediaUrlFrom } from '../../../utils/media/mediaUrl'; // adjust path if needed

function toBlocks(content) {
  if (!content) return [];
  if (Array.isArray(content)) return content;
  if (typeof content === 'string') {
    try { return toBlocks(JSON.parse(content)); } catch { return [{ type:'paragraph', text: content }]; }
  }
  if (typeof content === 'object' && Array.isArray(content.content)) return content.content;
  return [];
}

function extractFirstParagraphText(content, maxLen = 100) {
  const blocks = toBlocks(content);
  const b = blocks.find(x => x?.type === 'paragraph' && typeof x?.text === 'string');
  if (!b?.text) return '';
  const t = b.text.trim();
  return t.length > maxLen ? t.slice(0, maxLen) + '…' : t;
}

function pickThumbnailLink(post) {
  const links = Array.isArray(post?.mediaLinks) ? post.mediaLinks : [];
  // Prefer explicit THUMBNAIL
  let link = links.find((l) => l?.role === 'THUMBNAIL');
  if (link?.media?.id || link?.media?.key) return link;

  // Fallback: FEATURED if you ever add it
  link = links.find((l) => l?.role === 'FEATURED');
  if (link?.media?.id || link?.media?.key) return link;

  // Legacy fallback (string key in column)
  if (post?.thumbnailImage) {
    return { media: { id: null, key: post.thumbnailImage } };
  }
  return null;
}

function srcFromLink(link) {
  if (!link?.media) return '';
  const { key } = link.media || {};
  return key ? mediaUrlFrom({ objectKey: key }) : '';
}

function formatPublished(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: 'long', day: 'numeric', year: 'numeric',
    });
  } catch {
    return '';
  }
}

const BlogPostPreview = ({ post }) => {
  const navigateToPage = useNavigateToPage();
  console.log('[BlogPostPreview] post', post);

  const previewText = useMemo(() => extractFirstParagraphText(post?.content, 100), [post?.content]);
  const thumbLink = useMemo(() => pickThumbnailLink(post), [post]);
  const thumbSrc  = useMemo(() => (thumbLink ? srcFromLink(thumbLink) : ''), [thumbLink]);
  const published = useMemo(() => formatPublished(post?.publishedAt), [post?.publishedAt]);

  const handleCardClick = () => {
    navigateToPage(`/blog/${post?.slug}`, post);
  };

  const handleReadMore = (e) => {
    e.stopPropagation();
    navigateToPage(`/blog/${post?.slug}`, post);
  };

  return (
    <article
      aria-labelledby={`post-title-${post?.slug}`}
      aria-label={`Read more about ${post?.title ?? 'blog post'}`}
      title={`Read more about ${post?.title ?? 'blog post'}`}
      className="grid border-2 border-solid border-colour2 hover:brightness-110 px-6 py-5 rounded shadow-cardShadow hover:shadow-cardShadow cursor-pointer"
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
          {post?.subTitle ? (
            <div>
              <p className="text-sm text-colour2 font-medium">{post.subTitle}</p>
            </div>
          ) : null}
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
            {previewText ? (
              <div className="py-4">
                <p className="text-sm">{previewText}</p>
              </div>
            ) : null}
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
              {post?.authorName ? <span>By {post.authorName}</span> : null}
              {published ? (
                <> {' '}|{' '} <time dateTime={post?.publishedAt} aria-label={`Published on ${published}`}>{published}</time></>
              ) : null}
            </section>
          </section>
        </section>
      </div>

      {/* Tablet */}
      <div className="hidden md:grid lg:hidden">
        <section className="grid lg:grid-cols-2 lg:gap-4">
          <section>
            <div>
              <h2 id={`post-title-${post?.slug}`} className="text-xl font-bold text-colour2">
                {post?.title}
              </h2>
            </div>
            {post?.subTitle ? (
              <div><p className="text-sm text-colour2 font-medium">{post.subTitle}</p></div>
            ) : null}
            {previewText ? (
              <div className="py-4">
                <p className="text-sm">{previewText}</p>
              </div>
            ) : null}
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
              {post?.authorName ? <span>By {post.authorName}</span> : null}
              {published ? (
                <><time dateTime={post?.publishedAt} aria-label={`Published on ${published}`}>{published}</time></>
              ) : null}
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
