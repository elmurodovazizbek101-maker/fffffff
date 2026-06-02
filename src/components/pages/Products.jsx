import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Package, AlertTriangle, XCircle } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useData } from '../../context/DataContext'

const Products = () => {
  const { t } = useLanguage()
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData()
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    priceUSD: '',
    priceUZS: '',
    quantity: '',
    unit: 'dona',
    description: '',
    image: null
  })

  const categoryNames = categories.map(cat => cat.name)
  const units = ['dona', 'quti', 'metr']

  const totalProducts = products.length
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity <= 5).length
  const outOfStock = products.filter(p => p.quantity === 0).length
  const totalValue = products.reduce((sum, p) => {
    const price = p.priceUZS || 0
    const quantity = p.quantity || 0
    return sum + (price * quantity)
  }, 0)

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddProduct = (e) => {
    e.preventDefault()
    const product = {
      ...newProduct,
      priceUSD: parseFloat(newProduct.priceUSD),
      priceUZS: parseFloat(newProduct.priceUZS),
      quantity: parseInt(newProduct.quantity),
      featured: false
    }
    addProduct(product)
    setNewProduct({
      name: '',
      category: '',
      priceUSD: '',
      priceUZS: '',
      quantity: '',
      unit: 'dona',
      description: '',
      image: null
    })
    setShowAddModal(false)
  }

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
  }

  const getStockStatus = (quantity) => {
    const stock = quantity || 0
    if (stock === 0) return { text: 'Tugagan', color: '#ef4444', icon: XCircle }
    if (stock <= 5) return { text: 'Kam qolgan', color: '#f59e0b', icon: AlertTriangle }
    return { text: 'Mavjud', color: '#10b981', icon: Package }
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            {t('products')}
          </h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            Barcha mahsulotlarni boshqarish
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={20} />
          {t('create')}
        </button>
      </div>

      {/* Stats Cards - 4 ustun */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <Package size={32} color="#4f46e5" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {totalProducts}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            {t('totalProducts')}
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <AlertTriangle size={32} color="#f59e0b" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {lowStock}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            {t('lowStock')}
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <XCircle size={32} color="#ef4444" style={{ margin: '0 auto 8px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {outOfStock}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            {t('outOfStock')}
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '32px',
            color: '#10b981',
            margin: '0 auto 8px',
            fontWeight: 'bold'
          }}>
            ₹
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
            {(totalValue / 1000000).toFixed(1)}M so'm
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Jami qiymat
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
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
                paddingTop: '8px',
                paddingBottom: '8px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                width: '100%'
              }}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              minWidth: '150px'
            }}
          >
            <option value="all">Barcha kategoriyalar</option>
            {categoryNames.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" style={{ fontSize: '14px' }}>
              {t('select')}
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid - 3 ustun (katta kartochkalar) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px'
      }}>
        {filteredProducts.map(product => {
          const status = getStockStatus(product.quantity || product.stock)
          const StatusIcon = status.icon

          return (
            <div key={product.id} className="card">
              <div style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Package size={48} color="#9ca3af" />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  margin: '0 0 4px 0',
                  color: '#1f2937'
                }}>
                  {product.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {product.description}
                </p>
              </div>

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
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: status.color
                }}>
                  <StatusIcon size={16} />
                  <span style={{ fontSize: '12px', fontWeight: '500' }}>
                    {status.text}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px'
                }}>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>
                    ${product.priceUSD || 0}
                  </span>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    {product.quantity || 0} {product.unit || 'dona'}
                  </span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981' }}>
                  {((product.priceUZS || product.price) || 0).toLocaleString()} so'm
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'flex-end'
              }}>
                <button
                  className="btn"
                  style={{
                    padding: '8px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151'
                  }}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="btn"
                  style={{
                    padding: '8px',
                    backgroundColor: '#fef2f2',
                    color: '#ef4444'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Yangi mahsulot qo'shish
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddProduct}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {t('productName')}
                </label>
                <input
                  type="text"
                  className="input"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {t('shortDescription')}
                </label>
                <textarea
                  className="input"
                  rows="3"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {t('category')}
                  </label>
                  <select
                    className="input"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    required
                  >
                    <option value="">Kategoriya tanlang</option>
                    {categoryNames.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Birlik
                  </label>
                  <select
                    className="input"
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Narx (USD)
                  </label>
                  <input
                    type="number"
                    className="input"
                    value={newProduct.priceUSD}
                    onChange={(e) => setNewProduct({...newProduct, priceUSD: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Narx (UZS)
                  </label>
                  <input
                    type="number"
                    className="input"
                    value={newProduct.priceUZS}
                    onChange={(e) => setNewProduct({...newProduct, priceUZS: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {t('quantity')}
                </label>
                <input
                  type="number"
                  className="input"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {t('image')}
                </label>
                <input
                  type="file"
                  className="input"
                  accept="image/*"
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.files[0]})}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
