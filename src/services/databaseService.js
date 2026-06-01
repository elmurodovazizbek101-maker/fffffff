import { supabase, TABLES, handleSupabaseError, checkConnection } from '../lib/supabase'
import { realProducts } from '../data/products'

class DatabaseService {
  constructor() {
    this.isConnected = false
    this.initializeConnection()
  }

  async initializeConnection() {
    this.isConnected = await checkConnection()
    if (this.isConnected) {
      console.log('✅ Supabase database ulandi')
      await this.seedInitialData()
    } else {
      console.log('📝 Demo rejim: localStorage ishlatiladi')
      // Demo rejimda localStorage dan ma'lumotlarni yuklash
      this.initializeLocalStorage()
    }
  }

  // LocalStorage ni boshlang'ich ma'lumotlar bilan to'ldirish
  initializeLocalStorage() {
    try {
      // Agar localStorage bo'sh bo'lsa, demo ma'lumotlarni yuklash
      const existingProducts = localStorage.getItem('alisher_mobile_products')
      if (!existingProducts) {
        localStorage.setItem('alisher_mobile_products', JSON.stringify(realProducts))
        console.log('📦 Demo mahsulotlar localStorage ga yuklandi')
      }
    } catch (error) {
      console.error('LocalStorage ni boshlashda xatolik:', error)
    }
  }

  // Boshlang'ich ma'lumotlarni yuklash
  async seedInitialData() {
    try {
      // Agar supabase yo'q bo'lsa, o'tkazib yuborish
      if (!supabase) {
        return
      }

      // Mahsulotlar mavjudligini tekshirish
      const { data: existingProducts } = await supabase
        .from(TABLES.PRODUCTS)
        .select('id')
        .limit(1)

      if (!existingProducts || existingProducts.length === 0) {
        console.log('📦 Boshlang\'ich mahsulotlarni yuklash...')
        await this.seedProducts()
      }

      // Admin foydalanuvchini yaratish
      await this.seedAdminUser()
    } catch (error) {
      console.error('Boshlang\'ich ma\'lumotlarni yuklashda xatolik:', error)
    }
  }

  // Mahsulotlarni yuklash
  async seedProducts() {
    try {
      const productsForDB = realProducts.map(product => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        original_price: product.originalPrice,
        discount: product.discount,
        image: product.image,
        images: product.images,
        description: product.description,
        specifications: product.specifications,
        features: product.features,
        stock: product.stock,
        rating: product.rating,
        reviews_count: product.reviews || 0,
        warranty: product.warranty,
        in_stock: product.inStock,
        is_new: product.isNew,
        is_featured: product.isFeatured,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }))

      const { error } = await supabase
        .from(TABLES.PRODUCTS)
        .insert(productsForDB)

      if (error) {
        console.error('Mahsulotlarni yuklashda xatolik:', error)
      } else {
        console.log('✅ Mahsulotlar muvaffaqiyatli yuklandi')
      }
    } catch (error) {
      console.error('Mahsulotlarni yuklashda xatolik:', error)
    }
  }

  // Admin foydalanuvchini yaratish
  async seedAdminUser() {
    try {
      const { data: existingAdmin } = await supabase
        .from(TABLES.ADMIN_USERS)
        .select('id')
        .eq('login', 'superadmin')
        .single()

      if (!existingAdmin) {
        const { error } = await supabase
          .from(TABLES.ADMIN_USERS)
          .insert({
            login: 'superadmin',
            password_hash: 'hashed_Admin@2024!Secure', // Haqiqiy loyihada bcrypt ishlatiladi
            full_name: 'Super Administrator',
            role: 'admin',
            is_active: true,
            created_at: new Date().toISOString()
          })

        if (error) {
          console.error('Admin yaratishda xatolik:', error)
        } else {
          console.log('✅ Admin foydalanuvchi yaratildi')
        }
      }
    } catch (error) {
      console.error('Admin yaratishda xatolik:', error)
    }
  }

  // MAHSULOTLAR
  async getProducts(filters = {}) {
    if (!this.isConnected) {
      return this.getProductsFromLocalStorage(filters)
    }

    try {
      let query = supabase.from(TABLES.PRODUCTS).select('*')

      // Filtrlar qo'llash
      if (filters.category && filters.category !== 'all') {
        query = query.eq('brand', filters.category)
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      if (filters.inStock) {
        query = query.eq('in_stock', true).gt('stock', 0)
      }

      if (filters.isNew) {
        query = query.eq('is_new', true)
      }

      if (filters.priceRange) {
        const ranges = {
          'under-10m': { min: 0, max: 10000000 },
          '10m-15m': { min: 10000000, max: 15000000 },
          '15m-20m': { min: 15000000, max: 20000000 },
          'over-20m': { min: 20000000, max: 999999999 }
        }
        const range = ranges[filters.priceRange]
        if (range) {
          query = query.gte('price', range.min).lte('price', range.max)
        }
      }

      // Saralash
      switch (filters.sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true })
          break
        case 'price-high':
          query = query.order('price', { ascending: false })
          break
        case 'rating':
          query = query.order('rating', { ascending: false })
          break
        case 'newest':
          query = query.order('created_at', { ascending: false })
          break
        case 'name':
          query = query.order('name', { ascending: true })
          break
        default:
          query = query.order('is_featured', { ascending: false }).order('rating', { ascending: false })
      }

      const { data, error } = await query

      if (error) {
        console.error('Mahsulotlarni olishda xatolik:', error)
        return this.getProductsFromLocalStorage(filters)
      }

      return data || []
    } catch (error) {
      console.error('Mahsulotlarni olishda xatolik:', error)
      return this.getProductsFromLocalStorage(filters)
    }
  }

  async getProductById(id) {
    if (!this.isConnected) {
      return realProducts.find(p => p.id === id)
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Mahsulotni olishda xatolik:', error)
        return realProducts.find(p => p.id === id)
      }

      return data
    } catch (error) {
      console.error('Mahsulotni olishda xatolik:', error)
      return realProducts.find(p => p.id === id)
    }
  }

  async addProduct(product) {
    if (!this.isConnected) {
      return this.addProductToLocalStorage(product)
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .insert({
          ...product,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        throw new Error(handleSupabaseError(error))
      }

      return { success: true, data }
    } catch (error) {
      console.error('Mahsulot qo\'shishda xatolik:', error)
      return { success: false, error: error.message }
    }
  }

  async updateProduct(id, updates) {
    if (!this.isConnected) {
      return this.updateProductInLocalStorage(id, updates)
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.PRODUCTS)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(handleSupabaseError(error))
      }

      return { success: true, data }
    } catch (error) {
      console.error('Mahsulotni yangilashda xatolik:', error)
      return { success: false, error: error.message }
    }
  }

  async deleteProduct(id) {
    if (!this.isConnected) {
      return this.deleteProductFromLocalStorage(id)
    }

    try {
      const { error } = await supabase
        .from(TABLES.PRODUCTS)
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(handleSupabaseError(error))
      }

      return { success: true }
    } catch (error) {
      console.error('Mahsulotni o\'chirishda xatolik:', error)
      return { success: false, error: error.message }
    }
  }

  // BUYURTMALAR
  async getOrders(filters = {}) {
    if (!this.isConnected) {
      return this.getOrdersFromLocalStorage(filters)
    }

    try {
      let query = supabase
        .from(TABLES.ORDERS)
        .select(`
          *,
          order_items (
            *,
            products (*)
          ),
          customers (*)
        `)

      if (filters.status) {
        query = query.eq('status', filters.status)
      }

      if (filters.customerId) {
        query = query.eq('customer_id', filters.customerId)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) {
        console.error('Buyurtmalarni olishda xatolik:', error)
        return this.getOrdersFromLocalStorage(filters)
      }

      return data || []
    } catch (error) {
      console.error('Buyurtmalarni olishda xatolik:', error)
      return this.getOrdersFromLocalStorage(filters)
    }
  }

  async createOrder(orderData) {
    if (!this.isConnected) {
      return this.createOrderInLocalStorage(orderData)
    }

    try {
      // Buyurtmani yaratish
      const { data: order, error: orderError } = await supabase
        .from(TABLES.ORDERS)
        .insert({
          customer_id: orderData.customerId,
          total_amount: orderData.totalAmount,
          status: orderData.status || 'pending',
          payment_method: orderData.paymentMethod,
          payment_status: orderData.paymentStatus || 'pending',
          delivery_address: orderData.deliveryAddress,
          delivery_notes: orderData.deliveryNotes,
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (orderError) {
        throw new Error(handleSupabaseError(orderError))
      }

      // Buyurtma elementlarini qo'shish
      if (orderData.items && orderData.items.length > 0) {
        const orderItems = orderData.items.map(item => ({
          order_id: order.id,
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price
        }))

        const { error: itemsError } = await supabase
          .from(TABLES.ORDER_ITEMS)
          .insert(orderItems)

        if (itemsError) {
          // Buyurtmani o'chirish agar elementlar qo'shilmasa
          await supabase.from(TABLES.ORDERS).delete().eq('id', order.id)
          throw new Error(handleSupabaseError(itemsError))
        }
      }

      return { success: true, data: order }
    } catch (error) {
      console.error('Buyurtma yaratishda xatolik:', error)
      return { success: false, error: error.message }
    }
  }

  // MIJOZLAR
  async getCustomers() {
    if (!this.isConnected) {
      return this.getCustomersFromLocalStorage()
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.CUSTOMERS)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Mijozlarni olishda xatolik:', error)
        return this.getCustomersFromLocalStorage()
      }

      return data || []
    } catch (error) {
      console.error('Mijozlarni olishda xatolik:', error)
      return this.getCustomersFromLocalStorage()
    }
  }

  async createCustomer(customerData) {
    if (!this.isConnected) {
      return this.createCustomerInLocalStorage(customerData)
    }

    try {
      const { data, error } = await supabase
        .from(TABLES.CUSTOMERS)
        .insert({
          ...customerData,
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        throw new Error(handleSupabaseError(error))
      }

      return { success: true, data }
    } catch (error) {
      console.error('Mijoz yaratishda xatolik:', error)
      return { success: false, error: error.message }
    }
  }

  // LocalStorage fallback metodlari
  getProductsFromLocalStorage(filters = {}) {
    try {
      let products = JSON.parse(localStorage.getItem('alisher_mobile_products') || '[]')
      
      // Agar localStorage bo'sh bo'lsa, realProducts dan yuklash
      if (products.length === 0) {
        products = realProducts
        localStorage.setItem('alisher_mobile_products', JSON.stringify(products))
      }

      // Filtrlarni qo'llash
      let filtered = [...products]

      // Kategoriya bo'yicha filtr
      if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(product => 
          product.brand.toLowerCase() === filters.category.toLowerCase()
        )
      }

      // Qidiruv bo'yicha filtr
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm)
        )
      }

      // Mavjudlik bo'yicha filtr
      if (filters.inStock) {
        filtered = filtered.filter(product => product.inStock && product.stock > 0)
      }

      // Yangi mahsulotlar bo'yicha filtr
      if (filters.isNew) {
        filtered = filtered.filter(product => product.isNew)
      }

      // Narx diapazoni bo'yicha filtr
      if (filters.priceRange) {
        const ranges = {
          'under-10m': { min: 0, max: 10000000 },
          '10m-15m': { min: 10000000, max: 15000000 },
          '15m-20m': { min: 15000000, max: 20000000 },
          'over-20m': { min: 20000000, max: 999999999 }
        }
        const range = ranges[filters.priceRange]
        if (range) {
          filtered = filtered.filter(product => 
            product.price >= range.min && product.price <= range.max
          )
        }
      }

      // Saralash
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filtered.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5))
          break
        case 'newest':
          filtered.sort((a, b) => b.isNew - a.isNew)
          break
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        default:
          // Default: featured first, then by rating
          filtered.sort((a, b) => {
            if (a.isFeatured && !b.isFeatured) return -1
            if (!a.isFeatured && b.isFeatured) return 1
            return (b.rating || 4.5) - (a.rating || 4.5)
          })
      }

      return filtered
    } catch (error) {
      console.error('LocalStorage dan mahsulotlarni olishda xatolik:', error)
      return realProducts
    }
  }

  getOrdersFromLocalStorage(filters) {
    try {
      const orders = JSON.parse(localStorage.getItem('alisher_mobile_orders') || '[]')
      return orders
    } catch (error) {
      return []
    }
  }

  getCustomersFromLocalStorage() {
    try {
      const customers = JSON.parse(localStorage.getItem('alisher_mobile_customers') || '[]')
      return customers
    } catch (error) {
      return []
    }
  }

  addProductToLocalStorage(product) {
    // Mavjud localStorage logikasi
    return { success: true, data: product }
  }

  createOrderInLocalStorage(orderData) {
    // Mavjud localStorage logikasi
    return { success: true, data: orderData }
  }

  createCustomerInLocalStorage(customerData) {
    // Mavjud localStorage logikasi
    return { success: true, data: customerData }
  }
}

// Singleton instance
const databaseService = new DatabaseService()
export default databaseService