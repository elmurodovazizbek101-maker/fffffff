import { useState } from 'react'
import { Plus, Search, Calendar, User, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const Debts = () => {
  const { t } = useLanguage()
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('barchasi')
  const [debts, setDebts] = useState([
    {
      id: 1,
      customerName: 'Akmal Karimov',
      phone: '+998901234567',
      amount: 5283600,
      date: '2024-04-15',
      dueDate: '2024-05-15',
      description: 'iPhone 15 Pro Max',
      status: 'active'
    },
    {
      id: 2,
      customerName: 'Dilshod Toshev',
      phone: '+998907654321',
      amount: 250000,
      date: '2024-04-20',
      dueDate: '2024-05-20',
      description: 'Samsung aksessuarlar',
      status: 'overdue'
    },
    {
      id: 3,
      customerName: 'Nodira Saidova',
      phone: '+998909876543',
      amount: 1200000,
      date: '2024-04-25',
      dueDate: '2024-05-25',
      description: 'Xiaomi 14 Pro',
      status: 'paid'
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
    { key: 'overdue', label: 'Muddati o\'tgan', count: debts.filter(d => d.status === 'overdue').length },
    { key: 'paid', label: 'To\'langan', count: debts.filter(d => d.status === 'paid').length }
  ]

  const filteredDebts = debts.filter(debt => {
    const matchesSearch = debt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         debt.phone.includes(searchQuery)
    const matchesFilter = selectedFilter === 'barchasi' || debt.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const handleAddDebt = (e) => {
    e.preventDefault()
    const debt = {
      id: Date.now(),
      ...newDebt,
      amount: parseFloat(newDebt.amount),
      date: new Date().toISOString().split('T')[0],
      status: 'active'
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
    .filter(d => d.status === 'active' || d.status === 'overdue')
    .reduce((sum, d) => sum + d.amount, 0)

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
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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

      {/* Debts List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
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
                  {debt.amount.toLocaleString()} so'm
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
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

              {debt.status === 'active' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, fontSize: '14px' }}
                    onClick={() => {
                      setDebts(debts.map(d =>
                        d.id === debt.id ? { ...d, status: 'paid' } : d
                      ))
                    }}
                  >
                    To'landi
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ fontSize: '14px' }}
                  >
                    Tahrirlash
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

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
