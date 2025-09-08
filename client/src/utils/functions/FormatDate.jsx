export function formatDate(d) {
  if (!d) return '';
  try {
    const dt = new Date(d);
    return isNaN(dt.getTime()) ? '' : dt.toLocaleDateString();
  } catch {
    return '';
  }
}