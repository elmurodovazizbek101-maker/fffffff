import { Loader } from 'lucide-react'

const LoadingOverlay = ({ 
  isLoading, 
  message = 'Yuklanmoqda...', 
  fullScreen = false,
  transparent = false 
}) => {
  if (!isLoading) return null

  const overlayStyle = {
    position: fullScreen ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: transparent 
      ? 'rgba(255, 255, 255, 0.8)' 
      : 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(4px)'
  }

  return (
    <div style={overlayStyle}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        minWidth: '200px'
      }}>
        <div style={{
          animation: 'spin 1s linear infinite'
        }}>
          <Loader size={40} color="#4f46e5" />
        </div>
        
        <p style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: '500',
          color: '#1f2937'
        }}>
          {message}
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default LoadingOverlay
