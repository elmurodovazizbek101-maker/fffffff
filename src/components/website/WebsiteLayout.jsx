import { useState, useCallback, memo, useEffect } from 'react'
import WebsiteHeader from './WebsiteHeader'
import WebsiteFooter from './WebsiteFooter'
import CartSidebar from './CartSidebar'
import LoginModal from './LoginModal'
import { CartProvider } from './context/CartContext'

const WebsiteLayout = memo(({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleCartClick = useCallback(() => setShowCart(true), [])
  const handleCartClose = useCallback(() => setShowCart(false), [])
  const handleLoginSuccess = useCallback(() => setShowLoginModal(false), [])

  // Listen for auth modal events
  useEffect(() => {
    const handleOpenAuthModal = () => setShowLoginModal(true)
    window.addEventListener('openAuthModal', handleOpenAuthModal)
    return () => window.removeEventListener('openAuthModal', handleOpenAuthModal)
  }, [])

  return (
    <CartProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <WebsiteHeader onCartClick={handleCartClick} />

        <main style={{ flex: 1, paddingTop: '80px' }}>
          {children}
        </main>

        <WebsiteFooter />

        {/* Cart Sidebar */}
        <CartSidebar
          isOpen={showCart}
          onClose={handleCartClose}
        />

        {/* Login Modal */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      </div>
    </CartProvider>
  )
})

WebsiteLayout.displayName = 'WebsiteLayout'

export default WebsiteLayout
