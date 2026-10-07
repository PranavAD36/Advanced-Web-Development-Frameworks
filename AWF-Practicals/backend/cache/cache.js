const NodeCache = require('node-cache');

// Practical 9 - in-memory caching.
// A single cache instance is shared by every route in this process.
// stdTTL sets the default time-to-live (in seconds) for cached entries.
const cache = new NodeCache({
  stdTTL: Number(process.env.CACHE_TTL) || 60,
  checkperiod: 120,
});

const KEYS = {
  ALL_TASKS: 'all_tasks',
  task: (id) => `task_${id}`,
};

// A write operation must invalidate the affected cache entries, otherwise
// stale data would keep being served until the TTL expires.
function invalidateTaskCache(id) {
  cache.del(KEYS.ALL_TASKS);
  if (id) cache.del(KEYS.task(id));
}

module.exports = { cache, KEYS, invalidateTaskCache };
