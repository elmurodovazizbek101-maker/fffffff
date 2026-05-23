import { useState, useEffect } from 'react'
import { Search, Filter, Star, ShoppingCart, Smartphone, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useData } from '../../../context/DataContext'

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showAuthRequired, setShowAuthRequired] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('alisher_mobile_theme')
    return saved === 'dark'
  })

  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { activeProducts } = useData()

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      setShowAuthRequired(true)
      return
    }
    addToCart(product, 1)
  }

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      setDarkMode(theme === 'dark')
    }

    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => observer.disconnect()
  }, [])

  // Check for brand filter from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const brandFilter = urlParams.get('brand')
    if (brandFilter) {
      setSelectedCategory(brandFilter)
    }
  }, [])

  const categories = ['all', 'Apple', 'Samsung', 'Honor', 'Vivo', 'Nokia', 'ROG', 'Redmi', 'OnePlus', 'Oppo', 'Realme']

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      category: 'Apple',
      price: 14400000,
      priceUZS: 14400000,
      rating: 4.9,
      reviews: 128,
      inStock: true,
      image: '/api/placeholder/300/300'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Samsung',
      price: 13200000,
      priceUZS: 13200000,
      rating: 4.8,
      reviews: 95,
      inStock: true,
      image: '/api/placeholder/300/300'
    },
    {
      id: 3,
      name: 'Honor Magic 6 Pro',
      category: 'Honor',
      price: 9600000,
      priceUZS: 9600000,
      rating: 4.7,
      reviews: 76,
      inStock: true,
      image: '/api/placeholder/300/300'
    },
    {
      id: 4,
      name: 'iPhone 15',
      category: 'Apple',
      price: 11200000,
      priceUZS: 11200000,
      rating: 4.8,
      reviews: 203,
      inStock: true,
      image: '/api/placeholder/300/300'
    },
    {
      id: 5,
      name: 'Vivo X100 Pro',
      category: 'Vivo',
      price: 9000000,
      priceUZS: 9000000,
      rating: 4.6,
      reviews: 87,
      inStock: false,
      image: '/api/placeholder/300/300'
    },
    {
      id: 6,
      name: 'Nokia G60 5G',
      category: 'Nokia',
      price: 3600000,
      priceUZS: 3600000,
      rating: 4.5,
      reviews: 54,
      inStock: true,
      image: '/api/placeholder/300/300'
    },
    {
      id: 7,
      name: 'ROG Phone 8 Pro',
      category: 'ROG',
      price: 12000000,
      priceUZS: 12000000,
      rating: 4.9,
      reviews: 42,
      inStock: true,
      image: '/api/placeholder/300/300'
    },
    {
      id: 8,
      name: 'Redmi Note 13 Pro',
      category: 'Redmi',
      price: 4800000,
      priceUZS: 4800000,
      rating: 4.4,
      reviews: 156,
      inStock: true,
      image: '/api/placeholder/300/300'
    },
    {
      id: 9,
      name: 'OnePlus 12',
      category: 'OnePlus',
      price: 10800000,
      priceUZS: 10800000,
      rating: 4.7,
      reviews: 89,
      inStock: true,
      image: '/api/placeholder/300/300'
    },
    {
      id: 10,
      name: 'Oppo Find X7 Pro',
      category: 'Oppo',
      price: 10200000,
      priceUZS: 10200000,
      rating: 4.6,
      reviews: 67,
      inStock: true,
      image: '/api/placeholder/300/300'
    },
    {
      id: 11,
      name: 'Realme GT 5 Pro',
      category: 'Realme',
      price: 7200000,
      priceUZS: 7200000,
      rating: 4.5,
      reviews: 93,
      inStock: true,
      image: '/api/placeholder/300/300'
    }
  ]

  const filteredProducts = activeProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.brand === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return (b.rating || 4.5) - (a.rating || 4.5)
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m'
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      background: darkMode ? '#1f2937' : 'transparent',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '16px'
        }}>
          Mahsulotlar
        </h1>
        <p style={{ fontSize: '18px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
          Eng yangi smartfonlar va aksessuarlar
        </p>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search size={20} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af'
          }} />
          <input
            type="text"
            placeholder="Mahsulot qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '44px',
              paddingRight: '16px',
              paddingTop: '12px',
              paddingBottom: '12px',
              border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
              borderRadius: '8px',
              fontSize: '16px',
              background: darkMode ? '#374151' : 'white',
              color: darkMode ? 'white' : 'black'
            }}
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '12px 16px',
            border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
            borderRadius: '8px',
            fontSize: '16px',
            minWidth: '150px',
            background: darkMode ? '#374151' : 'white',
            color: darkMode ? 'white' : 'black'
          }}
        >
          <option value="all">Barcha kategoriyalar</option>
          {categories.slice(1).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '12px 16px',
            border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
            borderRadius: '8px',
            fontSize: '16px',
            minWidth: '150px',
            background: darkMode ? '#374151' : 'white',
            color: darkMode ? 'white' : 'black'
          }}
        >
          <option value="name">Nomi bo'yicha</option>
          <option value="price-low">Arzon narx</option>
          <option value="price-high">Qimmat narx</option>
          <option value="rating">Reyting bo'yicha</option>
        </select>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: '30px' }}>
        <p style={{ fontSize: '16px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
          {filteredProducts.length} ta mahsulot topildi
        </p>
      </div>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{
            backgroundColor: darkMode ? '#374151' : 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            border: `1px solid ${darkMode ? '#4b5563' : '#f3f4f6'}`
          }}>
            {/* Product Image */}
            <div style={{
              width: '100%',
              height: '250px',
              backgroundColor: darkMode ? '#4b5563' : '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <Smartphone size={80} color={darkMode ? '#6b7280' : '#9ca3af'} />
              {product.quantity === 0 && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  Tugagan
                </div>
              )}
            </div>

            {/* Product Info */}
            <div style={{ padding: '24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  {product.name}
                </h3>
              </div>

              <p style={{
                fontSize: '14px',
                color: darkMode ? '#9ca3af' : '#6b7280',
                marginBottom: '12px'
              }}>
                {product.brand} • {product.quantity} dona mavjud
              </p>

              {/* Rating */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>
                    {product.rating || 4.5}
                  </span>
                </div>
                <span style={{ fontSize: '14px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                  ({Math.floor(Math.random() * 200) + 50} ta sharh)
                </span>
              </div>

              {/* Price and Add to Cart */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#10b981'
                  }}>
                    {formatPrice(product.price)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.quantity === 0}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: product.quantity > 0 ? '#4f46e5' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    cursor: product.quantity > 0 ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <ShoppingCart size={16} />
                  {product.quantity > 0 ? 'Savatga' : 'Tugagan'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: darkMode ? '#9ca3af' : '#6b7280'
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
            Hech narsa topilmadi
          </h3>
          <p>Qidiruv so'zini o'zgartiring yoki filtrlarni qayta sozlang</p>
        </div>
      )}

      {/* Auth Required Modal */}
      {showAuthRequired && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            background: darkMode ? '#374151' : 'white',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#4f46e5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <User size={30} color="white" />
            </div>

            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '12px',
              color: darkMode ? 'white' : '#1f2937'
            }}>
              Ro'yxatdan o'ting
            </h2>

            <p style={{
              color: darkMode ? '#9ca3af' : '#6b7280',
              marginBottom: '24px',
              lineHeight: '1.5'
            }}>
              Mahsulotlarni savatga qo'shish uchun avval ro'yxatdan o'tishingiz kerak.
            </p>

            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={() => {
                  setShowAuthRequired(false)
                  window.dispatchEvent(new CustomEvent('openAuthModal'))
                }}
                style={{
                  flex: 1,
                  background: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Ro'yxatdan o'tish
              </button>

              <button
                onClick={() => setShowAuthRequired(false)}
                style={{
                  background: darkMode ? '#4b5563' : '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsPage
