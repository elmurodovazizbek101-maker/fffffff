import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../../context/DataContext'
import { Package, ArrowRight, Store, Smartphone, Tag } from 'lucide-react'

const CategoriesPage = () => {
  const { categories = [], products = [] } = useData()
  const navigate = useNavigate()

  // Har bir kategoriya uchun mahsulotlar sonini hisoblash
  const getCategoryProductCount = (categoryId) => {
    return products.filter(product => product.categoryId === categoryId).length
  }

  // Brendlar bo'yicha mahsulotlar sonini hisoblash
  const getBrandProductCount = (brandName) => {
    return products.filter(product => 
      product.brand && product.brand.toLowerCase() === brandName.toLowerCase()
    ).length
  }

  // Mashhur brendlarni olish
  const popularBrands = [
    { name: 'Apple', color: '#007AFF' },
    { name: 'Samsung', color: '#1428A0' },
    { name: 'Xiaomi', color: '#FF6900' },
    { name: 'Honor', color: '#FF6B35' },
    { name: 'Oppo', color: '#1BA784' },
    { name: 'Vivo', color: '#4285F4' },
    { name: 'Nokia', color: '#124191' },
    { name: 'ROG', color: '#FF0000' },
    { name: 'Redmi', color: '#FF6900' },
    { name: 'Poco', color: '#F7DC06' },
    { name: 'OnePlus', color: '#EB0028' },
    { name: 'Realme', color: '#FFC400' }
  ].filter(brand => getBrandProductCount(brand.name) > 0)
    .sort((a, b) => getBrandProductCount(b.name) - getBrandProductCount(a.name))

  if (!categories || categories.length === 0) {
    return (
      <div style={{ 
        padding: '4rem 1rem',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '2rem'
        }}>
          Kategoriyalar
        </h1>
        <div style={{
          padding: '4rem 2rem'
        }}>
          <Store size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ marginBottom: '0.5rem' }}>Kategoriyalar yuklanmoqda...</h3>
          <p>Iltimos, biroz kuting</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      padding: '2rem 1rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          marginBottom: '1rem'
        }}>
          Kategoriyalar
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Telefon brendlari va kategoriyalarning to'liq ro'yxati
        </p>
      </div>

      {/* Brendlar bo'limi */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <Smartphone size={28} color="#4f46e5" />
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            margin: 0
          }}>
            Mashhur brendlar
          </h2>
        </div>
        
        {popularBrands.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {popularBrands.map(brand => (
              <div
                key={brand.name}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderLeft: `4px solid ${brand.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onClick={() => navigate(`/products?brand=${brand.name}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    margin: '0 0 0.5rem 0',
                    color: brand.color
                  }}>
                    {brand.name}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    {getBrandProductCount(brand.name)} ta mahsulot
                  </p>
                </div>
                <ArrowRight size={20} color={brand.color} />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
            Hozircha brendlar yo'q
          </p>
        )}
      </div>

      {/* Kategoriyalar bo'limi */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <Tag size={28} color="#10b981" />
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            margin: 0
          }}>
            Kategoriyalar
          </h2>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {categories.map(category => (
              <div
                key={category.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderLeft: `4px solid ${category.color || '#4f46e5'}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => navigate(`/products?category=${category.id}`)}
              >
                {/* Background pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: `linear-gradient(135deg, ${category.color || '#4f46e5'}15, transparent)`,
                  borderRadius: '0 0 0 100px'
                }} />
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: category.color || '#4f46e5',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    <Package size={28} color="white" />
                  </div>
                  
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      {category.name}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {getCategoryProductCount(category.id)} ta mahsulot
                    </p>
                  </div>
                </div>

                {category.description && (
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem'
                  }}>
                    {category.description}
                  </p>
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <span style={{
                    color: category.color || '#4f46e5',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    Kategoriyani ko'rish
                  </span>
                  <ArrowRight size={20} color={category.color || '#4f46e5'} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Categories Stats */}
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          color: 'white',
          textAlign: 'center',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Jami Statistika
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                {categories.length}
              </div>
              <div style={{ opacity: 0.9 }}>
                Jami kategoriyalar
              </div>
            </div>
            
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                {products.length}
              </div>
              <div style={{ opacity: 0.9 }}>
                Jami mahsulotlar
              </div>
            </div>
            
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                {products.filter(p => p.stock > 0).length}
              </div>
              <div style={{ opacity: 0.9 }}>
                Mavjud mahsulotlar
              </div>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {categories.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'var(--text-muted)'
          }}>
            <Store size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Hozircha kategoriyalar yo'q</h3>
            <p>Admin panel orqali kategoriya qo'shing</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoriesPage