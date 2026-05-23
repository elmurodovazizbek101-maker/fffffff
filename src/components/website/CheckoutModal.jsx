import { useState, useEffect } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { useCart } from './context/CartContext'
import { OrderService } from '../../utils/orderService'

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const [currentUser, setCurrentUser] = useState(null)

  const [loading, setLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Get current user from localStorage
  useEffect(() => {
    const user = localStorage.getItem('alisher_mobile_customer')
    if (user) {
      try {
        setCurrentUser(JSON.parse(user))
      } catch (e) {
        setCurrentUser(null)
      }
    }
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Toshkent',
    notes: '',
    paymentMethod: 'cash'
  })

  // Update form data when user is loaded
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        email: currentUser.email || ''
      }))
    }
  }, [currentUser])

  if (!isOpen) return null

  const totalAmount = getTotalPrice()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const isNewCustomer = !currentUser

      if (isNewCustomer) {
        await OrderService.registerCustomer({
          name: formData.name,
          phone: formData.phone,
          email: formData.email
        })
      }

      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          id: currentUser?.id || `TEMP_${Date.now()}`
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price || 0,
          quantity: item.quantity,
          brand: item.brand || 'Unknown'
        })),
        totalAmount,
        deliveryInfo: {
          address: formData.address,
          city: formData.city,
          notes: formData.notes
        },
        paymentMethod: formData.paymentMethod,
        isNewCustomer
      }

      const result = await OrderService.createOrder(orderData)

      if (result.success) {
        setOrderSuccess(true)
        clearCart()

        setTimeout(() => {
          onClose()
          setOrderSuccess(false)
          setFormData({
            name: '',
            phone: '',
            email: '',
            address: '',
            city: 'Toshkent',
            notes: '',
            paymentMethod: 'cash'
          })
        }, 3000)
      } else {
        alert('Xatolik yuz berdi: ' + result.error)
      }
    } catch (error) {
      console.error('Order error:', error)
      alert('Buyurtmani yuborishda xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
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
        borderRadius: '12px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0
            }}>
              {orderSuccess ? 'Buyurtma tasdiqlandi' : 'Buyurtma berish'}
            </h2>
            <button
              onClick={onClose}
              disabled={loading}
              style={{
                background: 'none',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                padding: '4px',
                color: '#6b7280'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {orderSuccess ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 16px' }} />
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#10b981',
                marginBottom: '8px'
              }}>
                Buyurtma muvaffaqiyatli yuborildi!
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '16px'
              }}>
                Tez orada siz bilan bog'lanamiz
              </p>
              <p style={{
                fontSize: '12px',
                color: '#9ca3af'
              }}>
                Bu oyna 3 soniyadan keyin yopiladi...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Order Summary */}
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '8px'
              }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#374151'
                }}>
                  Buyurtma tafsilotlari:
                </h4>
                {cartItems.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    marginBottom: '6px',
                    color: '#6b7280'
                  }}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>{((item.price || 0) * item.quantity).toLocaleString()} so'm</span>
                  </div>
                ))}
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '8px',
                  marginTop: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#1f2937'
                }}>
                  <span>Jami:</span>
                  <span style={{ color: '#10b981' }}>{totalAmount.toLocaleString()} so'm</span>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '6px',
                  color: '#374151'
                }}>
                  Ism familiya *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Ismingizni kiriting"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '6px',
                  color: '#374151'
                }}>
                  Telefon *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '6px',
                  color: '#374151'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '6px',
                  color: '#374151'
                }}>
                  Manzil *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                  rows="2"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                  placeholder="To'liq manzilni kiriting"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '6px',
                  color: '#374151'
                }}>
                  Shahar *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Toshkent">Toshkent</option>
                  <option value="Samarqand">Samarqand</option>
                  <option value="Buxoro">Buxoro</option>
                  <option value="Andijon">Andijon</option>
                  <option value="Namangan">Namangan</option>
                  <option value="Farg'ona">Farg'ona</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '6px',
                  color: '#374151'
                }}>
                  To'lov usuli *
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="cash">Naqd pul</option>
                  <option value="card">Bank kartasi</option>
                  <option value="click">Click</option>
                  <option value="payme">Payme</option>
                  <option value="installment">Muddatli to'lov</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '6px',
                  color: '#374151'
                }}>
                  Qo'shimcha izoh
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows="2"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                  placeholder="Qo'shimcha ma'lumotlar"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  backgroundColor: loading ? '#9ca3af' : '#10b981',
                  color: 'white',
                  padding: '14px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: '8px'
                }}
              >
                {loading ? 'Yuborilmoqda...' : 'Buyurtma berish'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutModal
