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

const Sidebar = ({ isOpen }) => {
  const { t } = useLanguage()

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
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      width: isOpen ? '280px' : '80px',
      backgroundColor: '#1e293b',
      transition: 'width 0.3s ease',
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#4f46e5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            A
          </div>
          {isOpen && (
            <div>
              <h2 style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                margin: 0
              }}>
                Alisher Mobile
              </h2>
              <p style={{
                color: '#94a3b8',
                fontSize: '12px',
                margin: 0
              }}>
                Admin Panel
              </p>
            </div>
          )}
        </div>
      </div>

      <nav style={{ padding: '20px 0' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              color: isActive ? '#4f46e5' : '#94a3b8',
              textDecoration: 'none',
              backgroundColor: isActive ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
              borderRight: isActive ? '3px solid #4f46e5' : 'none',
              transition: 'all 0.2s ease'
            })}
          >
            <item.icon size={20} />
            {isOpen && (
              <span style={{
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
