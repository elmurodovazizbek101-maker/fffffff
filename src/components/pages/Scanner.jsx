import { useState } from 'react'
import { Search, Scan, Package, QrCode, Camera, Smartphone } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const Scanner = () => {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [scanResult, setScanResult] = useState(null)
  const [isScanning, setIsScanning] = useState(false)

  // Sample products database
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      barcode: '1234567890123',
      category: 'Apple',
      price: 14400000,
      stock: 15,
      description: 'Apple iPhone 15 Pro Max 256GB Natural Titanium'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      barcode: '2345678901234',
      category: 'Samsung',
      price: 13200000,
      stock: 8,
      description: 'Samsung Galaxy S24 Ultra 512GB Titanium Gray'
    },
    {
      id: 3,
      name: 'Xiaomi 14 Pro',
      barcode: '3456789012345',
      category: 'Xiaomi',
      price: 9600000,
      stock: 12,
      description: 'Xiaomi 14 Pro 256GB Black'
    },
    {
      id: 4,
      name: 'iPhone 15',
      barcode: '4567890123456',
      category: 'Apple',
      price: 11200000,
      stock: 20,
      description: 'Apple iPhone 15 128GB Blue'
    }
  ]

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.length > 0) {
      const result = products.find(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.barcode.includes(query) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      setScanResult(result || null)
    } else {
      setScanResult(null)
    }
  }

  const simulateScan = () => {
    setIsScanning(true)
    // Simulate scanning delay
    setTimeout(() => {
      const randomProduct = products[Math.floor(Math.random() * products.length)]
      setScanResult(randomProduct)
      setSearchQuery(randomProduct.barcode)
      setIsScanning(false)
    }, 2000)
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Tugagan', color: '#ef4444' }
    if (stock <= 5) return { text: 'Kam qolgan', color: '#f59e0b' }
    return { text: 'Mavjud', color: '#10b981' }
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1f2937',
          margin: 0
        }}>
          {t('scanner')}
        </h1>
        <p style={{ color: '#6b7280', marginTop: '4px' }}>
          Mahsulotlarni skanerlash va qidirish tizimi
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '24px'
      }}>
        {/* Scanner Section */}
        <div className="card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <Scan size={24} color="#4f46e5" />
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: 0,
              color: '#1f2937'
            }}>
              Barcode Skaner
            </h2>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 20px',
            border: '2px dashed #d1d5db',
            borderRadius: '12px',
            backgroundColor: '#f9fafb',
            marginBottom: '20px'
          }}>
            {isScanning ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid #f3f4f6',
                  borderTop: '4px solid #4f46e5',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px'
                }} />
                <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
                  Skanerlash...
                </p>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Camera size={48} color="#9ca3af" style={{ marginBottom: '16px' }} />
                <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
                  Mahsulotni skanerlash uchun tugmani bosing
                </p>
              </div>
            )}
          </div>

          <button
            onClick={simulateScan}
            disabled={isScanning}
            className="btn btn-primary"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px'
            }}
          >
            <QrCode size={20} />
            {isScanning ? 'Skanerlash...' : 'Skanerlashni boshlash'}
          </button>
        </div>

        {/* Search Section */}
        <div className="card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <Search size={24} color="#4f46e5" />
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: 0,
              color: '#1f2937'
            }}>
              Qidiruv tizimi
            </h2>
          </div>

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
              placeholder="Mahsulot nomi, barcode yoki kategoriya..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
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

          <div style={{
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <Package size={32} color="#9ca3af" style={{ marginBottom: '12px' }} />
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
              Qidirish uchun mahsulot nomini yoki barcode ni kiriting
            </p>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {scanResult && (
        <div className="card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <Package size={24} color="#10b981" />
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: 0,
              color: '#1f2937'
            }}>
              Mahsulot ma'lumotlari
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '24px',
            alignItems: 'start'
          }}>
            {/* Product Image */}
            <div style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Smartphone size={64} color="#9ca3af" />
            </div>

            {/* Product Details */}
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: '0 0 8px 0',
                  color: '#1f2937'
                }}>
                  {scanResult.name}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {scanResult.description}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '4px'
                  }}>
                    Kategoriya
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    {scanResult.category}
                  </div>
                </div>

                <div style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '4px'
                  }}>
                    Barcode
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    fontFamily: 'monospace'
                  }}>
                    {scanResult.barcode}
                  </div>
                </div>

                <div style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '4px'
                  }}>
                    Narx
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#10b981'
                  }}>
                    {scanResult.price.toLocaleString()} so'm
                  </div>
                </div>

                <div style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '4px'
                  }}>
                    Omborda
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: getStockStatus(scanResult.stock).color
                  }}>
                    {scanResult.stock} dona
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: getStockStatus(scanResult.stock).color,
                    fontWeight: '500'
                  }}>
                    {getStockStatus(scanResult.stock).text}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Savatga qo'shish
                </button>
                <button
                  className="btn btn-secondary"
                >
                  Tahrirlash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Access Products */}
      <div className="card">
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#1f2937'
        }}>
          Tez kirish - Mashhur mahsulotlar
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {products.slice(0, 4).map(product => {
            const status = getStockStatus(product.stock)

            return (
              <div
                key={product.id}
                style={{
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: 'white'
                }}
                onClick={() => {
                  setScanResult(product)
                  setSearchQuery(product.name)
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#4f46e5'
                  e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#1f2937'
                  }}>
                    {product.name}
                  </h4>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: `${status.color}20`,
                    color: status.color,
                    fontWeight: '500'
                  }}>
                    {status.text}
                  </span>
                </div>

                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: '0 0 8px 0'
                }}>
                  {product.category}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#10b981'
                  }}>
                    {(product.price / 1000000).toFixed(1)}M so'm
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    {product.stock} dona
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Scanner
