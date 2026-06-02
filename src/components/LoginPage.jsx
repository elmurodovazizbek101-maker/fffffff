import { useState } from 'react'
import { Eye, EyeOff, LogIn, UserPlus, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate()
  
  // State
  const [mode, setMode] = useState('login') // 'login' or 'register'
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    name: '',
    phone: '+998 ',
    region: '',
    district: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  // Regions
  const regions = [
    'Toshkent shahri', 'Toshkent viloyati', 'Andijon', 'Buxoro',
    'Farg\'ona', 'Jizzax', 'Xorazm', 'Namangan', 'Navoiy',
    'Qashqadaryo', 'Qoraqalpog\'iston', 'Samarqand', 'Sirdaryo', 'Surxondaryo'
  ]

  // Handle input change
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setMessage({ type: '', text: '' })
  }

  // Phone formatter
  const formatPhone = (value) => {
    let clean = value.replace(/[^\d]/g, '')
    if (clean.startsWith('998')) clean = clean.substring(3)
    if (clean.length > 9) clean = clean.substring(0, 9)
    
    let formatted = '+998'
    if (clean.length > 0) formatted += ' ' + clean.substring(0, 2)
    if (clean.length > 2) formatted += ' ' + clean.substring(2, 5)
    if (clean.length > 5) formatted += ' ' + clean.substring(5, 7)
    if (clean.length > 7) formatted += ' ' + clean.substring(7, 9)
    
    return formatted
  }

  // Admin login check - SIMPLE AND DIRECT
  const checkAdminLogin = (login, password) => {
    // Direct comparison - no complexity
    return login.trim() === 'dead' && password.trim() === '18042011'
  }

  // Customer functions
  const getCustomers = () => {
    try {
      const data = localStorage.getItem('alisher_mobile_customers')
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  const saveCustomer = (customer) => {
    try {
      const customers = getCustomers()
      customers.push(customer)
      localStorage.setItem('alisher_mobile_customers', JSON.stringify(customers))
      return true
    } catch {
      return false
    }
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      if (mode === 'login') {
        // Admin check first
        if (checkAdminLogin(formData.login, formData.password)) {
          const success = await onLogin(formData.login.trim(), formData.password.trim())
          if (success) {
            setMessage({ type: 'success', text: 'Admin panelga yo\'naltirilmoqda...' })
            return
          }
        }

        // Customer check
        const customers = getCustomers()
        const customer = customers.find(c => 
          c.login === formData.login.trim() && c.password === formData.password.trim()
        )

        if (customer) {
          localStorage.setItem('alisher_mobile_customer', JSON.stringify(customer))
          setMessage({ type: 'success', text: 'Muvaffaqiyatli! Saytga yo\'naltirilmoqda...' })
          setTimeout(() => navigate('/'), 1500)
        } else {
          setMessage({ type: 'error', text: 'Login yoki parol noto\'g\'ri!' })
        }
      } else {
        // Register
        if (!formData.name || !formData.login || !formData.password) {
          setMessage({ type: 'error', text: 'Barcha maydonlarni to\'ldiring!' })
          setLoading(false)
          return
        }

        const customers = getCustomers()
        if (customers.find(c => c.login === formData.login.trim())) {
          setMessage({ type: 'error', text: 'Bu login band!' })
          setLoading(false)
          return
        }

        const newCustomer = {
          id: Date.now(),
          name: formData.name.trim(),
          login: formData.login.trim(),
          password: formData.password.trim(),
          phone: formData.phone.trim(),
          region: formData.region.trim(),
          district: formData.district.trim(),
          joinDate: new Date().toISOString()
        }

        if (saveCustomer(newCustomer)) {
          localStorage.setItem('alisher_mobile_customer', JSON.stringify(newCustomer))
          setMessage({ type: 'success', text: 'Ro\'yxatdan o\'tdingiz! Saytga yo\'naltirilmoqda...' })
          setTimeout(() => navigate('/'), 1500)
        } else {
          setMessage({ type: 'error', text: 'Xatolik yuz berdi!' })
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Xatolik yuz berdi. Qayta urinib ko\'ring.' })
    } finally {
      setLoading(false)
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
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '440px',
        padding: '40px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
          }}>
            <Shield size={40} color="white" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937', margin: '0 0 8px 0' }}>
            {mode === 'login' ? 'Kirish' : 'Ro\'yxatdan O\'tish'}
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Alisher Mobile</p>
        </div>

        {/* Mode Toggle */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: '#f3f4f6',
          padding: '4px',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <button
            type="button"
            onClick={() => {
              setMode('login')
              setMessage({ type: '', text: '' })
            }}
            style={{
              flex: 1,
              padding: '12px',
              background: mode === 'login' ? 'white' : 'transparent',
              color: mode === 'login' ? '#4f46e5' : '#6b7280',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: mode === 'login' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <LogIn size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Kirish
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register')
              setMessage({ type: '', text: '' })
            }}
            style={{
              flex: 1,
              padding: '12px',
              background: mode === 'register' ? 'white' : 'transparent',
              color: mode === 'register' ? '#4f46e5' : '#6b7280',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: mode === 'register' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <UserPlus size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Ro'yxat
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: '500',
            background: message.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: message.type === 'success' ? '#166534' : '#dc2626',
            border: `2px solid ${message.type === 'success' ? '#bbf7d0' : '#fca5a5'}`
          }}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name (Register only) */}
          {mode === 'register' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                ISM
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="To'liq ismingiz"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                required
              />
            </div>
          )}

          {/* Login */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
              LOGIN
            </label>
            <input
              type="text"
              value={formData.login}
              onChange={(e) => handleChange('login', e.target.value)}
              placeholder="Login"
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              required
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: mode === 'register' ? '16px' : '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
              PAROL
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 14px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
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
                  padding: '4px',
                  display: 'flex'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Register fields */}
          {mode === 'register' && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                  TELEFON
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', formatPhone(e.target.value))}
                  placeholder="+998 90 123 45 67"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    VILOYAT
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => handleChange('region', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  >
                    <option value="">Tanlang</option>
                    {regions.map((region, i) => (
                      <option key={i} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    TUMAN
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    placeholder="Tuman"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 12px rgba(79, 70, 229, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                Kirilyapti...
              </>
            ) : (
              <>
                {mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
                {mode === 'login' ? 'Kirish' : 'Ro\'yxatdan O\'tish'}
              </>
            )}
          </button>
        </form>

        {/* Info */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f9fafb',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280', fontSize: '12px', margin: 0, lineHeight: '1.5' }}>
            {mode === 'login' 
              ? 'Admin: dead / 18042011'
              : 'Ro\'yxatdan o\'tganingizdan keyin saytdan foydalanishingiz mumkin'
            }
          </p>
        </div>

        {/* Copyright */}
        <div style={{
          marginTop: '16px',
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
