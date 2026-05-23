import { useState, useCallback, useEffect, memo } from 'react'
import WebsiteHeader from './WebsiteHeader'
import WebsiteFooter from './WebsiteFooter'
import AuthModal from './AuthModal'
import CartSidebar from './CartSidebar'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

const WebsiteLayout = memo(({ children }) => {
  const [showAuth, setShowAuth] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const handleAuthClick = useCallback(() => setShowAuth(true), [])
  const handleAuthClose = useCallback(() => setShowAuth(false), [])
  const handleCartClick = useCallback(() => setShowCart(true), [])
  const handleCartClose = useCallback(() => setShowCart(false), [])
  const handleAuthRequired = useCallback(() => {
    setShowCart(false)
    setShowAuth(true)
  }, [])

  // Listen for auth modal open events
  useEffect(() => {
    const handleOpenAuthModal = () => setShowAuth(true)
    window.addEventListener('openAuthModal', handleOpenAuthModal)
    return () => window.removeEventListener('openAuthModal', handleOpenAuthModal)
  }, [])

  return (
    <AuthProvider>
      <CartProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <WebsiteHeader
            onAuthClick={handleAuthClick}
            onCartClick={handleCartClick}
          />

          <main style={{ flex: 1, paddingTop: '80px' }}>
            {children}
          </main>

          <WebsiteFooter />

          {/* Auth Modal */}
          <AuthModal
            isOpen={showAuth}
            onClose={handleAuthClose}
          />

          {/* Cart Sidebar */}
          <CartSidebar
            isOpen={showCart}
            onClose={handleCartClose}
            onAuthRequired={handleAuthRequired}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  )
})

WebsiteLayout.displayName = 'WebsiteLayout'

export default WebsiteLayout
