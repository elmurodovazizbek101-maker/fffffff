import { useState, useCallback, memo } from 'react'
import WebsiteHeader from './WebsiteHeader'
import WebsiteFooter from './WebsiteFooter'
import CartSidebar from './CartSidebar'
import { CartProvider } from './context/CartContext'

const WebsiteLayout = memo(({ children }) => {
  const [showCart, setShowCart] = useState(false)

  const handleCartClick = useCallback(() => setShowCart(true), [])
  const handleCartClose = useCallback(() => setShowCart(false), [])

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
      </div>
    </CartProvider>
  )
})

WebsiteLayout.displayName = 'WebsiteLayout'

export default WebsiteLayout
