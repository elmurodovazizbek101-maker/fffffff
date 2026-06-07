import { useState } from 'react'
import { Plus, Search, Calendar, AlertTriangle, CheckCircle, Clock, Edit3, Trash2, CreditCard, TrendingUp } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const Debts = () => {
  const { t } = useLanguage()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('barchasi')
  const [notification, setNotification] = useState(null)
  
  // To'lov ma'lumotlari
  const [paymentData, setPaymentData] = useState({
    amount: '',
    percentage: '',
    paymentType: 'partial', // partial, full
    note: ''
  })
  const [debts, setDebts] = useState([
    {
      id: 1,
      customerName: 'Akmal Karimov',
      phone: '+998901234567',
      totalAmount: 5283600,
      paidAmount: 0,
      remainingAmount: 5283600,
      date: '2024-04-15',
      dueDate: '2024-05-15',
      description: 'iPhone 15 Pro Max',
      status: 'active',
      payments: [] // To'lovlar tarixi
    },
    {
      id: 2,
      customerName: 'Dilshod Toshev',
      phone: '+998907654321',
      totalAmount: 2500000,
      paidAmount: 1000000,
      remainingAmount: 1500000,
      date: '2024-04-20',
      dueDate: '2024-05-20',
      description: 'Samsung Galaxy S24',
      status: 'partial',
      payments: [
        { date: '2024-04-25', amount: 1000000, percentage: 40, note: 'Birinchi to\'lov' }
      ]
    },
    {
      id: 3,
      customerName: 'Nodira Saidova',
      phone: '+998909876543',
      totalAmount: 1200000,
      paidAmount: 1200000,
      remainingAmount: 0,
      date: '2024-04-25',
      dueDate: '2024-05-25',
      description: 'Xiaomi 14 Pro',
      status: 'paid',
      payments: [
        { date: '2024-05-01', amount: 1200000, percentage: 100, note: 'To\'liq to\'landi' }
      ]
    }
  ])

  const [newDebt, setNewDebt] = useState({
    customerName: '',
    phone: '',
    amount: '',
    dueDate: '',
    description: ''
  })

  const filters = [
    { key: 'barchasi', label: 'Barchasi', count: debts.length },
    { key: 'active', label: 'Faol', count: debts.filter(d => d.status === 'active').length },
    { key: 'partial', label: 'Qisman to\'langan', count: debts.filter(d => d.status === 'partial').length },
    { key: 'overdue', label: 'Muddati o\'tgan', count: debts.filter(d => d.status === 'overdue' || (d.status === 'active' && new Date(d.dueDate) < new Date())).length },
    { key: 'paid', label: 'To\'langan', count: debts.filter(d => d.status === 'paid').length }
  ]

  const filteredDebts = debts.filter(debt => {
    const matchesSearch = debt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         debt.phone.includes(searchQuery)
    const matchesFilter = selectedFilter === 'barchasi' || debt.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  // To'lov modalini ochish
  const openPaymentModal = (debt) => {
    setSelectedDebt(debt)
    setPaymentData({
      amount: '',
      percentage: '',
      paymentType: 'partial',
      note: ''
    })
    setShowPaymentModal(true)
  }

  // To'lov qilish
  const handlePayment = (e) => {
    e.preventDefault()
    
    if (!selectedDebt || !paymentData.amount) return

    const paymentAmount = parseFloat(paymentData.amount)
    const percentage = ((paymentAmount / selectedDebt.remainingAmount) * 100).toFixed(1)
    
    const payment = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      amount: paymentAmount,
      percentage: parseFloat(percentage),
      note: paymentData.note || `${percentage}% to'lov`
    }

    const newPaidAmount = selectedDebt.paidAmount + paymentAmount
    const newRemainingAmount = selectedDebt.totalAmount - newPaidAmount
    
    let newStatus = selectedDebt.status
    if (newRemainingAmount <= 0) {
      newStatus = 'paid'
    } else if (newPaidAmount > 0) {
      newStatus = 'partial'
    }

    // Qarzni yangilash
    setDebts(prevDebts => 
      prevDebts.map(debt => 
        debt.id === selectedDebt.id 
          ? {
              ...debt,
              paidAmount: newPaidAmount,
              remainingAmount: Math.max(0, newRemainingAmount),
              status: newStatus,
              payments: [...debt.payments, payment]
            }
          : debt
      )
    )

    // Notification ko'rsatish
    setNotification({
      type: 'success',
      title: `To'lov muvaffaqiyatli qabul qilindi!`,
      message: `${selectedDebt.customerName} uchun ${paymentAmount.toLocaleString()} so'm (${percentage}%) to'lov amalga oshirildi`,
      action: newStatus === 'paid' ? 'Qarz to\'liq yopildi!' : `Qoldiq: ${Math.max(0, newRemainingAmount).toLocaleString()} so'm`,
      percentage: parseFloat(percentage),
      paymentDate: new Date().toLocaleDateString('uz-UZ'),
      customerName: selectedDebt.customerName
    })

    // Modallarni yopish
    setShowPaymentModal(false)
    setSelectedDebt(null)

    // Notificationni 5 soniyadan keyin yashirish
    setTimeout(() => setNotification(null), 5000)
  }

  // Miqdor o'zgarganda foizni hisoblash
  const handleAmountChange = (value) => {
    const amount = parseFloat(value) || 0
    const percentage = selectedDebt ? ((amount / selectedDebt.remainingAmount) * 100).toFixed(1) : 0
    
    setPaymentData({
      ...paymentData,
      amount: value,
      percentage: isNaN(percentage) ? 0 : percentage
    })
  }

  // Foiz o'zgarganda miqdorni hisoblash
  const handlePercentageChange = (value) => {
    const percentage = parseFloat(value) || 0
    const amount = selectedDebt ? Math.round((percentage / 100) * selectedDebt.remainingAmount) : 0
    
    setPaymentData({
      ...paymentData,
      percentage: value,
      amount: amount.toString()
    })
  }
  const handleAddDebt = (e) => {
    e.preventDefault()
    const debt = {
      id: Date.now(),
      ...newDebt,
      totalAmount: parseFloat(newDebt.amount),
      paidAmount: 0,
      remainingAmount: parseFloat(newDebt.amount),
      date: new Date().toISOString().split('T')[0],
      status: 'active',
      payments: []
    }
    setDebts([...debts, debt])
    setNewDebt({
      customerName: '',
      phone: '',
      amount: '',
      dueDate: '',
      description: ''
    })
    setShowAddModal(false)
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { icon: Clock, color: '#f59e0b', text: 'Faol' }
      case 'partial':
        return { icon: TrendingUp, color: '#3b82f6', text: 'Qisman to\'langan' }
      case 'overdue':
        return { icon: AlertTriangle, color: '#ef4444', text: 'Muddati o\'tgan' }
      case 'paid':
        return { icon: CheckCircle, color: '#10b981', text: 'To\'langan' }
      default:
        return { icon: Clock, color: '#6b7280', text: 'Noma\'lum' }
    }
  }

  const getDaysRemaining = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const totalActiveDebt = debts
    .filter(d => d.status === 'active' || d.status === 'overdue' || d.status === 'partial')
    .reduce((sum, d) => sum + d.remainingAmount, 0)

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            {t('debts')}
          </h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            Mijozlar qarzlarini boshqarish
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={20} />
          Qarz qo'shish
        </button>
      </div>

      {/* Stats */}
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: notification.type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#ef4444',
          color: 'white',
          padding: '20px 28px',
          borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
          zIndex: 9999,
          minWidth: '380px',
          animation: 'slideInBounce 0.4s ease-out',
          border: '3px solid rgba(255, 255, 255, 0.3)'
        }}>
          {/* Notification header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '12px'
          }}>
            <CheckCircle size={24} />
            <div style={{ 
              fontSize: '18px', 
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>
              {notification.title || notification.message}
            </div>
          </div>

          {/* Payment details */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '12px 16px',
            borderRadius: '12px',
            marginBottom: '12px'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '8px',
              fontSize: '14px'
            }}>
              <div>
                <strong>Mijoz:</strong> {notification.customerName}
              </div>
              <div>
                <strong>Sana:</strong> {notification.paymentDate}
              </div>
              <div>
                <strong>Foiz:</strong> {notification.percentage}%
              </div>
              <div>
                <strong>To'lov:</strong> {parseFloat(notification.message.match(/[\d,]+/)?.[0]?.replace(/,/g, '') || 0).toLocaleString()} so'm
              </div>
            </div>
          </div>

          {/* Action message */}
          {notification.action && (
            <div style={{ 
              fontSize: '16px', 
              opacity: 0.95,
              fontWeight: '600',
              textAlign: 'center',
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px'
            }}>
              ✅ {notification.action}
            </div>
          )}
        </div>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ef4444',
            marginBottom: '4px'
          }}>
            {totalActiveDebt.toLocaleString()} so'm
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Jami faol qarzlar
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#f59e0b',
            marginBottom: '4px'
          }}>
            {debts.filter(d => d.status === 'active').length}
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Faol mijozlar
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ef4444',
            marginBottom: '4px'
          }}>
            {debts.filter(d => d.status === 'overdue').length}
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Muddati o'tgan
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#10b981',
            marginBottom: '4px'
          }}>
            {debts.filter(d => d.status === 'paid').length}
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            To'langan
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8'
            }} />
            <input
              type="text"
              placeholder="Mijoz nomi yoki telefon raqam..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: '40px',
                paddingRight: '12px',
                paddingTop: '8px',
                paddingBottom: '8px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                width: '100%'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: selectedFilter === filter.key ? '#1f2937' : '#f3f4f6',
                  color: selectedFilter === filter.key ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Debts Grid - 5 ustun */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px'
      }}>
        {filteredDebts.map(debt => {
          const status = getStatusInfo(debt.status)
          const StatusIcon = status.icon
          const daysRemaining = getDaysRemaining(debt.dueDate)

          return (
            <div key={debt.id} className="card">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#4f46e5',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {debt.customerName.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      margin: 0,
                      color: '#1f2937'
                    }}>
                      {debt.customerName}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {debt.phone}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: status.color
                }}>
                  <StatusIcon size={16} />
                  <span style={{ fontSize: '12px', fontWeight: '500' }}>
                    {status.text}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#ef4444',
                  marginBottom: '4px'
                }}>
                  {debt.remainingAmount.toLocaleString()} so'm
                </div>
                {debt.status === 'partial' && (
                  <div style={{
                    fontSize: '14px',
                    color: '#3b82f6',
                    marginBottom: '4px'
                  }}>
                    To'langan: {debt.paidAmount.toLocaleString()} so'm ({((debt.paidAmount / debt.totalAmount) * 100).toFixed(1)}%)
                  </div>
                )}
                
                {/* Payment history display */}
                {debt.payments && debt.payments.length > 0 && (
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '8px',
                    marginTop: '8px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#475569',
                      marginBottom: '6px'
                    }}>
                      To'lov tarixi ({debt.payments.length} ta):
                    </div>
                    <div style={{ maxHeight: '80px', overflowY: 'auto' }}>
                      {debt.payments.slice(-2).map((payment, index) => (
                        <div key={index} style={{
                          fontSize: '11px',
                          color: '#64748b',
                          marginBottom: '2px',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span>{new Date(payment.date).toLocaleDateString('uz-UZ')}</span>
                          <span style={{ fontWeight: '600' }}>
                            {payment.amount.toLocaleString()} so'm ({payment.percentage}%)
                          </span>
                        </div>
                      ))}
                      {debt.payments.length > 2 && (
                        <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center' }}>
                          +{debt.payments.length - 2} ta yana
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: '8px 0 0 0'
                }}>
                  {debt.description}
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                color: '#6b7280',
                marginBottom: '16px'
              }}>
                <div>
                  <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Berilgan: {new Date(debt.date).toLocaleDateString('uz-UZ')}
                </div>
                <div>
                  Muddat: {new Date(debt.dueDate).toLocaleDateString('uz-UZ')}
                  {debt.status === 'active' && (
                    <span style={{
                      marginLeft: '8px',
                      color: daysRemaining < 0 ? '#ef4444' : daysRemaining <= 7 ? '#f59e0b' : '#10b981'
                    }}>
                      ({daysRemaining < 0 ? `${Math.abs(daysRemaining)} kun kechikdi` :
                        daysRemaining === 0 ? 'Bugun' :
                        `${daysRemaining} kun qoldi`})
                    </span>
                  )}
                </div>
              </div>

              {/* Always show payment buttons for active/partial debts */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '8px',
                marginTop: '12px'
              }}>
                <button
                  className="btn btn-success"
                  style={{
                    fontSize: '14px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    width: '100%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                  onClick={() => {
                    console.log('Payment button clicked for debt:', debt.id)
                    openPaymentModal(debt)
                  }}
                >
                  <CreditCard size={16} />
                  To'lov qilish ({debt.remainingAmount.toLocaleString()} so'm)
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedDebt && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Qarz to'lash - {selectedDebt.customerName}
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="btn btn-ghost"
                style={{ width: '40px', height: '40px', padding: '8px' }}
              >
                ×
              </button>
            </div>

            {/* Qarz haqida ma'lumot */}
            <div style={{
              background: '#f9fafb',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#1f2937', fontSize: '16px' }}>
                Qarz ma'lumotlari
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6b7280' }}>
                    Jami qarz miqdori:
                  </p>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                    {selectedDebt.totalAmount.toLocaleString()} so'm
                  </div>
                </div>
                <div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6b7280' }}>
                    Qolgan miqdor:
                  </p>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#ef4444' }}>
                    {selectedDebt.remainingAmount.toLocaleString()} so'm
                  </div>
                </div>
                {selectedDebt.paidAmount > 0 && (
                  <>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6b7280' }}>
                        To'langan miqdor:
                      </p>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: '#10b981' }}>
                        {selectedDebt.paidAmount.toLocaleString()} so'm
                      </div>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6b7280' }}>
                        To'langan foiz:
                      </p>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: '#3b82f6' }}>
                        {((selectedDebt.paidAmount / selectedDebt.totalAmount) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Muddat ma'lumotlari */}
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    Berilgan sana: {new Date(selectedDebt.date).toLocaleDateString('uz-UZ')}
                  </span>
                  <span style={{ fontSize: '14px', color: getDaysRemaining(selectedDebt.dueDate) < 0 ? '#ef4444' : '#6b7280' }}>
                    To'lash muddati: {new Date(selectedDebt.dueDate).toLocaleDateString('uz-UZ')}
                    {getDaysRemaining(selectedDebt.dueDate) < 0 && (
                      <span style={{ color: '#ef4444', fontWeight: '600', marginLeft: '8px' }}>
                        ({Math.abs(getDaysRemaining(selectedDebt.dueDate))} kun kechikdi)
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Simplified payment form */}
            <form onSubmit={handlePayment}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  To'lov miqdorini kiriting:
                </label>
                <input
                  type="number"
                  className="input"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                  placeholder="Miqdorni kiriting (so'm)"
                  min="1"
                  max={selectedDebt.remainingAmount}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '12px',
                    background: 'white'
                  }}
                />
                <div style={{
                  marginTop: '8px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  Maksimal: {selectedDebt.remainingAmount.toLocaleString()} so'm
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  Izoh (ixtiyoriy):
                </label>
                <textarea
                  className="input"
                  rows="3"
                  value={paymentData.note}
                  onChange={(e) => setPaymentData({...paymentData, note: e.target.value})}
                  placeholder="To'lov haqida qo'shimcha ma'lumot..."
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '12px',
                    background: 'white',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Payment summary */}
              {paymentData.amount && (
                <div style={{
                  background: '#f0fdf4',
                  border: '2px solid #d1fae5',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px'
                }}>
                  <h5 style={{
                    margin: '0 0 12px 0',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#065f46'
                  }}>
                    To'lov ma'lumotlari:
                  </h5>
                  <div style={{ fontSize: '15px', color: '#374151', lineHeight: '1.6' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>To'lanadi:</strong> {parseFloat(paymentData.amount || 0).toLocaleString()} so'm
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>Qoldiq:</strong> {(selectedDebt.remainingAmount - parseFloat(paymentData.amount || 0)).toLocaleString()} so'm
                    </div>
                    <div>
                      <strong>Holat:</strong> {(selectedDebt.remainingAmount - parseFloat(paymentData.amount || 0)) <= 0 ? 'To\'liq to\'landi' : 'Qisman to\'landi'}
                    </div>
                  </div>
                </div>
              )}

              {/* Form buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '16px', 
                justifyContent: 'flex-end',
                paddingTop: '20px',
                borderTop: '2px solid #e5e7eb'
              }}>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="btn btn-secondary"
                  style={{ 
                    minWidth: '120px',
                    padding: '14px 20px',
                    fontSize: '16px'
                  }}
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={!paymentData.amount || parseFloat(paymentData.amount) <= 0}
                  style={{ 
                    minWidth: '160px',
                    padding: '14px 20px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <CreditCard size={18} />
                  To'lovni tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Debt Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Yangi qarz qo'shish
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddDebt}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Mijoz nomi
                </label>
                <input
                  type="text"
                  className="input"
                  value={newDebt.customerName}
                  onChange={(e) => setNewDebt({...newDebt, customerName: e.target.value})}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Telefon raqam
                </label>
                <input
                  type="tel"
                  className="input"
                  value={newDebt.phone}
                  onChange={(e) => setNewDebt({...newDebt, phone: e.target.value})}
                  placeholder="+998 90 123 45 67"
                  required
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Qarz miqdori (so'm)
                  </label>
                  <input
                    type="number"
                    className="input"
                    value={newDebt.amount}
                    onChange={(e) => setNewDebt({...newDebt, amount: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    To'lash muddati
                  </label>
                  <input
                    type="date"
                    className="input"
                    value={newDebt.dueDate}
                    onChange={(e) => setNewDebt({...newDebt, dueDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Izoh (ixtiyoriy)
                </label>
                <textarea
                  className="input"
                  rows="3"
                  value={newDebt.description}
                  onChange={(e) => setNewDebt({...newDebt, description: e.target.value})}
                  placeholder="Qarz haqida qo'shimcha ma'lumot..."
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Debts
