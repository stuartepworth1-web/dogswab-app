// Service Worker for DOGSWAB PWA
const CACHE_NAME = 'dogswab-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/dogswab-icon-192.png'
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
    icon: '/dogswab-icon-192.png',
    badge: '/dogswab-icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open DOGSWAB',
        icon: '/dogswab-icon-96.png'
      },
      {
        action: 'close',
        title: 'Close notification',
        icon: '/dogswab-icon-96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('DOGSWAB', options)
  );
});