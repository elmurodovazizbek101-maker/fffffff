import { useState } from 'react'
import { Eye, EyeOff, User, Lock, Shield } from 'lucide-react'

const LoginPage = ({ onLogin }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Admin login: admin / admin123
    const success = await onLogin(login.trim(), password)

    if (!success) {
      setError('Login yoki parol noto\'g\'ri!')
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
            Admin Panel
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            margin: 0
          }}>
            Alisher Mobile
          </p>
        </div>

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
                }}
                placeholder="admin"
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
                <Shield size={18} />
                Kirish
              </>
            )}
          </button>
        </form>

        {/* Info */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f0f9ff',
          borderRadius: '10px',
          border: '2px solid #bae6fd',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#0369a1',
            fontWeight: '600',
            marginBottom: '6px'
          }}>
            Admin Ma'lumotlari
          </div>
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <code style={{
              background: 'white',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#0c4a6e',
              border: '1px solid #7dd3fc'
            }}>
              admin
            </code>
            <code style={{
              background: 'white',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#0c4a6e',
              border: '1px solid #7dd3fc'
            }}>
              admin123
            </code>
          </div>
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
