import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Smartphone, ChevronRight, Apple, Zap, Shield, Gamepad2, Flame, Plus, Circle, Hexagon, Star } from 'lucide-react'
import { useData } from '../../../context/DataContext'

const CategoriesPage = () => {
  const navigate = useNavigate()
  const { activeProducts } = useData()
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('alisher_mobile_theme')
    return saved === 'dark'
  })

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

  // Get unique brands with product counts
  const brandStats = activeProducts.reduce((acc, product) => {
    const brand = product.brand || 'Boshqa'
    if (!acc[brand]) {
      acc[brand] = {
        name: brand,
        count: 0,
        totalValue: 0,
        products: []
      }
    }
    acc[brand].count++
    acc[brand].totalValue += product.price || 0
    acc[brand].products.push(product)
    return acc
  }, {})

  const brands = Object.values(brandStats).sort((a, b) => b.count - a.count)

  const handleBrandClick = (brandName) => {
    navigate(`/products?brand=${brandName}`)
  }

  // Brand icons mapping
  const brandIcons = {
    'Apple': Apple,
    'Samsung': Smartphone,
    'Honor': Shield,
    'Vivo': Circle,
    'Nokia': Hexagon,
    'OnePlus': Plus,
    'Redmi': Flame,
    'Oppo': Star,
    'Realme': Zap,
    'ROG': Gamepad2,
    'Xiaomi': Smartphone
  }

  const brandColors = {
    'Apple': '#000000',
    'Samsung': '#1428A0',
    'Honor': '#ED1C24',
    'Vivo': '#0066CC',
    'Nokia': '#124191',
    'OnePlus': '#F50514',
    'Redmi': '#FF6900',
    'Oppo': '#00A368',
    'Realme': '#FFD700',
    'ROG': '#FF0000',
    'Xiaomi': '#FF6900'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? '#1f2937' : '#f8fafc',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '16px'
          }}>
            Kataloglar
          </h1>
          <p style={{
            fontSize: '20px',
            color: darkMode ? '#9ca3af' : '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Barcha brendlar va ularning mahsulotlari
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '50px'
        }}>
          <div style={{
            background: darkMode ? '#374151' : 'white',
            padding: '30px',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: darkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#4f46e5',
              marginBottom: '8px'
            }}>
              {brands.length}
            </div>
            <div style={{
              fontSize: '16px',
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}>
              Jami brendlar
            </div>
          </div>

          <div style={{
            background: darkMode ? '#374151' : 'white',
            padding: '30px',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: darkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#10b981',
              marginBottom: '8px'
            }}>
              {activeProducts.length}
            </div>
            <div style={{
              fontSize: '16px',
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}>
              Jami mahsulotlar
            </div>
          </div>

          <div style={{
            background: darkMode ? '#374151' : 'white',
            padding: '30px',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: darkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#f59e0b',
              marginBottom: '8px'
            }}>
              {brands[0]?.name || 'N/A'}
            </div>
            <div style={{
              fontSize: '16px',
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}>
              Eng ko'p mahsulot
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {brands.map(brand => {
            const BrandIcon = brandIcons[brand.name] || Smartphone
            const brandColor = brandColors[brand.name] || '#4f46e5'

            return (
              <div
                key={brand.name}
                onClick={() => handleBrandClick(brand.name)}
                style={{
                  background: darkMode ? '#374151' : 'white',
                  borderRadius: '20px',
                  padding: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: darkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)',
                  border: `2px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)'
                  e.currentTarget.style.borderColor = brandColor
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = darkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.05)'
                  e.currentTarget.style.borderColor = darkMode ? '#4b5563' : '#e5e7eb'
                }}
              >
                {/* Brand Icon */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${brandColor}22, ${brandColor}44)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <BrandIcon size={40} color={brandColor} strokeWidth={2} />
                </div>

              {/* Brand Name */}
              <h3 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: darkMode ? 'white' : '#1f2937',
                marginBottom: '12px'
              }}>
                {brand.name}
              </h3>

              {/* Stats */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    Mahsulotlar:
                  </span>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: darkMode ? 'white' : '#1f2937'
                  }}>
                    {brand.count} ta
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    O'rtacha narx:
                  </span>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#10b981'
                  }}>
                    {Math.round(brand.totalValue / brand.count / 1000000)} mln
                  </span>
                </div>
              </div>

              {/* View Button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: darkMode ? '#4b5563' : '#f3f4f6',
                borderRadius: '12px',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? 'white' : '#1f2937'
                }}>
                  Mahsulotlarni ko'rish
                </span>
                <ChevronRight size={20} color={darkMode ? 'white' : '#1f2937'} />
              </div>

              {/* Popular Badge */}
              {brand.count >= 5 && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#10b981',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  Mashhur
                </div>
              )}
            </div>
            );
          })}
        </div>

        {/* Empty State */}
        {brands.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: darkMode ? '#9ca3af' : '#6b7280'
          }}>
            <Smartphone size={80} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
            <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>
              Hozircha brendlar yo'q
            </h3>
            <p style={{ fontSize: '16px' }}>
              Admin paneldan mahsulotlar qo'shing
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoriesPage
