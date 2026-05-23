import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Dashboard from './pages/Dashboard'
import Sales from './pages/Sales'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Debts from './pages/Debts'
import Customers from './pages/Customers'
import Suppliers from './pages/Suppliers'
import Expenses from './pages/Expenses'
import Employees from './pages/Employees'
import Settings from './pages/Settings'
import Scanner from './pages/Scanner'
import Promotions from './pages/Promotions'
import NotFoundPage from './NotFoundPage'

const AdminPanel = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isOpen={sidebarOpen} />

      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? '280px' : '80px',
        transition: 'margin-left 0.3s ease'
      }}>
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
        />

        <main style={{
          padding: '20px',
          backgroundColor: '#f8fafc',
          minHeight: 'calc(100vh - 70px)'
        }}>
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sales" element={<Sales />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="debts" element={<Debts />} />
            <Route path="customers" element={<Customers />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="employees" element={<Employees />} />
            <Route path="settings" element={<Settings />} />
            <Route path="scanner" element={<Scanner />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default AdminPanel
