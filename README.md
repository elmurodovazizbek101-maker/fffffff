# 🛒 Alisher Mobile - Professional E-commerce Platform

Modern va professional mobil telefon do'koni uchun yaratilgan to'liq e-commerce platformasi.

## 🚀 Live Demo

**Sayt manzili:** [Netlify/Vercel orqali deploy qilinadi]

## 📱 Xususiyatlar

### 🛍️ Customer Website
- ✅ Modern va responsive dizayn
- ✅ 4-ustunli mahsulot grid layout
- ✅ Savatcha va checkout tizimi
- ✅ Mahsulot filtrlash va qidiruv
- ✅ Wishlist funksiyasi
- ✅ PWA support (Progressive Web App)
- ✅ Mobile-first dizayn

### 👨‍💼 Admin Panel
- ✅ To'liq CRUD operatsiyalar
- ✅ Mahsulotlar boshqaruvi
- ✅ Buyurtmalar nazorati
- ✅ Mijozlar boshqaruvi
- ✅ Kategoriyalar va sotuvlar
- ✅ Telegram bot integratsiyasi
- ✅ Sozlamalar paneli

### 🤖 Telegram Integration
- ✅ Avtomatik buyurtma bildirishnomalar
- ✅ Mijoz ro'yxatdan o'tish xabarlari
- ✅ Admin panel orqali Chat ID sozlash
- ✅ Bot test funksiyasi

## 🛠️ Texnologiyalar

- **Frontend:** React 18, Vite 8
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL)
- **Styling:** Custom CSS
- **Deployment:** Netlify/Vercel ready

## 📦 O'rnatish va Ishga Tushirish

### 1. Repository ni klonlash
```bash
git clone https://github.com/alisherelmurodov88-cmd/alishermobile.git
cd alishermobile
```

### 2. Dependencies o'rnatish
```bash
npm install
```

### 3. Environment variables sozlash
```bash
cp .env.example .env
# .env faylida kerakli o'zgaruvchilarni to'ldiring
```

### 4. Development server ishga tushirish
```bash
npm run dev
```

Sayt `http://localhost:3000` da ochiladi.

### 5. Production build yaratish
```bash
npm run build
```

## 🚀 Deploy Qilish

### Netlify orqali (Tavsiya etiladi)

1. **Manual Deploy:**
   - `npm run build` buyrug'ini bajaring
   - `dist` papkasini ZIP ga siqing
   - [Netlify](https://netlify.com) ga kiring
   - "Sites" > "Add new site" > "Deploy manually"
   - ZIP faylni drag & drop qiling

2. **GitHub orqali (Avtomatik):**
   - GitHub repository yarating
   - Kodlarni push qiling
   - Netlify da "New site from Git" tanlang
   - Repository ni ulang
   - Build settings: `npm run build`, Publish directory: `dist`

### Vercel orqali

1. **GitHub orqali:**
   - [Vercel](https://vercel.com) ga kiring
   - "New Project" > GitHub repository tanlang
   - Avtomatik deploy qilinadi

2. **Manual:**
   - Vercel CLI o'rnating: `npm i -g vercel`
   - `vercel --prod` buyrug'ini bajaring

## 🔧 Sozlamalar

### Admin Login
- **Login:** `superadmin`
- **Parol:** `Admin@2024!Secure`

### Telegram Bot Sozlash
1. Admin panelga kiring
2. Settings > Telegram Bot bo'limiga o'ting
3. "Chat ID Olish" tugmasini bosing
4. Telegram botingizga `/start` yuboring
5. "Bot Testini O'tkazish" tugmasini bosing

### Database Sozlash
1. [Supabase](https://supabase.com) da yangi loyiha yarating
2. `database/schema.sql` faylini import qiling
3. `.env` faylida Supabase URL va API key ni to'ldiring

## 📁 Loyiha Strukturasi

```
alisher-mobile/
├── public/                 # Static fayllar
├── src/
│   ├── components/         # React komponentlar
│   │   ├── pages/         # Admin panel sahifalari
│   │   └── website/       # Customer website
│   ├── context/           # React Context providers
│   ├── data/              # Static ma'lumotlar
│   ├── lib/               # Kutubxonalar (Supabase)
│   ├── services/          # API xizmatlari
│   └── utils/             # Yordamchi funksiyalar
├── database/              # Database schema
├── dist/                  # Production build
└── docs/                  # Hujjatlar
```

## 🔒 Xavfsizlik

- ✅ Password hashing
- ✅ Input validation
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Secure headers
- ✅ Environment variables

## 📊 Performance

- ✅ Code splitting
- ✅ Lazy loading
- ✅ Image optimization
- ✅ Bundle optimization
- ✅ Caching strategies
- ✅ PWA caching

## 🐛 Muammolarni Hal Qilish

### Build Xatoliklari
```bash
# Dependencies ni qayta o'rnatish
rm -rf node_modules package-lock.json
npm install

# Cache tozalash
npm run build -- --force
```

### Telegram Bot Ishlamaydi
1. Bot token to'g'riligini tekshiring
2. Chat ID ni to'g'ri sozlang
3. Botga `/start` yuborgan ekanligingizni tekshiring

## 📞 Yordam

Muammolar yoki savollar bo'lsa:
- GitHub Issues orqali muammo yarating
- Telegram: [@alisherelmurodov88]

## 📄 Litsenziya

MIT License - batafsil ma'lumot uchun `LICENSE` faylini ko'ring.

---

**© 2024 Alisher Mobile - Professional E-commerce Platform**