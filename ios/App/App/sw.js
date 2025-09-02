// Service Worker for DOGSWAB PWA
const CACHE_NAME = 'dogswab-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://storage.reimage.dev/dogswabapp/dba9be83d5bd/original'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New health reminder for your pet',
    icon: 'https://storage.reimage.dev/dogswabapp/dba9be83d5bd/original',
    badge: 'https://storage.reimage.dev/dogswabapp/dba9be83d5bd/original',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open DOGSWAB',
        icon: 'https://storage.reimage.dev/dogswabapp/dba9be83d5bd/original'
      },
      {
        action: 'close',
        title: 'Close notification',
        icon: 'https://storage.reimage.dev/dogswabapp/dba9be83d5bd/original'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('DOGSWAB', options)
  );
});