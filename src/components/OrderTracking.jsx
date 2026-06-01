import { useState, useEffect } from 'react'
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, User, Calendar, CreditCard } from 'lucide-react'

const OrderTracking = ({ orderId, darkMode = false }) => {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [trackingHistory, setTrackingHistory] = useState([])

  // Demo buyurtma ma'lumotlari
  const demoOrder = {
    id: orderId || 'ORD-2024-001',
    status: 'processing',
    createdAt: '2024-01-15T10:30:00Z',
    estimatedDelivery: '2024-01-17T18:00:00Z',
    customer: {
      name: 'Aziz Karimov',
      phone: '+998 90 123 45 67',
      address: 'Toshkent shahar, Yunusobod tumani, 15-uy, 25-xonadon'
    },
    items: [
      {
        id: 1,
        name: 'iPhone 15 Pro Max',
        quantity: 1,
        price: 18500000,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&h=100&fit=crop'
      }
    ],
    totalAmount: 18500000,
    paymentMethod: 'click',
    paymentStatus: 'paid',
    deliveryFee: 0,
    trackingNumber: 'TRK123456789'
  }

  // Buyurtma holatlari
  const orderStatuses = {
    pending: {
      label: 'Kutilmoqda',
      color: '#f59e0b',
      icon: Clock,
      description: 'Buyurtma qabul qilinmoqda'
    },
    confirmed: {
      label: 'Tasdiqlandi',
      color: '#3b82f6',
      icon: CheckCircle,
      description: 'Buyurtma tasdiqlandi'
    },
    processing: {
      label: 'Tayyorlanmoqda',
      color: '#8b5cf6',
      icon: Package,
      description: 'Buyurtma tayyorlanmoqda'
    },
    shipped: {
      label: 'Yuborildi',
      color: '#06b6d4',
      icon: Truck,
      description: 'Buyurtma yo\'lda'
    },
    delivered: {
      label: 'Yetkazildi',
      color: '#10b981',
      icon: CheckCircle,
      description: 'Buyurtma yetkazildi'
    },
    cancelled: {
      label: 'Bekor qilindi',
      color: '#ef4444',
      icon: Clock,
      description: 'Buyurtma bekor qilindi'
    }
  }

  // Kuzatuv tarixi
  const demoTrackingHistory = [
    {
      id: 1,
      status: 'pending',
      timestamp: '2024-01-15T10:30:00Z',
      title: 'Buyurtma qabul qilindi',
      description: 'Sizning buyurtmangiz muvaffaqiyatli qabul qilindi',
      location: 'Alisher Mobile'
    },
    {
      id: 2,
      status: 'confirmed',
      timestamp: '2024-01-15T11:15:00Z',
      title: 'Buyurtma tasdiqlandi',
      description: 'To\'lov tasdiqlandi va buyurtma ishlov berishga yuborildi',
      location: 'Alisher Mobile'
    },
    {
      id: 3,
      status: 'processing',
      timestamp: '2024-01-15T14:20:00Z',
      title: 'Buyurtma tayyorlanmoqda',
      description: 'Mahsulot ombordan olinmoqda va qadoqlanmoqda',
      location: 'Ombor'
    }
  ]

  useEffect(() => {
    // Demo ma'lumotlarni yuklash
    setTimeout(() => {
      setOrder(demoOrder)
      setTrackingHistory(demoTrackingHistory)
      setLoading(false)
    }, 1000)
  }, [orderId])

  // Vaqtni formatlash
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Narxni formatlash
  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m'
  }

  // Holat indeksini olish
  const getStatusIndex = (status) => {
    const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']
    return statuses.indexOf(status)
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        background: darkMode ? '#374151' : 'white',
        borderRadius: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #4f46e5',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    )
  }

  if (!order) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        background: darkMode ? '#374151' : 'white',
        borderRadius: '12px',
        border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
      }}>
        <Package size={48} color={darkMode ? '#9ca3af' : '#6b7280'} style={{ margin: '0 auto 16px' }} />
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '8px'
        }}>
          Buyurtma topilmadi
        </h3>
        <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
          Buyurtma raqamini tekshiring yoki qo'llab-quvvatlash xizmatiga murojaat qiling
        </p>
      </div>
    )
  }

  const currentStatus = orderStatuses[order.status]
  const currentStatusIndex = getStatusIndex(order.status)

  return (
    <div style={{
      background: darkMode ? '#374151' : 'white',
      borderRadius: '12px',
      padding: '24px',
      border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
    }}>
      {/* Buyurtma sarlavhasi */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
      }}>
        <div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '4px'
          }}>
            Buyurtma #{order.id}
          </h2>
          <p style={{
            fontSize: '14px',
            color: darkMode ? '#9ca3af' : '#6b7280'
          }}>
            {formatDate(order.createdAt)} da berilgan
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: `${currentStatus.color}20`,
          borderRadius: '20px',
          border: `1px solid ${currentStatus.color}`
        }}>
          <currentStatus.icon size={16} color={currentStatus.color} />
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: currentStatus.color
          }}>
            {currentStatus.label}
          </span>
        </div>
      </div>

      {/* Holat indikatori */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          {Object.entries(orderStatuses).slice(0, 5).map(([status, config], index) => {
            const isActive = index <= currentStatusIndex
            const isCurrent = index === currentStatusIndex
            const Icon = config.icon

            return (
              <div key={status} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: isActive ? config.color : darkMode ? '#4b5563' : '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  border: isCurrent ? `3px solid ${config.color}40` : 'none',
                  transition: 'all 0.3s'
                }}>
                  <Icon size={20} color={isActive ? 'white' : darkMode ? '#9ca3af' : '#6b7280'} />
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: isCurrent ? '600' : '400',
                  color: isActive ? (darkMode ? 'white' : '#1f2937') : (darkMode ? '#9ca3af' : '#6b7280'),
                  textAlign: 'center'
                }}>
                  {config.label}
                </span>
                {index < 4 && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    width: '100%',
                    height: '2px',
                    background: index < currentStatusIndex ? config.color : darkMode ? '#4b5563' : '#e5e7eb',
                    zIndex: -1
                  }} />
                )}
              </div>
            )
          })}
        </div>
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: darkMode ? '#d1d5db' : '#374151'
        }}>
          {currentStatus.description}
        </div>
      </div>

      {/* Yetkazib berish ma'lumotlari */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* Mijoz ma'lumotlari */}
        <div style={{
          background: darkMode ? '#4b5563' : '#f9fafb',
          padding: '16px',
          borderRadius: '8px'
        }}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <User size={16} />
            Mijoz ma'lumotlari
          </h4>
          <div style={{ fontSize: '14px', color: darkMode ? '#d1d5db' : '#374151' }}>
            <div style={{ marginBottom: '4px' }}>{order.customer.name}</div>
            <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={12} />
              {order.customer.phone}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
              <MapPin size={12} style={{ marginTop: '2px' }} />
              <span>{order.customer.address}</span>
            </div>
          </div>
        </div>

        {/* Yetkazib berish ma'lumotlari */}
        <div style={{
          background: darkMode ? '#4b5563' : '#f9fafb',
          padding: '16px',
          borderRadius: '8px'
        }}>
          <h4 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Truck size={16} />
            Yetkazib berish
          </h4>
          <div style={{ fontSize: '14px', color: darkMode ? '#d1d5db' : '#374151' }}>
            <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} />
              Kutilayotgan vaqt: {formatDate(order.estimatedDelivery)}
            </div>
            <div style={{ marginBottom: '4px' }}>
              Kuzatuv raqami: {order.trackingNumber}
            </div>
            <div>
              Yetkazib berish: Bepul
            </div>
          </div>
        </div>
      </div>

      {/* Buyurtma mahsulotlari */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '12px'
        }}>
          Buyurtma tarkibi
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {order.items.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: darkMode ? '#4b5563' : '#f9fafb',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: darkMode ? '#6b7280' : '#e5e7eb',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Package size={24} color={darkMode ? '#9ca3af' : '#6b7280'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  marginBottom: '4px'
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}>
                  Miqdor: {item.quantity}
                </div>
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937'
              }}>
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* To'lov ma'lumotlari */}
      <div style={{
        background: darkMode ? '#4b5563' : '#f9fafb',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <CreditCard size={16} />
          To'lov ma'lumotlari
        </h4>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          color: darkMode ? '#d1d5db' : '#374151'
        }}>
          <div>
            <div>To'lov usuli: {order.paymentMethod.toUpperCase()}</div>
            <div>Holat: {order.paymentStatus === 'paid' ? 'To\'langan' : 'Kutilmoqda'}</div>
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: '700',
            color: darkMode ? 'white' : '#1f2937'
          }}>
            {formatPrice(order.totalAmount)}
          </div>
        </div>
      </div>

      {/* Kuzatuv tarixi */}
      <div>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '16px'
        }}>
          Kuzatuv tarixi
        </h4>
        <div style={{ position: 'relative' }}>
          {trackingHistory.map((event, index) => {
            const status = orderStatuses[event.status]
            const Icon = status.icon

            return (
              <div key={event.id} style={{
                display: 'flex',
                gap: '12px',
                marginBottom: index < trackingHistory.length - 1 ? '20px' : '0'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: status.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={16} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937',
                    marginBottom: '4px'
                  }}>
                    {event.title}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    marginBottom: '2px'
                  }}>
                    {event.description}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    {formatDate(event.timestamp)} • {event.location}
                  </div>
                </div>
              </div>
            )
          })}
          {/* Vertikal chiziq */}
          <div style={{
            position: 'absolute',
            left: '15px',
            top: '32px',
            bottom: '32px',
            width: '2px',
            background: darkMode ? '#4b5563' : '#e5e7eb'
          }} />
        </div>
      </div>
    </div>
  )
}

export default OrderTracking