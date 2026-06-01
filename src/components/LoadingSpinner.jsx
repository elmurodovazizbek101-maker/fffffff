import { Smartphone, Loader2, RefreshCw } from 'lucide-react'

const LoadingSpinner = ({ 
  size = 'medium', 
  text = 'Yuklanmoqda...', 
  type = 'default',
  fullScreen = false,
  overlay = false 
}) => {
  const sizes = {
    small: { spinner: 24, text: '14px' },
    medium: { spinner: 40, text: '16px' },
    large: { spinner: 60, text: '18px' }
  }

  const currentSize = sizes[size]

  const getIcon = () => {
    switch (type) {
      case 'refresh':
        return <RefreshCw size={currentSize.spinner * 0.4} />
      case 'loader':
        return <Loader2 size={currentSize.spinner * 0.4} />
      default:
        return <Smartphone size={currentSize.spinner * 0.4} />
    }
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '20px',
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: overlay ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
      zIndex: 9999
    })
  }

  return (
    <div style={containerStyle} role="status" aria-label={text}>
      <div style={{
        position: 'relative',
        width: currentSize.spinner,
        height: currentSize.spinner
      }}>
        {/* Outer spinning ring */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '3px solid rgba(102, 126, 234, 0.2)',
          borderTop: '3px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />

        {/* Inner icon */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#667eea',
          animation: type === 'refresh' ? 'spin 2s linear infinite reverse' : 'none'
        }}>
          {getIcon()}
        </div>
      </div>

      {text && (
        <p style={{
          margin: 0,
          fontSize: currentSize.text,
          color: '#6b7280',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          {text}
        </p>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// Skeleton loader component
export const SkeletonLoader = ({ width = '100%', height = '20px', count = 1 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            width,
            height,
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner
