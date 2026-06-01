import { useState } from 'react'
import { ShoppingCart, Plus, Minus, Trash2, Heart, Search, Smartphone } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useData } from '../../context/DataContext'

const Sales = () => {
  const { t } = useLanguage()
  const { products, categories } = useData()
  const [selectedCategory, setSelectedCategory] = useState('Barchasi')
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Kategoriyalar ro'yxati
  const categoryNames = ['Barchasi', ...categories.map(cat => cat.name)]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Barchasi' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product) => {
    const stock = product.stock || product.quantity || 0
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      if (existingItem.quantity < stock) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId)
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ))
    } else {
      setCart(cart.filter(item => item.id !== productId))
    }
  }

  const deleteFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId))
    } else {
      setFavorites([...favorites, productId])
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (((item.priceUZS || item.price) || 0) * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 110px)' }}>
      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            {t('sales')}
          </h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            Mahsulotlarni tanlang va savat qo'shing
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94a3b8'
          }} />
          <input
            type="text"
            placeholder="Mahsulot qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: '40px',
              paddingRight: '12px',
              paddingTop: '12px',
              paddingBottom: '12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              width: '100%',
              fontSize: '16px'
            }}
          />
        </div>

        {/* Categories */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          {categoryNames.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: selectedCategory === category ? '#1f2937' : '#f3f4f6',
                color: selectedCategory === category ? 'white' : '#374151',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 300px)'
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} className="card" style={{ position: 'relative' }}>
              <button
                onClick={() => toggleFavorite(product.id)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 1
                }}
              >
                <Heart
                  size={20}
                  color={favorites.includes(product.id) ? '#ef4444' : '#9ca3af'}
                  fill={favorites.includes(product.id) ? '#ef4444' : 'none'}
                />
              </button>

              <div style={{
                width: '100%',
                height: '180px',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Smartphone size={48} color="#9ca3af" />
              </div>

              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                margin: '0 0 8px 0',
                color: '#1f2937'
              }}>
                {product.name}
              </h3>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span style={{
                  backgroundColor: '#f3f4f6',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#374151'
                }}>
                  {product.category}
                </span>
                <span style={{
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  {product.stock || product.quantity || 0} ta mavjud
                </span>
              </div>

              <div style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '12px'
              }}>
                {((product.priceUZS || product.price) || 0).toLocaleString()} so'm
              </div>

              <button
                onClick={() => addToCart(product)}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                disabled={!product.stock && !product.quantity}
              >
                <Plus size={16} />
                Savatga qo'shish
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Cart */}
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <ShoppingCart size={20} />
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
              Savat ({getTotalItems()})
            </h3>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: '16px'
          }}>
            {cart.length === 0 ? (
              <p style={{
                textAlign: 'center',
                color: '#6b7280',
                padding: '20px 0'
              }}>
                Savat bo'sh
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        margin: '0 0 4px 0'
                      }}>
                        {item.name}
                      </h4>
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        {((item.priceUZS || item.price) || 0).toLocaleString()} so'm
                      </p>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          background: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Minus size={12} />
                      </button>

                      <span style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        minWidth: '20px',
                        textAlign: 'center'
                      }}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => addToCart(item)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          background: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        disabled={item.quantity >= (item.stock || item.quantity || 0)}
                      >
                        <Plus size={12} />
                      </button>

                      <button
                        onClick={() => deleteFromCart(item.id)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: 'none',
                          borderRadius: '4px',
                          background: '#fef2f2',
                          color: '#ef4444',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <>
              <div style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  <span>Jami:</span>
                  <span>{getTotalPrice().toLocaleString()} so'm</span>
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Sotishni yakunlash
              </button>
            </>
          )}
        </div>

        {/* Favorites */}
        <div className="card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <Heart size={20} />
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
              Saqlanganlar ({favorites.length})
            </h3>
          </div>

          {favorites.length === 0 ? (
            <p style={{
              textAlign: 'center',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Saqlangan mahsulotlar yo'q
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {favorites.map(productId => {
                const product = products.find(p => p.id === productId)
                return (
                  <div key={productId} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '6px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: '12px',
                        fontWeight: '500',
                        margin: 0
                      }}>
                        {product?.name}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        backgroundColor: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Qo'shish
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sales
