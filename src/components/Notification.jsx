import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react'

const Notification = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, 300)
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />
      case 'error':
        return <AlertCircle size={20} />
      case 'warning':
        return <AlertTriangle size={20} />
      default:
        return <Info size={20} />
    }
  }

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          border: '#10b981',
          icon: '#059669',
          text: '#065f46'
        }
      case 'error':
        return {
          bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          border: '#ef4444',
          icon: '#dc2626',
          text: '#991b1b'
        }
      case 'warning':
        return {
          bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          border: '#f59e0b',
          icon: '#d97706',
          text: '#92400e'
        }
      default:
        return {
          bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          border: '#3b82f6',
          icon: '#2563eb',
          text: '#1e40af'
        }
    }
  }

  const getPosition = () => {
    switch (position) {
      case 'top-left':
        return { top: '20px', left: '20px' }
      case 'top-center':
        return { top: '20px', left: '50%', transform: 'translateX(-50%)' }
      case 'top-right':
        return { top: '20px', right: '20px' }
      case 'bottom-left':
        return { bottom: '20px', left: '20px' }
      case 'bottom-center':
        return { bottom: '20px', left: '50%', transform: 'translateX(-50%)' }
      case 'bottom-right':
        return { bottom: '20px', right: '20px' }
      default:
        return { top: '20px', right: '20px' }
    }
  }

  if (!isVisible) return null

  const colors = getColors()
  const positionStyle = getPosition()

  return (
    <div
      style={{
        position: 'fixed',
        ...positionStyle,
        zIndex: 9999,
        maxWidth: '400px',
        minWidth: '300px',
        background: colors.bg,
        border: `2px solid ${colors.border}`,
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(10px)',
        animation: isLeaving ? 'slideOut 0.3s ease-in' : 'slideIn 0.3s ease-out',
        cursor: 'pointer'
      }}
      onClick={handleClose}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <div style={{ color: colors.icon, flexShrink: 0, marginTop: '2px' }}>
          {getIcon()}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <h4 style={{
              margin: '0 0 4px 0',
              fontSize: '14px',
              fontWeight: '600',
              color: colors.text,
              lineHeight: '1.4'
            }}>
              {title}
            </h4>
          )}

          {message && (
            <p style={{
              margin: 0,
              fontSize: '13px',
              color: colors.text,
              lineHeight: '1.5',
              opacity: 0.9
            }}>
              {message}
            </p>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: colors.icon,
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.7,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      {duration > 0 && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '0 0 10px 10px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: colors.border,
            animation: `progress ${duration}ms linear`,
            transformOrigin: 'left'
          }} />
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes progress {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  )
}

// Notification Manager Hook
export const useNotification = () => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    const newNotification = { ...notification, id }

    setNotifications(prev => [...prev, newNotification])

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const success = (title, message, options = {}) => {
    return addNotification({ type: 'success', title, message, ...options })
  }

  const error = (title, message, options = {}) => {
    return addNotification({ type: 'error', title, message, ...options })
  }

  const warning = (title, message, options = {}) => {
    return addNotification({ type: 'warning', title, message, ...options })
  }

  const info = (title, message, options = {}) => {
    return addNotification({ type: 'info', title, message, ...options })
  }

  const NotificationContainer = () => (
    <>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </>
  )

  return {
    success,
    error,
    warning,
    info,
    NotificationContainer
  }
}

export default Notification
