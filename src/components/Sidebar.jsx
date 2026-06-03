import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Tag,
  CreditCard,
  Users,
  Truck,
  Receipt,
  UserCheck,
  Settings,
  Megaphone
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const Sidebar = ({ isOpen, isMobile, width = '280px' }) => {
  const { t } = useLanguage()
  
  // 1366x768 detection
  const is1366x768 = window.innerWidth === 1366 && window.innerHeight === 768

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { path: '/admin/products', icon: Package, label: t('products') },
    { path: '/admin/categories', icon: Tag, label: t('categories') },
    { path: '/admin/debts', icon: CreditCard, label: t('debts') },
    { path: '/admin/customers', icon: Users, label: t('customers') },
    { path: '/admin/suppliers', icon: Truck, label: t('suppliers') },
    { path: '/admin/expenses', icon: Receipt, label: t('expenses') },
    { path: '/admin/employees', icon: UserCheck, label: t('employees') },
    { path: '/admin/promotions', icon: Megaphone, label: 'Reklamalar' },
    { path: '/admin/settings', icon: Settings, label: t('settings') }
  ]

  return (
    <div 
      className={is1366x768 ? 'sidebar-container' : ''}
      style={{
        position: isMobile ? 'fixed' : 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: isOpen ? (is1366x768 ? '180px' : width) : '60px',
        backgroundColor: '#1e293b',
        transition: 'width 0.3s ease, transform 0.3s ease',
        zIndex: isMobile ? 1000 : 1000,
        overflowY: 'auto',
        transform: isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <div 
        className="sidebar-header"
        style={{
          padding: is1366x768 ? '20px 12px' : (isMobile ? '12px' : '20px'),
          borderBottom: '1px solid #334155',
          flexShrink: 0
        }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: isMobile ? '32px' : (is1366x768 ? '36px' : '40px'),
            height: isMobile ? '32px' : (is1366x768 ? '36px' : '40px'),
            backgroundColor: '#4f46e5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: isMobile ? '14px' : (is1366x768 ? '16px' : '18px'),
            fontWeight: 'bold'
          }}>
            A
          </div>
          {isOpen && (
            <div className="sidebar-brand">
              <h2 style={{
                color: 'white',
                fontSize: is1366x768 ? '17px' : (isMobile ? '14px' : '18px'),
                fontWeight: 'bold',
                margin: 0,
                lineHeight: '1.3',
                marginBottom: '2px'
              }}>
                Alisher Mobile
              </h2>
              <p style={{
                color: '#94a3b8',
                fontSize: is1366x768 ? '13px' : (isMobile ? '10px' : '12px'),
                margin: 0,
                marginTop: '6px'
              }}>
                Admin Panel
              </p>
            </div>
          )}
        </div>
      </div>

      <nav style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: is1366x768 ? '20px 0' : (isMobile ? '12px 0' : '20px 0')
      }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="sidebar-item"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: is1366x768 ? '12px' : '12px',
              padding: is1366x768 ? '14px 12px' : (isMobile ? '8px 12px' : '12px 20px'),
              margin: is1366x768 ? '0 8px 4px 8px' : '0',
              color: isActive ? '#4f46e5' : '#94a3b8',
              textDecoration: 'none',
              backgroundColor: isActive ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
              borderRight: isActive && !is1366x768 ? '3px solid #4f46e5' : 'none',
              borderRadius: is1366x768 ? '8px' : '0',
              transition: 'all 0.2s ease',
              minHeight: is1366x768 ? '50px' : 'auto'
            })}
          >
            <item.icon size={is1366x768 ? 20 : (isMobile ? 16 : 20)} />
            {isOpen && (
              <span style={{
                fontSize: is1366x768 ? '13px' : (isMobile ? '12px' : '14px'),
                fontWeight: '500',
                lineHeight: '1.3'
              }}>
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Footer qism - pastki joy to'ldirish */}
      {isOpen && is1366x768 && (
        <div className="sidebar-footer" style={{
          padding: '15px 12px',
          borderTop: '1px solid #374151',
          marginTop: 'auto'
        }}>
          <div style={{
            fontSize: '11px',
            color: '#64748b',
            textAlign: 'center'
          }}>
            v1.0.0
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
