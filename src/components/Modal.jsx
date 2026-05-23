import { useEffect } from 'react'
import { X } from 'lucide-react'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true
}) => {
  useEffect(() => {
    if (isOpen && closeOnEscape) {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeOnEscape, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { maxWidth: '400px', width: '90%' }
      case 'medium':
        return { maxWidth: '600px', width: '90%' }
      case 'large':
        return { maxWidth: '800px', width: '95%' }
      case 'full':
        return { maxWidth: '95vw', width: '95%', maxHeight: '95vh' }
      default:
        return { maxWidth: '600px', width: '90%' }
    }
  }

  const sizeStyles = getSizeStyles()

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          ...sizeStyles,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 24px 0 24px',
            borderBottom: title ? '1px solid #e5e7eb' : 'none',
            paddingBottom: title ? '16px' : '0',
            marginBottom: title ? '0' : '0'
          }}>
            {title && (
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                {title}
              </h2>
            )}

            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  marginLeft: title ? '16px' : '0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6'
                  e.currentTarget.style.color = '#374151'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.color = '#6b7280'
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{
          padding: title ? '24px' : '24px',
          flex: 1,
          overflowY: 'auto'
        }}>
          {children}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Modal
