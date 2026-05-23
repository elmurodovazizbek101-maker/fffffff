import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

// IndexedDB for better performance
const DB_NAME = 'AlisherMobileDB'
const DB_VERSION = 1

class DatabaseManager {
  constructor() {
    this.db = null
    this.initPromise = this.init()
  }

  async init() {
    return new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onerror = () => {
          console.error('IndexedDB open error:', request.error)
          reject(request.error)
        }
        request.onsuccess = () => {
          this.db = request.result
          resolve(this.db)
        }

        request.onupgradeneeded = (event) => {
          const db = event.target.result

          // Create object stores
          if (!db.objectStoreNames.contains('products')) {
            db.createObjectStore('products', { keyPath: 'id' })
          }
          if (!db.objectStoreNames.contains('categories')) {
            db.createObjectStore('categories', { keyPath: 'id' })
          }
          if (!db.objectStoreNames.contains('customers')) {
            db.createObjectStore('customers', { keyPath: 'id' })
          }
          if (!db.objectStoreNames.contains('orders')) {
            db.createObjectStore('orders', { keyPath: 'id' })
          }
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'key' })
          }
        }
      } catch (error) {
        console.error('IndexedDB init error:', error)
        reject(error)
      }
    })
  }

  async get(storeName, key = null) {
    if (!this.db) {
      try {
        await this.initPromise
      } catch (error) {
        console.error('Failed to initialize database:', error)
        return key ? undefined : []
      }
    }

    return new Promise((resolve, reject) => {
      try {
        if (!this.db || !this.db.objectStoreNames.contains(storeName)) {
          resolve(key ? undefined : [])
          return
        }

        const transaction = this.db.transaction([storeName], 'readonly')
        const store = transaction.objectStore(storeName)

        const request = key ? store.get(key) : store.getAll()

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)
      } catch (error) {
        console.error(`Failed to get from ${storeName}:`, error)
        resolve(key ? undefined : [])
      }
    })
  }

  async set(storeName, data) {
    if (!this.db) {
      try {
        await this.initPromise
      } catch (error) {
        console.error('Failed to initialize database:', error)
        return false
      }
    }

    return new Promise((resolve, reject) => {
      try {
        if (!this.db || !this.db.objectStoreNames.contains(storeName)) {
          resolve(false)
          return
        }

        const transaction = this.db.transaction([storeName], 'readwrite')
        const store = transaction.objectStore(storeName)

        transaction.onerror = () => reject(transaction.error)
        transaction.oncomplete = () => resolve(true)

        if (Array.isArray(data)) {
          data.forEach(item => store.put(item))
        } else {
          store.put(data)
        }
      } catch (error) {
        console.error(`Failed to set in ${storeName}:`, error)
        resolve(false)
      }
    })
  }

  async delete(storeName, key) {
    if (!this.db) {
      try {
        await this.initPromise
      } catch (error) {
        console.error('Failed to initialize database:', error)
        return false
      }
    }

    return new Promise((resolve, reject) => {
      try {
        if (!this.db) {
          resolve(false)
          return
        }

        const transaction = this.db.transaction([storeName], 'readwrite')
        const store = transaction.objectStore(storeName)

        const request = store.delete(key)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(true)
      } catch (error) {
        console.error(`Failed to delete from ${storeName}:`, error)
        resolve(false)
      }
    })
  }
}

const dbManager = new DatabaseManager()

// Initial data - optimized
const INITIAL_DATA = {
  products: [
    { id: 1, name: 'iPhone 15 Pro Max', brand: 'Apple', price: 14400000, quantity: 15, image: null, featured: true, status: 'active' },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', price: 13200000, quantity: 8, image: null, featured: true, status: 'active' },
    { id: 3, name: 'Honor Magic 6 Pro', brand: 'Honor', price: 9600000, quantity: 12, image: null, featured: true, status: 'active' },
    { id: 4, name: 'Vivo X100 Pro', brand: 'Vivo', price: 9000000, quantity: 10, image: null, featured: false, status: 'active' },
    { id: 5, name: 'Nokia G60 5G', brand: 'Nokia', price: 3600000, quantity: 20, image: null, featured: false, status: 'active' },
    { id: 6, name: 'ROG Phone 8 Pro', brand: 'ROG', price: 12000000, quantity: 5, image: null, featured: true, status: 'active' },
    { id: 7, name: 'Redmi Note 13 Pro', brand: 'Redmi', price: 4800000, quantity: 25, image: null, featured: false, status: 'active' },
    { id: 8, name: 'OnePlus 12', brand: 'OnePlus', price: 10800000, quantity: 8, image: null, featured: true, status: 'active' },
    { id: 9, name: 'Oppo Find X7 Pro', brand: 'Oppo', price: 10200000, quantity: 7, image: null, featured: false, status: 'active' },
    { id: 10, name: 'Realme GT 5 Pro', brand: 'Realme', price: 7200000, quantity: 15, image: null, featured: false, status: 'active' }
  ],
  categories: [
    { id: 1, name: 'Apple', count: 1, color: '#3b82f6' },
    { id: 2, name: 'Samsung', count: 1, color: '#10b981' },
    { id: 3, name: 'Honor', count: 1, color: '#f59e0b' },
    { id: 4, name: 'Vivo', count: 1, color: '#8b5cf6' },
    { id: 5, name: 'Nokia', count: 1, color: '#ef4444' },
    { id: 6, name: 'ROG', count: 1, color: '#06b6d4' },
    { id: 7, name: 'Redmi', count: 1, color: '#84cc16' },
    { id: 8, name: 'OnePlus', count: 1, color: '#f97316' },
    { id: 9, name: 'Oppo', count: 1, color: '#ec4899' },
    { id: 10, name: 'Realme', count: 1, color: '#6366f1' }
  ]
}

export const DataProvider = React.memo(({ children }) => {
  // State with lazy initialization
  const [products, setProducts] = useState(() => INITIAL_DATA.products)
  const [categories, setCategories] = useState(() => INITIAL_DATA.categories)
  const [customers, setCustomers] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // Load data from IndexedDB on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Set a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          console.warn('Loading timeout - using default data')
          setLoading(false)
        }, 3000)

        try {
          const [dbProducts, dbCategories, dbCustomers, dbOrders] = await Promise.all([
            dbManager.get('products').catch(() => []),
            dbManager.get('categories').catch(() => []),
            dbManager.get('customers').catch(() => []),
            dbManager.get('orders').catch(() => [])
          ])

          clearTimeout(timeoutId)

          if (dbProducts?.length) setProducts(dbProducts)
          if (dbCategories?.length) setCategories(dbCategories)
          if (dbCustomers?.length) setCustomers(dbCustomers)
          if (dbOrders?.length) setOrders(dbOrders)
        } catch (dbError) {
          console.warn('IndexedDB load failed, using localStorage fallback', dbError)
          clearTimeout(timeoutId)

          // Fallback to localStorage
          try {
            const savedProducts = localStorage.getItem('products')
            const savedCategories = localStorage.getItem('categories')
            const savedCustomers = localStorage.getItem('customers')
            const savedOrders = localStorage.getItem('orders')

            if (savedProducts) setProducts(JSON.parse(savedProducts))
            if (savedCategories) setCategories(JSON.parse(savedCategories))
            if (savedCustomers) setCustomers(JSON.parse(savedCustomers))
            if (savedOrders) setOrders(JSON.parse(savedOrders))
          } catch (lsError) {
            console.warn('localStorage fallback failed, using initial data', lsError)
          }
        }
      } catch (error) {
        console.error('Data loading failed completely, using initial data', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (loading) return

    const persistData = async () => {
      try {
        await Promise.all([
          dbManager.set('products', products),
          dbManager.set('categories', categories),
          dbManager.set('customers', customers),
          dbManager.set('orders', orders)
        ])
      } catch (error) {
        console.error('Failed to persist data to IndexedDB:', error)
      }

      try {
        localStorage.setItem('products', JSON.stringify(products))
        localStorage.setItem('categories', JSON.stringify(categories))
        localStorage.setItem('customers', JSON.stringify(customers))
        localStorage.setItem('orders', JSON.stringify(orders))
      } catch (error) {
        console.warn('Failed to persist data to localStorage:', error)
      }
    }

    persistData()
  }, [products, categories, customers, orders, loading])

  // Memoized computed values
  const activeProducts = useMemo(() =>
    products.filter(p => p.status === 'active' && p.quantity > 0),
    [products]
  )

  const featuredProducts = useMemo(() =>
    activeProducts.filter(p => p.featured).slice(0, 6),
    [activeProducts]
  )

  const productsByBrand = useMemo(() => {
    const grouped = {}
    activeProducts.forEach(product => {
      if (!grouped[product.brand]) grouped[product.brand] = []
      grouped[product.brand].push(product)
    })
    return grouped
  }, [activeProducts])

  // Optimized functions with useCallback
  const addProduct = useCallback(async (product) => {
    const newProduct = { ...product, id: Date.now(), status: 'active' }

    setProducts(prev => [...prev, newProduct])
    setCategories(prev => {
      const existingCategory = prev.find(cat => cat.name === product.brand)
      if (existingCategory) {
        return prev.map(cat =>
          cat.name === product.brand
            ? { ...cat, count: cat.count + 1 }
            : cat
        )
      }
      return [
        ...prev,
        {
          id: Date.now() + 1,
          name: product.brand,
          count: 1,
          color: '#7c3aed'
        }
      ]
    })
  }, [])

  const updateProduct = useCallback(async (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }, [])

  const deleteProduct = useCallback(async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }, [])

  const addCustomer = useCallback(async (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now(),
      joinDate: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0
    }

    setCustomers(prev => [...prev, newCustomer])
    return newCustomer
  }, [])

  const addOrder = useCallback(async (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'pending'
    }

    setOrders(prev => [...prev, newOrder])

    if (order.customerId) {
      setCustomers(prev => prev.map(c =>
        c.id === order.customerId
          ? { ...c, totalOrders: c.totalOrders + 1, totalSpent: c.totalSpent + order.total }
          : c
      ))
    }

    setProducts(prev => prev.map(p => {
      const item = order.items?.find(item => item.id === p.id)
      if (!item) return p
      return { ...p, quantity: Math.max(0, p.quantity - item.quantity) }
    }))

    return newOrder
  }, [])

  const getProductById = useCallback((id) =>
    products.find(p => p.id === id), [products]
  )

  const getProductsByBrand = useCallback((brand) =>
    activeProducts.filter(p => p.brand === brand), [activeProducts]
  )

  // Memoized context value
  const contextValue = useMemo(() => ({
    // Data
    products,
    categories,
    customers,
    orders,
    loading,

    // Computed values
    activeProducts,
    featuredProducts,
    productsByBrand,

    // Functions
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByBrand,
    addCustomer,
    addOrder
  }), [
    products, categories, customers, orders, loading,
    activeProducts, featuredProducts, productsByBrand,
    addProduct, updateProduct, deleteProduct, getProductById, getProductsByBrand,
    addCustomer, addOrder
  ])

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  )
})

DataProvider.displayName = 'DataProvider'
