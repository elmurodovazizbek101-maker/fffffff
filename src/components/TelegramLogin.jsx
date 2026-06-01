import { useState, useEffect } from 'react'
import { MessageCircle, User, LogOut, CheckCircle } from 'lucide-react'
import { telegramLogin } from '../utils/telegram'

const TelegramLogin = ({ onLogin, onLogout, showUserInfo = true }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = telegramLogin.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      if (onLogin) onLogin(currentUser)
    }

    // Listen for login events
    const handleLogin = (event) => {
      const userData = event.detail
      setUser(userData)
      if (onLogin) onLogin(userData)
    }

    const handleLogout = () => {
      setUser(null)
      if (onLogout) onLogout()
    }

    window.addEventListener('telegramLogin', handleLogin)
    window.addEventListener('telegramLogout', handleLogout)

    // Global function for Telegram widget callback
    window.onTelegramAuth = (userData) => {
      setLoading(true)
      
      const verification = telegramLogin.verifyLoginData(userData)
      
      if (verification.valid) {
        const processedUser = telegramLogin.handleSuccessfulLogin(verification.user)
        setUser(processedUser)
        if (onLogin) onLogin(processedUser)
      } else {
        alert(`Telegram login xatoligi: ${verification.error}`)
      }
      
      setLoading(false)
    }

    return () => {
      window.removeEventListener('telegramLogin', handleLogin)
      window.removeEventListener('telegramLogout', handleLogout)
      delete window.onTelegramAuth
    }
  }, [onLogin, onLogout])

  const handleLogout = () => {
    telegramLogin.logout()
    setUser(null)
    if (onLogout) onLogout()
  }

  const handleManualLogin = () => {
    const loginUrl = telegramLogin.generateLoginUrl()
    window.open(loginUrl, '_blank', 'width=600,height=600')
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        backgroundColor: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: '8px',
        color: '#0c4a6e'
      }}>
        <div style={{
          width: '16px',
          height: '16px',
          border: '2px solid #0ea5e9',
          borderTop: '2px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        Telegram ma'lumotlari tekshirilmoqda...
      </div>
    )
  }

  if (user) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: '#dcfce7',
        border: '1px solid #bbf7d0',
        borderRadius: '8px'
      }}>
        {user.photo_url && (
          <img
            src={user.photo_url}
            alt={user.first_name}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        )}
        
        {showUserInfo && (
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <CheckCircle size={16} />
              {user.first_name} {user.last_name}
            </div>
            {user.username && (
              <div style={{
                fontSize: '12px',
                color: '#15803d',
                marginTop: '2px'
              }}>
                @{user.username}
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          <LogOut size={14} />
          Chiqish
        </button>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '16px',
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
      }}>
        <MessageCircle size={20} color="#0088cc" />
        <span style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#1f2937'
        }}>
          Telegram orqali kirish
        </span>
      </div>

      <div style={{
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '12px'
      }}>
        Telegram akkauntingiz orqali tez va xavfsiz kiring
      </div>

      {/* Telegram Login Widget will be inserted here */}
      <div 
        id="telegram-login-widget"
        dangerouslySetInnerHTML={{
          __html: telegramLogin.createLoginButton({
            size: 'large',
            corner_radius: 8,
            request_access: 'write',
            lang: 'uz'
          })
        }}
      />

      <div style={{
        fontSize: '12px',
        color: '#9ca3af',
        textAlign: 'center',
        marginTop: '8px'
      }}>
        Yoki{' '}
        <button
          onClick={handleManualLogin}
          style={{
            background: 'none',
            border: 'none',
            color: '#3b82f6',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          bu yerga bosing
        </button>
        {' '}manual login uchun
      </div>
    </div>
  )
}

export default TelegramLogin