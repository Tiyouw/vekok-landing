/* VEKOK service worker -- offline shell for the warkop landing page.
   Navigation + CSS are network-first so a redeploy is never served stale;
   /assets/ is cache-first because vercel.json marks it immutable. */
const CACHE = 'vekok-2026-09-23';
const SHELL = ['/', '/assets/logo.png', '/assets/fonts/syne-latin.woff2'];

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const putUnder = (key, res) => {
  if (res && res.ok) {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(key, copy)).catch(() => {});
  }
  return res;
};

/* CRITICAL: a navigation Request has mode 'navigate', and calling fetch() with
   it throws a TypeError (Fetch spec forbids fetch() on navigate-mode requests).
   Cache.put() refuses that request too. Reloading the page therefore died with
   net::ERR_FAILED the moment the worker controlled a navigation — and only in
   production, because the worker is registered on https/localhost alone.
   Always re-fetch the URL string and store navigations under '/'. */
const refetch = (req) => fetch(req.url, { credentials: 'same-origin', redirect: 'follow' });

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      refetch(req).then((res) => putUnder('/', res))
        .catch(() => caches.match('/').then((r) => r || Response.error()))
    );
    return;
  }

  const cacheFirst = url.pathname.startsWith('/assets/');
  if (cacheFirst) {
    event.respondWith(
      caches.match(req).then((hit) => hit || refetch(req).then((res) => putUnder(req, res))
        .catch(() => Response.error()))
    );
    return;
  }

  event.respondWith(
    refetch(req).then((res) => putUnder(req, res))
      .catch(() => caches.match(req).then((r) => r || Response.error()))
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'vekok:skip-waiting') self.skipWaiting();
});
