import { useState, useEffect } from 'react'
import { X, User, Phone, MapPin, CreditCard, Banknote, Smartphone, Calendar, CheckCircle, AlertCircle, Loader, Clock } from 'lucide-react'
import { useCart } from './context/CartContext'
import { OrderService } from '../../utils/orderService'
import paymentService, { paymentMethods, installmentPlans } from '../../utils/paymentService'

const CheckoutModal = ({ isOpen, onClose }) => {
  // Wrap useCart in try-catch to handle context errors
  let cartItems, getTotalPrice, clearCart
  try {
    const cart = useCart()
    cartItems = cart.cartItems
    getTotalPrice = cart.getTotalPrice
    clearCart = cart.clearCart
  } catch (error) {
    console.error('❌ CartContext xatosi:', error)
    // If cart context fails, close modal and show error
    if (isOpen) {
      alert('Savatcha ma\'lumotlarini yuklashda xatolik. Sahifani yangilang.')
      onClose()
    }
    return null
  }

  const [currentUser, setCurrentUser] = useState(null)

  // Debug: Check if cart is working
  useEffect(() => {
    console.log('🛒 CheckoutModal - Cart Items:', cartItems)
    console.log('💰 CheckoutModal - Total Price:', getTotalPrice())
  }, [cartItems, getTotalPrice])

  // Safety check: Close modal if cart is empty
  useEffect(() => {
    if (isOpen && (!cartItems || cartItems.length === 0)) {
      console.warn('⚠️ Savatcha bo\'sh, modal yopilmoqda')
      onClose()
    }
  }, [isOpen, cartItems, onClose])

  // Form states
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '+998 ',
    email: '',
    address: '',
    notes: ''
  })

  // Payment states
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash')
  const [selectedInstallmentPlan, setSelectedInstallmentPlan] = useState(null)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState(null)

  // UI states
  const [loading, setLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Info, 2: Payment, 3: Confirmation
  const [errors, setErrors] = useState({})

  // Get current user from localStorage
  useEffect(() => {
    const user = localStorage.getItem('alisher_mobile_customer')
    if (user) {
      try {
        const userData = JSON.parse(user)
        setCurrentUser(userData)
        setCustomerInfo({
          name: userData.name || '',
          phone: userData.phone || '+998 ',
          email: userData.email || '',
          address: userData.address || '',
          notes: ''
        })
      } catch (e) {
        setCurrentUser(null)
      }
    }
  }, [])

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1)
      setOrderSuccess(false)
      setPaymentResult(null)
      setErrors({})
      setSelectedPaymentMethod('cash')
      setSelectedInstallmentPlan(null)
    }
  }, [isOpen])

  // Phone number formatting
  const handlePhoneChange = (value) => {
    let cleanValue = value.replace(/[^\d]/g, '')
    
    if (cleanValue.startsWith('998')) {
      cleanValue = cleanValue.substring(3)
    }
    
    if (cleanValue.length > 9) {
      cleanValue = cleanValue.substring(0, 9)
    }
    
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
    
    setCustomerInfo(prev => ({ ...prev, phone: formatted }))
  }

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Ism kiritish majburiy'
    }

    if (!customerInfo.phone || customerInfo.phone.length < 17) {
      newErrors.phone = 'To\'g\'ri telefon raqam kiriting'
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = 'Manzil kiritish majburiy'
    }

    // Payment method validation
    if (selectedPaymentMethod === 'installment' && !selectedInstallmentPlan) {
      newErrors.installment = 'Muddatli to\'lov rejasini tanlang'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Calculate total with payment method fee
  const calculateTotal = () => {
    try {
      const baseTotal = getTotalPrice()
      if (typeof baseTotal !== 'number' || isNaN(baseTotal)) {
        console.error('❌ getTotalPrice() noto\'g\'ri qiymat qaytardi:', baseTotal)
        return 0
      }
      const total = paymentService.calculateTotalAmount(baseTotal, selectedPaymentMethod)
      return typeof total === 'number' && !isNaN(total) ? total : baseTotal
    } catch (error) {
      console.error('❌ calculateTotal xatolik:', error)
      return 0
    }
  }

  // Handle step navigation
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateForm()) {
        setCurrentStep(2)
      }
    } else if (currentStep === 2) {
      handlePayment()
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle payment processing
  const handlePayment = async () => {
    if (!validateForm()) return

    // Check if cart is empty
    if (!cartItems || cartItems.length === 0) {
      setPaymentResult({
        success: false,
        message: 'Savatcha bo\'sh. Iltimos, mahsulot qo\'shing.'
      })
      return
    }

    setPaymentProcessing(true)
    setPaymentResult(null)

    try {
      // Prepare order data
      const orderData = {
        customer: customerInfo,
        items: cartItems,
        totalAmount: calculateTotal(),
        deliveryInfo: {
          address: customerInfo.address,
          notes: customerInfo.notes
        },
        paymentMethod: selectedPaymentMethod,
        isNewCustomer: !currentUser
      }

      // Process payment
      let paymentResponse
      try {
        if (selectedPaymentMethod === 'installment') {
          paymentResponse = await paymentService.processPayment(orderData, selectedPaymentMethod, {
            installmentPlan: selectedInstallmentPlan
          })
        } else {
          paymentResponse = await paymentService.processPayment(orderData, selectedPaymentMethod)
        }
      } catch (paymentError) {
        console.error('Payment processing error:', paymentError)
        throw new Error('To\'lov jarayonida xatolik: ' + (paymentError.message || 'Noma\'lum xatolik'))
      }

      if (paymentResponse && paymentResponse.success) {
        // Create order
        let orderResponse
        try {
          orderResponse = await OrderService.createOrder({
            ...orderData,
            paymentId: paymentResponse.paymentId,
            paymentStatus: selectedPaymentMethod === 'cash' ? 'pending' : 'processing'
          })
        } catch (orderError) {
          console.error('Order creation error:', orderError)
          throw new Error('Buyurtmani yaratishda xatolik: ' + (orderError.message || 'Noma\'lum xatolik'))
        }

        if (orderResponse && orderResponse.success) {
          setPaymentResult({
            success: true,
            message: paymentResponse.message || 'Buyurtma muvaffaqiyatli qabul qilindi!',
            orderId: orderResponse.orderId,
            paymentId: paymentResponse.paymentId,
            redirectUrl: paymentResponse.redirectUrl
          })

          // Clear cart after successful order
          clearCart()
          setCurrentStep(3)
          setOrderSuccess(true)

          // Redirect to payment gateway if needed
          if (paymentResponse.redirectUrl && selectedPaymentMethod !== 'cash' && selectedPaymentMethod !== 'installment') {
            setTimeout(() => {
              window.open(paymentResponse.redirectUrl, '_blank')
            }, 2000)
          }
        } else {
          throw new Error(orderResponse?.error || 'Buyurtmani yaratishda xatolik yuz berdi')
        }
      } else {
        throw new Error(paymentResponse?.error || 'To\'lov jarayonida xatolik yuz berdi')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setPaymentResult({
        success: false,
        message: error.message || 'Buyurtmani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.'
      })
      // Don't move to step 3 on error, stay on step 2
    } finally {
      setPaymentProcessing(false)
    }
  }

  // Get payment method icon
  const getPaymentIcon = (methodId) => {
    switch (methodId) {
      case 'cash': return Banknote
      case 'click': case 'payme': return Smartphone
      case 'uzcard': case 'humo': return CreditCard
      case 'installment': return Calendar
      default: return CreditCard
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: '600px', 
          maxHeight: '90vh', 
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {currentStep === 1 && 'Buyurtma ma\'lumotlari'}
            {currentStep === 2 && 'To\'lov usuli'}
            {currentStep === 3 && 'Buyurtma tasdiqlandi'}
          </h2>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          {[1, 2, 3].map(step => (
            <div key={step} style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: currentStep >= step ? '#4f46e5' : '#e5e7eb',
                color: currentStep >= step ? 'white' : '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {step}
              </div>
              {step < 3 && (
                <div style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: currentStep > step ? '#4f46e5' : '#e5e7eb',
                  margin: '0 8px'
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Customer Information */}
        {currentStep === 1 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                Mijoz ma'lumotlari
              </h3>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                    <User size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    To'liq ism *
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ismingizni kiriting"
                    style={{ borderColor: errors.name ? '#ef4444' : undefined }}
                  />
                  {errors.name && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</div>}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                    <Phone size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Telefon raqam *
                  </label>
                  <input
                    type="tel"
                    className="input"
                    value={customerInfo.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    style={{ borderColor: errors.phone ? '#ef4444' : undefined }}
                  />
                  {errors.phone && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</div>}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="input"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                    <MapPin size={16} style={{ display: 'inline', marginRight: '6px' }} />
                    Yetkazib berish manzili *
                  </label>
                  <textarea
                    className="input"
                    rows="3"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="To'liq manzilni kiriting"
                    style={{ borderColor: errors.address ? '#ef4444' : undefined }}
                  />
                  {errors.address && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.address}</div>}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                    Qo'shimcha izoh
                  </label>
                  <textarea
                    className="input"
                    rows="2"
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Maxsus talablar yoki izohlar"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                Buyurtma xulosasi
              </h4>
              {cartItems && cartItems.length > 0 ? (
                <>
                  {cartItems.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{ fontSize: '14px' }}>
                        {item.name} × {item.quantity}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>
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
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>Jami:</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#4f46e5' }}>
                      {getTotalPrice().toLocaleString()} so'm
                    </span>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                  Savatcha bo'sh
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {currentStep === 2 && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
              To'lov usulini tanlang
            </h3>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
              {paymentMethods.filter(method => method.available).map(method => {
                const Icon = getPaymentIcon(method.id)
                const isSelected = selectedPaymentMethod === method.id
                const totalWithFee = paymentService.calculateTotalAmount(getTotalPrice(), method.id)
                const fee = totalWithFee - getTotalPrice()

                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    style={{
                      padding: '16px',
                      border: `2px solid ${isSelected ? method.color : '#e5e7eb'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? `${method.color}10` : 'white',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Icon size={24} color={method.color} />
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: '600' }}>
                            {method.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            {method.description}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={12} />
                            {method.processingTime}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {fee > 0 && (
                          <div style={{ fontSize: '12px', color: '#ef4444' }}>
                            +{fee.toLocaleString()} so'm
                          </div>
                        )}
                        <div style={{ fontSize: '14px', fontWeight: '600' }}>
                          {totalWithFee.toLocaleString()} so'm
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Installment Plans */}
            {selectedPaymentMethod === 'installment' && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                  Muddatli to'lov rejasini tanlang
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {installmentPlans
                    .filter(plan => getTotalPrice() >= plan.minAmount)
                    .map(plan => {
                      const totalWithInterest = getTotalPrice() * (1 + plan.interestRate / 100)
                      const monthlyPayment = Math.round(totalWithInterest / plan.months)
                      const isSelected = selectedInstallmentPlan?.id === plan.id

                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedInstallmentPlan(plan)}
                          style={{
                            padding: '12px',
                            border: `1px solid ${isSelected ? '#4f46e5' : '#e5e7eb'}`,
                            borderRadius: '6px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#f0f9ff' : 'white'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: '600' }}>
                                {plan.name} - {monthlyPayment.toLocaleString()} so'm/oy
                              </div>
                              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                {plan.description} {plan.interestRate > 0 && `(${plan.interestRate}% foiz)`}
                              </div>
                            </div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                              Jami: {totalWithInterest.toLocaleString()} so'm
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
                {errors.installment && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>
                    {errors.installment}
                  </div>
                )}
              </div>
            )}

            {/* Payment Summary */}
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Mahsulotlar:</span>
                <span>{(getTotalPrice() || 0).toLocaleString()} so'm</span>
              </div>
              {paymentService.calculateTotalAmount(getTotalPrice() || 0, selectedPaymentMethod) > (getTotalPrice() || 0) && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Komissiya:</span>
                  <span>+{(paymentService.calculateTotalAmount(getTotalPrice() || 0, selectedPaymentMethod) - (getTotalPrice() || 0)).toLocaleString()} so'm</span>
                </div>
              )}
              <div style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                <span>Jami to'lov:</span>
                <span style={{ color: '#4f46e5' }}>
                  {(calculateTotal() || 0).toLocaleString()} so'm
                </span>
              </div>
            </div>

            {/* Error Display */}
            {paymentResult && !paymentResult.success && (
              <div style={{
                backgroundColor: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'start',
                gap: '12px'
              }}>
                <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#991b1b', marginBottom: '4px' }}>
                    Xatolik yuz berdi
                  </div>
                  <div style={{ fontSize: '14px', color: '#7f1d1d' }}>
                    {paymentResult.message}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div style={{ textAlign: 'center' }}>
            {paymentResult?.success ? (
              <div>
                <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#10b981', marginBottom: '8px' }}>
                  Buyurtma muvaffaqiyatli qabul qilindi!
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                  {paymentResult.message}
                </p>
                <div style={{
                  backgroundColor: '#f0f9ff',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px'
                }}>
                  <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                    <strong>Buyurtma ID:</strong> {paymentResult.orderId}
                  </div>
                  {paymentResult.paymentId && (
                    <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                      <strong>To'lov ID:</strong> {paymentResult.paymentId}
                    </div>
                  )}
                  <div style={{ fontSize: '14px' }}>
                    <strong>Jami summa:</strong> {calculateTotal().toLocaleString()} so'm
                  </div>
                </div>
                {paymentResult.redirectUrl && selectedPaymentMethod !== 'cash' && selectedPaymentMethod !== 'installment' && (
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                    To'lov sahifasiga yo'naltirilmoqda...
                  </p>
                )}
              </div>
            ) : (
              <div>
                <AlertCircle size={64} color="#ef4444" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#ef4444', marginBottom: '8px' }}>
                  Xatolik yuz berdi
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                  {paymentResult?.message || 'Buyurtmani yuborishda xatolik yuz berdi'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'space-between',
          marginTop: '24px'
        }}>
          {currentStep === 1 && (
            <>
              <button onClick={onClose} className="btn btn-secondary">
                Bekor qilish
              </button>
              <button onClick={handleNextStep} className="btn btn-primary">
                Davom etish
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <button onClick={handlePrevStep} className="btn btn-secondary">
                Orqaga
              </button>
              <button 
                onClick={handleNextStep} 
                className="btn btn-primary"
                disabled={paymentProcessing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {paymentProcessing && <Loader size={16} className="animate-spin" />}
                {paymentProcessing ? 'Jarayon...' : 'To\'lovni amalga oshirish'}
              </button>
            </>
          )}

          {currentStep === 3 && (
            <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
              Yopish
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutModal