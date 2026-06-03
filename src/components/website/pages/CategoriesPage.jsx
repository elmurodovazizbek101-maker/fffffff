import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../../context/DataContext'
import { useLanguage } from '../../../context/LanguageContext'
import { Package, ArrowRight } from 'lucide-react'

const CategoriesPage = () => {
  const { categories, products } = useData()
  const { t } = useLanguage()
  const navigate = useNavigate()

  // Har bir kategoriya uchun mahsulotlar sonini hisoblash
  const getCategoryProductCount = (categoryId) => {
    return products.filter(product => product.categoryId === categoryId).length
  }

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            {t('categories')}
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Telefon va aksessuarlarning barcha kategoriyalarini ko'ring
          </p>
        </div>

        {/* Categories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {categories.map(category => (
            <div
              key={category.id}
              className="card"
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderLeft: `4px solid ${category.color}`,
                background: `linear-gradient(135deg, #ffffff 0%, ${category.color}08 100%)`,
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
                background: `linear-gradient(135deg, ${category.color}15, transparent)`,
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
                  backgroundColor: category.color,
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
                    color: 'var(--text-primary)',
                    margin: 0
                  }}>
                    {category.name}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    margin: 0
                  }}>
                    {getCategoryProductCount(category.id)} ta mahsulot
                  </p>
                </div>
              </div>

              {category.description && (
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
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
                borderTop: '1px solid var(--border-light)'
              }}>
                <span style={{
                  color: category.color,
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  Kategoriyani ko'rish
                </span>
                <ArrowRight size={20} color={category.color} />
              </div>
            </div>
          ))}
        </div>

        {/* Featured Categories Stats */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)',
          color: 'white',
          textAlign: 'center'
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
            <Package size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Hozircha kategoriyalar yo'q</h3>
            <p>Admin panel orqali kategoriya qo'shing</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoriesPage