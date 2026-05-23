import { cloneElement } from 'react'

const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  icon,
  iconPosition = 'left',
  className = '',
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          color: '#065f46',
          border: '1px solid #10b981'
        }
      case 'error':
        return {
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          color: '#991b1b',
          border: '1px solid #ef4444'
        }
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          color: '#92400e',
          border: '1px solid #f59e0b'
        }
      case 'info':
        return {
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          color: '#1e40af',
          border: '1px solid #3b82f6'
        }
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none'
        }
      case 'secondary':
        return {
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
          color: '#374151',
          border: '1px solid #d1d5db'
        }
      case 'outline':
        return {
          background: 'transparent',
          color: '#667eea',
          border: '1px solid #667eea'
        }
      case 'ghost':
        return {
          background: 'rgba(102, 126, 234, 0.1)',
          color: '#667eea',
          border: 'none'
        }
      default:
        return {
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
          color: '#374151',
          border: '1px solid #d1d5db'
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '4px 8px',
          fontSize: '12px',
          borderRadius: '6px',
          fontWeight: '500'
        }
      case 'medium':
        return {
          padding: '6px 12px',
          fontSize: '14px',
          borderRadius: '8px',
          fontWeight: '600'
        }
      case 'large':
        return {
          padding: '8px 16px',
          fontSize: '16px',
          borderRadius: '10px',
          fontWeight: '600'
        }
      default:
        return {
          padding: '6px 12px',
          fontSize: '14px',
          borderRadius: '8px',
          fontWeight: '600'
        }
    }
  }

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: icon ? '6px' : '0',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
    ...sizeStyles,
    ...variantStyles,
    ...style
  }

  const iconSize = size === 'small' ? 12 : size === 'large' ? 16 : 14

  return (
    <span
      className={className}
      style={baseStyles}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {cloneElement(icon, { size: iconSize })}
        </span>
      )}

      {children}

      {icon && iconPosition === 'right' && (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {cloneElement(icon, { size: iconSize })}
        </span>
      )}
    </span>
  )
}

export default Badge
