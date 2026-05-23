const Card = ({
  children,
  title,
  subtitle,
  image,
  imageAlt,
  variant = 'default',
  size = 'medium',
  hoverable = false,
  clickable = false,
  onClick,
  className = '',
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          background: 'white',
          border: '2px solid #e5e7eb',
          boxShadow: 'none'
        }
      case 'elevated':
        return {
          background: 'white',
          border: 'none',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
          color: 'white'
        }
      default:
        return {
          background: 'white',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '16px',
          borderRadius: '12px'
        }
      case 'medium':
        return {
          padding: '24px',
          borderRadius: '16px'
        }
      case 'large':
        return {
          padding: '32px',
          borderRadius: '20px'
        }
      default:
        return {
          padding: '24px',
          borderRadius: '16px'
        }
    }
  }

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  const baseStyles = {
    transition: 'all 0.3s ease',
    cursor: clickable ? 'pointer' : 'default',
    ...sizeStyles,
    ...variantStyles,
    ...style
  }

  const handleMouseEnter = (e) => {
    if (hoverable || clickable) {
      e.currentTarget.style.transform = 'translateY(-4px)'
      if (variant === 'default') {
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)'
      } else if (variant === 'elevated') {
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)'
      } else if (variant === 'gradient') {
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)'
      }
    }
  }

  const handleMouseLeave = (e) => {
    if (hoverable || clickable) {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = variantStyles.boxShadow
    }
  }

  const handleClick = (e) => {
    if (clickable && onClick) {
      onClick(e)
    }
  }

  return (
    <div
      className={className}
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {image && (
        <div style={{
          marginBottom: title || subtitle ? '16px' : '0',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <img
            src={image}
            alt={imageAlt || 'Card image'}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
      )}

      {(title || subtitle) && (
        <div style={{ marginBottom: children ? '16px' : '0' }}>
          {title && (
            <h3 style={{
              fontSize: size === 'small' ? '18px' : size === 'large' ? '24px' : '20px',
              fontWeight: '700',
              color: variant === 'gradient' ? 'white' : '#1f2937',
              margin: '0 0 8px 0',
              lineHeight: '1.3'
            }}>
              {title}
            </h3>
          )}

          {subtitle && (
            <p style={{
              fontSize: size === 'small' ? '14px' : '16px',
              color: variant === 'gradient' ? 'rgba(255, 255, 255, 0.8)' : '#6b7280',
              margin: 0,
              lineHeight: '1.5'
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children && (
        <div style={{
          color: variant === 'gradient' ? 'white' : 'inherit'
        }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Card
