import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              border: '3px solid #fca5a5'
            }}>
              <AlertTriangle size={40} color="#dc2626" />
            </div>

            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 16px 0'
            }}>
              Xatolik yuz berdi
            </h1>

            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0 0 32px 0',
              lineHeight: '1.6'
            }}>
              Kechirasiz, kutilmagan xatolik yuz berdi. Sahifani yangilashga harakat qiling yoki bosh sahifaga qayting.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'left'
              }}>
                <summary style={{
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Xatolik tafsilotlari (Development)
                </summary>
                <pre style={{
                  fontSize: '12px',
                  color: '#dc2626',
                  overflow: 'auto',
                  margin: 0,
                  whiteSpace: 'pre-wrap'
                }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <RefreshCw size={16} />
                Sahifani yangilash
              </button>

              <button
                onClick={() => window.location.href = '/'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: 'white',
                  color: '#374151',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#667eea'
                  e.currentTarget.style.color = '#667eea'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.color = '#374151'
                }}
              >
                <Home size={16} />
                Bosh sahifa
              </button>
            </div>

            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #bae6fd'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#0369a1',
                margin: 0,
                fontWeight: '500'
              }}>
                Agar muammo davom etsa, bizga murojaat qiling:
                <br />
                📞 +998 90 123 45 67
                <br />
                📧 support@alisher-mobile.uz
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
