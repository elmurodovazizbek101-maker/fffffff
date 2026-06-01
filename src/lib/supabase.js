import { createClient } from '@supabase/supabase-js'

// Supabase konfiguratsiyasi
// Vite da import.meta.env ishlatiladi, process.env emas
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

// Demo rejim uchun - haqiqiy loyihada .env faylidan oling
console.log('🔧 Supabase konfiguratsiyasi:', {
  url: supabaseUrl,
  hasKey: !!supabaseKey,
  isDemoMode: supabaseUrl === 'https://demo.supabase.co'
})

// Supabase client yaratish
export const supabase = createClient(supabaseUrl, supabaseKey)

// Database jadvallar nomlari
export const TABLES = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  ORDERS: 'orders',
  ORDER_ITEMS: 'order_items',
  CUSTOMERS: 'customers',
  ADMIN_USERS: 'admin_users',
  PAYMENTS: 'payments',
  REVIEWS: 'reviews',
  WISHLIST: 'wishlist',
  CART: 'cart'
}

// Database xatoliklarini boshqarish
export const handleSupabaseError = (error) => {
  console.error('Supabase xatoligi:', error)
  
  if (error.code === 'PGRST116') {
    return 'Ma\'lumot topilmadi'
  }
  
  if (error.code === '23505') {
    return 'Bu ma\'lumot allaqachon mavjud'
  }
  
  if (error.code === '42501') {
    return 'Ruxsat berilmagan'
  }
  
  return error.message || 'Noma\'lum xatolik yuz berdi'
}

// Connection holatini tekshirish
export const checkConnection = async () => {
  try {
    // Demo rejimda false qaytarish
    if (supabaseUrl === 'https://demo.supabase.co') {
      console.log('📝 Demo rejim: localStorage ishlatiladi')
      return false
    }

    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1)
    
    if (error) {
      console.warn('⚠️ Supabase ulanmadi, localStorage ishlatiladi:', error.message)
      return false
    }
    
    console.log('✅ Supabase database ulandi')
    return true
  } catch (error) {
    console.warn('⚠️ Supabase ulanmadi, localStorage ishlatiladi:', error.message)
    return false
  }
}

export default supabase