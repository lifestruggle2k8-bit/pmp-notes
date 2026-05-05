/**
 * Performance optimization utilities
 */

/**
 * Debounce function for expensive operations
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for frequent events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Memoization for expensive computations
 */
export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Lazy load images
 */
export function setupImageLazyLoading(): void {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img: any) => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

/**
 * Measure performance
 */
export function measurePerformance(label: string): () => void {
  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);

    // Send to analytics if available
    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: label,
        value: Math.round(duration),
        event_category: 'performance'
      });
    }
  };
}

/**
 * Request animation frame wrapper
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let ticking = false;

  return function (...args: Parameters<T>) {
    if (!ticking) {
      requestAnimationFrame(() => {
        func(...args);
        ticking = false;
      });
      ticking = true;
    }
  };
}

/**
 * Batch DOM updates
 */
export function batchDOMUpdates(
  updates: (() => void)[]
): void {
  requestAnimationFrame(() => {
    updates.forEach((update) => update());
  });
}

/**
 * Report Web Vitals
 */
export function reportWebVitals(callback: (metric: any) => void): void {
  // LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        callback({
          name: 'LCP',
          value: lastEntry.renderTime || lastEntry.loadTime,
          rating: lastEntry.renderTime || lastEntry.loadTime > 2500 ? 'poor' : 'good'
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP observer not supported');
    }

    // FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          callback({
            name: 'FID',
            value: entry.processingDuration,
            rating: entry.processingDuration > 100 ? 'poor' : 'good'
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.log('FID observer not supported');
    }

    // CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            callback({
              name: 'CLS',
              value: clsValue,
              rating: clsValue > 0.1 ? 'poor' : 'good'
            });
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.log('CLS observer not supported');
    }
  }
}

/**
 * Preload resources
 */
export function preloadResource(
  url: string,
  type: 'script' | 'style' | 'image'
): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = type;
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Cleanup performance monitoring
 */
export function cleanupPerformanceMonitoring(): void {
  // Remove performance entries older than 1 hour
  if ('clearResourceTimings' in performance) {
    performance.clearResourceTimings();
  }
}

/**
 * Global error handling and reporting
 */
export function setupErrorReporting(): void {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);

    // Send to error tracking service
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: event.error?.message || 'Unknown error',
        fatal: false
      });
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);

    // Send to error tracking service
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: event.reason?.message || 'Unhandled promise rejection',
        fatal: false
      });
    }
  });
}

// Type augmentation for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: any) => void;
  }
}

export default {
  debounce,
  throttle,
  memoize,
  setupImageLazyLoading,
  measurePerformance,
  rafThrottle,
  batchDOMUpdates,
  reportWebVitals,
  preloadResource,
  cleanupPerformanceMonitoring,
  setupErrorReporting
};
