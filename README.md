# 🏪 Alisher Mobile - Online Telefon Do'koni

O'zbekistondagi eng zamonaviy mobil telefonlar do'koni. React + Vite + Telegram Bot bilan qurilgan.

---

## 🚀 Tezkor Boshlash

### 1. Loyihani Yuklab Olish
```bash
git clone <repository-url>
cd topshiriq
```

### 2. Dependencies O'rnatish
```bash
npm install
```

### 3. Serverlarni Ishga Tushirish

**Web Sayt (Terminal 1):**
```bash
npm run dev
# Sayt: http://localhost:3000/
```

**Telegram Bot (Terminal 2):**
```bash
cd bot
node index.js
# Bot: http://localhost:3004
```

---

## 🔐 Admin Panel Ma'lumotlari

### Default Admin Credentials
```
URL: http://localhost:3000/#/admin/login

Login: superadmin
Parol: Admin@2024!Secure
```

### Admin Ma'lumotlarini O'zgartirish
1. Admin panelga kiring
2. **Sozlamalar** sahifasiga o'ting
3. **Admin Login va Parol** bo'limini toping
4. Yangi login va parolni kiriting
5. **Login va Parolni O'zgartirish** tugmasini bosing

**⚠️ Muhim:** Admin ma'lumotlarini eslab qoling! Ularni yo'qotib qo'ysangiz, localStorage'ni tozalashingiz kerak:
```javascript
// Browser Console'da
localStorage.removeItem('alisher_mobile_admin_credentials')
```

---

## 📱 Telegram Bot

### Bot Ma'lumotlari
```
Bot Username: @alisher_mobile_shop_bot
Bot Token: 8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE
Admin Chat ID: 8512936274
```

### Bot Sozlamalari
Fayl: `bot/.env`
```env
BOT_TOKEN=8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE
WEBAPP_URL=http://localhost:3000
PORT=3004
ADMIN_CHAT_ID=8512936274
```

### Bot Komandalar
- `/start` - Botni ishga tushirish
- `/getid` - Chat ID va User ID olish

---

## 🎨 Xususiyatlar

### Foydalanuvchi Sayti
- ✅ Bosh sahifa (HomePage)
- ✅ Mahsulotlar katalogi (ProductsPage)
- ✅ Biz haqimizda (AboutPage)
- ✅ Katalog dropdown (brendlar bo'yicha)
- ✅ Savatcha (CartSidebar)
- ✅ Login/Register (AuthModal)
- ✅ **Qorong'u/Yorug' rejim (Dark/Light Mode)** 🌙☀️
- ✅ Til tanlash (O'zbek, Rus, Ingliz)

### Admin Panel
- ✅ Dashboard (statistika)
- ✅ Mahsulotlar boshqaruvi
- ✅ Kategoriyalar boshqaruvi
- ✅ Savdo boshqaruvi
- ✅ Mijozlar boshqaruvi
- ✅ Qarzlar boshqaruvi
- ✅ Xarajatlar boshqaruvi
- ✅ Xodimlar boshqaruvi
- ✅ **Sozlamalar (Admin login/parol o'zgartirish)** 🔐

### Telegram Integratsiyasi
- ✅ Buyurtma xabarnomasi
- ✅ Admin xabarnomasi
- ✅ Web App tugmasi
- ✅ Katalog ko'rsatish
- ✅ Mahsulot tafsilotlari

---

## 🛠️ Texnologiyalar

### Frontend
- **React 18.3.1** - UI kutubxonasi
- **Vite 8.0.14** - Build tool
- **React Router 6.8.0** - Routing
- **Lucide React** - Ikonlar
- **Recharts** - Grafiklar

### Backend
- **Node.js** - Server
- **Express** - API
- **node-telegram-bot-api** - Telegram bot

### Storage
- **localStorage** - Ma'lumotlar saqlash
- **IndexedDB** - Katta ma'lumotlar
- **sessionStorage** - Session boshqaruvi

---

## 📂 Loyiha Strukturasi

```
topshiriq/
├── src/
│   ├── components/          # React komponentlar
│   │   ├── pages/          # Admin panel sahifalari
│   │   └── website/        # Foydalanuvchi sayti
│   ├── context/            # React Context'lar
│   │   ├── LanguageContext.jsx
│   │   ├── DataContext.jsx
│   │   ├── TelegramService.jsx
│   │   └── AdminAuthContext.jsx
│   ├── utils/              # Yordamchi funksiyalar
│   │   ├── auth.js         # Admin autentifikatsiya
│   │   └── telegram.js     # Telegram integratsiya
│   ├── App.jsx             # Asosiy komponent
│   ├── main.jsx            # Kirish nuqtasi
│   └── index.css           # Global CSS
├── bot/
│   ├── index.js            # Telegram bot server
│   ├── .env                # Bot sozlamalari
│   └── package.json        # Bot dependencies
├── public/                 # Static fayllar
├── index.html              # HTML shablon
├── package.json            # Loyiha sozlamalari
├── vite.config.js          # Vite sozlamalari
└── README.md               # Bu fayl
```

---

## 🔧 Sozlamalar

### Port O'zgartirish
**Web Sayt:** `vite.config.js`
```javascript
server: {
  port: 3000,  // Bu yerda o'zgartiring
  host: '0.0.0.0'
}
```

**Bot Server:** `bot/index.js`
```javascript
const PORT = 3004;  // Bu yerda o'zgartiring
const webAppUrl = 'http://localhost:3000';  // Web sayt URL
```

### Admin Ma'lumotlarini Reset Qilish
```javascript
// Browser Console'da
localStorage.removeItem('alisher_mobile_admin_credentials')
// Sahifani yangilang, default admin qayta yaratiladi
```

---

## 🧪 Test Qilish

### 1. Web Saytni Test Qilish
```
1. http://localhost:3000/ ni oching
2. Mahsulotlarni ko'ring
3. Savatchaga qo'shing
4. Buyurtma bering
```

### 2. Admin Panelni Test Qilish
```
1. http://localhost:3000/#/admin/login ga o'ting
2. Login: superadmin
3. Parol: Admin@2024!Secure
4. Dashboard'ni ko'ring
```

### 3. Telegram Botni Test Qilish
```
1. Telegram'da @alisher_mobile_shop_bot ni qidiring
2. /start bosing
3. "🌐 Saytni ochish" tugmasini bosing
4. Web app ochiladi
```

### 4. Dark Mode Test Qilish
```
1. Saytni oching
2. Header'dagi 🌙/☀️ tugmasini bosing
3. Rejim o'zgaradi
4. localStorage'da saqlanadi
```

---

## 📊 Ma'lumotlar

### localStorage Keys
```javascript
// Admin
'alisher_mobile_admin_credentials'  // Admin login/parol
'alisher_mobile_admin_session'      // Admin session

// Foydalanuvchi
'alisher_mobile_customers'          // Mijozlar
'alisher_mobile_cart'               // Savatcha
'alisher_mobile_theme'              // Dark/Light mode

// Ma'lumotlar
'products'                          // Mahsulotlar
'categories'                        // Kategoriyalar
'orders'                            // Buyurtmalar
```

### Default Ma'lumotlar
- **10 ta mahsulot** (iPhone, Samsung, Honor, va boshqalar)
- **10 ta kategoriya** (brendlar)
- **1 ta admin** (superadmin)

---

## 🚀 Production Deploy

### Build Qilish
```bash
npm run build
```

### Vercel'ga Deploy
```bash
npm run deploy:vercel
```

### Netlify'ga Deploy
```bash
npm run deploy:netlify
```

---

## 🐛 Muammolarni Hal Qilish

### Sayt Ochilmayapti
```bash
# Node modules'ni qayta o'rnating
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Admin Panelga Kira Olmayapman
```javascript
// Browser Console'da
localStorage.removeItem('alisher_mobile_admin_credentials')
// Sahifani yangilang
// Login: superadmin
// Parol: Admin@2024!Secure
```

### Telegram Bot Ishlamayapti
```bash
# Bot serverni qayta ishga tushiring
cd bot
node index.js
```

### Dark Mode Ishlamayapti
```javascript
// Browser Console'da
localStorage.removeItem('alisher_mobile_theme')
// Sahifani yangilang
```

---

## 📝 Hujjatlar

- `ADMIN_LOGIN_TUZATILDI.md` - Admin login tizimi
- `WARNINGS_TUZATILDI.md` - Warning'lar tuzatildi
- `PORT_OZGARTIRILDI.md` - Port o'zgartirildi
- `BARCHA_XATOLAR_TUZATILDI.md` - Barcha xatolar
- `FINAL_COMPLETE_STATUS.md` - Yakuniy holat

---

## 🎯 Asosiy Ma'lumotlar

### Web Sayt
- **URL:** http://localhost:3000/
- **Port:** 3000
- **Framework:** React 18.3.1 + Vite 8.0.14

### Admin Panel
- **URL:** http://localhost:3000/#/admin/login
- **Login:** superadmin
- **Parol:** Admin@2024!Secure

### Telegram Bot
- **Bot:** @alisher_mobile_shop_bot
- **Server:** http://localhost:3004
- **Admin ID:** 8512936274

### Xususiyatlar
- ✅ Dark/Light Mode (Header'da)
- ✅ Admin login o'zgartirish (Settings'da)
- ✅ Telegram integratsiya
- ✅ PWA qo'llab-quvvatlash
- ✅ SEO optimizatsiya

---

## 📞 Yordam

Savollar bo'lsa:
1. README.md ni o'qing
2. Hujjatlarni ko'ring
3. Console'ni tekshiring (F12)

---

**Versiya:** 1.0.2
**Sana:** 2026-05-23
**Status:** ✅ TAYYOR

# 🎉 SAYT MUKAMMAL ISHLAYAPTI!
