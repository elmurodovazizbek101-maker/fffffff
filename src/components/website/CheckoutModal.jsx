import { useState, useEffect } from 'react'
import { X, User, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { useCart } from './context/CartContext'
import { telegramBot } from '../../utils/telegram'
import { ErrorHandler, Validators, AppError, ErrorTypes } from '../../utils/errorHandler'
import LoadingOverlay from '../LoadingOverlay'

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

  // Validation errors
  const [errors, setErrors] = useState({})

  // UI state
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', phone: '+998 ', address: '', notes: '' })
      setErrors({})
      setSuccess(false)
      setError('')
    }
  }, [isOpen])

  // Handle phone input with validation
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
    
    // Clear phone error when typing
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    try {
      // Name validation
      Validators.required(formData.name, 'Ism')
      Validators.minLength(formData.name, 2, 'Ism')
      Validators.maxLength(formData.name, 50, 'Ism')
    } catch (err) {
      newErrors.name = err.message
    }

    try {
      // Phone validation
      Validators.required(formData.phone, 'Telefon raqam')
      Validators.phone(formData.phone)
    } catch (err) {
      newErrors.phone = err.message
    }

    try {
      // Address validation
      Validators.required(formData.address, 'Manzil')
      Validators.minLength(formData.address, 10, 'Manzil')
      Validators.maxLength(formData.address, 200, 'Manzil')
    } catch (err) {
      newErrors.address = err.message
    }

    // Cart validation
    if (cartItems.length === 0) {
      throw new AppError('Savatcha bo\'sh', ErrorTypes.VALIDATION)
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submit with error handling
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      // Validate form
      if (!validateForm()) {
        throw new AppError('Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring', ErrorTypes.VALIDATION)
      }

      setLoading(true)

      // Create order
      const order = {
        id: `ORD${Date.now()}`,
        customer: {
          name: formData.name.trim(),
          phone: formData.phone,
          address: formData.address.trim()
        },
        items: cartItems,
        total: getTotalPrice(),
        notes: formData.notes.trim(),
        date: new Date().toISOString(),
        status: 'pending'
      }

      // Save to localStorage with error handling
      try {
        const orders = JSON.parse(localStorage.getItem('alisher_mobile_orders') || '[]')
        orders.push(order)
        localStorage.setItem('alisher_mobile_orders', JSON.stringify(orders))
      } catch (storageError) {
        console.error('localStorage error:', storageError)
        throw new AppError('Buyurtmani saqlashda xatolik', ErrorTypes.SERVER)
      }

      // Send Telegram notification (non-blocking)
      try {
        const telegramData = {
          orderId: order.id,
          customer: {
            name: order.customer.name,
            phone: order.customer.phone,
            address: order.customer.address
          },
          items: order.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total: order.total,
          notes: order.notes,
          date: order.date
        }

        await telegramBot.sendOrderNotification(telegramData)
      } catch (telegramError) {
        // Telegram error is non-critical, just log it
        console.warn('Telegram notification failed:', telegramError)
      }

      // Success
      setSuccess(true)
      clearCart()

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
      }, 2000)

    } catch (err) {
      const handled = ErrorHandler.handle(err, 'CheckoutModal.handleSubmit')
      setError(handled.message)
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
                    <p style={{
                      margin: '4px 0 0 0',
                      fontSize: '12px',
                      color: '#ef4444'
                    }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
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
                    onChange={(e) => handlePhoneChange(e.target.value)}
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
                    <p style={{
                      margin: '4px 0 0 0',
                      fontSize: '12px',
                      color: '#ef4444'
                    }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: errors.address ? '#ef4444' : '#1f2937'
                  }}>
                    <MapPin size={16} />
                    Yetkazib berish manzili *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, address: e.target.value }))
                      if (errors.address) setErrors(prev => ({ ...prev, address: '' }))
                    }}
                    placeholder="To'liq manzilni kiriting"
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${errors.address ? '#ef4444' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      resize: 'vertical',
                      outline: 'none'
                    }}
                    required
                  />
                  {errors.address && (
                    <p style={{
                      margin: '4px 0 0 0',
                      fontSize: '12px',
                      color: '#ef4444'
                    }}>
                      {errors.address}
                    </p>
                  )}
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
                      resize: 'vertical',
                      outline: 'none'
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
                {loading ? 'Yuborilmoqda...' : 'Buyurtma berish'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      <LoadingOverlay 
        isLoading={loading} 
        message="Buyurtma yuklanmoqda..." 
        fullScreen={false}
        transparent={true}
      />
    </div>
  )
}

export default CheckoutModal
