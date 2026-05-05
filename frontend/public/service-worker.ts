/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'pmp-flashcard-v1';
const API_CACHE_NAME = 'pmp-flashcard-api-v1';
const OFFLINE_CACHE = 'pmp-flashcard-offline';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
];

// Install event - cache essential assets
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(urlsToCache);
        self.skipWaiting();
        console.log('Service Worker installed');
      } catch (error) {
        console.error('Service Worker install failed:', error);
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const cacheWhitelist = [CACHE_NAME, API_CACHE_NAME, OFFLINE_CACHE];

      await Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );

      self.clients.claim();
      console.log('Service Worker activated');
    })()
  );
});

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // API requests - network first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);

          // Cache successful API responses
          if (networkResponse.ok) {
            const cache = await caches.open(API_CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }

          return networkResponse;
        } catch (error) {
          // Network failed, try cache
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // Return offline page if neither network nor cache available
          return caches.match('/offline.html') || new Response('Offline');
        }
      })()
    );
  } else {
    // Static assets - cache first, fallback to network
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);

          // Cache successful responses
          if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }

          return networkResponse;
        } catch (error) {
          return new Response('Offline');
        }
      })()
    );
  }
});

// Handle background sync for offline reviews
self.addEventListener('sync', (event: any) => {
  if (event.tag === 'sync-reviews') {
    event.waitUntil(
      (async () => {
        try {
          const db = await openIndexedDB();
          const pendingReviews = await getPendingReviews(db);

          // Sync each pending review
          for (const review of pendingReviews) {
            try {
              const response = await fetch('/api/review/submit', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify(review)
              });

              if (response.ok) {
                await deletePendingReview(db, review.id);
                // Notify user
                self.clients.matchAll().then((clients) => {
                  clients.forEach((client) => {
                    client.postMessage({
                      type: 'REVIEW_SYNCED',
                      review
                    });
                  });
                });
              }
            } catch (error) {
              console.error('Failed to sync review:', error);
            }
          }
        } catch (error) {
          console.error('Sync failed:', error);
          throw error;
        }
      })()
    );
  }
});

// Helper functions for IndexedDB
function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('pmp-flashcard-db', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('pending-reviews')) {
        db.createObjectStore('pending-reviews', { keyPath: 'id' });
      }
    };
  });
}

async function getPendingReviews(db: IDBDatabase): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['pending-reviews'], 'readonly');
    const store = transaction.objectStore('pending-reviews');
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function deletePendingReview(db: IDBDatabase, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['pending-reviews'], 'readwrite');
    const store = transaction.objectStore('pending-reviews');
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export {};
