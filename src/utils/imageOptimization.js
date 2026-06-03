// Image Optimization Utility
// Mahsulot rasmlarini optimizatsiya qilish uchun

/**
 * Rasm URLini optimizatsiya qiladi
 * @param {string} imageUrl - Asl rasm URL
 * @param {Object} options - Optimizatsiya parametrlari
 * @returns {string} - Optimizatsiyalangan rasm URL
 */
export const optimizeImage = (imageUrl, options = {}) => {
  if (!imageUrl) return '/images/placeholder.jpg'
  
  const {
    width = 400,
    height = 300,
    quality = 80,
    format = 'webp'
  } = options

  // Agar CDN URL mavjud bo'lsa, uni ishlatamiz
  const cdnBaseUrl = import.meta.env.VITE_CDN_BASE_URL
  if (cdnBaseUrl && !imageUrl.startsWith('http')) {
    return `${cdnBaseUrl}/images/${imageUrl}?w=${width}&h=${height}&q=${quality}&f=${format}`
  }

  // Local development uchun
  if (imageUrl.startsWith('/') || imageUrl.startsWith('./')) {
    return imageUrl
  }

  // External URL uchun
  return imageUrl
}

/**
 * Mahsulot rasmi uchun optimizatsiya
 */
export const getProductImageUrl = (imageUrl, size = 'medium') => {
  const sizes = {
    thumbnail: { width: 150, height: 150, quality: 70 },
    small: { width: 250, height: 250, quality: 75 },
    medium: { width: 400, height: 300, quality: 80 },
    large: { width: 800, height: 600, quality: 85 },
    hero: { width: 1200, height: 800, quality: 90 }
  }

  return optimizeImage(imageUrl, sizes[size] || sizes.medium)
}

/**
 * Lazy loading uchun placeholder image
 */
export const getPlaceholderImage = (width = 400, height = 300) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">
        Rasm yuklanmoqda...
      </text>
    </svg>
  `)}`
}

/**
 * Image preloader - rasmlarni oldindan yuklash
 */
export const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = getProductImageUrl(url)
      })
    })
  )
}

/**
 * WebP format support tekshiruvi
 */
export const supportsWebP = () => {
  const canvas = document.createElement('canvas')
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
}

/**
 * Image compression client-side
 */
export const compressImage = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(resolve, 'image/jpeg', quality)
    }

    img.src = URL.createObjectURL(file)
  })
}

/**
 * Image caching utility
 */
class ImageCache {
  constructor(maxSize = 50) {
    this.cache = new Map()
    this.maxSize = maxSize
  }

  get(url) {
    if (this.cache.has(url)) {
      const item = this.cache.get(url)
      // Move to end (LRU)
      this.cache.delete(url)
      this.cache.set(url, item)
      return item
    }
    return null
  }

  set(url, data) {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest item
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    this.cache.set(url, data)
  }

  clear() {
    this.cache.clear()
  }
}

export const imageCache = new ImageCache()