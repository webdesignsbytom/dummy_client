import React, { useMemo } from 'react';

function toBlocks(content) {
  if (!content) return [];
  if (Array.isArray(content)) return content;

  if (typeof content === 'string') {
    try { return toBlocks(JSON.parse(content)); }
    catch { return [{ type: 'paragraph', text: content }]; }
  }

  if (typeof content === 'object' && Array.isArray(content.content)) {
    const out = [];
    for (const node of content.content) {
      if (node?.type === 'paragraph') {
        const text = Array.isArray(node.content)
          ? node.content
              .filter(n => n?.type === 'text' && typeof n.text === 'string')
              .map(n => n.text)
              .join(' ')
              .trim()
          : '';
        if (text) out.push({ type: 'paragraph', text });
      }
      if (node?.type === 'heading') {
        const text = Array.isArray(node.content)
          ? node.content
              .filter(n => n?.type === 'text' && typeof n.text === 'string')
              .map(n => n.text)
              .join(' ')
              .trim()
          : '';
        if (text) out.push({ type: 'heading', text, level: node?.attrs?.level || 2 });
      }
      if (node?.type === 'bulletList' || node?.type === 'orderedList') {
        const items = [];
        for (const li of node.content || []) {
          if (li?.type === 'listItem' && Array.isArray(li.content)) {
            const text = li.content
              .flatMap(n => n?.content || [])
              .filter(n => n?.type === 'text' && typeof n.text === 'string')
              .map(n => n.text)
              .join(' ')
              .trim();
            if (text) items.push(text);
          }
        }
        if (items.length) out.push({ type: 'list', items, ordered: node.type === 'orderedList' });
      }
      if (node?.type === 'image') {
        const src = node?.attrs?.src;
        if (src) {
          out.push({
            type: 'image',
            imageUrl: src,
            imageTitle: node?.attrs?.alt || '',
            description: node?.attrs?.title || '',
          });
        }
      }
    }
    return out;
  }

  return [];
}

function pickFeatured(post) {
  const links = Array.isArray(post?.mediaLinks) ? post.mediaLinks : [];
  const fromLinks = links.find(l => l?.role === 'FEATURED')?.media?.key;
  return fromLinks || post?.featuredImage || '';
}

function safeDate(d) {
  try {
    const x = new Date(d);
    return isNaN(x.getTime()) ? '' : x.toLocaleDateString();
  } catch {
    return '';
  }
}

function BlogArticle({ post }) {
  console.log('[BlogArticle] post', post);
  const blocks = useMemo(() => toBlocks(post?.content), [post?.content]);
  const featuredSrc = useMemo(() => pickFeatured(post), [post]);
  const published = useMemo(() => safeDate(post?.publishedAt), [post?.publishedAt]);
  const tagNames = useMemo(
    () =>
      Array.isArray(post?.tags)
        ? post.tags.map(t => (typeof t === 'string' ? t : t?.name)).filter(Boolean)
        : [],
    [post?.tags]
  );

  if (!post) return <p>Loading...</p>;

  return (
    <section className="grid w-full">
      <div className="grid w-full px-6 sm:px-8 md:px-12 lg:px-20 lg:container lg:mx-auto">
        <article className="grid gap-4 w-full max-w-3xl mx-auto py-8 px-4 sm:px-8 bg-colour1 shadow-cardShadow shadow-colour2/80 rounded-lg">
          {/* Title & Subtitle */}
          <header className="grid h-fit text-center">
            <div className="grid gap-4">
              <h1 className="text-3xl font-bold text-colour2 dark:text-colour1">{post.title}</h1>
              {post.subTitle && <h2 className="text-lg text-colour2">{post.subTitle}</h2>}
            </div>
          </header>

          {/* Meta */}
          <section className="grid grid-flow-col py-4 text-colour2 dark:text-colour2 text-sm justify-between">
            <span>{post.authorName ? `By ${post.authorName}` : ''}</span>
            <span>{published}</span>
          </section>

          {/* Featured Image */}
          {featuredSrc && (
            <img
              src={featuredSrc}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          {/* Body */}
          <section className="grid gap-4 text-colour2 dark:text-gray-200 space-y-4">
            {blocks.map((block, i) => {
              if (block.type === 'paragraph') {
                return (
                  <p className="text-center lg:text-left" key={i}>
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'heading') {
                const Tag = block.level >= 1 && block.level <= 6 ? `h${block.level}` : 'h2';
                return (
                  <Tag key={i} className="text-xl font-semibold text-colour2 dark:text-colour1">
                    {block.text}
                  </Tag>
                );
              }
              if (block.type === 'list') {
                const ListTag = block.ordered ? 'ol' : 'ul';
                return (
                  <ListTag key={i} className="list-disc pl-5 grid gap-y-2">
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ListTag>
                );
              }
              if (block.type === 'image') {
                return (
                  <figure key={i} className="grid gap-2 text-center">
                    <img src={block.imageUrl} alt={block.imageTitle || post.title} className="w-full rounded-lg" />
                    {block.description && <figcaption className="text-sm">{block.description}</figcaption>}
                  </figure>
                );
              }
              if (block.type === 'video') {
                return (
                  <aside key={i} className="grid gap-4 text-center">
                    <video controls className="w-full rounded-lg">
                      <source src={block.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {block.description && <div className=""><p className="text-sm">{block.description}</p></div>}
                  </aside>
                );
              }
              return null;
            })}
          </section>

          {/* Tags */}
          {tagNames.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-colour2 dark:text-colour2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {tagNames.map((name, idx) => (
                  <span
                    key={`${name}-${idx}`}
                    className="bg-colour5 text-colour1 dark:bg-colour5 dark:text-colour1 px-3 py-1 text-sm rounded-full shadow-cardShadow shadow-colour6/80"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

export default BlogArticle;
