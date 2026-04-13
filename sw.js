const CACHE = 'fn-risk-v2';
const ASSETS = [
  '/fn-risk/',
  '/fn-risk/index.html',
  '/fn-risk/manifest.json',
  '/fn-risk/icon-192.png',
  '/fn-risk/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/fn-risk/index.html')))
  );
});
