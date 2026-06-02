import { useState } from 'react'
import { Eye, EyeOff, User, Lock, Shield, UserPlus, LogIn, Smartphone, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { verifyAdminCredentials, verifyCustomerCredentials, registerCustomer } from '../utils/auth'

const LoginPage = ({ onLogin }) => {
  const [mode, setMode] = useState('login') // 'login' or 'register'
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Register fields
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+998 ')
  const [region, setRegion] = useState('')
  const [district, setDistrict] = useState('')

  // O'zbekiston viloyatlari
  const uzbekistanRegions = [
    'Toshkent shahri',
    'Toshkent viloyati', 
    'Andijon',
    'Buxoro',
    'Farg\'ona',
    'Jizzax',
    'Xorazm',
    'Namangan',
    'Navoiy',
    'Qashqadaryo',
    'Qoraqalpog\'iston',
    'Samarqand',
    'Sirdaryo',
    'Surxondaryo'
  ]

  const handlePhoneChange = (value) => {
    // +998 ni olib tashlash va qayta qo'shish
    let cleanValue = value.replace(/[^\d]/g, '')
    
    // Agar 998 bilan boshlansa, uni olib tashlash
    if (cleanValue.startsWith('998')) {
      cleanValue = cleanValue.substring(3)
    }
    
    // Maksimal 9 ta raqam (998 dan keyin)
    if (cleanValue.length > 9) {
      cleanValue = cleanValue.substring(0, 9)
    }
    
    // Formatlash: +998 XX XXX XX XX
    let formatted = '+998'
    if (cleanValue.length > 0) {
      formatted += ' ' + cleanValue.substring(0, 2)
    }
    if (cleanValue.length > 2) {
      formatted += ' ' + cleanValue.substring(2, 5)
    }
    if (cleanValue.length > 5) {
      formatted += ' ' + cleanValue.substring(5, 7)
    }
    if (cleanValue.length > 7) {
      formatted += ' ' + cleanValue.substring(7, 9)
    }
    
    setPhone(formatted)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      if (mode === 'login') {
        // Try admin login first
        const isAdmin = await verifyAdminCredentials(login.trim(), password)

        if (isAdmin) {
          // Admin login successful
          const adminSuccess = await onLogin(login.trim(), password)
          if (adminSuccess) {
            setSuccess('Admin panelga yo\'naltirilmoqda...')
            // Will redirect to admin panel automatically
            return
          } else {
            setError('Admin panelga kirish xatoligi!')
            setIsLoading(false)
            return
          }
        }

        // Try customer login
        const customerResult = verifyCustomerCredentials(login.trim(), password)

        if (customerResult.success) {
          // Customer login successful - redirect to website
          localStorage.setItem('alisher_mobile_customer', JSON.stringify(customerResult.customer))
          setSuccess('Muvaffaqiyatli kirdingiz! Saytga yo\'naltirilmoqda...')
          setTimeout(() => {
            navigate('/')
          }, 1500)
        } else {
          // No match found
          setError('Login yoki parol noto\'g\'ri! Ro\'yxatdan o\'tmagan bo\'lsangiz, ro\'yxatdan o\'ting.')
          setIsLoading(false)
        }
      } else {
        // Register mode
        if (!name || !login || !password || !phone) {
          setError('Barcha maydonlarni to\'ldiring!')
          setIsLoading(false)
          return
        }

        const result = registerCustomer({
          name: name.trim(),
          login: login.trim(),
          password: password,
          phone: phone.trim(),
          region: region.trim(),
          district: district.trim()
        })

        if (result.success) {
          setSuccess('Ro\'yxatdan o\'tdingiz! Endi kirish mumkin.')
          // Auto login after register
          localStorage.setItem('alisher_mobile_customer', JSON.stringify(result.customer))
          setTimeout(() => {
            navigate('/')
          }, 1500)
        } else {
          setError(result.message)
          setIsLoading(false)
        }
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Xatolik yuz berdi. Qayta urinib ko\'ring.')
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '420px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '70px',
            height: '70px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
          }}>
            <Shield size={36} color="white" strokeWidth={2.5} />
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#1f2937',
            margin: '0 0 6px 0'
          }}>
            {mode === 'login' ? 'Kirish' : 'Ro\'yxatdan O\'tish'}
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            margin: 0
          }}>
            Alisher Mobile
          </p>
        </div>

        {/* Success */}
        {success && (
          <div style={{
            background: '#dcfce7',
            color: '#166534',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '2px solid #bbf7d0'
          }}>
            <Shield size={16} />
            {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '2px solid #fca5a5'
          }}>
            <Shield size={16} />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Register fields */}
          {mode === 'register' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '14px'
              }}>
                ISM
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingiz"
                style={{
                  width: '100%',
                  padding: '14px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  fontWeight: '500'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                required
              />
            </div>
          )}

          {/* Login */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              LOGIN
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <User size={18} />
              </div>
              <input
                type="text"
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value)
                  setError('')
                  setSuccess('')
                }}
                placeholder={mode === 'login' ? 'Login' : 'Login yarating'}
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  fontWeight: '500'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              PAROL
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                  setSuccess('')
                }}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '14px 44px 14px 44px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  fontWeight: '500',
                  letterSpacing: showPassword ? 'normal' : '3px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
                  color: '#9ca3af',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Register additional fields */}
          {mode === 'register' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  TELEFON
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                    fontWeight: '500'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '14px'
                  }}>
                    VILOYAT
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box',
                      fontWeight: '500',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    required
                  >
                    <option value="">Viloyatni tanlang</option>
                    {uzbekistanRegions.map((regionName, index) => (
                      <option key={index} value={regionName}>
                        {regionName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '14px'
                  }}>
                    TUMAN
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Chilonzor"
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box',
                      fontWeight: '500'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: isLoading ? 'none' : '0 4px 14px rgba(102, 126, 234, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                Kirilyapti...
              </>
            ) : (
              <>
                {mode === 'login' ? <Shield size={18} /> : <UserPlus size={18} />}
                {mode === 'login' ? 'Kirish' : 'Ro\'yxatdan O\'tish'}
              </>
            )}
          </button>
        </form>

        {/* Mode Toggle Link */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center'
        }}>
          {mode === 'login' ? (
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: 0
            }}>
              Hisobingiz yo'qmi?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register')
                  setError('')
                  setSuccess('')
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#4f46e5',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Ro'yxatdan o'ting
              </button>
            </p>
          ) : (
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: 0
            }}>
              Hisobingiz bormi?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login')
                  setError('')
                  setSuccess('')
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#4f46e5',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Kirish
              </button>
            </p>
          )}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '11px',
          color: '#9ca3af'
        }}>
          © 2024 Alisher Mobile
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default LoginPage
