import { useState } from 'react'
import { Plus, Search, Edit, Trash2, UserCheck, Phone, Calendar, DollarSign, CheckCircle, BarChart3 } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const Employees = () => {
  const { t } = useLanguage()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showSalaryModal, setShowSalaryModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [salaryPayment, setSalaryPayment] = useState({
    amount: '',
    type: 'salary', // 'salary', 'bonus', 'advance'
    description: ''
  })
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Bobur Karimov',
      phone: '+998901234567',
      position: 'Sotuvchi',
      salary: 3000000,
      joinDate: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Malika Tosheva',
      phone: '+998907654321',
      position: 'Kassir',
      salary: 2500000,
      joinDate: '2024-02-20',
      status: 'active'
    },
    {
      id: 3,
      name: 'Jasur Saidov',
      phone: '+998909876543',
      position: 'Omborchi',
      salary: 2800000,
      joinDate: '2024-03-10',
      status: 'inactive'
    }
  ])

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    phone: '',
    position: '',
    salary: '',
    joinDate: new Date().toISOString().split('T')[0]
  })

  const positions = [
    'Sotuvchi',
    'Kassir',
    'Omborchi',
    'Menejer',
    'Xavfsizlik xodimi',
    'Tozalovchi'
  ]

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.phone.includes(searchQuery) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddEmployee = (e) => {
    e.preventDefault()
    const employee = {
      id: Date.now(),
      ...newEmployee,
      salary: parseFloat(newEmployee.salary),
      status: 'active'
    }
    setEmployees([...employees, employee])
    setNewEmployee({
      name: '',
      phone: '',
      position: '',
      salary: '',
      joinDate: new Date().toISOString().split('T')[0]
    })
    setShowAddModal(false)
  }

  const handleEditEmployee = (e) => {
    e.preventDefault()
    setEmployees(employees.map(employee =>
      employee.id === editingEmployee.id ? editingEmployee : employee
    ))
    setEditingEmployee(null)
  }

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id))
  }

  const toggleEmployeeStatus = (id) => {
    setEmployees(employees.map(employee =>
      employee.id === id
        ? { ...employee, status: employee.status === 'active' ? 'inactive' : 'active' }
        : employee
    ))
  }

  const openSalaryModal = (employee) => {
    setSelectedEmployee(employee)
    setSalaryPayment({
      amount: employee.salary.toString(),
      type: 'salary',
      description: ''
    })
    setShowSalaryModal(true)
  }

  const handleSalaryPayment = (e) => {
    e.preventDefault()
    if (!selectedEmployee) return

    const payment = {
      id: Date.now(),
      employeeId: selectedEmployee.id,
      amount: parseFloat(salaryPayment.amount),
      type: salaryPayment.type,
      description: salaryPayment.description,
      date: new Date().toISOString()
    }

    // Save payment to localStorage
    const payments = JSON.parse(localStorage.getItem('alisher_mobile_salary_payments') || '[]')
    payments.push(payment)
    localStorage.setItem('alisher_mobile_salary_payments', JSON.stringify(payments))

    setShowSalaryModal(false)
    setSelectedEmployee(null)
  }

  const totalEmployees = employees.length
  const activeEmployees = employees.filter(e => e.status === 'active').length
  const totalSalary = employees.filter(e => e.status === 'active').reduce((sum, e) => sum + e.salary, 0)

  const getWorkDuration = (joinDate) => {
    const start = new Date(joinDate)
    const now = new Date()
    const diffTime = Math.abs(now - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const months = Math.floor(diffDays / 30)
    const days = diffDays % 30

    if (months > 0) {
      return `${months} oy ${days} kun`
    }
    return `${days} kun`
  }

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
            {t('employees')}
          </h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            Xodimlar ma'lumotlarini boshqarish
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={20} />
          Xodim qo'shish
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
          <UserCheck size={32} color="#4f46e5" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {totalEmployees}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Jami xodimlar
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <CheckCircle size={32} color="#10b981" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {activeEmployees}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Faol xodimlar
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <DollarSign size={32} color="#f59e0b" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
            {(totalSalary / 1000000).toFixed(1)}M so'm
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Oylik maosh fondi
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <BarChart3 size={32} color="#8b5cf6" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
            {activeEmployees > 0 ? (totalSalary / activeEmployees / 1000).toFixed(0) : 0}K
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            O'rtacha maosh
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
            placeholder="Xodim nomi, telefon yoki lavozim bo'yicha qidirish..."
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

      {/* Employees Grid - 5 ustun */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px'
      }}>
        {filteredEmployees.map(employee => (
          <div key={employee.id} style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: '2px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 8px 25px -8px rgba(15, 23, 42, 0.12), 0 4px 12px -4px rgba(15, 23, 42, 0.08)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(15, 23, 42, 0.18), 0 8px 20px -8px rgba(15, 23, 42, 0.12)'
            e.currentTarget.style.borderColor = '#3b82f6'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 25px -8px rgba(15, 23, 42, 0.12), 0 4px 12px -4px rgba(15, 23, 42, 0.08)'
            e.currentTarget.style.borderColor = '#e2e8f0'
          }}
          >
            {/* Gradient top border */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: employee.status === 'active' 
                ? 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
                : 'linear-gradient(90deg, #6b7280 0%, #4b5563 100%)'
            }} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: employee.status === 'active' ? '#10b981' : '#6b7280',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                {employee.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#1f2937'
                }}>
                  {employee.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {employee.position}
                </p>
              </div>
              <div style={{
                padding: '4px 8px',
                borderRadius: '12px',
                backgroundColor: employee.status === 'active' ? '#dcfce7' : '#f3f4f6',
                color: employee.status === 'active' ? '#166534' : '#6b7280',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {employee.status === 'active' ? 'Faol' : 'Faol emas'}
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
                {employee.phone}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                <Calendar size={14} />
                Ishga kirgan: {new Date(employee.joinDate).toLocaleDateString('uz-UZ')}
              </div>

              <div style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Ish staji: {getWorkDuration(employee.joinDate)}
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px'
            }}>
              <div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  Oylik maosh
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#10b981'
                }}>
                  {employee.salary.toLocaleString()} so'm
                </div>
              </div>

              <button
                onClick={() => toggleEmployeeStatus(employee.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: employee.status === 'active' ? '#fef2f2' : '#dcfce7',
                  color: employee.status === 'active' ? '#dc2626' : '#16a34a',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                {employee.status === 'active' ? 'Faolsizlashtirish' : 'Faollashtirish'}
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '8px'
            }}>
              <button
                onClick={() => openSalaryModal(employee)}
                style={{
                  padding: '10px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: 'white',
                  boxShadow: '0 2px 4px rgba(34, 197, 94, 0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)'
                  e.target.style.boxShadow = '0 4px 8px rgba(34, 197, 94, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 2px 4px rgba(34, 197, 94, 0.2)'
                }}
              >
                <DollarSign size={14} />
                Maosh
              </button>
              <button
                onClick={() => setEditingEmployee(employee)}
                style={{
                  padding: '10px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)'
                  e.target.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.2)'
                }}
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => handleDeleteEmployee(employee.id)}
                style={{
                  padding: '10px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)'
                  e.target.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.2)'
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Employee Modal */}
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
                Yangi xodim qo'shish
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

            <form onSubmit={handleAddEmployee}>
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
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
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
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
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
                    Lavozim
                  </label>
                  <select
                    className="input"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    required
                  >
                    <option value="">Lavozim tanlang</option>
                    {positions.map(position => (
                      <option key={position} value={position}>{position}</option>
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
                    Oylik maosh (so'm)
                  </label>
                  <input
                    type="number"
                    className="input"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
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
                  Ishga kirgan sana
                </label>
                <input
                  type="date"
                  className="input"
                  value={newEmployee.joinDate}
                  onChange={(e) => setNewEmployee({...newEmployee, joinDate: e.target.value})}
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

      {/* Edit Employee Modal */}
      {editingEmployee && (
        <div className="modal-overlay" onClick={() => setEditingEmployee(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Xodim ma'lumotlarini tahrirlash
              </h3>
              <button
                onClick={() => setEditingEmployee(null)}
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

            <form onSubmit={handleEditEmployee}>
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
                  value={editingEmployee.name}
                  onChange={(e) => setEditingEmployee({...editingEmployee, name: e.target.value})}
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
                  value={editingEmployee.phone}
                  onChange={(e) => setEditingEmployee({...editingEmployee, phone: e.target.value})}
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
                    Lavozim
                  </label>
                  <select
                    className="input"
                    value={editingEmployee.position}
                    onChange={(e) => setEditingEmployee({...editingEmployee, position: e.target.value})}
                    required
                  >
                    <option value="">Lavozim tanlang</option>
                    {positions.map(position => (
                      <option key={position} value={position}>{position}</option>
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
                    Oylik maosh (so'm)
                  </label>
                  <input
                    type="number"
                    className="input"
                    value={editingEmployee.salary}
                    onChange={(e) => setEditingEmployee({...editingEmployee, salary: parseFloat(e.target.value)})}
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
                  Ishga kirgan sana
                </label>
                <input
                  type="date"
                  className="input"
                  value={editingEmployee.joinDate}
                  onChange={(e) => setEditingEmployee({...editingEmployee, joinDate: e.target.value})}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
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

      {/* Salary Payment Modal */}
      {showSalaryModal && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setShowSalaryModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Maosh to'lash - {selectedEmployee.name}
              </h3>
              <button
                onClick={() => {
                  setShowSalaryModal(false)
                  setSelectedEmployee(null)
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

            <form onSubmit={handleSalaryPayment}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  To'lov turi
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '8px'
                }}>
                  <button
                    type="button"
                    onClick={() => setSalaryPayment({...salaryPayment, type: 'salary', amount: selectedEmployee.salary.toString()})}
                    style={{
                      padding: '12px',
                      border: salaryPayment.type === 'salary' ? '2px solid #4f46e5' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: salaryPayment.type === 'salary' ? '#f0f9ff' : 'white',
                      color: salaryPayment.type === 'salary' ? '#4f46e5' : '#374151',
                      fontWeight: salaryPayment.type === 'salary' ? '600' : '400',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Oylik maosh
                  </button>
                  <button
                    type="button"
                    onClick={() => setSalaryPayment({...salaryPayment, type: 'bonus', amount: ''})}
                    style={{
                      padding: '12px',
                      border: salaryPayment.type === 'bonus' ? '2px solid #10b981' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: salaryPayment.type === 'bonus' ? '#f0fdf4' : 'white',
                      color: salaryPayment.type === 'bonus' ? '#10b981' : '#374151',
                      fontWeight: salaryPayment.type === 'bonus' ? '600' : '400',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Bonus
                  </button>
                  <button
                    type="button"
                    onClick={() => setSalaryPayment({...salaryPayment, type: 'advance', amount: ''})}
                    style={{
                      padding: '12px',
                      border: salaryPayment.type === 'advance' ? '2px solid #f59e0b' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: salaryPayment.type === 'advance' ? '#fffbeb' : 'white',
                      color: salaryPayment.type === 'advance' ? '#f59e0b' : '#374151',
                      fontWeight: salaryPayment.type === 'advance' ? '600' : '400',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Avans
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
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
                  value={salaryPayment.amount}
                  onChange={(e) => setSalaryPayment({...salaryPayment, amount: e.target.value})}
                  placeholder="0"
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
                  Izoh
                </label>
                <textarea
                  className="input"
                  rows="3"
                  value={salaryPayment.description}
                  onChange={(e) => setSalaryPayment({...salaryPayment, description: e.target.value})}
                  placeholder="To'lov haqida qo'shimcha ma'lumot..."
                  required
                />
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                  {selectedEmployee.position} - Oylik maosh:
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#10b981'
                }}>
                  {selectedEmployee.salary.toLocaleString()} so'm
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowSalaryModal(false)
                    setSelectedEmployee(null)
                  }}
                  className="btn btn-secondary"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: salaryPayment.type === 'salary' ? '#4f46e5' : 
                                   salaryPayment.type === 'bonus' ? '#10b981' : '#f59e0b'
                  }}
                >
                  {salaryPayment.type === 'salary' ? 'Maosh to\'lash' : 
                   salaryPayment.type === 'bonus' ? 'Bonus berish' : 'Avans berish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Employees
