import LoadingSpinner from './LoadingSpinner'

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: disabled || loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          boxShadow: disabled || loading ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)'
        }
      case 'secondary':
        return {
          background: disabled || loading ? '#f3f4f6' : 'white',
          color: disabled || loading ? '#9ca3af' : '#374151',
          border: `2px solid ${disabled || loading ? '#e5e7eb' : '#e5e7eb'}`,
          boxShadow: 'none'
        }
      case 'success':
        return {
          background: disabled || loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          border: 'none',
          boxShadow: disabled || loading ? 'none' : '0 4px 15px rgba(16, 185, 129, 0.4)'
        }
      case 'danger':
        return {
          background: disabled || loading ? '#9ca3af' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          border: 'none',
          boxShadow: disabled || loading ? 'none' : '0 4px 15px rgba(239, 68, 68, 0.4)'
        }
      case 'warning':
        return {
          background: disabled || loading ? '#9ca3af' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          border: 'none',
          boxShadow: disabled || loading ? 'none' : '0 4px 15px rgba(245, 158, 11, 0.4)'
        }
      case 'ghost':
        return {
          background: 'transparent',
          color: disabled || loading ? '#9ca3af' : '#667eea',
          border: 'none',
          boxShadow: 'none'
        }
      case 'outline':
        return {
          background: 'transparent',
          color: disabled || loading ? '#9ca3af' : '#667eea',
          border: `2px solid ${disabled || loading ? '#e5e7eb' : '#667eea'}`,
          boxShadow: 'none'
        }
      default:
        return {
          background: disabled || loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          boxShadow: disabled || loading ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)'
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '8px 16px',
          fontSize: '14px',
          borderRadius: '8px'
        }
      case 'medium':
        return {
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '10px'
        }
      case 'large':
        return {
          padding: '16px 32px',
          fontSize: '18px',
          borderRadius: '12px'
        }
      default:
        return {
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '10px'
        }
    }
  }

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
    width: fullWidth ? '100%' : 'auto',
    ...sizeStyles,
    ...variantStyles,
    ...style
  }

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e)
    }
  }

  const handleMouseEnter = (e) => {
    if (!disabled && !loading) {
      if (variant === 'primary' || variant === 'success' || variant === 'danger' || variant === 'warning') {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = variantStyles.boxShadow?.replace('0.4)', '0.6)')
      } else if (variant === 'secondary' || variant === 'outline') {
        e.currentTarget.style.borderColor = '#667eea'
        e.currentTarget.style.color = '#667eea'
      } else if (variant === 'ghost') {
        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'
      }
    }
  }

  const handleMouseLeave = (e) => {
    if (!disabled && !loading) {
      if (variant === 'primary' || variant === 'success' || variant === 'danger' || variant === 'warning') {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = variantStyles.boxShadow
      } else if (variant === 'secondary') {
        e.currentTarget.style.borderColor = '#e5e7eb'
        e.currentTarget.style.color = '#374151'
      } else if (variant === 'outline') {
        e.currentTarget.style.borderColor = '#667eea'
        e.currentTarget.style.color = '#667eea'
      } else if (variant === 'ghost') {
        e.currentTarget.style.background = 'transparent'
      }
    }
  }

  return (
    <button
      type={type}
      className={className}
      style={baseStyles}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          {children}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  )
}

export default Button
