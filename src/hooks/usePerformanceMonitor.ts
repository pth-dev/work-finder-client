import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentMountTime: number;
  memoryUsage?: number;
  bundleSize?: number;
}

interface PerformanceConfig {
  enabled: boolean;
  logToConsole: boolean;
  sendToAnalytics: boolean;
  thresholds: {
    renderTime: number; // ms
    memoryUsage: number; // MB
  };
}

const defaultConfig: PerformanceConfig = {
  enabled: process.env.NODE_ENV === 'development',
  logToConsole: true,
  sendToAnalytics: false,
  thresholds: {
    renderTime: 16, // 60fps = 16ms per frame
    memoryUsage: 100, // 100MB
  },
};

export const usePerformanceMonitor = (
  componentName: string,
  config: Partial<PerformanceConfig> = {}
) => {
  const finalConfig = { ...defaultConfig, ...config };
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const mountTimeRef = useRef<number>(Date.now());
  const renderStartRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!finalConfig.enabled) return;

    const mountTime = Date.now() - mountTimeRef.current;
    const renderTime = Date.now() - renderStartRef.current;

    const performanceMetrics: PerformanceMetrics = {
      renderTime,
      componentMountTime: mountTime,
      memoryUsage: getMemoryUsage(),
      bundleSize: getBundleSize(),
    };

    setMetrics(performanceMetrics);

    // Log performance warnings
    if (finalConfig.logToConsole) {
      logPerformanceIssues(componentName, performanceMetrics, finalConfig.thresholds);
    }

    // Send to analytics service
    if (finalConfig.sendToAnalytics) {
      sendToAnalytics(componentName, performanceMetrics);
    }

    // Mark component load in performance timeline
    if (performance.mark) {
      performance.mark(`${componentName}-loaded`);
    }

  }, [componentName, finalConfig]);

  // Update render start time on each render
  useEffect(() => {
    renderStartRef.current = Date.now();
  });

  return metrics;
};

// Memory usage helper
const getMemoryUsage = (): number | undefined => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return Math.round(memory.usedJSHeapSize / (1024 * 1024)); // Convert to MB
  }
  return undefined;
};

// Bundle size helper (estimated)
const getBundleSize = (): number | undefined => {
  if (typeof window !== 'undefined' && window.performance) {
    const entries = performance.getEntriesByType('navigation');
    if (entries.length > 0) {
      const navigationEntry = entries[0] as PerformanceNavigationTiming;
      return navigationEntry.transferSize;
    }
  }
  return undefined;
};

// Performance logging
const logPerformanceIssues = (
  componentName: string,
  metrics: PerformanceMetrics,
  thresholds: PerformanceConfig['thresholds']
) => {
  const issues: string[] = [];

  if (metrics.renderTime > thresholds.renderTime) {
    issues.push(`Slow render: ${metrics.renderTime}ms (threshold: ${thresholds.renderTime}ms)`);
  }

  if (metrics.memoryUsage && metrics.memoryUsage > thresholds.memoryUsage) {
    issues.push(`High memory usage: ${metrics.memoryUsage}MB (threshold: ${thresholds.memoryUsage}MB)`);
  }

  if (issues.length > 0) {
    console.warn(`🚨 Performance issues in ${componentName}:`, issues);
    console.table(metrics);
  } else {
    console.log(`✅ ${componentName} performance:`, metrics);
  }
};

// Analytics integration
const sendToAnalytics = (componentName: string, metrics: PerformanceMetrics) => {
  // Example integration with analytics service
  if (typeof gtag !== 'undefined') {
    gtag('event', 'component_performance', {
      component_name: componentName,
      render_time: metrics.renderTime,
      mount_time: metrics.componentMountTime,
      memory_usage: metrics.memoryUsage,
    });
  }

  // Example integration with custom analytics
  fetch('/api/analytics/performance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      component: componentName,
      metrics,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }),
  }).catch(error => {
    console.error('Failed to send performance metrics:', error);
  });
};

// Performance utilities
export const performanceUtils = {
  // Measure function execution time
  measureExecutionTime: <T extends (...args: any[]) => any>(
    fn: T,
    label: string
  ): T => {
    return ((...args: Parameters<T>) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      
      console.log(`⏱️ ${label}: ${(end - start).toFixed(2)}ms`);
      
      return result;
    }) as T;
  },

  // Measure async function execution time
  measureAsyncExecutionTime: <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    label: string
  ): T => {
    return (async (...args: Parameters<T>) => {
      const start = performance.now();
      const result = await fn(...args);
      const end = performance.now();
      
      console.log(`⏱️ ${label}: ${(end - start).toFixed(2)}ms`);
      
      return result;
    }) as T;
  },

  // Start performance mark
  startMark: (name: string) => {
    if (performance.mark) {
      performance.mark(`${name}-start`);
    }
  },

  // End performance mark and measure
  endMark: (name: string) => {
    if (performance.mark && performance.measure) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measures = performance.getEntriesByName(name, 'measure');
      if (measures.length > 0) {
        console.log(`📊 ${name}: ${measures[0].duration.toFixed(2)}ms`);
      }
    }
  },

  // Get Core Web Vitals
  getCoreWebVitals: () => {
    return new Promise((resolve) => {
      const vitals = {
        LCP: 0, // Largest Contentful Paint
        FID: 0, // First Input Delay
        CLS: 0, // Cumulative Layout Shift
      };

      // LCP
      if ('web-vitals' in window) {
        import('web-vitals').then(({ getLCP, getFID, getCLS }) => {
          getLCP((metric) => {
            vitals.LCP = metric.value;
          });
          
          getFID((metric) => {
            vitals.FID = metric.value;
          });
          
          getCLS((metric) => {
            vitals.CLS = metric.value;
            resolve(vitals);
          });
        });
      } else {
        resolve(vitals);
      }
    });
  },
};