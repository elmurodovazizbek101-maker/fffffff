import { useState, useEffect } from 'react'
import { Search, Star, ShoppingCart, Smartphone, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useData } from '../../../context/DataContext'
import { useLocation } from 'react-router-dom'
import ProductFilter from '../../ProductFilter'
import WishlistButton from '../../WishlistButton'

const ProductsPage = () => {
  const location = useLocation()
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: null,
    search: '',
    inStock: false,
    isNew: false,
    sortBy: 'featured'
  })
  const [showAuthRequired, setShowAuthRequired] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('alisher_mobile_theme')
    return saved === 'dark'
  })

  const { addToCart } = useCart()
  const { filteredProducts, updateFilters } = useData()

  const handleAddToCart = (product) => {
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
    const urlParams = new URLSearchParams(location.search)
    const brandFilter = urlParams.get('brand') || urlParams.get('category')

    if (brandFilter) {
      const formattedBrand = brandFilter.charAt(0).toUpperCase() + brandFilter.slice(1).toLowerCase()
      setFilters(prev => ({ ...prev, category: formattedBrand }))
    }
  }, [location.search])

  // Update filters in DataContext
  useEffect(() => {
    updateFilters(filters)
  }, [filters, updateFilters])

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleSearch = (searchQuery) => {
    setFilters(prev => ({ ...prev, search: searchQuery }))
  }

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
      <ProductFilter
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onSearch={handleSearch}
        searchQuery={filters.search}
        totalResults={filteredProducts.length}
        darkMode={darkMode}
      />

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px',
        justifyContent: 'center'
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
              {product.stock === 0 && (
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
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px'
              }}>
                <WishlistButton 
                  product={product} 
                  size="small" 
                  darkMode={darkMode}
                />
              </div>
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

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <span style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {product.brand}
                </span>
                <span style={{
                  backgroundColor: product.stock > 5 ? '#dcfce7' : product.stock > 0 ? '#fef3c7' : '#fee2e2',
                  color: product.stock > 5 ? '#166534' : product.stock > 0 ? '#92400e' : '#dc2626',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  {product.stock} dona mavjud
                </span>
              </div>

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
                  ({product.reviews || 0} ta sharh)
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
                  disabled={product.stock === 0}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: product.stock > 0 ? '#4f46e5' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <ShoppingCart size={16} />
                  {product.stock > 0 ? 'Savatga' : 'Tugagan'}
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
