export async function runWithConcurrencyLimit(limit, items, worker) {
  const results = new Array(items.length);
  let i = 0;

  async function next() {
    const cur = i++;
    if (cur >= items.length) return;
    results[cur] = await worker(items[cur], cur);
    return next();
  }

  const starters = Array.from({ length: Math.min(limit, items.length) }, next);
  await Promise.all(starters);
  return results;
}