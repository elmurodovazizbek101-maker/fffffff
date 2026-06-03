// Performance Optimization Utilities
// Sayt tezligini oshirish uchun utility funksiyalar

/**
 * Debounce function - ko'p chaqirilgan funksiyalarni kechiktirish
 */
export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

/**
 * Throttle function - funksiyani ma'lum vaqt oralig'ida cheklash
 */
export const throttle = (func, delay) => {
  let timeoutId
  let lastExecTime = 0
  return (...args) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func.apply(null, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(null, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

/**
 * Virtual scrolling uchun visible items hisoblash
 */
export const calculateVisibleItems = (containerHeight, itemHeight, buffer = 5) => {
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  return {
    visibleCount,
    startBuffer: buffer,
    endBuffer: buffer,
    totalVisible: visibleCount + buffer * 2
  }
}

/**
 * Lazy loading implementation
 */
export class LazyLoader {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    }
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options
    )
  }

  observe(element, callback) {
    element._lazyCallback = callback
    this.observer.observe(element)
  }

  unobserve(element) {
    this.observer.unobserve(element)
    delete element._lazyCallback
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target._lazyCallback) {
        entry.target._lazyCallback()
        this.unobserve(entry.target)
      }
    })
  }

  disconnect() {
    this.observer.disconnect()
  }
}

/**
 * Memory usage monitoring
 */
export const getMemoryUsage = () => {
  if (performance.memory) {
    return {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
    }
  }
  return null
}

/**
 * Performance metrics collection
 */
export const collectPerformanceMetrics = () => {
  const navigation = performance.getEntriesByType('navigation')[0]
  const paint = performance.getEntriesByType('paint')
  
  return {
    // Page load metrics
    pageLoad: Math.round(navigation?.loadEventEnd - navigation?.loadEventStart),
    domContentLoaded: Math.round(navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart),
    
    // Paint metrics
    firstPaint: Math.round(paint.find(p => p.name === 'first-paint')?.startTime || 0),
    firstContentfulPaint: Math.round(paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0),
    
    // Memory (if available)
    memory: getMemoryUsage(),
    
    // Connection info
    connection: navigator.connection ? {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink,
      rtt: navigator.connection.rtt
    } : null
  }
}

/**
 * Component render time measurement
 */
export class RenderProfiler {
  constructor(componentName) {
    this.componentName = componentName
    this.startTime = null
  }

  start() {
    this.startTime = performance.now()
  }

  end() {
    if (this.startTime) {
      const renderTime = performance.now() - this.startTime
      console.log(`🚀 ${this.componentName} render time: ${renderTime.toFixed(2)}ms`)
      return renderTime
    }
    return 0
  }
}

/**
 * localStorage with compression
 */
export const compressedStorage = {
  set(key, data) {
    try {
      const compressed = JSON.stringify(data)
      localStorage.setItem(key, compressed)
      return true
    } catch (error) {
      console.error('Storage compression error:', error)
      return false
    }
  },

  get(key) {
    try {
      const compressed = localStorage.getItem(key)
      return compressed ? JSON.parse(compressed) : null
    } catch (error) {
      console.error('Storage decompression error:', error)
      return null
    }
  },

  remove(key) {
    localStorage.removeItem(key)
  },

  clear() {
    localStorage.clear()
  }
}

/**
 * Network request caching
 */
class RequestCache {
  constructor(maxSize = 100, ttl = 300000) { // 5 minutes default TTL
    this.cache = new Map()
    this.maxSize = maxSize
    this.ttl = ttl
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  set(key, data) {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest item
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  clear() {
    this.cache.clear()
  }

  size() {
    return this.cache.size
  }
}

export const requestCache = new RequestCache()

/**
 * Resource preloader
 */
export const preloadResource = (url, type = 'fetch') => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    
    switch (type) {
      case 'image':
        link.as = 'image'
        break
      case 'script':
        link.as = 'script'
        break
      case 'style':
        link.as = 'style'
        break
      default:
        link.as = 'fetch'
        link.crossOrigin = 'anonymous'
    }

    link.onload = resolve
    link.onerror = reject
    
    document.head.appendChild(link)
  })
}

/**
 * Bundle size analyzer
 */
export const analyzeBundleSize = () => {
  const scripts = Array.from(document.querySelectorAll('script[src]'))
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
  
  return {
    scripts: scripts.length,
    styles: styles.length,
    totalResources: scripts.length + styles.length,
    scriptUrls: scripts.map(s => s.src),
    styleUrls: styles.map(s => s.href)
  }
}

/**
 * Critical path optimization
 */
export const optimizeCriticalPath = () => {
  // Preload critical fonts
  const fonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
  ]
  
  fonts.forEach(font => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = font
    link.as = 'style'
    link.onload = function() { this.rel = 'stylesheet' }
    document.head.appendChild(link)
  })

  // Remove unused CSS (basic implementation)
  const unusedSelectors = []
  const stylesheets = Array.from(document.styleSheets)
  
  stylesheets.forEach(sheet => {
    try {
      const rules = Array.from(sheet.cssRules || sheet.rules || [])
      rules.forEach(rule => {
        if (rule.type === 1) { // CSS Rule
          try {
            if (!document.querySelector(rule.selectorText)) {
              unusedSelectors.push(rule.selectorText)
            }
          } catch (e) {
            // Ignore pseudo-selectors and complex selectors
          }
        }
      })
    } catch (e) {
      // Cross-origin or other restrictions
    }
  })

  return { unusedSelectors }
}

// Performance monitoring setup
if (typeof window !== 'undefined') {
  // Monitor performance on page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = collectPerformanceMetrics()
      console.log('📊 Performance Metrics:', metrics)
    }, 0)
  })

  // Monitor memory usage periodically
  let memoryCheckInterval
  
  const startMemoryMonitoring = () => {
    memoryCheckInterval = setInterval(() => {
      const memory = getMemoryUsage()
      if (memory && memory.used > memory.limit * 0.8) {
        console.warn('⚠️ High memory usage detected:', memory)
      }
    }, 30000) // Check every 30 seconds
  }

  const stopMemoryMonitoring = () => {
    if (memoryCheckInterval) {
      clearInterval(memoryCheckInterval)
    }
  }

  // Auto-start monitoring
  startMemoryMonitoring()

  // Cleanup on page unload
  window.addEventListener('beforeunload', stopMemoryMonitoring)
}