import { useState } from 'react'
import { X, User, Lock, Phone, MapPin, Mail, Eye, EyeOff } from 'lucide-react'
import { useCustomerAuth } from '../../context/CustomerAuthContext'

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    // Login fields
    login: '',
    password: '',
    // Register fields
    name: '',
    phone: '+998 ',
    email: '',
    region: '',
    district: '',
    registerPassword: ''
  })
  const [errors, setErrors] = useState({})
  
  const { login, register, loading } = useCustomerAuth()

  // Reset form when modal opens/closes
  const resetForm = () => {
    setFormData({
      login: '',
      password: '',
      name: '',
      phone: '+998 ',
      email: '',
      region: '',
      district: '',
      registerPassword: ''
    })
    setErrors({})
    setShowPassword(false)
  }

  // Handle phone formatting for registration
  const handlePhoneChange = (value) => {
    let digits = value.replace(/\D/g, '')
    if (digits.startsWith('998')) digits = digits.slice(3)
    if (digits.length > 9) digits = digits.slice(0, 9)
    
    let formatted = '+998'
    if (digits.length > 0) formatted += ' ' + digits.slice(0, 2)
    if (digits.length > 2) formatted += ' ' + digits.slice(2, 5)
    if (digits.length > 5) formatted += ' ' + digits.slice(5, 7)
    if (digits.length > 7) formatted += ' ' + digits.slice(7, 9)
    
    setFormData(prev => ({ ...prev, phone: formatted }))
  }

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault()
    setErrors({})

    if (!formData.login || !formData.password) {
      setErrors({ general: 'Login va parolni kiriting' })
      return
    }

    const result = await login(formData.login, formData.password)
    
    if (result.success) {
      resetForm()
      onSuccess()
    } else {
      setErrors({ general: result.message })
    }
  }

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault()
    setErrors({})

    // Validation
    const newErrors = {}
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak'
    }
    if (!formData.login || formData.login.length < 3) {
      newErrors.login = 'Login kamida 3 ta belgidan iborat bo\'lishi kerak'
    }
    if (!formData.registerPassword || formData.registerPassword.length < 6) {
      newErrors.registerPassword = 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'
    }
    if (!formData.phone || formData.phone.length < 17) {
      newErrors.phone = 'To\'g\'ri telefon raqam kiriting'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const registerData = {
      name: formData.name,
      login: formData.login,
      password: formData.registerPassword,
      phone: formData.phone,
      email: formData.email,
      region: formData.region,
      district: formData.district
    }

    const result = await register(registerData)
    
    if (result.success) {
      resetForm()
      onSuccess()
    } else {
      setErrors({ general: result.message })
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    resetForm()
  }

  if (!isOpen) return null

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '400px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
            {isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: '#6b7280'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  <User size={16} />
                  Login
                </label>
                <input
                  type="text"
                  value={formData.login}
                  onChange={(e) => setFormData(prev => ({ ...prev, login: e.target.value }))}
                  placeholder="Login yoki telefon raqam"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  <Lock size={16} />
                  Parol
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Parolingizni kiriting"
                    style={{
                      width: '100%',
                      padding: '10px 40px 10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6b7280'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {errors.general && (
                <div style={{
                  marginBottom: '16px',
                  padding: '12px',
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  color: '#991b1b',
                  fontSize: '14px'
                }}>
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: loading ? '#9ca3af' : '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginBottom: '16px'
                }}
              >
                {loading ? 'Kirish...' : 'Kirish'}
              </button>

              <div style={{ textAlign: 'center' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                  Hisobingiz yo'qmi? {' '}
                </span>
                <button
                  type="button"
                  onClick={toggleMode}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#4f46e5',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Ro'yxatdan o'ting
                </button>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: errors.name ? '#ef4444' : '#1f2937'
                }}>
                  <User size={16} />
                  To'liq ism *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }))
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
                  }}
                  placeholder="Ismingizni kiriting"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${errors.name ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
                {errors.name && (
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: errors.login ? '#ef4444' : '#1f2937'
                }}>
                  <User size={16} />
                  Login *
                </label>
                <input
                  type="text"
                  value={formData.login}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, login: e.target.value }))
                    if (errors.login) setErrors(prev => ({ ...prev, login: '' }))
                  }}
                  placeholder="Login nomingizni kiriting"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${errors.login ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
                {errors.login && (
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                    {errors.login}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: errors.registerPassword ? '#ef4444' : '#1f2937'
                }}>
                  <Lock size={16} />
                  Parol *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.registerPassword}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, registerPassword: e.target.value }))
                      if (errors.registerPassword) setErrors(prev => ({ ...prev, registerPassword: '' }))
                    }}
                    placeholder="Parolingizni yarating"
                    style={{
                      width: '100%',
                      padding: '10px 40px 10px 12px',
                      border: `1px solid ${errors.registerPassword ? '#ef4444' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6b7280'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.registerPassword && (
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                    {errors.registerPassword}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: errors.phone ? '#ef4444' : '#1f2937'
                }}>
                  <Phone size={16} />
                  Telefon raqam *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    handlePhoneChange(e.target.value)
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
                  }}
                  placeholder="+998 90 123 45 67"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${errors.phone ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
                {errors.phone && (
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#ef4444' }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  <Mail size={16} />
                  Email (ixtiyoriy)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    <MapPin size={16} />
                    Viloyat
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                    placeholder="Viloyat"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    <MapPin size={16} />
                    Tuman
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                    placeholder="Tuman"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {errors.general && (
                <div style={{
                  marginBottom: '16px',
                  padding: '12px',
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  color: '#991b1b',
                  fontSize: '14px'
                }}>
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: loading ? '#9ca3af' : '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginBottom: '16px'
                }}
              >
                {loading ? 'Ro\'yxatdan o\'tmoqda...' : 'Ro\'yxatdan o\'tish'}
              </button>

              <div style={{ textAlign: 'center' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                  Hisobingiz bormi? {' '}
                </span>
                <button
                  type="button"
                  onClick={toggleMode}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#4f46e5',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Kirish
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginModal