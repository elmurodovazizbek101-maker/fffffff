import { useState } from 'react'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  size = 'medium',
  fullWidth = false,
  autoComplete = 'off',
  className = '',
  style = {},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '8px 12px',
          fontSize: '14px',
          borderRadius: '8px'
        }
      case 'medium':
        return {
          padding: '12px 16px',
          fontSize: '16px',
          borderRadius: '10px'
        }
      case 'large':
        return {
          padding: '16px 20px',
          fontSize: '18px',
          borderRadius: '12px'
        }
      default:
        return {
          padding: '12px 16px',
          fontSize: '16px',
          borderRadius: '10px'
        }
    }
  }

  const sizeStyles = getSizeStyles()

  const getBorderColor = () => {
    if (error) return '#ef4444'
    if (isFocused) return '#667eea'
    return '#e5e7eb'
  }

  const getBoxShadow = () => {
    if (error) return '0 0 0 3px rgba(239, 68, 68, 0.1)'
    if (isFocused) return '0 0 0 3px rgba(102, 126, 234, 0.1)'
    return 'none'
  }

  const inputStyles = {
    width: fullWidth ? '100%' : 'auto',
    border: `2px solid ${getBorderColor()}`,
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    color: disabled ? '#9ca3af' : '#1f2937',
    backgroundColor: disabled ? '#f9fafb' : 'white',
    boxShadow: getBoxShadow(),
    boxSizing: 'border-box',
    ...sizeStyles,
    ...style
  }

  const handleFocus = (e) => {
    setIsFocused(true)
    if (onFocus) onFocus(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    if (onBlur) onBlur(e)
  }

  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '6px',
          fontSize: '14px',
          fontWeight: '600',
          color: error ? '#ef4444' : '#374151'
        }}>
          {label}
          {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
        </label>
      )}

      <div style={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
        {icon && iconPosition === 'left' && (
          <div style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: error ? '#ef4444' : isFocused ? '#667eea' : '#9ca3af',
            pointerEvents: 'none',
            transition: 'color 0.2s ease'
          }}>
            {icon}
          </div>
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-lpignore="true"
          data-form-type="other"
          data-1p-ignore="true"
          className={className}
          style={{
            ...inputStyles,
            paddingLeft: icon && iconPosition === 'left' ? '48px' : inputStyles.padding.split(' ')[1],
            paddingRight: (icon && iconPosition === 'right') || type === 'password' ? '48px' : inputStyles.padding.split(' ')[1]
          }}
          {...props}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isFocused ? '#667eea' : '#9ca3af',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease'
            }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {icon && iconPosition === 'right' && type !== 'password' && (
          <div style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: error ? '#ef4444' : isFocused ? '#667eea' : '#9ca3af',
            pointerEvents: 'none',
            transition: 'color 0.2s ease'
          }}>
            {icon}
          </div>
        )}
      </div>

      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '6px',
          color: '#ef4444',
          fontSize: '14px'
        }}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  )
}

export default Input
