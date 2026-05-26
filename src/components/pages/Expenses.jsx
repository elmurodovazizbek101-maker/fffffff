import { useState } from 'react'
import { Plus, Search, Calendar, Receipt, Home, Zap, Car, Wrench, Building, MoreHorizontal, BarChart3, Coins } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { useLanguage } from '../../context/LanguageContext'

const Expenses = () => {
  const { t } = useLanguage()
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: 'Ijara',
      amount: 2000000,
      description: 'Dokon ijarasi - May oyi',
      date: '2024-05-01',
      icon: Home
    },
    {
      id: 2,
      category: 'Elektr',
      amount: 450000,
      description: 'Elektr energiyasi to\'lovi',
      date: '2024-05-03',
      icon: Zap
    },
    {
      id: 3,
      category: 'Transport',
      amount: 300000,
      description: 'Yoqilg\'i va transport xarajatlari',
      date: '2024-05-05',
      icon: Car
    },
    {
      id: 4,
      category: 'Ta\'mir',
      amount: 850000,
      description: 'Konditsioner ta\'miri',
      date: '2024-05-07',
      icon: Wrench
    },
    {
      id: 5,
      category: 'Soliq',
      amount: 1200000,
      description: 'Oylik soliq to\'lovi',
      date: '2024-05-10',
      icon: Building
    }
  ])

  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })

  const categories = [
    { key: 'Ijara', label: 'Ijara', icon: Home, color: '#3b82f6' },
    { key: 'Elektr', label: 'Elektr', icon: Zap, color: '#f59e0b' },
    { key: 'Transport', label: 'Transport', icon: Car, color: '#10b981' },
    { key: 'Ta\'mir', label: 'Ta\'mir', icon: Wrench, color: '#8b5cf6' },
    { key: 'Soliq', label: 'Soliq', icon: Building, color: '#ef4444' },
    { key: 'Boshqa', label: 'Boshqa', icon: MoreHorizontal, color: '#6b7280' }
  ]

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddExpense = (e) => {
    e.preventDefault()
    const categoryData = categories.find(cat => cat.key === newExpense.category)
    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      icon: categoryData?.icon || MoreHorizontal
    }
    setExpenses([...expenses, expense])
    setNewExpense({
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    })
    setShowAddModal(false)
  }

  // Statistics
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const thisMonthExpenses = expenses.filter(exp =>
    new Date(exp.date).getMonth() === new Date().getMonth()
  ).reduce((sum, exp) => sum + exp.amount, 0)

  // Chart data
  const pieData = categories.map(category => {
    const categoryExpenses = expenses.filter(exp => exp.category === category.key)
    const total = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0)
    return {
      name: category.label,
      value: total,
      color: category.color
    }
  }).filter(item => item.value > 0)

  const monthlyData = [
    { month: 'Yan', amount: 3200000 },
    { month: 'Fev', amount: 2800000 },
    { month: 'Mar', amount: 3500000 },
    { month: 'Apr', amount: 4100000 },
    { month: 'May', amount: thisMonthExpenses }
  ]

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
            {t('expenses')}
          </h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            Dokon xarajatlarini kuzatish va tahlil qilish
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={20} />
          Xarajat qo'shish
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
          <Receipt size={32} color="#ef4444" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
            {(totalExpenses / 1000000).toFixed(1)}M so'm
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Jami xarajatlar
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Calendar size={32} color="#f59e0b" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
            {(thisMonthExpenses / 1000000).toFixed(1)}M so'm
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Bu oyda
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <BarChart3 size={32} color="#10b981" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {expenses.length}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Xarajat turlari
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <Coins size={32} color="#3b82f6" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
            {expenses.length > 0 ? (totalExpenses / expenses.length / 1000).toFixed(0) : 0}K
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            O'rtacha xarajat
          </p>
        </div>
      </div>

      {/* Charts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* Pie Chart */}
        <div className="card">
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            Kategoriya bo'yicha xarajatlar
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M so'm`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            Oylik xarajatlar dinamikasi
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${(value / 1000000).toFixed(1)}M so'm`, 'Xarajat']}
              />
              <Bar dataKey="amount" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
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
              placeholder="Xarajat qidirish..."
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
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: selectedCategory === 'all' ? '#1f2937' : '#f3f4f6',
                color: selectedCategory === 'all' ? 'white' : '#374151',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Barchasi
            </button>
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: selectedCategory === category.key ? '#1f2937' : '#f3f4f6',
                  color: selectedCategory === category.key ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expenses List */}
      {/* Expenses Grid - 2 ustun (katta kartochkalar) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        {filteredExpenses.map(expense => {
          const categoryData = categories.find(cat => cat.key === expense.category)
          const IconComponent = expense.icon

          return (
            <div key={expense.id} className="card">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: `${categoryData?.color || '#6b7280'}20`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComponent size={20} color={categoryData?.color || '#6b7280'} />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#1f2937'
                  }}>
                    {expense.category}
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    {new Date(expense.date).toLocaleDateString('uz-UZ')}
                  </p>
                </div>
              </div>

              <p style={{
                fontSize: '14px',
                color: '#374151',
                marginBottom: '12px',
                lineHeight: '1.4'
              }}>
                {expense.description}
              </p>

              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ef4444',
                textAlign: 'right'
              }}>
                -{expense.amount.toLocaleString()} so'm
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Expense Modal */}
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
                Yangi xarajat qo'shish
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

            <form onSubmit={handleAddExpense}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Kategoriya
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px'
                }}>
                  {categories.map(category => {
                    const IconComponent = category.icon
                    return (
                      <button
                        key={category.key}
                        type="button"
                        onClick={() => setNewExpense({...newExpense, category: category.key})}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '12px 8px',
                          border: newExpense.category === category.key ? '2px solid #4f46e5' : '1px solid #e5e7eb',
                          borderRadius: '8px',
                          backgroundColor: newExpense.category === category.key ? '#f0f9ff' : 'white',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        <IconComponent size={20} color={category.color} />
                        {category.label}
                      </button>
                    )
                  })}
                </div>
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
                    Miqdor (so'm)
                  </label>
                  <input
                    type="number"
                    className="input"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
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
                    Sana
                  </label>
                  <input
                    type="date"
                    className="input"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
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
                  Tavsif
                </label>
                <textarea
                  className="input"
                  rows="3"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  placeholder="Xarajat haqida batafsil ma'lumot..."
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
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Expenses
