import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Truck, Phone, Building, Calendar, CreditCard, Users, Package } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const Suppliers = () => {
  const { t } = useLanguage()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDebtModal, setShowDebtModal] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState(null)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Apple Distributor Uzbekistan',
      phone: '+998712345678',
      company: 'Apple Distribution LLC',
      totalDebt: 25000000,
      lastOrder: '2024-04-20',
      debts: [
        { id: 1, amount: 15000000, date: '2024-04-15', description: 'iPhone 15 Pro Max - 10 dona' },
        { id: 2, amount: 10000000, date: '2024-04-20', description: 'iPhone 15 - 8 dona' }
      ]
    },
    {
      id: 2,
      name: 'Samsung Electronics',
      phone: '+998909876543',
      company: 'Samsung Uzbekistan',
      totalDebt: 18500000,
      lastOrder: '2024-04-18',
      debts: [
        { id: 3, amount: 18500000, date: '2024-04-18', description: 'Galaxy S24 Ultra - 15 dona' }
      ]
    },
    {
      id: 3,
      name: 'Xiaomi Official Store',
      phone: '+998901122334',
      company: 'Xiaomi Corporation',
      totalDebt: 0,
      lastOrder: '2024-04-22',
      debts: []
    }
  ])

  const [newSupplier, setNewSupplier] = useState({
    name: '',
    phone: '',
    company: ''
  })

  const [newDebt, setNewDebt] = useState({
    amount: '',
    description: ''
  })

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.phone.includes(searchQuery)
  )

  const handleAddSupplier = (e) => {
    e.preventDefault()
    const supplier = {
      id: Date.now(),
      ...newSupplier,
      totalDebt: 0,
      lastOrder: null,
      debts: []
    }
    setSuppliers([...suppliers, supplier])
    setNewSupplier({ name: '', phone: '', company: '' })
    setShowAddModal(false)
  }

  const handleEditSupplier = (e) => {
    e.preventDefault()
    setSuppliers(suppliers.map(supplier =>
      supplier.id === editingSupplier.id ? editingSupplier : supplier
    ))
    setEditingSupplier(null)
  }

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id))
  }

  const handleAddDebt = (e) => {
    e.preventDefault()
    const debt = {
      id: Date.now(),
      ...newDebt,
      amount: parseFloat(newDebt.amount),
      date: new Date().toISOString().split('T')[0]
    }

    setSuppliers(suppliers.map(supplier =>
      supplier.id === selectedSupplier.id
        ? {
            ...supplier,
            debts: [...supplier.debts, debt],
            totalDebt: supplier.totalDebt + debt.amount,
            lastOrder: debt.date
          }
        : supplier
    ))

    setNewDebt({ amount: '', description: '' })
    setShowDebtModal(false)
    setSelectedSupplier(null)
  }

  const totalSuppliers = suppliers.length
  const activeSuppliers = suppliers.filter(s => s.totalDebt > 0).length
  const totalDebt = suppliers.reduce((sum, s) => sum + s.totalDebt, 0)

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
            {t('suppliers')}
          </h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            Ta'minotchilar va ularning qarzlari
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={20} />
          Ta'minotchi qo'shish
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
          <Truck size={32} color="#4f46e5" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {totalSuppliers}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Jami ta'minotchilar
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Users size={32} color="#f59e0b" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {activeSuppliers}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Faol hamkorlar
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <CreditCard size={32} color="#ef4444" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
            {(totalDebt / 1000000).toFixed(1)}M so'm
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Jami qarzlar
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Package size={32} color="#10b981" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {suppliers.reduce((sum, s) => sum + s.debts.length, 0)}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Jami buyurtmalar
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
            placeholder="Ta'minotchi nomi, kompaniya yoki telefon..."
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

      {/* Suppliers Grid - 3 ustun (o'rtacha kartochkalar) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px'
      }}>
        {filteredSuppliers.map(supplier => (
          <div key={supplier.id} className="card">
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
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Truck size={24} color="white" />
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#1f2937'
                }}>
                  {supplier.name}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '14px',
                  color: '#6b7280',
                  marginTop: '2px'
                }}>
                  <Building size={12} />
                  {supplier.company}
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
                <Phone size={14} />
                {supplier.phone}
              </div>

              {supplier.lastOrder && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  <Calendar size={14} />
                  Oxirgi buyurtma: {new Date(supplier.lastOrder).toLocaleDateString('uz-UZ')}
                </div>
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
                  color: supplier.totalDebt > 0 ? '#ef4444' : '#10b981'
                }}>
                  {supplier.totalDebt > 0 ? (supplier.totalDebt / 1000000).toFixed(1) + 'M' : '0'}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Qarz (so'm)
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#3b82f6'
                }}>
                  {supplier.debts.length}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Buyurtmalar
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '8px',
              alignItems: 'stretch'
            }}>
              <button
                onClick={() => {
                  setSelectedSupplier(supplier)
                  setShowDebtModal(true)
                }}
                className="btn btn-primary"
                style={{ 
                  fontSize: '14px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  height: 'auto'
                }}
              >
                <Plus size={16} />
                Qarz qo'shish
              </button>

              <button
                onClick={() => setEditingSupplier(supplier)}
                className="btn"
                style={{
                  padding: '10px 12px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  height: 'auto'
                }}
              >
                <Edit size={16} />
                Edit
              </button>

              <button
                onClick={() => handleDeleteSupplier(supplier.id)}
                className="btn"
                style={{
                  padding: '10px 12px',
                  backgroundColor: '#fef2f2',
                  color: '#ef4444',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  height: 'auto'
                }}
              >
                <Trash2 size={16} />
                Del
              </button>
            </div>

            {/* Debts List */}
            {supplier.debts.length > 0 && (
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid #e5e7eb'
              }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#374151'
                }}>
                  Qarzlar tarixi:
                </h4>
                <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
                  {supplier.debts.map(debt => (
                    <div key={debt.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '6px 0',
                      fontSize: '12px',
                      borderBottom: '1px solid #f3f4f6'
                    }}>
                      <div>
                        <div style={{ fontWeight: '500', color: '#374151' }}>
                          {debt.description}
                        </div>
                        <div style={{ color: '#6b7280' }}>
                          {new Date(debt.date).toLocaleDateString('uz-UZ')}
                        </div>
                      </div>
                      <div style={{
                        fontWeight: '600',
                        color: '#ef4444'
                      }}>
                        {debt.amount.toLocaleString()} so'm
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Supplier Modal */}
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
                Yangi ta'minotchi qo'shish
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

            <form onSubmit={handleAddSupplier}>
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
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
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
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                  placeholder="+998 71 123 45 67"
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Kompaniya nomi
                </label>
                <input
                  type="text"
                  className="input"
                  value={newSupplier.company}
                  onChange={(e) => setNewSupplier({...newSupplier, company: e.target.value})}
                  required
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

      {/* Add Debt Modal */}
      {showDebtModal && selectedSupplier && (
        <div className="modal-overlay" onClick={() => setShowDebtModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Qarz qo'shish - {selectedSupplier.name}
              </h3>
              <button
                onClick={() => {
                  setShowDebtModal(false)
                  setSelectedSupplier(null)
                }}
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Tavsif
                </label>
                <textarea
                  className="input"
                  rows="3"
                  value={newDebt.description}
                  onChange={(e) => setNewDebt({...newDebt, description: e.target.value})}
                  placeholder="Qarz haqida ma'lumot (mahsulot nomi, miqdori va h.k.)"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowDebtModal(false)
                    setSelectedSupplier(null)
                  }}
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

      {/* Edit Supplier Modal */}
      {editingSupplier && (
        <div className="modal-overlay" onClick={() => setEditingSupplier(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Ta'minotchi ma'lumotlarini tahrirlash
              </h3>
              <button
                onClick={() => setEditingSupplier(null)}
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

            <form onSubmit={handleEditSupplier}>
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
                  value={editingSupplier.name}
                  onChange={(e) => setEditingSupplier({...editingSupplier, name: e.target.value})}
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
                  value={editingSupplier.phone}
                  onChange={(e) => setEditingSupplier({...editingSupplier, phone: e.target.value})}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Kompaniya nomi
                </label>
                <input
                  type="text"
                  className="input"
                  value={editingSupplier.company}
                  onChange={(e) => setEditingSupplier({...editingSupplier, company: e.target.value})}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setEditingSupplier(null)}
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

export default Suppliers
