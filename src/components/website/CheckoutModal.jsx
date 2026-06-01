import { useState, useEffect } from 'react'
import { X, User, Phone, MapPin, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { useCart } from './context/CartContext'

const CheckoutModal = ({ isOpen, onClose }) => {
  // Get cart data safely
  const cart = useCart()
  const cartItems = cart?.cartItems || []
  const getTotalPrice = cart?.getTotalPrice || (() => 0)
  const clearCart = cart?.clearCart || (() => {})

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    address: '',
    notes: ''
  })

  // UI state
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', phone: '+998 ', address: '', notes: '' })
      setSuccess(false)
      setError('')
    }
  }, [isOpen])

  // Handle phone input
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name.trim()) {
      setError('Iltimos, ismingizni kiriting')
      return
    }
    if (formData.phone.length < 17) {
      setError('Iltimos, to\'g\'ri telefon raqam kiriting')
      return
    }
    if (!formData.address.trim()) {
      setError('Iltimos, manzilni kiriting')
      return
    }
    if (cartItems.length === 0) {
      setError('Savatcha bo\'sh')
      return
    }

    setLoading(true)

    try {
      // Create order
      const order = {
        id: `ORD${Date.now()}`,
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address
        },
        items: cartItems,
        total: getTotalPrice(),
        notes: formData.notes,
        date: new Date().toISOString(),
        status: 'pending'
      }

      // Save to localStorage
      const orders = JSON.parse(localStorage.getItem('alisher_mobile_orders') || '[]')
      orders.push(order)
      localStorage.setItem('alisher_mobile_orders', JSON.stringify(orders))

      // Clear cart
      clearCart()

      // Show success
      setSuccess(true)

      // Close after 2 seconds
      setTimeout(() => {
        onClose()
      }, 2000)

    } catch (err) {
      console.error('Order error:', err)
      setError('Buyurtmani yuborishda xatolik. Qayta urinib ko\'ring.')
    } finally {
      setLoading(false)
    }
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
          maxWidth: '500px',
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
            Buyurtma berish
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
          {success ? (
            // Success message
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#10b981', marginBottom: '8px' }}>
                Buyurtma qabul qilindi!
              </h3>
              <p style={{ color: '#6b7280', margin: 0 }}>
                Tez orada siz bilan bog'lanamiz
              </p>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit}>
              {/* Order Summary */}
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Buyurtma ({cartItems.length} ta mahsulot)
                </h4>
                {cartItems.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    marginBottom: '6px'
                  }}>
                    <span>{item.name} × {item.quantity}</span>
                    <span style={{ fontWeight: '500' }}>
                      {((item.price || 0) * (item.quantity || 0)).toLocaleString()} so'm
                    </span>
                  </div>
                ))}
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '8px',
                  marginTop: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: '600'
                }}>
                  <span>Jami:</span>
                  <span style={{ color: '#10b981' }}>
                    {getTotalPrice().toLocaleString()} so'm
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Name */}
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    <User size={16} />
                    To'liq ism *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ismingizni kiriting"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    <Phone size={16} />
                    Telefon raqam *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    required
                  />
                </div>

                {/* Address */}
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
                    Yetkazib berish manzili *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="To'liq manzilni kiriting"
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Qo'shimcha izoh
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Maxsus talablar (ixtiyoriy)"
                    rows="2"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertCircle size={18} color="#ef4444" />
                  <span style={{ fontSize: '14px', color: '#991b1b' }}>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  marginTop: '20px',
                  padding: '12px',
                  backgroundColor: loading ? '#9ca3af' : '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {loading && <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />}
                {loading ? 'Yuborilmoqda...' : 'Buyurtma berish'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default CheckoutModal
