import axios from 'axios';
// Api
import client from '../../api/client';

/**
 * Presign and upload a file to your S3-compatible store via /media-services/media/presign.
 * Returns { key, mimeType, sizeBytes }.
 */
export async function presignAndUpload({
  resource,        // e.g. 'blog', 'user', 'newsletter' (server validates/prefixes)
  file,            // File/Blob
  filename,        // suggested original filename (string)
  contentType,     // optional override; default file.type
  onProgress,      // optional (pct:number) => void
}) {
  if (!file) throw new Error('No file provided');
  if (!resource) throw new Error('Missing resource prefix');

  const mime = contentType || file.type || 'application/octet-stream';

  // 1) ask server for a signed PUT URL
  const presignResp = await client.post(
    '/media-services/media/presign',
    {
      resource,
      filename: filename || file.name || 'upload.bin',
      contentType: mime,
    },
    true // AUTHENTICATED
  );

  const url = presignResp?.data?.url || presignResp?.url;
  const key = presignResp?.data?.key || presignResp?.key;
  if (!url || !key) throw new Error('Presign failed: url/key not returned');

  // 2) upload the file directly (no cookies)
  await axios.put(url, file, {
    withCredentials: false,
    headers: { 'Content-Type': mime },
    onUploadProgress: (evt) => {
      if (!evt?.total || !onProgress) return;
      onProgress(Math.round((evt.loaded / evt.total) * 100));
    },
  });

  return { key, mimeType: mime, sizeBytes: file.size ?? 0 };
}
