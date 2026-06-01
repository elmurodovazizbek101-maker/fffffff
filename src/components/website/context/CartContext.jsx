import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Cart storage key
const CART_STORAGE_KEY = 'alisher_mobile_cart'

// Helper function to safely parse JSON
const safeJSONParse = (str, fallback = []) => {
  try {
    const parsed = JSON.parse(str)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

// Helper function to safely stringify JSON
const safeJSONStringify = (obj) => {
  try {
    return JSON.stringify(obj)
  } catch {
    return '[]'
  }
}

// Validate cart item
const validateCartItem = (item) => {
  return (
    item &&
    typeof item === 'object' &&
    item.id &&
    item.name &&
    typeof item.price === 'number' &&
    item.price > 0 &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  )
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) {
        const parsed = safeJSONParse(saved)
        // Validate and filter cart items
        return parsed.filter(validateCartItem)
      }
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error)
    }
    return []
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Save cart to localStorage with error handling
  const saveCartToStorage = useCallback((items) => {
    try {
      const validItems = items.filter(validateCartItem)
      localStorage.setItem(CART_STORAGE_KEY, safeJSONStringify(validItems))
      setError(null)
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
      setError('Savatcha ma\'lumotlarini saqlashda xatolik yuz berdi')
    }
  }, [])

  // Auto-save cart when items change
  useEffect(() => {
    saveCartToStorage(cartItems)
  }, [cartItems, saveCartToStorage])

  // Add item to cart with validation
  const addToCart = useCallback((product, quantity = 1) => {
    try {
      setIsLoading(true)
      setError(null)

      // Validate product
      if (!product || !product.id || !product.name || typeof product.price !== 'number') {
        throw new Error('Noto\'g\'ri mahsulot ma\'lumotlari')
      }

      // Validate quantity
      const validQuantity = Math.max(1, Math.floor(Number(quantity) || 1))

      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === product.id)
        
        if (existingItem) {
          const newQuantity = existingItem.quantity + validQuantity
          // Limit quantity to prevent excessive amounts
          const limitedQuantity = Math.min(newQuantity, 99)
          
          return prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: limitedQuantity }
              : item
          )
        }
        
        return [...prev, { 
          ...product, 
          quantity: validQuantity,
          addedAt: new Date().toISOString()
        }]
      })

      return { success: true, message: 'Mahsulot savatga qo\'shildi' }
    } catch (error) {
      const errorMessage = error.message || 'Mahsulotni savatga qo\'shishda xatolik'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Remove item from cart
  const removeFromCart = useCallback((productId) => {
    try {
      setIsLoading(true)
      setError(null)

      if (!productId) {
        throw new Error('Mahsulot ID kiritilmagan')
      }

      setCartItems(prev => prev.filter(item => item.id !== productId))
      return { success: true, message: 'Mahsulot savatdan o\'chirildi' }
    } catch (error) {
      const errorMessage = error.message || 'Mahsulotni o\'chirishda xatolik'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update item quantity
  const updateQuantity = useCallback((productId, quantity) => {
    try {
      setIsLoading(true)
      setError(null)

      if (!productId) {
        throw new Error('Mahsulot ID kiritilmagan')
      }

      const validQuantity = Math.max(0, Math.floor(Number(quantity) || 0))

      if (validQuantity <= 0) {
        return removeFromCart(productId)
      }

      // Limit quantity
      const limitedQuantity = Math.min(validQuantity, 99)

      setCartItems(prev =>
        prev.map(item =>
          item.id === productId 
            ? { ...item, quantity: limitedQuantity }
            : item
        )
      )

      return { success: true, message: 'Miqdor yangilandi' }
    } catch (error) {
      const errorMessage = error.message || 'Miqdorni yangilashda xatolik'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [removeFromCart])

  // Clear entire cart
  const clearCart = useCallback(() => {
    try {
      setIsLoading(true)
      setError(null)
      setCartItems([])
      return { success: true, message: 'Savatcha tozalandi' }
    } catch (error) {
      const errorMessage = 'Savatchani tozalashda xatolik'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Get total items count
  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const quantity = Number(item.quantity) || 0
      return total + quantity
    }, 0)
  }, [cartItems])

  // Get total price
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0
      const quantity = Number(item.quantity) || 0
      return total + (price * quantity)
    }, 0)
  }, [cartItems])

  // Check if item is in cart
  const isInCart = useCallback((productId) => {
    return cartItems.some(item => item.id === productId)
  }, [cartItems])

  // Get item quantity in cart
  const getItemQuantity = useCallback((productId) => {
    const item = cartItems.find(item => item.id === productId)
    return item ? item.quantity : 0
  }, [cartItems])

  // Get cart summary
  const getCartSummary = useCallback(() => {
    const totalItems = getTotalItems()
    const totalPrice = getTotalPrice()
    const uniqueItems = cartItems.length

    return {
      totalItems,
      totalPrice,
      uniqueItems,
      isEmpty: totalItems === 0
    }
  }, [cartItems, getTotalItems, getTotalPrice])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value = {
    // State
    cartItems,
    isLoading,
    error,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    clearError,
    
    // Getters
    getTotalItems,
    getTotalPrice,
    isInCart,
    getItemQuantity,
    getCartSummary
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
