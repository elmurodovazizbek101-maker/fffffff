import { useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingCart, Smartphone } from 'lucide-react'
import { useCart } from './context/CartContext'
import CheckoutModal from './CheckoutModal'
import ErrorBoundary from '../ErrorBoundary'

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  const handleCheckout = () => {
    if (cartItems.length === 0) return
    setShowCheckout(true)
  }

  // Cart works without authentication
  const isAuthenticated = true

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1500
        }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '320px',
        maxWidth: '90vw',
        backgroundColor: 'white',
        zIndex: 1600,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShoppingCart size={18} />
            Savat ({cartItems.length})
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: '#6b7280'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 16px',
              color: '#6b7280'
            }}>
              <ShoppingCart size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <p style={{ fontSize: '14px', margin: 0 }}>
                Savat bo'sh
              </p>
              <p style={{ fontSize: '12px', margin: '6px 0 0 0' }}>
                Mahsulot qo'shing
              </p>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {cartItems.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '10px',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Smartphone size={20} color="#9ca3af" />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#1f2937',
                      margin: '0 0 4px 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.name}
                    </h4>
                    <p style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      margin: '0 0 6px 0'
                    }}>
                      {item.brand}
                    </p>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#10b981'
                    }}>
                      {(item.price || 0).toLocaleString()} so'm
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#ef4444',
                        padding: '2px'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '22px',
                          height: '22px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          background: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Minus size={10} />
                      </button>

                      <span style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        minWidth: '18px',
                        textAlign: 'center'
                      }}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '22px',
                          height: '22px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          background: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '16px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937'
              }}>
                Jami:
              </span>
              <span style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#10b981'
              }}>
                {getTotalPrice().toLocaleString()} so'm
              </span>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Buyurtma berish
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal - Must be inside CartProvider */}
      {showCheckout && (
        <ErrorBoundary>
          <CheckoutModal
            isOpen={showCheckout}
            onClose={() => {
              setShowCheckout(false)
              onClose()
            }}
          />
        </ErrorBoundary>
      )}
    </>
  )
}

export default CartSidebar
