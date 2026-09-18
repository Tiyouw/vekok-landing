/* VEKOK service worker -- offline shell for the warkop landing page.
   Navigation + CSS are network-first so a redeploy is never served stale;
   /assets/ is cache-first because vercel.json marks it immutable. */
const CACHE = 'vekok-2026-09-18';
const SHELL = ['/', '/assets/logo.png', '/assets/fonts/syne-latin.woff2'];

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const put = (req, res) => {
  if (res && res.ok) {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(req, copy));
  }
  return res;
};

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then(put).catch(() => caches.match(req).then((r) => r || caches.match('/'))));
    return;
  }

  const cacheFirst = url.pathname.startsWith('/assets/');
  if (cacheFirst) {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then(put).catch(() => hit))
    );
    return;
  }

  event.respondWith(
    fetch(req).then(put).catch(() => caches.match(req))
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'vekok:skip-waiting') self.skipWaiting();
});
