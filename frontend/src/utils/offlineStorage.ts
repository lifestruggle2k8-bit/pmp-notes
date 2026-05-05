/**
 * IndexedDB operations for offline support
 */

const DB_NAME = 'pmp-flashcard-db';
const DB_VERSION = 1;

interface StoreName {
  CARDS: 'cards';
  REVIEWS: 'reviews';
  PENDING_REVIEWS: 'pending-reviews';
}

const STORE_NAMES: StoreName = {
  CARDS: 'cards',
  REVIEWS: 'reviews',
  PENDING_REVIEWS: 'pending-reviews'
};

export function getIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains(STORE_NAMES.CARDS)) {
        db.createObjectStore(STORE_NAMES.CARDS, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.REVIEWS)) {
        const reviewStore = db.createObjectStore(STORE_NAMES.REVIEWS, {
          keyPath: 'id'
        });
        reviewStore.createIndex('cardId', 'cardId', { unique: false });
        reviewStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORE_NAMES.PENDING_REVIEWS)) {
        db.createObjectStore(STORE_NAMES.PENDING_REVIEWS, { keyPath: 'id' });
      }
    };
  });
}

/**
 * Save cards to IndexedDB for offline access
 */
export async function saveCardsOffline(cards: any[]): Promise<void> {
  try {
    const db = await getIndexedDB();
    const transaction = db.transaction([STORE_NAMES.CARDS], 'readwrite');
    const store = transaction.objectStore(STORE_NAMES.CARDS);

    // Clear existing data
    await new Promise<void>((resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onerror = () => reject(clearRequest.error);
      clearRequest.onsuccess = () => resolve();
    });

    // Add new cards
    for (const card of cards) {
      await new Promise<void>((resolve, reject) => {
        const addRequest = store.add(card);
        addRequest.onerror = () => reject(addRequest.error);
        addRequest.onsuccess = () => resolve();
      });
    }

    console.log(`Saved ${cards.length} cards to offline storage`);
  } catch (error) {
    console.error('Failed to save cards offline:', error);
  }
}

/**
 * Get cards from IndexedDB
 */
export async function getCardsOffline(): Promise<any[]> {
  try {
    const db = await getIndexedDB();
    const transaction = db.transaction([STORE_NAMES.CARDS], 'readonly');
    const store = transaction.objectStore(STORE_NAMES.CARDS);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    console.error('Failed to get offline cards:', error);
    return [];
  }
}

/**
 * Save a review result locally (for offline submission)
 */
export async function savePendingReview(review: any): Promise<void> {
  try {
    const db = await getIndexedDB();
    const transaction = db.transaction([STORE_NAMES.PENDING_REVIEWS], 'readwrite');
    const store = transaction.objectStore(STORE_NAMES.PENDING_REVIEWS);

    return new Promise((resolve, reject) => {
      const request = store.add({
        ...review,
        id: `pending-${Date.now()}`,
        createdAt: new Date().toISOString()
      });
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error('Failed to save pending review:', error);
  }
}

/**
 * Get pending reviews that need to be synced
 */
export async function getPendingReviews(): Promise<any[]> {
  try {
    const db = await getIndexedDB();
    const transaction = db.transaction([STORE_NAMES.PENDING_REVIEWS], 'readonly');
    const store = transaction.objectStore(STORE_NAMES.PENDING_REVIEWS);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    console.error('Failed to get pending reviews:', error);
    return [];
  }
}

/**
 * Delete a pending review after successful sync
 */
export async function deletePendingReview(id: string): Promise<void> {
  try {
    const db = await getIndexedDB();
    const transaction = db.transaction([STORE_NAMES.PENDING_REVIEWS], 'readwrite');
    const store = transaction.objectStore(STORE_NAMES.PENDING_REVIEWS);

    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error('Failed to delete pending review:', error);
  }
}

/**
 * Save review to local history
 */
export async function saveReviewHistory(review: any): Promise<void> {
  try {
    const db = await getIndexedDB();
    const transaction = db.transaction([STORE_NAMES.REVIEWS], 'readwrite');
    const store = transaction.objectStore(STORE_NAMES.REVIEWS);

    return new Promise((resolve, reject) => {
      const request = store.add(review);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error('Failed to save review history:', error);
  }
}

/**
 * Get review history for a card
 */
export async function getCardReviewHistory(cardId: string): Promise<any[]> {
  try {
    const db = await getIndexedDB();
    const transaction = db.transaction([STORE_NAMES.REVIEWS], 'readonly');
    const store = transaction.objectStore(STORE_NAMES.REVIEWS);
    const index = store.index('cardId');

    return new Promise((resolve, reject) => {
      const request = index.getAll(cardId);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    console.error('Failed to get review history:', error);
    return [];
  }
}

/**
 * Clear all offline data
 */
export async function clearOfflineData(): Promise<void> {
  try {
    const db = await getIndexedDB();

    for (const storeName of Object.values(STORE_NAMES)) {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    }

    console.log('Offline data cleared');
  } catch (error) {
    console.error('Failed to clear offline data:', error);
  }
}

/**
 * Check if app is online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Register listener for online/offline changes
 */
export function onlineOfflineListener(callback: (online: boolean) => void): () => void {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return unsubscribe function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}
