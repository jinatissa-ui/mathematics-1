/* Mathematics 1 — Grade 6
   Offline cache for the flip-book. Bump VERSION when the book changes. */
var VERSION = 'math1-v5';

self.addEventListener('install', function (event) {
  event.waitUntil((async function () {
    var cache = await caches.open(VERSION);
    var list = ['index.html'];
    try {
      var res = await fetch('precache.json', { cache: 'no-store' });
      if (res.ok) list = list.concat(await res.json());
    } catch (e) { /* fall back to the shell page only */ }
    // addAll rejects duplicates, so keep one of each
    list = list.filter(function (v, i) { return list.indexOf(v) === i; });
    await cache.addAll(list);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    var keys = await caches.keys();
    await Promise.all(keys.map(function (k) {
      if (k !== VERSION) return caches.delete(k);
    }));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;

  event.respondWith((async function () {
    var cache = await caches.open(VERSION);
    var hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;

    try {
      var res = await fetch(req);
      if (res && res.ok && res.type === 'basic') {
        cache.put(req, res.clone());
      }
      return res;
    } catch (err) {
      if (req.mode === 'navigate') {
        var shell = await cache.match('index.html');
        if (shell) return shell;
      }
      throw err;
    }
  })());
});
