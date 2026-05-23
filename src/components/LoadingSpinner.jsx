import { Smartphone } from 'lucide-react'

const LoadingSpinner = ({ size = 'medium', text = 'Yuklanmoqda...' }) => {
  const sizes = {
    small: { spinner: 24, text: '14px' },
    medium: { spinner: 40, text: '16px' },
    large: { spinner: 60, text: '18px' }
  }

  const currentSize = sizes[size]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '20px'
    }}>
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
          color: '#667eea'
        }}>
          <Smartphone size={currentSize.spinner * 0.4} />
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

export default LoadingSpinner
