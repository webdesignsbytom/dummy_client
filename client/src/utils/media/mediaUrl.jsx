const CDN_BASE =
  process.env.REACT_APP_MEDIA_CDN;

const PUBLIC_ENDPOINT = process.env.REACT_APP_S3_PUBLIC_ENDPOINT || '';
const SIGNED_VIEW_PATH =
  process.env.REACT_APP_MEDIA_SIGNED_PATH || '/media/view'; // <— new

export function mediaUrlFrom({ id, bucket, objectKey }) {
  // If we have a media row id, prefer the signed endpoint.
  if (SIGNED_VIEW_PATH && id) {
    return `${SIGNED_VIEW_PATH.replace(/\/+$/, '')}/${id}`;
  }

  if (!objectKey) return '#';
  if (/^https?:\/\//i.test(objectKey)) return objectKey;

  const key = String(objectKey).replace(/^\/+/, '');
  if (CDN_BASE) return `${CDN_BASE.replace(/\/+$/, '')}/${key}`;
  if (PUBLIC_ENDPOINT && bucket) return `${PUBLIC_ENDPOINT.replace(/\/+$/, '')}/${bucket}/${key}`;
  return `/api/media/file?bucket=${encodeURIComponent(bucket || 'public')}&key=${encodeURIComponent(key)}`;
}