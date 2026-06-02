import React, { createContext, useContext, useState, useEffect } from 'react'
import { realProducts, categories, filterProducts, getProductById, getRecommendedProducts } from '../data/products.js'
import databaseService from '../services/databaseService'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  // Database ulanish holati
  const [isOnline, setIsOnline] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mahsulotlar holati
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [productFilters, setProductFilters] = useState({
    category: 'all',
    priceRange: null,
    search: '',
    inStock: false,
    isNew: false,
    sortBy: 'featured'
  })

  // Kategoriyalar holati
  const [categories, setCategories] = useState(() => {
    try {
      const savedCategories = localStorage.getItem('alisher_mobile_categories')
      return savedCategories ? JSON.parse(savedCategories) : [
        { id: 1, name: 'Apple', color: '#007AFF', productCount: 0 },
        { id: 2, name: 'Samsung', color: '#1428A0', productCount: 0 },
        { id: 3, name: 'Xiaomi', color: '#FF6900', productCount: 0 },
        { id: 4, name: 'Oppo', color: '#1BA345', productCount: 0 },
        { id: 5, name: 'Vivo', color: '#4285F4', productCount: 0 },
        { id: 6, name: 'Huawei', color: '#FF0000', productCount: 0 }
      ]
    } catch (error) {
      console.error('Kategoriyalarni yuklash xatoligi:', error)
      return [
        { id: 1, name: 'Apple', color: '#007AFF', productCount: 0 },
        { id: 2, name: 'Samsung', color: '#1428A0', productCount: 0 },
        { id: 3, name: 'Xiaomi', color: '#FF6900', productCount: 0 },
        { id: 4, name: 'Oppo', color: '#1BA345', productCount: 0 },
        { id: 5, name: 'Vivo', color: '#4285F4', productCount: 0 },
        { id: 6, name: 'Huawei', color: '#FF0000', productCount: 0 }
      ]
    }
  })

  // Savatcha holati
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('alisher_mobile_cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Savatcha ma\'lumotlarini yuklash xatoligi:', error)
      return []
    }
  })

  // Sevimlilar holati
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('alisher_mobile_wishlist')
      return savedWishlist ? JSON.parse(savedWishlist) : []
    } catch (error) {
      console.error('Sevimlilar ma\'lumotlarini yuklash xatoligi:', error)
      return []
    }
  })

  // Buyurtmalar holati
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('alisher_mobile_orders')
      return savedOrders ? JSON.parse(savedOrders) : []
    } catch (error) {
      console.error('Buyurtmalar ma\'lumotlarini yuklash xatoligi:', error)
      return []
    }
  })

  // Mijozlar holati
  const [customers, setCustomers] = useState(() => {
    try {
      const savedCustomers = localStorage.getItem('alisher_mobile_customers')
      return savedCustomers ? JSON.parse(savedCustomers) : [
        {
          id: 1,
          name: 'Akmal Karimov',
          phone: '+998901234567',
          region: 'Toshkent',
          district: 'Chilonzor',
          joinDate: '2024-01-15',
          totalPurchases: 15,
          totalAmount: 45000000,
          notes: 'Doimiy mijoz, iPhone foydalanuvchisi'
        },
        {
          id: 2,
          name: 'Dilshod Toshev',
          phone: '+998907654321',
          region: 'Samarqand',
          district: 'Markaz',
          joinDate: '2024-02-20',
          totalPurchases: 8,
          totalAmount: 24000000,
          notes: 'Samsung mahsulotlarini afzal ko\'radi'
        },
        {
          id: 3,
          name: 'Nodira Saidova',
          phone: '+998909876543',
          region: 'Andijon',
          district: 'Xo\'jaobod',
          joinDate: '2024-03-10',
          totalPurchases: 12,
          totalAmount: 32000000,
          notes: 'Xiaomi va Oppo brendlarini tanlaydi'
        }
      ]
    } catch (error) {
      console.error('Mijozlar ma\'lumotlarini yuklash xatoligi:', error)
      return []
    }
  })

  // Database dan ma'lumotlarni yuklash
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Database service lazy initialization qiladi - tezroq
        const productsData = await databaseService.getProducts(productFilters)
        setProducts(productsData)
        setFilteredProducts(productsData)
        setIsOnline(databaseService.isConnected)
        
        console.log(`📊 ${productsData.length} ta mahsulot yuklandi`)
      } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xatolik:', error)
        // Fallback: realProducts dan yuklash
        setProducts(realProducts)
        setFilteredProducts(realProducts)
        setIsOnline(false)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Mahsulotlarni filtrlash (database yoki localStorage)
  useEffect(() => {
    const loadFilteredProducts = async () => {
      try {
        const filtered = await databaseService.getProducts(productFilters)
        setFilteredProducts(filtered)
      } catch (error) {
        console.error('Filtrlashda xatolik:', error)
        // Fallback: lokal filtrlash
        const filtered = filterProducts(products, productFilters)
        setFilteredProducts(filtered)
      }
    }

    loadFilteredProducts()
  }, [productFilters])

  // Savatcha o'zgarishlarini localStorage ga saqlash
  useEffect(() => {
    try {
      localStorage.setItem('alisher_mobile_cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Savatcha ma\'lumotlarini saqlash xatoligi:', error)
    }
  }, [cart])

  // Sevimlilar o'zgarishlarini localStorage ga saqlash
  useEffect(() => {
    try {
      localStorage.setItem('alisher_mobile_wishlist', JSON.stringify(wishlist))
    } catch (error) {
      console.error('Sevimlilar ma\'lumotlarini saqlash xatoligi:', error)
    }
  }, [wishlist])

  // Kategoriya funksiyalari
  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: `category_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setCategories(prev => {
      const updated = [...prev, newCategory]
      // localStorage ga saqlash
      try {
        localStorage.setItem('alisher_mobile_categories', JSON.stringify(updated))
      } catch (error) {
        console.error('Kategoriyani saqlash xatoligi:', error)
      }
      return updated
    })
    return newCategory
  }

  const updateCategory = (id, updates) => {
    setCategories(prev => {
      const updated = prev.map(category => 
        category.id === id 
          ? { ...category, ...updates, updatedAt: new Date().toISOString() }
          : category
      )
      // localStorage ga saqlash
      try {
        localStorage.setItem('alisher_mobile_categories', JSON.stringify(updated))
      } catch (error) {
        console.error('Kategoriyani yangilash xatoligi:', error)
      }
      return updated
    })
  }

  const deleteCategory = (id) => {
    setCategories(prev => {
      const updated = prev.filter(category => category.id !== id)
      // localStorage ga saqlash
      try {
        localStorage.setItem('alisher_mobile_categories', JSON.stringify(updated))
      } catch (error) {
        console.error('Kategoriyani o\'chirish xatoligi:', error)
      }
      return updated
    })
  }

  // Mahsulot funksiyalari (Database bilan)
  const addProduct = async (product) => {
    try {
      const result = await databaseService.addProduct({
        ...product,
        id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      })
      
      if (result.success) {
        setProducts(prev => [...prev, result.data])
        return result.data
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Mahsulot qo\'shishda xatolik:', error)
      // Fallback: localStorage
      const newProduct = {
        ...product,
        id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setProducts(prev => [...prev, newProduct])
      return newProduct
    }
  }

  const updateProduct = async (id, updates) => {
    try {
      const result = await databaseService.updateProduct(id, updates)
      
      if (result.success) {
        setProducts(prev => prev.map(product => 
          product.id === id ? result.data : product
        ))
        return result.data
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Mahsulotni yangilashda xatolik:', error)
      // Fallback: localStorage
      setProducts(prev => prev.map(product => 
        product.id === id 
          ? { ...product, ...updates, updatedAt: new Date().toISOString() }
          : product
      ))
    }
  }

  const deleteProduct = async (id) => {
    try {
      const result = await databaseService.deleteProduct(id)
      
      if (result.success) {
        setProducts(prev => prev.filter(product => product.id !== id))
        setCart(prev => prev.filter(item => item.id !== id))
        setWishlist(prev => prev.filter(item => item.id !== id))
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Mahsulotni o\'chirishda xatolik:', error)
      // Fallback: localStorage
      setProducts(prev => prev.filter(product => product.id !== id))
      setCart(prev => prev.filter(item => item.id !== id))
      setWishlist(prev => prev.filter(item => item.id !== id))
    }
  }

  const getProduct = async (id) => {
    try {
      const product = await databaseService.getProductById(id)
      return product
    } catch (error) {
      console.error('Mahsulotni olishda xatolik:', error)
      // Fallback: localStorage
      return getProductById(id) || products.find(p => p.id === id)
    }
  }

  const getRecommended = (productId, limit = 4) => {
    return getRecommendedProducts(productId, limit)
  }

  // Savatcha funksiyalari
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prev, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCart(prev => prev.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // Sevimlilar funksiyalari
  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (!exists) {
        return [...prev, product]
      }
      return prev
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  // Buyurtma funksiyalari (Database bilan)
  const addOrder = async (order) => {
    try {
      const result = await databaseService.createOrder({
        ...order,
        id: order.orderId || `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      })
      
      if (result.success) {
        const newOrder = result.data
        setOrders(prev => [newOrder, ...prev])
        
        // localStorage ga ham saqlash (backup)
        try {
          const existingOrders = JSON.parse(localStorage.getItem('alisher_mobile_orders') || '[]')
          existingOrders.unshift(newOrder)
          localStorage.setItem('alisher_mobile_orders', JSON.stringify(existingOrders))
        } catch (error) {
          console.error('localStorage ga saqlashda xatolik:', error)
        }
        
        return newOrder
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Buyurtma yaratishda xatolik:', error)
      // Fallback: localStorage
      const newOrder = {
        ...order,
        id: order.orderId || `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setOrders(prev => [newOrder, ...prev])
      
      try {
        const existingOrders = JSON.parse(localStorage.getItem('alisher_mobile_orders') || '[]')
        existingOrders.unshift(newOrder)
        localStorage.setItem('alisher_mobile_orders', JSON.stringify(existingOrders))
      } catch (error) {
        console.error('localStorage ga saqlashda xatolik:', error)
      }
      
      return newOrder
    }
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId || order.orderId === orderId
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ))
    
    // localStorage ni yangilash
    try {
      const existingOrders = JSON.parse(localStorage.getItem('alisher_mobile_orders') || '[]')
      const updatedOrders = existingOrders.map(order =>
        order.id === orderId || order.orderId === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
      localStorage.setItem('alisher_mobile_orders', JSON.stringify(updatedOrders))
    } catch (error) {
      console.error('Buyurtma holatini yangilash xatoligi:', error)
    }
  }

  // Mijoz funksiyalari
  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: customer.id || `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setCustomers(prev => [newCustomer, ...prev])
    
    // localStorage ga saqlash
    try {
      const existingCustomers = JSON.parse(localStorage.getItem('alisher_mobile_customers') || '[]')
      existingCustomers.unshift(newCustomer)
      localStorage.setItem('alisher_mobile_customers', JSON.stringify(existingCustomers))
    } catch (error) {
      console.error('Mijozni saqlash xatoligi:', error)
    }
    
    return newCustomer
  }

  const updateCustomer = (id, updates) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id 
        ? { ...customer, ...updates, updatedAt: new Date().toISOString() }
        : customer
    ))
    
    // localStorage ni yangilash
    try {
      const existingCustomers = JSON.parse(localStorage.getItem('alisher_mobile_customers') || '[]')
      const updatedCustomers = existingCustomers.map(customer =>
        customer.id === id 
          ? { ...customer, ...updates, updatedAt: new Date().toISOString() }
          : customer
      )
      localStorage.setItem('alisher_mobile_customers', JSON.stringify(updatedCustomers))
    } catch (error) {
      console.error('Mijozni yangilash xatoligi:', error)
    }
  }

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id))
    
    // localStorage dan o'chirish
    try {
      const existingCustomers = JSON.parse(localStorage.getItem('alisher_mobile_customers') || '[]')
      const filteredCustomers = existingCustomers.filter(customer => customer.id !== id)
      localStorage.setItem('alisher_mobile_customers', JSON.stringify(filteredCustomers))
    } catch (error) {
      console.error('Mijozni o\'chirish xatoligi:', error)
    }
  }

  // Filtr funksiyalari
  const updateFilters = (newFilters) => {
    setProductFilters(prev => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setProductFilters({
      category: 'all',
      priceRange: null,
      search: '',
      inStock: false,
      isNew: false,
      sortBy: 'featured'
    })
  }

  // Statistika funksiyalari
  const getStats = () => {
    const totalProducts = products.length
    const inStockProducts = products.filter(p => p.inStock && p.stock > 0).length
    const totalOrders = orders.length
    const totalCustomers = customers.length
    const totalRevenue = orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + (order.totalAmount || 0), 0)

    return {
      totalProducts,
      inStockProducts,
      outOfStockProducts: totalProducts - inStockProducts,
      totalOrders,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      completedOrders: orders.filter(o => o.status === 'completed').length,
      totalCustomers,
      totalRevenue,
      cartItemsCount: getCartItemsCount(),
      wishlistItemsCount: wishlist.length
    }
  }

  const value = {
    // Ma'lumotlar
    products,
    filteredProducts,
    activeProducts: products.filter(p => p.inStock && p.stock > 0),
    featuredProducts: products.filter(p => p.isFeatured),
    categories,
    cart,
    wishlist,
    orders,
    customers,
    productFilters,

    // Database holati
    isOnline,
    loading,

    // Kategoriya funksiyalari
    addCategory,
    updateCategory,
    deleteCategory,

    // Mahsulot funksiyalari
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getRecommended,

    // Savatcha funksiyalari
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,

    // Sevimlilar funksiyalari
    addToWishlist,
    removeFromWishlist,
    isInWishlist,

    // Buyurtma funksiyalari
    addOrder,
    updateOrderStatus,

    // Mijoz funksiyalari
    addCustomer,
    updateCustomer,
    deleteCustomer,

    // Filtr funksiyalari
    updateFilters,
    resetFilters,

    // Statistika
    getStats
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}