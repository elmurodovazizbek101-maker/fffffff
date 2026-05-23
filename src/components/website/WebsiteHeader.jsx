import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Grid, LayoutGrid, Sun, Moon, Smartphone, Apple, Zap, Shield, Gamepad2, Flame, Plus, Hexagon, Circle, ShoppingCart, LogIn, LogOut, User } from 'lucide-react'
import { useCart } from './context/CartContext'
import { useData } from '../../context/DataContext'

const WebsiteHeader = ({ onCartClick }) => {
  const [showCatalog, setShowCatalog] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('alisher_mobile_theme')
    return saved === 'dark'
  })
  const [currentUser, setCurrentUser] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()
  const { getTotalItems } = useCart()
  const { productsByBrand } = useData()

  // Check if user is logged in
  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem('alisher_mobile_customer')
      if (user) {
        try {
          setCurrentUser(JSON.parse(user))
        } catch (e) {
          setCurrentUser(null)
        }
      } else {
        setCurrentUser(null)
      }
    }

    checkUser()
    // Listen for storage changes
    window.addEventListener('storage', checkUser)
    return () => window.removeEventListener('storage', checkUser)
  }, [])

  // Apply dark mode to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('alisher_mobile_theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const navigation = [
    { name: 'Bosh sahifa', href: '/' },
    { name: 'Mahsulotlar', href: '/products' },
    { name: 'Kataloglar', href: '/categories' },
    { name: 'Biz haqimizda', href: '/about' }
  ]

  const brands = [
    { name: 'Apple', icon: Apple, color: '#007AFF', count: productsByBrand.Apple?.length || 0 },
    { name: 'Samsung', icon: Smartphone, color: '#1428A0', count: productsByBrand.Samsung?.length || 0 },
    { name: 'Honor', icon: Shield, color: '#FF6B35', count: productsByBrand.Honor?.length || 0 },
    { name: 'Vivo', icon: Circle, color: '#4285F4', count: productsByBrand.Vivo?.length || 0 },
    { name: 'Nokia', icon: Hexagon, color: '#124191', count: productsByBrand.Nokia?.length || 0 },
    { name: 'ROG', icon: Gamepad2, color: '#FF0000', count: productsByBrand.ROG?.length || 0 },
    { name: 'Redmi', icon: Flame, color: '#FF6900', count: productsByBrand.Redmi?.length || 0 },
    { name: 'OnePlus', icon: Plus, color: '#EB0028', count: productsByBrand.OnePlus?.length || 0 },
    { name: 'Oppo', icon: Circle, color: '#1BA784', count: productsByBrand.Oppo?.length || 0 },
    { name: 'Realme', icon: Zap, color: '#FFC400', count: productsByBrand.Realme?.length || 0 }
  ]

  const isActive = (path) => location.pathname === path

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  const handleBrandClick = (brandName) => {
    setShowCatalog(false)
    // Navigate to products page with brand filter
    window.location.href = `/products?brand=${brandName}`
  }

  const handleAdminLogin = () => {
    navigate('/admin/login')
  }

  const handleLogout = () => {
    localStorage.removeItem('alisher_mobile_customer')
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: darkMode ? '#1f2937' : 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
        transition: 'background-color 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          gap: '30px'
        }}>
          {/* Left Side - Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            flexShrink: 0
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Smartphone size={24} color="white" />
            </div>
            <div>
              <div style={{
                fontSize: '18px',
                fontWeight: '800',
                color: darkMode ? 'white' : '#1f2937',
                lineHeight: '1',
                whiteSpace: 'nowrap'
              }}>
                Alisher Mobile
              </div>
              <div style={{
                fontSize: '9px',
                color: darkMode ? '#9ca3af' : '#6b7280',
                fontWeight: '500',
                whiteSpace: 'nowrap'
              }}>
                Eng Yaxshi Telefon Do'koni
              </div>
            </div>
          </Link>

          {/* Catalog Button */}
          <Link
            to="/categories"
            title="Katalog"
            aria-label="Katalog"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              transition: 'transform 0.2s',
              flexShrink: 0,
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <LayoutGrid size={20} />
          </Link>

          {/* Center Navigation */}
          <nav style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
          }}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                style={{
                  textDecoration: 'none',
                  color: isActive(item.href)
                    ? '#4f46e5'
                    : darkMode ? '#d1d5db' : '#6b7280',
                  fontWeight: isActive(item.href) ? '600' : '500',
                  fontSize: '15px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  borderBottom: isActive(item.href) ? '2px solid #4f46e5' : 'none',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.name}
              </Link>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              style={{
                background: darkMode ? '#374151' : 'white',
                border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                color: darkMode ? '#fbbf24' : '#f59e0b',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
              title={darkMode ? 'Yorug\' rejimga o\'tish' : 'Qorong\'u rejimga o\'tish'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Right Side - User Info, Cart, Login/Logout */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0
          }}>
            {/* User Info */}
            {currentUser && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: darkMode ? '#374151' : '#f3f4f6',
                padding: '6px 10px',
                borderRadius: '8px',
                border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
              }}>
                <User size={14} color={darkMode ? '#9ca3af' : '#6b7280'} />
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: darkMode ? '#d1d5db' : '#374151',
                  maxWidth: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {currentUser.name}
                </span>
              </div>
            )}

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                width: '44px',
                height: '44px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.2s',
                flexShrink: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              title="Savat"
            >
              <ShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '700',
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Login/Logout Button */}
            {currentUser ? (
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                title="Chiqish"
              >
                <LogOut size={16} />
                Chiqish
              </button>
            ) : (
              <button
                onClick={handleAdminLogin}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                title="Kirish"
              >
                <LogIn size={16} />
                Kirish
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Catalog Dropdown */}
      {showCatalog && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            background: darkMode ? '#1f2937' : 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 999,
            borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
          }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '30px 20px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '20px',
              color: darkMode ? 'white' : '#1f2937'
            }}>
              Brendlar bo'yicha katalog
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px'
            }}>
              {brands.map(brand => {
                return (
                  <button
                    key={brand.name}
                    onClick={() => handleBrandClick(brand.name)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: darkMode ? '#374151' : '#f9fafb',
                      border: `2px solid ${brand.color}`,
                      borderRadius: '12px',
                      padding: '20px 16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                      minHeight: '80px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = brand.color
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
                      const nameEl = e.currentTarget.querySelector('.brand-name')
                      const countEl = e.currentTarget.querySelector('.brand-count')
                      if (nameEl) nameEl.style.color = 'white'
                      if (countEl) countEl.style.color = 'rgba(255,255,255,0.9)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = darkMode ? '#374151' : '#f9fafb'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                      const nameEl = e.currentTarget.querySelector('.brand-name')
                      const countEl = e.currentTarget.querySelector('.brand-count')
                      if (nameEl) nameEl.style.color = darkMode ? 'white' : '#1f2937'
                      if (countEl) countEl.style.color = darkMode ? '#9ca3af' : '#6b7280'
                    }}
                  >
                    <div
                      className="brand-name"
                      style={{
                        fontWeight: '700',
                        fontSize: '18px',
                        color: darkMode ? 'white' : '#1f2937',
                        marginBottom: '6px',
                        transition: 'color 0.2s'
                      }}
                    >
                      {brand.name}
                    </div>
                    <div
                      className="brand-count"
                      style={{
                        fontSize: '13px',
                        color: darkMode ? '#9ca3af' : '#6b7280',
                        transition: 'color 0.2s'
                      }}
                    >
                      {brand.count} mahsulot
                    </div>
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setShowCatalog(false)}
              style={{
                marginTop: '20px',
                background: darkMode ? '#4b5563' : '#6b7280',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* Overlay for catalog */}
      {showCatalog && (
        <div
          onClick={() => setShowCatalog(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 998
          }}
        />
      )}
    </>
  )
}

export default WebsiteHeader
