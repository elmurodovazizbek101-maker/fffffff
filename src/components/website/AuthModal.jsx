import { useState } from 'react'
import { X, User, Phone, MapPin, Lock, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react'
import { useAuth } from './context/AuthContext'
import { useData } from '../../context/DataContext'

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    login: '',
    phone: '',
    region: '',
    district: '',
    password: ''
  })
  const { login, register } = useAuth()
  const { addCustomer } = useData()

  const regions = [
    'Toshkent', 'Samarqand', 'Buxoro', 'Andijon', 'Farg\'ona',
    'Namangan', 'Qashqadaryo', 'Surxondaryo', 'Jizzax',
    'Sirdaryo', 'Navoiy', 'Xorazm', 'Qoraqalpog\'iston'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      if (isLogin) {
        // Customer login with username and password
        if (formData.login && formData.password) {
          const result = login(formData.login, formData.password)
          if (result.success) {
            setSuccess(true)
            setTimeout(() => {
              onClose()
              setSuccess(false)
              setFormData({
                name: '',
                login: '',
                phone: '',
                region: '',
                district: '',
                password: ''
              })
            }, 1500)
          } else {
            setError(result.message || 'Login yoki parol noto\'g\'ri!')
          }
        }
      } else {
        // Customer registration with all fields including phone
        if (formData.name && formData.login && formData.phone && formData.region && formData.district && formData.password) {
          const result = register(formData)
          if (result.success) {
            // Add to customers list in DataContext
            addCustomer({
              name: formData.name,
              phone: formData.phone,
              region: formData.region,
              district: formData.district,
              notes: 'Saytdan ro\'yxatdan o\'tgan'
            })
            setSuccess(true)
            setTimeout(() => {
              onClose()
              setSuccess(false)
              setFormData({
                name: '',
                login: '',
                phone: '',
                region: '',
                district: '',
                password: ''
              })
            }, 1500)
          } else {
            setError(result.message || 'Ro\'yxatdan o\'tishda xatolik!')
          }
        }
      }
    } catch (err) {
      setError('Xatolik yuz berdi. Qaytadan urinib ko\'ring.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  if (!isOpen) return null

  // Success screen
  if (success) {
    return (
      <div style={{
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
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            animation: 'scaleIn 0.5s ease-out'
          }}>
            <CheckCircle size={48} color="white" />
          </div>

          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#10b981',
            marginBottom: '12px'
          }}>
            Muvaffaqiyatli!
          </h2>

          <p style={{
            color: '#6b7280',
            fontSize: '16px',
            margin: 0
          }}>
            {isLogin ? 'Tizimga muvaffaqiyatli kirdingiz' : 'Ro\'yxatdan o\'tish muvaffaqiyatli'}
          </p>

          <style>{`
            @keyframes scaleIn {
              from {
                transform: scale(0);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      </div>
    )
  }

  return (
    <div style={{
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
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '400px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
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

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Hidden fake fields */}
          <input type="text" style={{ display: 'none' }} tabIndex="-1" />
          <input type="password" style={{ display: 'none' }} tabIndex="-1" />

          {!isLogin && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  <User size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  Ism
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-lpignore="true"
                  data-form-type="other"
                  className="input"
                  required={!isLogin}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  <Phone size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  Telefon raqam
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-lpignore="true"
                  data-form-type="other"
                  className="input"
                  placeholder="+998 90 123 45 67"
                  required={!isLogin}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    <MapPin size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Viloyat
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    autoComplete="off"
                    className="input"
                    required={!isLogin}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Tanlang</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Tuman/Shahar
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    data-lpignore="true"
                    data-form-type="other"
                    className="input"
                    required={!isLogin}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              <User size={16} style={{ display: 'inline', marginRight: '6px' }} />
              Login
            </label>
            <input
              type="text"
              name="login"
              value={formData.login}
              onChange={handleChange}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-lpignore="true"
              data-form-type="other"
              className="input"
              placeholder="username"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              <Lock size={16} style={{ display: 'inline', marginRight: '6px' }} />
              Parol
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-lpignore="true"
              data-form-type="other"
              data-1p-ignore="true"
              className="input"
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px',
                paddingRight: '45px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
                letterSpacing: showPassword ? 'normal' : '3px'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '38px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              marginBottom: '16px',
              background: loading
                ? '#9ca3af'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {loading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                {isLogin ? 'Kirilyapti...' : 'Ro\'yxatdan o\'tilyapti...'}
              </>
            ) : (
              isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish'
            )}
          </button>

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setFormData({
                  name: '',
                  login: '',
                  phone: '',
                  region: '',
                  district: '',
                  password: ''
                })
                setError('')
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#4f46e5',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '14px'
              }}
            >
              {isLogin ? 'Ro\'yxatdan o\'tish' : 'Hisobingiz bormi? Kirish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthModal
