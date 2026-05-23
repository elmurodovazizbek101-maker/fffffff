// Performance monitoring utilities
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoads: [],
      apiCalls: [],
      errors: [],
      userActions: []
    }

    this.init()
  }

  init() {
    // Monitor page load performance
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        this.recordPageLoad()
      })

      // Monitor unhandled errors
      window.addEventListener('error', (event) => {
        this.recordError({
          type: 'javascript',
          message: event.message,
          filename: event.filename,
          line: event.lineno,
          column: event.colno,
          stack: event.error?.stack,
          timestamp: Date.now()
        })
      })

      // Monitor unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        this.recordError({
          type: 'promise',
          message: event.reason?.message || 'Unhandled promise rejection',
          stack: event.reason?.stack,
          timestamp: Date.now()
        })
      })
    }
  }

  recordPageLoad() {
    if (typeof window === 'undefined' || !window.performance) return

    const navigation = performance.getEntriesByType('navigation')[0]
    if (!navigation) return

    const metrics = {
      timestamp: Date.now(),
      url: window.location.href,
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: this.getFirstPaint(),
      firstContentfulPaint: this.getFirstContentfulPaint(),
      largestContentfulPaint: this.getLargestContentfulPaint()
    }

    this.metrics.pageLoads.push(metrics)
    console.log('📊 Page Load Metrics:', metrics)
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint')
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')
    return firstPaint ? firstPaint.startTime : null
  }

  getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint')
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
    return fcp ? fcp.startTime : null
  }

  getLargestContentfulPaint() {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(null)
        return
      }

      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry ? lastEntry.startTime : null)
        })
        observer.observe({ entryTypes: ['largest-contentful-paint'] })

        // Timeout after 10 seconds
        setTimeout(() => resolve(null), 10000)
      } catch (error) {
        resolve(null)
      }
    })
  }

  recordApiCall(url, method, duration, status) {
    const metric = {
      timestamp: Date.now(),
      url,
      method,
      duration,
      status,
      success: status >= 200 && status < 300
    }

    this.metrics.apiCalls.push(metric)

    if (duration > 2000) {
      console.warn('🐌 Slow API call detected:', metric)
    }
  }

  recordError(error) {
    this.metrics.errors.push(error)
    console.error('🚨 Error recorded:', error)

    // Send to error tracking service in production
    if (import.meta.env.PROD) {
      this.sendErrorToService(error)
    }
  }

  recordUserAction(action, details = {}) {
    const metric = {
      timestamp: Date.now(),
      action,
      details,
      url: typeof window !== 'undefined' ? window.location.href : null
    }

    this.metrics.userActions.push(metric)
  }

  async sendErrorToService(error) {
    try {
      // In a real app, you would send this to a service like Sentry, LogRocket, etc.
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...error,
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: Date.now()
        })
      })
    } catch (err) {
      console.error('Failed to send error to service:', err)
    }
  }

  getMetrics() {
    return this.metrics
  }

  getPerformanceReport() {
    const pageLoads = this.metrics.pageLoads
    const apiCalls = this.metrics.apiCalls
    const errors = this.metrics.errors

    return {
      pageLoad: {
        count: pageLoads.length,
        averageLoadTime: pageLoads.length > 0
          ? pageLoads.reduce((sum, load) => sum + load.loadTime, 0) / pageLoads.length
          : 0,
        slowestLoad: pageLoads.length > 0
          ? Math.max(...pageLoads.map(load => load.loadTime))
          : 0
      },
      api: {
        count: apiCalls.length,
        averageResponseTime: apiCalls.length > 0
          ? apiCalls.reduce((sum, call) => sum + call.duration, 0) / apiCalls.length
          : 0,
        errorRate: apiCalls.length > 0
          ? (apiCalls.filter(call => !call.success).length / apiCalls.length) * 100
          : 0
      },
      errors: {
        count: errors.length,
        types: errors.reduce((acc, error) => {
          acc[error.type] = (acc[error.type] || 0) + 1
          return acc
        }, {})
      }
    }
  }

  // Clear old metrics to prevent memory leaks
  cleanup() {
    const oneHourAgo = Date.now() - (60 * 60 * 1000)

    this.metrics.pageLoads = this.metrics.pageLoads.filter(m => m.timestamp > oneHourAgo)
    this.metrics.apiCalls = this.metrics.apiCalls.filter(m => m.timestamp > oneHourAgo)
    this.metrics.errors = this.metrics.errors.filter(m => m.timestamp > oneHourAgo)
    this.metrics.userActions = this.metrics.userActions.filter(m => m.timestamp > oneHourAgo)
  }
}

// Create global instance
export const performanceMonitor = new PerformanceMonitor()

// Cleanup every hour
if (typeof window !== 'undefined') {
  setInterval(() => {
    performanceMonitor.cleanup()
  }, 60 * 60 * 1000)
}

// Enhanced fetch wrapper with performance monitoring
export const monitoredFetch = async (url, options = {}) => {
  const startTime = performance.now()
  const method = options.method || 'GET'

  try {
    const response = await fetch(url, options)
    const duration = performance.now() - startTime

    performanceMonitor.recordApiCall(url, method, duration, response.status)

    return response
  } catch (error) {
    const duration = performance.now() - startTime
    performanceMonitor.recordApiCall(url, method, duration, 0)
    performanceMonitor.recordError({
      type: 'network',
      message: error.message,
      url,
      method,
      timestamp: Date.now()
    })
    throw error
  }
}

// User action tracking helpers
export const trackUserAction = (action, details) => {
  performanceMonitor.recordUserAction(action, details)
}

// Performance debugging helpers
export const logPerformanceReport = () => {
  console.table(performanceMonitor.getPerformanceReport())
}

// Export for debugging in console
if (typeof window !== 'undefined') {
  window.performanceMonitor = performanceMonitor
  window.logPerformanceReport = logPerformanceReport
}
