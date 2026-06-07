import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Smartphone, ShoppingCart, LogIn, LogOut, User, Search, X } from 'lucide-react'
import { useCart } from './context/CartContext'
import { useData } from '../../context/DataContext'

const WebsiteHeader = ({ onCartClick }) => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('alisher_mobile_theme')
    return saved === 'dark'
  })
  const [currentUser, setCurrentUser] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()
  const { getTotalItems } = useCart()
  const { products } = useData()

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filtered.slice(0, 8)) // Limit to 8 results
    } else {
      setSearchResults([])
    }
  }, [searchQuery, products])

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSearch(false)
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Handle search result click
  const handleSearchResultClick = (product) => {
    setShowSearch(false)
    setSearchQuery('')
    navigate(`/products/${product.id}`)
  }

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowSearch(false)
        setSearchQuery('')
      }
    }

    if (showSearch) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [showSearch])
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
    { name: 'Bosh sahifa', href: '/', path: '/' },
    { name: 'Mahsulotlar', href: '/products', path: '/products' },
    { name: 'Kataloglar', href: '/categories', path: '/categories' },
    { name: 'Biz haqimizda', href: '/about', path: '/about' }
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/home'
    }
    return location.pathname === path
  }

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  const handleAdminLogin = () => {
    // Open login modal for customer authentication
    window.dispatchEvent(new CustomEvent('openAuthModal'))
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

          {/* Search Button */}
          <button
            onClick={() => setShowSearch(true)}
            className="btn btn-warning"
            style={{
              width: '44px',
              height: '44px',
              minWidth: '44px',
              minHeight: '44px',
              flexShrink: 0
            }}
            title="Qidiruv"
            aria-label="Qidiruv"
            type="button"
          >
            <Search size={20} />
          </button>

          {/* Center Navigation */}
          <nav 
            className="website-nav"
            style={{
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
                className="navigation-link"
                style={{
                  textDecoration: 'none !important',
                  color: isActive(item.href)
                    ? '#4f46e5'
                    : darkMode ? '#d1d5db' : '#6b7280',
                  fontWeight: isActive(item.href) ? '600' : '500',
                  fontSize: '15px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  borderBottom: isActive(item.href) ? '2px solid #4f46e5' : 'none',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  display: 'block',
                  cursor: 'pointer',
                  background: isActive(item.href) 
                    ? (darkMode ? '#374151' : '#f3f4f6')
                    : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = '#4f46e5'
                    e.currentTarget.style.backgroundColor = darkMode ? '#374151' : '#f3f4f6'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = darkMode ? '#d1d5db' : '#6b7280'
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
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
              className="btn btn-success"
              style={{
                width: '44px',
                height: '44px',
                minWidth: '44px',
                minHeight: '44px',
                position: 'relative',
                flexShrink: 0
              }}
              title="Savat"
              type="button"
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
                className="btn btn-danger"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
                title="Chiqish"
                type="button"
              >
                <LogOut size={16} />
                Chiqish
              </button>
            ) : (
              <button
                onClick={handleAdminLogin}
                className="btn btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
                title="Kirish"
                type="button"
              >
                <LogIn size={16} />
                Kirish
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {showSearch && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '100px',
            backdropFilter: 'blur(5px)'
          }}
          onClick={() => setShowSearch(false)}
        >
          <div
            style={{
              background: darkMode ? '#1f2937' : 'white',
              borderRadius: '16px',
              padding: '24px',
              width: '90%',
              maxWidth: '600px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: darkMode ? 'white' : '#1f2937',
                margin: 0
              }}>
                Mahsulot qidirish
              </h3>
              <button
                onClick={() => setShowSearch(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '6px',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}
                aria-label="Yopish"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Mahsulot nomi, brend yoki model kiriting..."
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '12px 50px 12px 16px',
                    border: `2px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    fontSize: '16px',
                    background: darkMode ? '#374151' : 'white',
                    color: darkMode ? 'white' : '#1f2937',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => e.target.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-label="Qidirish"
                >
                  <Search size={16} color="white" />
                </button>
              </div>
            </form>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Natijalar ({searchResults.length})
                </h4>
                <div style={{
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSearchResultClick(product)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        background: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = darkMode ? '#374151' : '#f3f4f6'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <img
                        src={product.image || '/vite.svg'}
                        alt={product.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          background: '#f3f4f6'
                        }}
                        onError={(e) => {
                          e.target.src = '/vite.svg'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: darkMode ? 'white' : '#1f2937',
                          marginBottom: '2px'
                        }}>
                          {product.name}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: darkMode ? '#9ca3af' : '#6b7280'
                        }}>
                          {product.brand} • {product.priceUZS?.toLocaleString()} so'm
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchQuery.trim() && searchResults.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: darkMode ? '#9ca3af' : '#6b7280'
              }}>
                <Search size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  Hech narsa topilmadi
                </div>
                <div style={{ fontSize: '14px' }}>
                  "{searchQuery}" bo'yicha natija yo'q
                </div>
              </div>
            )}

            {/* Search Tips */}
            {!searchQuery.trim() && (
              <div style={{
                background: darkMode ? '#374151' : '#f9fafb',
                borderRadius: '8px',
                padding: '16px',
                border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  marginBottom: '8px'
                }}>
                  Qidiruv maslahatlari:
                </div>
                <ul style={{
                  fontSize: '13px',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  margin: 0,
                  paddingLeft: '16px'
                }}>
                  <li>Mahsulot nomini kiriting (masalan: "iPhone 15")</li>
                  <li>Brend nomini kiriting (masalan: "Samsung")</li>
                  <li>Model nomini kiriting (masalan: "Galaxy S24")</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default WebsiteHeader
