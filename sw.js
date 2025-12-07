const CACHE_NAME = 'your-timezone-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@700&family=Orbitron:wght@400;700&display=swap',
  'https://unpkg.com/feather-icons/dist/feather.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});