import { useState, useEffect, useRef } from 'react'

const LazyImage = ({ 
  src, 
  alt = '', 
  placeholder = null,
  style = {},
  className = '',
  onLoad = () => {},
  onError = () => {}
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3C/svg%3E')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && src) {
            // Start loading image
            const img = new Image()
            img.src = src
            
            img.onload = () => {
              setImageSrc(src)
              setImageLoaded(true)
              onLoad()
            }
            
            img.onerror = () => {
              setImageError(true)
              onError()
            }
            
            // Stop observing after loading starts
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before visible
        threshold: 0.01
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src, onLoad, onError])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={className}
      style={{
        ...style,
        transition: 'opacity 0.3s ease-in-out',
        opacity: imageLoaded ? 1 : 0.7,
        filter: imageLoaded ? 'none' : 'blur(5px)'
      }}
      loading="lazy"
    />
  )
}

export default LazyImage
