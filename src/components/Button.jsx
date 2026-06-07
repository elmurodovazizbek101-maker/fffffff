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
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary'
      case 'secondary':
        return 'btn-secondary'
      case 'success':
        return 'btn-success'
      case 'danger':
        return 'btn-danger'
      case 'warning':
        return 'btn-warning'
      case 'ghost':
        return 'btn-ghost'
      case 'outline':
        return 'btn-outline'
      default:
        return 'btn-primary'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'btn-small'
      case 'large':
        return 'btn-large'
      default:
        return ''
    }
  }

  const classes = [
    'btn',
    getVariantClasses(),
    getSizeClasses(),
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ')

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e)
    }
  }

  return (
    <button
      type={type}
      className={classes}
      style={style}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="spinner" />
          {children}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  )
}

export default Button
