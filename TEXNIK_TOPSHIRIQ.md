# TEXNIK TOPSHIRIQ (TZ)
# Alisher Mobile - E-commerce Platform

---

## HUJJAT MA'LUMOTLARI

**Loyiha nomi:** Alisher Mobile - E-commerce Platform  
**Versiya:** 1.0  
**Sana:** 2024  
**Holat:** Ishlab chiqilgan (Production Ready)  
**Muallif:** Alisher Elmurodov  

---

## MUNDARIJA

1. [Umumiy Ma'lumot](#1-umumiy-malumot)
2. [Loyiha Maqsadi va Vazifalari](#2-loyiha-maqsadi-va-vazifalari)
3. [Foydalanuvchilar va Rollar](#3-foydalanuvchilar-va-rollar)
4. [Funksional Talablar](#4-funksional-talablar)
5. [Nofunksional Talablar](#5-nofunksional-talablar)
6. [Texnik Arxitektura](#6-texnik-arxitektura)
7. [Ma'lumotlar Bazasi](#7-malumotlar-bazasi)
8. [Interfeys va Dizayn](#8-interfeys-va-dizayn)
9. [Integratsiyalar](#9-integratsiyalar)
10. [Xavfsizlik](#10-xavfsizlik)
11. [Testing va Sifat Nazorati](#11-testing-va-sifat-nazorati)
12. [Deploy va Hosting](#12-deploy-va-hosting)
13. [Texnik Xususiyatlar](#13-texnik-xususiyatlar)
14. [Rivojlantirish Rejasi](#14-rivojlantirish-rejasi)
15. [Xulosa](#15-xulosa)

---

## 1. UMUMIY MA'LUMOT

### 1.1. Loyiha Tavsifi

**Alisher Mobile** - bu mobil telefonlar va aksessuarlar sotish uchun mo'ljallangan zamonaviy e-commerce platformasi. Platforma ikki asosiy qismdan iborat:

1. **Admin Panel** - mahsulotlar, sotuvlar, xarajatlar va biznes jarayonlarini boshqarish uchun
2. **E-commerce Website** - mijozlar uchun onlayn do'kon

### 1.2. Biznes Konteksti

**Muammo:** Kichik va o'rta bizneslar uchun professional e-commerce yechim yo'qligi yoki juda qimmat bo'lishi.

**Yechim:** Bepul, ochiq kodli, to'liq funksional e-commerce platforma yaratish.

### 1.3. Maqsadli Auditoriya

- **Asosiy:** Mobil telefon do'konlari
- **Ikkinchi:** Elektronika sotuvchilari
- **Kelajakda:** Har qanday mahsulot sotuvchilari

### 1.4. Raqobatchilar

- Shopify (qimmat, $29-299/oy)
- WooCommerce (murakkab sozlash)
- OpenCart (eski texnologiya)
- **Bizning afzalligimiz:** Bepul, zamonaviy, oson

---

## 2. LOYIHA MAQSADI VA VAZIFALARI

### 2.1. Asosiy Maqsad

Kichik va o'rta bizneslar uchun professional, bepul va oson ishlatish mumkin bo'lgan e-commerce platformasini yaratish.

### 2.2. Biznes Maqsadlari

1. **Sotuvni oshirish** - onlayn savdo orqali yangi mijozlar jalb qilish
2. **Xarajatlarni kamaytirish** - avtomatlashtirish orqali vaqt va pul tejash
3. **Boshqaruvni yaxshilash** - barcha jarayonlarni bir joyda nazorat qilish
4. **Hisobotlar** - real-time statistika va tahlil

### 2.3. Texnik Maqsadlar

1. **Tezlik** - 3 soniyadan kam yuklash vaqti
2. **Xavfsizlik** - zamonaviy xavfsizlik standartlari
3. **Miqyoslanish** - 10,000+ mahsulot va 1,000+ kunlik buyurtmalar
4. **Mobil** - 100% responsive dizayn

### 2.4. Foydalanuvchi Maqsadlari

**Admin uchun:**
- Mahsulotlarni oson boshqarish
- Sotuvlarni kuzatish
- Xarajatlarni nazorat qilish
- Hisobotlar olish

**Mijoz uchun:**
- Mahsulotlarni tez topish
- Oson buyurtma berish
- Xavfsiz to'lov
- Tez yetkazib berish

---

## 3. FOYDALANUVCHILAR VA ROLLAR

### 3.1. Foydalanuvchi Rollari

#### 3.1.1. Super Admin
**Huquqlar:**
- Barcha funksiyalarga to'liq kirish
- Admin kredensiallarini o'zgartirish
- Tizim sozlamalarini boshqarish
- Barcha ma'lumotlarni ko'rish va o'zgartirish

**Vazifalar:**
- Tizimni sozlash
- Xodimlarni boshqarish
- Xavfsizlikni ta'minlash
- Backup va restore

#### 3.1.2. Admin
**Huquqlar:**
- Mahsulotlarni boshqarish
- Sotuvlarni ko'rish
- Xarajatlarni kiritish
- Hisobotlarni ko'rish

**Vazifalar:**
- Kundalik operatsiyalar
- Mahsulot qo'shish/o'zgartirish
- Buyurtmalarni qayta ishlash
- Mijozlar bilan ishlash

#### 3.1.3. Mijoz (Website)
**Huquqlar:**
- Mahsulotlarni ko'rish
- Savatcha ishlatish
- Buyurtma berish
- Telegram orqali aloqa

**Vazifalar:**
- Mahsulot tanlash
- Buyurtma berish
- To'lov qilish

### 3.2. User Stories

#### Admin User Stories:
1. Admin sifatida men mahsulot qo'shishim kerak
2. Admin sifatida men sotuvlarni ko'rishim kerak
3. Admin sifatida men xarajatlarni kiritishim kerak
4. Admin sifatida men hisobotlar olishim kerak

#### Mijoz User Stories:
1. Mijoz sifatida men mahsulotlarni ko'rishim kerak
2. Mijoz sifatida men savatcha ishlatishim kerak
3. Mijoz sifatida men buyurtma berishim kerak
4. Mijoz sifatida men Telegram orqali aloqa qilishim kerak

---

## 4. FUNKSIONAL TALABLAR

### 4.1. Admin Panel Funksiyalari

#### 4.1.1. Dashboard
**Talablar:**
- Real-time statistika ko'rsatish
- Grafiklar va diagrammalar
- Tezkor ma'lumotlar (bugungi sotuvlar, xarajatlar, foyda)
- Oxirgi buyurtmalar ro'yxati
- Kam qolgan mahsulotlar ogohlantirishi

**Texnik detallar:**
- Recharts kutubxonasi ishlatiladi
- Ma'lumotlar localStorage'dan olinadi
- Har 5 soniyada yangilanadi (real-time)

#### 4.1.2. Mahsulotlar Boshqaruvi
**Talablar:**
- Mahsulot qo'shish (nom, narx, miqdor, kategoriya, rasm)
- Mahsulotni o'zgartirish
- Mahsulotni o'chirish
- Mahsulotlarni qidirish
- Kategoriya bo'yicha filterlash
- Mahsulot holati (mavjud, kam qolgan, tugagan)

**Texnik detallar:**
- CRUD operatsiyalari
- Image upload (base64)
- Validation (narx > 0, miqdor >= 0)
- Barcode scanner integratsiyasi


#### 4.1.3. Sotuvlar
- Yangi sotuv qo'shish
- Sotuvlar tarixi
- Sotuv detallarini ko'rish
- Kunlik/oylik hisobotlar
- Excel/PDF export

#### 4.1.4. Xarajatlar
- Xarajat qo'shish (kategoriya, summa, sana, izoh)
- Xarajatlar ro'yxati
- Kategoriya bo'yicha guruhlash
- Umumiy xarajatlar statistikasi

#### 4.1.5. Qarzdorlar
- Qarz qo'shish
- Qarzni to'lash
- Qarzdorlar ro'yxati
- Qarz tarixi

#### 4.1.6. Xodimlar
- Xodim qo'shish
- Maosh hisoblash
- Ish vaqti nazorati

#### 4.1.7. Yetkazib Beruvchilar
- Yetkazib beruvchi qo'shish
- Kontakt ma'lumotlari
- Yetkazib berish tarixi

#### 4.1.8. Aksiyalar
- Aksiya yaratish
- Chegirma belgilash
- Aksiya muddati

#### 4.1.9. Sozlamalar
- Admin login/parol o'zgartirish
- Til sozlamalari (O'zbek/Rus)
- Valyuta sozlamalari
- Backup/Restore

### 4.2. E-commerce Website Funksiyalari

#### 4.2.1. Bosh Sahifa
- Hero banner
- Ommabop mahsulotlar
- Kategoriyalar
- Aksiyalar

#### 4.2.2. Kataloglar
- Barcha brendlar ro'yxati
- Brend statistikasi
- Brend bo'yicha filterlash

#### 4.2.3. Mahsulotlar
- Mahsulotlar ro'yxati
- Qidiruv
- Filterlash (kategoriya, narx, brend)
- Saralash (narx, yangi, ommabop)
- Mahsulot detallari

#### 4.2.4. Savatcha
- Mahsulot qo'shish
- Miqdorni o'zgartirish
- Mahsulotni o'chirish
- Umumiy summa hisoblash

#### 4.2.5. Buyurtma
- Buyurtma formasi
- Telegram orqali yuborish
- Buyurtma tasdiqlanishi

#### 4.2.6. Dark Mode
- Light/Dark theme
- Avtomatik saqlash
- Smooth transition

---

## 5. NOFUNKSIONAL TALABLAR

### 5.1. Performance (Ishlash)

**Talablar:**
- Sahifa yuklash vaqti: < 3 soniya
- First Contentful Paint: < 1.5 soniya
- Time to Interactive: < 3.5 soniya
- Lighthouse Score: > 90

**Texnik yechimlar:**
- Code splitting
- Lazy loading
- Image optimization
- Caching strategiyalari

### 5.2. Scalability (Miqyoslanish)

**Talablar:**
- 10,000+ mahsulotlar
- 1,000+ kunlik buyurtmalar
- 100+ bir vaqtda foydalanuvchilar

**Texnik yechimlar:**
- Virtual scrolling
- Pagination
- Debouncing/Throttling
- Efficient data structures

### 5.3. Usability (Foydalanish Qulayligi)

**Talablar:**
- Intuitiv interfeys
- Minimal clicks (3 click rule)
- Responsive dizayn (mobile-first)
- Accessibility (WCAG 2.1 AA)

**Texnik yechimlar:**
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support

### 5.4. Reliability (Ishonchlilik)

**Talablar:**
- Uptime: 99.9%
- Error rate: < 0.1%
- Data loss: 0%

**Texnik yechimlar:**
- Error boundaries
- Try-catch blocks
- LocalStorage backup
- Service Worker (PWA)

### 5.5. Security (Xavfsizlik)

**Talablar:**
- XSS protection
- CSRF protection
- SQL Injection protection
- Secure authentication

**Texnik yechimlar:**
- Input validation
- Output encoding
- HTTPS only
- Secure headers

### 5.6. Maintainability (Texnik Xizmat)

**Talablar:**
- Clean code
- Documentation
- Version control
- Testing coverage > 80%

**Texnik yechimlar:**
- ESLint
- Prettier
- Git
- Jest/Vitest

---

## 6. TEXNIK ARXITEKTURA

### 6.1. Umumiy Arxitektura

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT SIDE                          │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐         ┌──────────────┐            │
│  │ Admin Panel  │         │   Website    │            │
│  │  (React)     │         │   (React)    │            │
│  └──────────────┘         └──────────────┘            │
│         │                         │                     │
│         └─────────┬───────────────┘                     │
│                   │                                     │
│         ┌─────────▼─────────┐                          │
│         │   React Router    │                          │
│         └─────────┬─────────┘                          │
│                   │                                     │
│         ┌─────────▼─────────┐                          │
│         │  Context API      │                          │
│         │  (State Mgmt)     │                          │
│         └─────────┬─────────┘                          │
│                   │                                     │
│         ┌─────────▼─────────┐                          │
│         │  LocalStorage     │                          │
│         │  (Data Layer)     │                          │
│         └───────────────────┘                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    SERVER SIDE                          │
├─────────────────────────────────────────────────────────┤
│         ┌───────────────────┐                          │
│         │  Telegram Bot     │                          │
│         │  (Node.js)        │                          │
│         └─────────┬─────────┘                          │
│                   │                                     │
│         ┌─────────▼─────────┐                          │
│         │  Telegram API     │                          │
│         └───────────────────┘                          │
└─────────────────────────────────────────────────────────┘
```

### 6.2. Frontend Arxitektura

**Component Structure:**
```
src/
├── components/
│   ├── pages/           # Admin sahifalar
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Sales.jsx
│   │   └── ...
│   ├── website/         # Website sahifalar
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   └── ...
│   │   └── context/
│   │       └── CartContext.jsx
│   ├── AdminPanel.jsx
│   ├── CustomerSite.jsx
│   └── ...
├── context/             # Global state
│   ├── DataContext.jsx
│   ├── LanguageContext.jsx
│   ├── AdminAuthContext.jsx
│   └── TelegramService.jsx
├── utils/               # Utility functions
│   ├── auth.js
│   ├── telegram.js
│   └── orderService.js
├── App.jsx
└── main.jsx
```

### 6.3. State Management

**Context API Structure:**
- **DataContext:** Mahsulotlar, sotuvlar, xarajatlar
- **LanguageContext:** Til sozlamalari
- **AdminAuthContext:** Admin autentifikatsiya
- **CartContext:** Savatcha holati
- **TelegramService:** Telegram integratsiya

### 6.4. Data Flow

```
User Action → Component → Context → LocalStorage → UI Update
```

---

## 7. MA'LUMOTLAR BAZASI

### 7.1. LocalStorage Schema

#### 7.1.1. Products
```javascript
{
  id: string,              // Unique ID
  name: string,            // Mahsulot nomi
  category: string,        // Kategoriya
  priceUSD: number,        // Narx (USD)
  priceUZS: number,        // Narx (UZS)
  quantity: number,        // Miqdor
  unit: string,            // Birlik (dona, quti, metr)
  description: string,     // Tavsif
  image: string | null,    // Rasm (base64)
  featured: boolean,       // Ommabop
  createdAt: timestamp     // Yaratilgan vaqt
}
```

#### 7.1.2. Sales
```javascript
{
  id: string,
  productId: string,
  productName: string,
  quantity: number,
  priceUSD: number,
  priceUZS: number,
  total: number,
  customer: string,
  date: timestamp,
  paymentMethod: string
}
```

#### 7.1.3. Expenses
```javascript
{
  id: string,
  category: string,
  amount: number,
  description: string,
  date: timestamp
}
```

#### 7.1.4. Debts
```javascript
{
  id: string,
  customerName: string,
  amount: number,
  paid: number,
  remaining: number,
  date: timestamp,
  dueDate: timestamp,
  status: string
}
```

#### 7.1.5. Admin Credentials
```javascript
{
  login: string,
  password: string,
  lastModified: timestamp
}
```

#### 7.1.6. Cart
```javascript
{
  items: [
    {
      productId: string,
      name: string,
      price: number,
      quantity: number,
      image: string
    }
  ],
  total: number
}
```

### 7.2. Data Validation

**Rules:**
- Barcha ID lar unique bo'lishi kerak
- Narxlar > 0
- Miqdorlar >= 0
- Sanalar valid timestamp
- String lar bo'sh bo'lmasligi kerak

---

## 8. INTERFEYS VA DIZAYN

### 8.1. Dizayn Printsiplari

**1. Minimalizm**
- Ortiqcha elementlar yo'q
- Faqat kerakli ma'lumotlar
- Clean va zamonaviy

**2. Consistency**
- Bir xil ranglar
- Bir xil komponentlar
- Bir xil spacing

**3. Accessibility**
- Yaxshi contrast
- Katta tugmalar
- Keyboard navigation

**4. Responsive**
- Mobile-first
- Tablet optimizatsiya
- Desktop kengaytirilgan

### 8.2. Rang Palitra

**Light Mode:**
- Primary: #4f46e5 (Indigo)
- Success: #10b981 (Green)
- Warning: #f59e0b (Amber)
- Danger: #ef4444 (Red)
- Background: #ffffff (White)
- Text: #1f2937 (Gray-800)

**Dark Mode:**
- Primary: #6366f1 (Indigo-400)
- Success: #34d399 (Green-400)
- Warning: #fbbf24 (Amber-400)
- Danger: #f87171 (Red-400)
- Background: #1f2937 (Gray-800)
- Text: #f9fafb (Gray-50)

### 8.3. Typography

**Font Family:** System fonts (San Francisco, Segoe UI, Roboto)

**Font Sizes:**
- Heading 1: 28px (bold)
- Heading 2: 24px (bold)
- Heading 3: 20px (semibold)
- Body: 16px (regular)
- Small: 14px (regular)
- Tiny: 12px (regular)

### 8.4. Spacing

**Margin/Padding:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### 8.5. Components

**Button:**
- Primary: Indigo background, white text
- Secondary: Gray background, dark text
- Danger: Red background, white text
- Height: 40px
- Border radius: 8px
- Padding: 12px 24px

**Card:**
- Background: White (light) / Gray-800 (dark)
- Border radius: 12px
- Padding: 20px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)

**Input:**
- Height: 40px
- Border: 1px solid gray-300
- Border radius: 8px
- Padding: 8px 12px
- Focus: Indigo border

### 8.6. Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 9. INTEGRATSIYALAR

### 9.1. Telegram Bot

**Maqsad:** Buyurtmalarni qabul qilish va admin'ga xabar yuborish

**Texnik detallar:**
- Node.js + Express
- Telegram Bot API
- Webhook yoki Long Polling

**Funksiyalar:**
- Buyurtma qabul qilish
- Admin'ga xabar yuborish
- Buyurtma tasdiqlanishi
- Buyurtma holati

**API Endpoints:**
```
POST /api/order - Yangi buyurtma
GET /api/orders - Buyurtmalar ro'yxati
GET /api/order/:id - Buyurtma detallari
```

### 9.2. PWA (Progressive Web App)

**Maqsad:** Offline ishlash va mobil app kabi tajriba

**Texnik detallar:**
- Service Worker
- Manifest.json
- Cache strategiyalari

**Funksiyalar:**
- Offline ishlash
- Install to home screen
- Push notifications (kelajakda)
- Background sync (kelajakda)

### 9.3. Barcode Scanner

**Maqsad:** Mahsulotlarni tez qidirish

**Texnik detallar:**
- HTML5 Camera API
- Barcode detection library
- Real-time scanning

**Funksiyalar:**
- Barcode scan qilish
- Mahsulotni topish
- Mahsulot detallarini ko'rsatish

---

