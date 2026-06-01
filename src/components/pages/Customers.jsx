import { useState } from 'react'
import { Plus, Search, Edit, Trash2, User, MapPin, Phone, Calendar, Users, BarChart3 } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useData } from '../../context/DataContext'

const Customers = () => {
  const { t } = useLanguage()
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useData()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    region: '',
    district: '',
    notes: ''
  })

  const regions = [
    'Toshkent', 'Samarqand', 'Buxoro', 'Andijon', 'Farg\'ona',
    'Namangan', 'Qashqadaryo', 'Surxondaryo', 'Jizzax',
    'Sirdaryo', 'Navoiy', 'Xorazm', 'Qoraqalpog\'iston'
  ]

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.region.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddCustomer = (e) => {
    e.preventDefault()
    const customer = {
      ...newCustomer,
      joinDate: new Date().toISOString().split('T')[0],
      totalPurchases: 0,
      totalAmount: 0
    }
    addCustomer(customer)
    setNewCustomer({
      name: '',
      phone: '',
      region: '',
      district: '',
      notes: ''
    })
    setShowAddModal(false)
  }

  const handleEditCustomer = (e) => {
    e.preventDefault()
    updateCustomer(editingCustomer.id, editingCustomer)
    setEditingCustomer(null)
  }

  const handleDeleteCustomer = (id) => {
    deleteCustomer(id)
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.totalPurchases > 0).length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalAmount, 0)

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
            {t('customers')}
          </h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            Mijozlar ma'lumotlarini boshqarish
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={20} />
          Yangi mijoz
        </button>
      </div>

      {/* Stats */}
      {/* Stats Cards - 4 ustun */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <User size={32} color="#4f46e5" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {totalCustomers}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Jami mijozlar
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Users size={32} color="#10b981" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {activeCustomers}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Faol mijozlar
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '32px',
            color: '#f59e0b',
            margin: '0 auto 8px',
            fontWeight: 'bold'
          }}>
            ₹
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
            {(totalRevenue / 1000000).toFixed(1)}M so'm
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Jami daromad
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <BarChart3 size={32} color="#8b5cf6" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
            {totalCustomers > 0 ? (totalRevenue / totalCustomers / 1000000).toFixed(1) : 0}M
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            O'rtacha xarid
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94a3b8'
          }} />
          <input
            type="text"
            placeholder="Mijoz nomi, telefon yoki viloyat bo'yicha qidirish..."
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
      </div>

      {/* Customers Grid */}
      {/* Customers Grid - 2 ustun (katta kartochkalar) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
      }}>
        {filteredCustomers.map(customer => (
          <div key={customer.id} className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#4f46e5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                {customer.name.charAt(0)}
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#1f2937'
                }}>
                  {customer.name}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '14px',
                  color: '#6b7280',
                  marginTop: '2px'
                }}>
                  <Phone size={12} />
                  {customer.phone}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                <MapPin size={14} />
                {customer.region}, {customer.district}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px'
              }}>
                <Calendar size={14} />
                Qo'shilgan: {new Date(customer.joinDate).toLocaleDateString('uz-UZ')}
              </div>

              {customer.notes && (
                <p style={{
                  fontSize: '14px',
                  color: '#374151',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "{customer.notes}"
                </p>
              )}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#10b981'
                }}>
                  {customer.totalPurchases}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Xaridlar
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#3b82f6'
                }}>
                  {(customer.totalAmount / 1000000).toFixed(1)}M
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Jami (so'm)
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setEditingCustomer(customer)}
                className="btn"
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  fontSize: '14px'
                }}
              >
                <Edit size={16} style={{ marginRight: '4px' }} />
                {t('edit')}
              </button>
              <button
                onClick={() => handleDeleteCustomer(customer.id)}
                className="btn"
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#fef2f2',
                  color: '#ef4444',
                  fontSize: '14px'
                }}
              >
                <Trash2 size={16} style={{ marginRight: '4px' }} />
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Customer Modal */}
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
                Yangi mijoz qo'shish
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

            <form onSubmit={handleAddCustomer}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Ism
                </label>
                <input
                  type="text"
                  className="input"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
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
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
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
                    Viloyat
                  </label>
                  <select
                    className="input"
                    value={newCustomer.region}
                    onChange={(e) => setNewCustomer({...newCustomer, region: e.target.value})}
                    required
                  >
                    <option value="">Viloyat tanlang</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Tuman/Shahar
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={newCustomer.district}
                    onChange={(e) => setNewCustomer({...newCustomer, district: e.target.value})}
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
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                  placeholder="Mijoz haqida qo'shimcha ma'lumot..."
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

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <div className="modal-overlay" onClick={() => setEditingCustomer(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Mijoz ma'lumotlarini tahrirlash
              </h3>
              <button
                onClick={() => setEditingCustomer(null)}
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

            <form onSubmit={handleEditCustomer}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Ism
                </label>
                <input
                  type="text"
                  className="input"
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
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
                  value={editingCustomer.phone}
                  onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
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
                    Viloyat
                  </label>
                  <select
                    className="input"
                    value={editingCustomer.region}
                    onChange={(e) => setEditingCustomer({...editingCustomer, region: e.target.value})}
                    required
                  >
                    <option value="">Viloyat tanlang</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Tuman/Shahar
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={editingCustomer.district}
                    onChange={(e) => setEditingCustomer({...editingCustomer, district: e.target.value})}
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
                  Izoh
                </label>
                <textarea
                  className="input"
                  rows="3"
                  value={editingCustomer.notes}
                  onChange={(e) => setEditingCustomer({...editingCustomer, notes: e.target.value})}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
                  className="btn btn-secondary"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Customers
