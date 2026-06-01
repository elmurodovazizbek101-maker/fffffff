# 🗄️ Database Setup - Supabase

Saytga haqiqiy database qo'shish uchun qo'llanma.

## 📋 1. Supabase Loyiha Yaratish

### 1.1 Supabase.com ga kirish
1. [supabase.com](https://supabase.com) ga o'ting
2. **"Start your project"** tugmasini bosing
3. GitHub/Google orqali ro'yxatdan o'ting

### 1.2 Yangi loyiha yaratish
1. **"New Project"** tugmasini bosing
2. Loyiha ma'lumotlarini kiriting:
   - **Name**: `alisher-mobile-db`
   - **Database Password**: Kuchli parol yarating
   - **Region**: `Southeast Asia (Singapore)` (eng yaqin)
3. **"Create new project"** tugmasini bosing
4. 2-3 daqiqa kutib, loyiha tayyor bo'lishini kuting

## 🔧 2. Database Schema O'rnatish

### 2.1 SQL Editor orqali
1. Supabase dashboard da **"SQL Editor"** ga o'ting
2. **"New query"** tugmasini bosing
3. `database/schema.sql` faylini oching va barcha kodni nusxalang
4. SQL Editor ga joylashtiring va **"Run"** tugmasini bosing

### 2.2 Jadvallar tekshirish
1. **"Table Editor"** ga o'ting
2. Quyidagi jadvallar yaratilganini tekshiring:
   - `admin_users`
   - `customers`
   - `products`
   - `orders`
   - `order_items`
   - `payments`
   - `reviews`
   - `wishlist`
   - `cart`

## 🔑 3. API Kalitlarini Olish

### 3.1 Project Settings
1. **"Settings"** → **"API"** ga o'ting
2. Quyidagi ma'lumotlarni nusxalang:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJ...` (uzun kalit)

### 3.2 Environment Variables
1. Loyiha papkasida `.env` fayl yarating:
```bash
# .env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. `.env` faylini `.gitignore` ga qo'shing:
```bash
# .gitignore
.env
.env.local
.env.production
```

## 🚀 4. Saytni Ishga Tushirish

### 4.1 Dependencies o'rnatish
```bash
npm install @supabase/supabase-js
```

### 4.2 Development server
```bash
npm run dev
```

### 4.3 Tekshirish
1. Saytni oching: `http://localhost:3000`
2. Browser console da quyidagi xabarni ko'ring:
   ```
   ✅ Supabase database ulandi
   📦 Boshlang'ich mahsulotlarni yuklash...
   ✅ Mahsulotlar muvaffaqiyatli yuklandi
   ✅ Admin foydalanuvchi yaratildi
   ```

## 📊 5. Ma'lumotlarni Tekshirish

### 5.1 Supabase Dashboard
1. **"Table Editor"** ga o'ting
2. `products` jadvalini oching
3. Mahsulotlar yuklanganligi ko'ring

### 5.2 Admin Panel
1. Saytda admin paneliga kiring:
   - **Login**: `superadmin`
   - **Parol**: `Admin@2024!Secure`
2. Dashboard da statistikalarni ko'ring

## 🔒 6. Xavfsizlik Sozlamalari

### 6.1 Row Level Security (RLS)
- Barcha jadvallar uchun RLS yoqilgan
- Mijozlar faqat o'z ma'lumotlarini ko'ra oladi
- Mahsulotlarni hamma ko'ra oladi

### 6.2 API Policies
- `anon` kalit faqat o'qish uchun
- Yozish uchun autentifikatsiya kerak
- Admin operatsiyalar uchun maxsus kalit

## 🔄 7. Ma'lumotlar Sinxronizatsiyasi

### 7.1 Offline Support
- Internet yo'q bo'lsa localStorage ishlatiladi
- Online bo'lganda database bilan sinxronlanadi
- Avtomatik fallback tizimi

### 7.2 Real-time Updates
```javascript
// Real-time yangilanishlar (ixtiyoriy)
supabase
  .channel('products')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, 
    payload => {
      console.log('Mahsulot yangilandi:', payload)
    }
  )
  .subscribe()
```

## 🚨 8. Muammolarni Hal Qilish

### 8.1 Ulanish muammolari
```javascript
// Browser console da tekshirish
import { supabase } from './src/lib/supabase'
const { data, error } = await supabase.from('products').select('count')
console.log('Database holati:', { data, error })
```

### 8.2 Keng tarqalgan xatoliklar
- **"Invalid API key"**: `.env` faylini tekshiring
- **"Table doesn't exist"**: Schema SQL ni qayta ishga tushiring
- **"RLS policy violation"**: Policies ni tekshiring

## 📈 9. Production Deploy

### 9.1 Vercel/Netlify
1. Environment variables qo'shing:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

### 9.2 Domain sozlash
1. Supabase da **"Authentication"** → **"URL Configuration"**
2. Production domain qo'shing

## 💡 10. Qo'shimcha Imkoniyatlar

### 10.1 Authentication
- Supabase Auth bilan foydalanuvchi tizimi
- Social login (Google, GitHub)
- Email verification

### 10.2 Storage
- Mahsulot rasmlari uchun Supabase Storage
- CDN bilan tez yuklash

### 10.3 Edge Functions
- Serverless functions
- To'lov webhook'lari
- Email yuborish

---

## ✅ Tayyor!

Endi saytingizda haqiqiy database ishlaydi:
- ✅ PostgreSQL database
- ✅ Real-time yangilanishlar
- ✅ Xavfsiz API
- ✅ Offline support
- ✅ Production ready

**Keyingi qadam**: `.env` faylini yaratib, Supabase kalitlarini kiriting!