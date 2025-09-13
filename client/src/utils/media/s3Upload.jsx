import axios from 'axios';
import client from '../../api/client';

/**
 * Performs ONLY the S3 upload step (presign + PUT).
 * It does NOT create any DB records.
 *
 * @returns {Promise<{ key: string, mimeType: string, sizeBytes: number }>}
 */
export async function uploadToS3({
  key,             // full S3 object key to upload to
  file,            // File/Blob
  contentType,     // optional override, defaults to file.type
  cache = 'immutable',
  presignPath = '/media/upload-url',
  onProgress,      // optional (pct:number) => void
}) {
  if (!file) throw new Error('No file provided.');
  if (!key) throw new Error('No S3 key provided.');
  if (!client) throw new Error('API client is required.');

  const mimeType = contentType || file.type || 'application/octet-stream';
  const sizeBytes = file.size ?? 0;

  // 1) Presign the PUT
  const putResp = await client.post(
    presignPath,
    { key, contentType: mimeType, cache },
    true
  );
  const putUrl = putResp?.url ?? putResp?.data?.url;
  if (!putUrl) throw new Error('Upload URL not returned by server.');

  // 2) PUT directly to S3 (no cookies)
  await axios.put(putUrl, file, {
    withCredentials: false,
    headers: { 'Content-Type': mimeType },
    onUploadProgress: (evt) => {
      if (!onProgress || !evt.total) return;
      onProgress(Math.round((evt.loaded / evt.total) * 100));
    },
  });

  return { key, mimeType, sizeBytes };
}
