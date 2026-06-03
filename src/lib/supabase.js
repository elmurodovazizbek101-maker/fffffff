import { createClient } from '@supabase/supabase-js'

// Supabase konfiguratsiyasi
// Environment variables dan olish
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Environment variables mavjudligini tekshirish
const hasValidCredentials = supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== 'your_supabase_url_here' && 
  supabaseKey !== 'your_supabase_anon_key_here' &&
  supabaseUrl.includes('supabase.co')

// Demo rejim tekshiruvi
const isDemoMode = !hasValidCredentials

// Configuration holati haqida ma'lumot
if (isDemoMode) {
  console.log('📝 DEMO MODE: localStorage ishlatiladi')
  console.log('🔧 Supabase sozlash uchun .env faylini to\'ldiring:')
  console.log('   VITE_SUPABASE_URL=https://your-project.supabase.co')
  console.log('   VITE_SUPABASE_ANON_KEY=your-anon-key')
} else {
  console.log('✅ Supabase credentials topildi')
  console.log('🔧 Supabase URL:', supabaseUrl?.substring(0, 30) + '...')
}

// Supabase client yaratish (faqat haqiqiy credentials bo'lsa)
export const supabase = isDemoMode 
  ? null 
  : createClient(supabaseUrl, supabaseKey)

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
    if (isDemoMode || !supabase) {
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