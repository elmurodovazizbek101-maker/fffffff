import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Debts from './pages/Debts'
import Customers from './pages/Customers'
import Suppliers from './pages/Suppliers'
import Expenses from './pages/Expenses'
import Employees from './pages/Employees'
import Settings from './pages/Settings'
import Promotions from './pages/Promotions'
import NotFoundPage from './NotFoundPage'

const AdminPanel = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Responsive detector
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      
      // Auto-collapse sidebar on smaller screens
      if (width < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Responsive sidebar width
  const getSidebarWidth = () => {
    if (isMobile) return '200px'
    if (isTablet) return '240px'
    return '280px'
  }

  // Responsive margin
  const getMainMargin = () => {
    const width = getSidebarWidth()
    return sidebarOpen && !isMobile ? width : '0px'
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <Sidebar 
        isOpen={sidebarOpen} 
        isMobile={isMobile}
        width={getSidebarWidth()}
      />

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div style={{
        flex: 1,
        marginLeft: getMainMargin(),
        transition: 'margin-left 0.3s ease',
        width: isMobile ? '100%' : `calc(100% - ${getMainMargin()})`
      }}>
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
          isMobile={isMobile}
        />

        <main style={{
          padding: isMobile ? '12px' : isTablet ? '16px' : '20px',
          backgroundColor: '#f8fafc',
          minHeight: 'calc(100vh - 70px)'
        }}>
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="debts" element={<Debts />} />
            <Route path="customers" element={<Customers />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="employees" element={<Employees />} />
            <Route path="settings" element={<Settings />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="sales" element={<Navigate to="dashboard" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default AdminPanel
