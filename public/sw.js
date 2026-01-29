const CACHE_NAME = 'dana-kids-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Strategy: Stale While Revalidate
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then(
           (networkResponse) => {
             // Check if we received a valid response
             if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
               return networkResponse;
             }
             // Clone the response
             const responseToCache = networkResponse.clone();
             caches.open(CACHE_NAME)
               .then((cache) => {
                 cache.put(event.request, responseToCache);
               });
             return networkResponse;
           }
        ).catch(() => {
            // If fetch fails (offline), return cached response if available
             return cachedResponse;
        });
        // Return cached response immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
  );
});