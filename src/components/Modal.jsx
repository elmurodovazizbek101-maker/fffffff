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

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'max-w-md'
      case 'medium':
        return 'max-w-2xl'
      case 'large':
        return 'max-w-4xl'
      case 'full':
        return 'max-w-7xl'
      default:
        return 'max-w-2xl'
    }
  }

  return (
    <div
      className="modal-overlay"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={`modal ${getSizeClasses()}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between mb-6">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 m-0">
                {title}
              </h2>
            )}

            {showCloseButton && (
              <button
                onClick={onClose}
                className="btn-ghost p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                style={{ minHeight: 'auto' }}
              >
                <X size={24} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
