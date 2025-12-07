const CACHE_NAME = 'your-timezone-v1';
const urlsToCache = [
  '/',
  '/index.html',
  './css/style.css',
  './js/app.js',
  '/manifest.json',
  './img/icon-192.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@700&family=Orbitron:wght@400;700&display=swap',
  'https://unpkg.com/feather-icons'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});