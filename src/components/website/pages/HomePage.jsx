import { useState, useEffect, useMemo, memo } from 'react'
import { Smartphone, ShoppingCart, Star, ChevronLeft, ChevronRight, Eye, User, Heart, CheckCircle } from 'lucide-react'
import { useData } from '../../../context/DataContext'
import { useCart } from '../context/CartContext'
import WishlistButton from '../../WishlistButton'

const HomePage = () => {
  const { featuredProducts, loading } = useData()
  const { addToCart } = useCart()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [showAuthRequired, setShowAuthRequired] = useState(false)
  const [notification, setNotification] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('alisher_mobile_theme')
    return saved === 'dark'
  })

  // Loading holatini ko'rsatish
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: darkMode ? '#1f2937' : '#f8fafc'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #4f46e5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
            Ma'lumotlar yuklanmoqda...
          </p>
        </div>
      </div>
    )
  }

  const formatPrice = (value) =>
    new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      maximumFractionDigits: 0,
    }).format(value)

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

  // Promotional slider data
  const promoSlides = useMemo(() => [
    {
      id: 1,
      title: 'iPhone 15 Pro Max',
      description: 'Eng yangi iPhone modeli - A17 Pro chip bilan',
      price: 14400000,
      originalPrice: 16000000,
      discount: 10,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=400&fit=crop',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Samsung Galaxy S24 Ultra',
      description: 'Samsung flagman telefoni - 200MP kamera',
      price: 13200000,
      originalPrice: 14500000,
      discount: 9,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=400&fit=crop',
      rating: 4.8
    },
    {
      id: 3,
      title: 'Honor Magic 6 Pro',
      description: 'Honor premium telefoni - AI kamera',
      price: 9600000,
      originalPrice: 10500000,
      discount: 8,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop',
      rating: 4.7
    },
    {
      id: 4,
      title: 'ROG Phone 8 Pro',
      description: 'Gaming telefoni - 165Hz display',
      price: 12000000,
      originalPrice: 13000000,
      discount: 7,
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=400&fit=crop',
      rating: 4.9
    },
    {
      id: 5,
      title: 'OnePlus 12',
      description: 'Tez zaryadlash - 100W SuperVOOC',
      price: 10800000,
      originalPrice: 11500000,
      discount: 6,
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=400&fit=crop',
      rating: 4.6
    }
  ], [])

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % promoSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [promoSlides.length])

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % promoSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + promoSlides.length) % promoSlides.length)
  }

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setSelectedQuantity(1)
    setShowProductModal(true)
  }

  const handleAddToCart = (product) => {
    const maxStock = product.stock || 0
    
    if (selectedQuantity > maxStock) {
      setNotification({
        type: 'warning',
        message: `Faqat ${maxStock} dona mavjud!`
      })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    addToCart(product, selectedQuantity)
    setNotification({
      type: 'success',
      message: `${selectedQuantity} dona savatga qo'shildi!`
    })
    setTimeout(() => setNotification(null), 3000)
    setShowProductModal(false)
  }

  const handleQuantityChange = (change) => {
    const maxStock = selectedProduct?.stock || 0
    const newQuantity = selectedQuantity + change
    
    if (newQuantity < 1) {
      setNotification({
        type: 'warning',
        message: 'Kamida 1 dona tanlang!'
      })
      setTimeout(() => setNotification(null), 2000)
      return
    }
    
    if (newQuantity > maxStock) {
      setNotification({
        type: 'warning',
        message: `Faqat ${maxStock} dona mavjud!`
      })
      setTimeout(() => setNotification(null), 2000)
      return
    }
    
    setSelectedQuantity(newQuantity)
  }

  return (
    <div style={{ minHeight: '100vh', background: darkMode ? '#1f2937' : '#f8fafc' }}>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 3000,
          background: notification.type === 'success' ? '#10b981' : '#f59e0b',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <CheckCircle size={24} />
          <span style={{ fontSize: '16px', fontWeight: '600' }}>
            {notification.message}
          </span>
        </div>
      )}

      {/* Promotional Slider */}
      <section style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
        {promoSlides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <div style={{ maxWidth: '600px', padding: '0 20px' }}>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: '800',
                marginBottom: '16px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                {slide.title}
              </h1>
              <p style={{
                fontSize: '1.2rem',
                marginBottom: '24px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}>
                {slide.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
                <span style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>
                  {formatPrice(slide.price)}
                </span>
                {slide.originalPrice && (
                  <>
                    <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', opacity: 0.7 }}>
                      {formatPrice(slide.originalPrice)}
                    </span>
                    <span style={{
                      background: '#ef4444',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      -{slide.discount}%
                    </span>
                  </>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < Math.floor(slide.rating) ? '#fbbf24' : 'none'}
                    color="#fbbf24"
                  />
                ))}
                <span style={{ marginLeft: '8px', fontSize: '1.1rem' }}>({slide.rating})</span>
              </div>
              <button
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Batafsil ko'rish
              </button>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          <ChevronLeft size={24} color="white" />
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          <ChevronRight size={24} color="white" />
        </button>

        {/* Slide indicators */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px'
        }}>
          {promoSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            />
          ))}
        </div>
      </section>



      {/* Featured Products */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          textAlign: 'center',
          marginBottom: '50px',
          color: darkMode ? 'white' : '#1f2937'
        }}>
          Mashhur Mahsulotlar
        </h2>

        {/* Mahsulotlar yuklanish holati */}
        {!featuredProducts || featuredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: darkMode ? '#374151' : 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
          }}>
            <Smartphone size={60} color={darkMode ? '#9ca3af' : '#d1d5db'} style={{ margin: '0 auto 20px' }} />
            <p style={{
              fontSize: '1.2rem',
              color: darkMode ? '#9ca3af' : '#6b7280',
              marginBottom: '16px'
            }}>
              Hozircha mahsulotlar yo'q
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: darkMode ? '#6b7280' : '#9ca3af'
            }}>
              Tez orada yangi mahsulotlar qo'shiladi
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px',
            justifyContent: 'center'
          }}>
            {featuredProducts.slice(0, 6).map(product => {
              // Mahsulot validatsiyasi
              if (!product || !product.id || !product.name) {
                console.warn('Invalid product data:', product)
                return null
              }

              return (
                <div
                  key={product.id}
                  onClick={() => openProductModal(product)}
                  style={{
                    background: darkMode ? '#374151' : 'white',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: darkMode ? '0 8px 25px rgba(0,0,0,0.3)' : '0 8px 25px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.boxShadow = darkMode 
                      ? '0 15px 35px rgba(0,0,0,0.4)' 
                      : '0 15px 35px rgba(0,0,0,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = darkMode 
                      ? '0 8px 25px rgba(0,0,0,0.3)' 
                      : '0 8px 25px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Mahsulot rasmi */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    <Smartphone size={60} color="#9ca3af" />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Eye size={14} />
                      Ko'rish
                    </div>
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

                  {/* Mahsulot nomi */}
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: darkMode ? 'white' : '#1f2937',
                    minHeight: '2.6rem',
                    lineHeight: '1.3',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {product.name || 'Nomi kiritilmagan'}
                  </h3>

                  {/* Brand va Stock */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {product.brand || 'Brand'}
                    </span>
                    <span style={{
                      backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                      color: darkMode ? '#d1d5db' : '#6b7280',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {product.stock || 0} dona mavjud
                    </span>
                  </div>

                  {/* Narx va Rating */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto'
                  }}>
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#10b981'
                    }}>
                      {formatPrice(product.price || 0)}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < 4 ? '#fbbf24' : 'none'}
                          color="#fbbf24"
                        />
                      ))}
                      <span style={{ fontSize: '0.8rem', color: darkMode ? '#9ca3af' : '#6b7280', marginLeft: '4px' }}>
                        ({product.rating || 4.5})
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>



      {/* Product Modal */}
      {showProductModal && selectedProduct && (
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
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{
              width: '100%',
              height: '300px',
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <Smartphone size={100} color="#9ca3af" />
            </div>

            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '12px',
              color: '#1f2937'
            }}>
              {selectedProduct.name}
            </h2>

            <p style={{
              color: '#6b7280',
              marginBottom: '20px',
              fontSize: '1.1rem'
            }}>
              {selectedProduct.brand} • {selectedProduct.stock} dona mavjud
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#10b981'
              }}>
                {formatPrice(selectedProduct.price)}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < 4 ? '#fbbf24' : 'none'}
                    color="#fbbf24"
                  />
                ))}
                <span style={{ marginLeft: '8px' }}>
                  (4.{Math.floor(Math.random() * 9) + 1})
                </span>
              </div>
            </div>

            {/* Stock Info */}
            <div style={{
              padding: '12px 16px',
              background: (selectedProduct.stock || 0) > 10 ? '#dcfce7' : '#fef3c7',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: (selectedProduct.stock || 0) > 10 ? '#166534' : '#92400e'
              }}>
                Omborda mavjud:
              </span>
              <span style={{
                fontSize: '16px',
                fontWeight: '700',
                color: (selectedProduct.stock || 0) > 10 ? '#166534' : '#92400e'
              }}>
                {selectedProduct.stock || 0} dona
              </span>
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#1f2937'
              }}>
                Miqdor:
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    background: 'white',
                    fontSize: '20px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280'
                  }}
                >
                  −
                </button>
                
                <div style={{
                  flex: 1,
                  padding: '10px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: '600',
                  background: '#f9fafb'
                }}>
                  {selectedQuantity}
                </div>
                
                <button
                  onClick={() => handleQuantityChange(1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    background: 'white',
                    fontSize: '20px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '30px'
            }}>
              <button
                onClick={() => handleAddToCart(selectedProduct)}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <ShoppingCart size={20} />
                Savatga qo'shish
              </button>

              <button
                onClick={() => setShowProductModal(false)}
                style={{
                  background: darkMode ? '#4b5563' : '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                Yopish
              </button>
            </div>
          </div>
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
                  // Trigger auth modal from parent
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

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

HomePage.displayName = 'HomePage'

export default memo(HomePage)
