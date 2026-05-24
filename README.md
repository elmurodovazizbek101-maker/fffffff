# 🛒 Alisher Mobile - E-commerce Platform

Modern va professional mobil telefon do'koni uchun to'liq e-commerce platformasi.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/alisherelmurodov88-cmd/alishermobile)

---

## 🌟 Xususiyatlar

### 👨‍💼 Admin Panel
- 📊 Dashboard (statistika, grafiklar, hisobotlar)
- 📦 Mahsulotlar boshqaruvi (qo'shish, o'zgartirish, o'chirish)
- 💰 Sotuvlar va hisobotlar
- 💸 Xarajatlar nazorati
- 📋 Qarzdorlar ro'yxati
- 👥 Xodimlar va yetkazib beruvchilar
- 🎁 Aksiyalar va chegirmalar
- ⚙️ Sozlamalar (admin login/parol o'zgartirish)
- 🔍 Barcode scanner
- 📱 Responsive dizayn

### 🛍️ E-commerce Website
- 🏠 Bosh sahifa (ommabop mahsulotlar)
- 📱 Kataloglar (barcha brendlar)
- 🔍 Mahsulotlar (filter, qidiruv, saralash)
- 🛒 Savatcha va buyurtma berish
- 🌙 Dark/Light mode
- 📱 Mobil uchun optimallashtirilgan
- 🤖 Telegram orqali buyurtma
- ⚡ PWA support (offline ishlash)

### 🤖 Telegram Bot
- 📲 Buyurtmalarni qabul qilish
- 📧 Admin'ga xabar yuborish
- 🔔 Real-time bildirishnomalar

---

## 🚀 Tezkor Boshlash

### 1️⃣ O'rnatish

```bash
# Repository'ni clone qiling
git clone https://github.com/alisherelmurodov88-cmd/alishermobile.git
cd alishermobile

# Dependencies o'rnating
npm install

# Development server'ni ishga tushiring
npm run dev
```

Sayt ochiladi: `http://localhost:3000`

### 2️⃣ Telegram Bot

```bash
# Bot papkasiga o'ting
cd bot

# Dependencies o'rnating
npm install

# .env faylini yarating
cp .env.example .env

# Bot token va URL ni qo'shing
# BOT_TOKEN=your_telegram_bot_token
# WEBAPP_URL=http://localhost:3000

# Bot'ni ishga tushiring
npm start
```

Bot ishga tushadi: `http://localhost:3004`

---

## 📦 Deploy Qilish

### Netlify (Tavsiya Etiladi)

1. **GitHub'ga yuklang:**
   - GitHub Desktop ishlatib loyihani publish qiling
   - Yoki: `git push origin main`

2. **Netlify'ga deploy qiling:**
   - https://app.netlify.com/ ga kiring
   - "Import from Git" tugmasini bosing
   - Repository'ni tanlang
   - Deploy qiling

**Batafsil:** [BOSHLASH.md](BOSHLASH.md) faylini o'qing

### Boshqa Platformalar

- **Vercel:** [DEPLOY_QILISH_QOLLANMA.md](DEPLOY_QILISH_QOLLANMA.md)
- **GitHub Pages:** [DEPLOY_QILISH_QOLLANMA.md](DEPLOY_QILISH_QOLLANMA.md)
- **Render:** [DEPLOY_QILISH_QOLLANMA.md](DEPLOY_QILISH_QOLLANMA.md)

---

## 🔐 Admin Kirish

**Default kredensiallar:**
- **Login:** `superadmin`
- **Parol:** `Admin@2024!Secure`

**O'zgartirish:**
- Admin panel → Sozlamalar → Admin Ma'lumotlari

---

## 🛠️ Texnologiyalar

### Frontend
- ⚛️ **React 18.3.1** - UI library
- 🎨 **Tailwind CSS** - Styling
- 🚀 **Vite** - Build tool
- 🔀 **React Router** - Routing
- 📊 **Recharts** - Grafiklar
- 🎭 **Lucide React** - Ikonlar

### Backend
- 🤖 **Node.js** - Runtime
- 📱 **Telegram Bot API** - Bot integratsiyasi
- 💾 **LocalStorage** - Ma'lumotlar bazasi

### DevOps
- 🔧 **ESLint** - Code linting
- 💅 **Prettier** - Code formatting
- 🚀 **Netlify** - Hosting
- 🔄 **GitHub Actions** - CI/CD

---

## 📁 Loyiha Strukturasi

```
alishermobile/
├── src/
│   ├── components/          # React komponentlar
│   │   ├── pages/          # Admin sahifalar
│   │   └── website/        # Website sahifalar
│   ├── context/            # Context providers
│   ├── utils/              # Utility funksiyalar
│   ├── App.jsx             # Asosiy App komponenti
│   └── main.jsx            # Entry point
├── bot/                    # Telegram bot
│   ├── index.js           # Bot server
│   └── package.json       # Bot dependencies
├── public/                 # Static fayllar
├── .github/               # GitHub Actions
├── netlify.toml           # Netlify konfiguratsiya
├── vite.config.js         # Vite konfiguratsiya
└── package.json           # Dependencies
```

---

## 📚 Hujjatlar

- 📖 [BOSHLASH.md](BOSHLASH.md) - Tezkor boshlash qo'llanmasi
- 🚀 [DEPLOY_TEZKOR.md](DEPLOY_TEZKOR.md) - 5 daqiqada deploy qilish
- 📘 [DEPLOY_QILISH_QOLLANMA.md](DEPLOY_QILISH_QOLLANMA.md) - To'liq deploy qo'llanmasi
- 🤖 [TELEGRAM_SETUP.md](TELEGRAM_SETUP.md) - Telegram bot sozlash
- 🔧 [API.md](API.md) - API hujjatlari
- 🧪 [TESTING.md](TESTING.md) - Test qilish
- 📊 [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Loyiha xulosasi
- ❓ [FAQ.md](FAQ.md) - Ko'p so'raladigan savollar

---

## 🎯 Xususiyatlar Ro'yxati

### ✅ Tayyor
- [x] Admin panel (Dashboard, Products, Sales, etc.)
- [x] E-commerce website (Home, Products, Categories, Cart)
- [x] Telegram bot integratsiyasi
- [x] Dark/Light mode
- [x] PWA support
- [x] Responsive dizayn
- [x] LocalStorage database
- [x] Admin login system
- [x] Barcode scanner
- [x] Katalog filterlari
- [x] Savatcha funksiyasi
- [x] Buyurtma berish

### 🔄 Rejada
- [ ] Backend API (Node.js + MongoDB)
- [ ] Real database integratsiyasi
- [ ] Payment gateway
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Multi-language support
- [ ] Advanced analytics

---

## 🤝 Hissa Qo'shish

Hissa qo'shmoqchimisiz? Ajoyib!

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. Commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request oching

Batafsil: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 Litsenziya

Bu loyiha MIT litsenziyasi ostida. Batafsil: [LICENSE](LICENSE)

---

## 👨‍💻 Muallif

**Alisher Elmurodov**
- GitHub: [@alisherelmurodov88-cmd](https://github.com/alisherelmurodov88-cmd)

---

## 🙏 Minnatdorchilik

- React jamoasiga
- Tailwind CSS jamoasiga
- Vite jamoasiga
- Barcha open-source contributorlar

---

## 📞 Aloqa

Savollar yoki takliflar bo'lsa:
- GitHub Issues: [Issues](https://github.com/alisherelmurodov88-cmd/alishermobile/issues)
- Email: alisherelmurodov88@gmail.com

---

## 🌟 Loyihani Yoqtirdingizmi?

Agar loyiha foydali bo'lsa, ⭐ star bering!

---

## 📊 Statistika

- **Kod qatorlari:** 5,000+
- **Komponentlar:** 30+
- **Sahifalar:** 16 (12 admin + 4 website)
- **Fayllar:** 83
- **Dependencies:** 20+

---

## 🎉 Demo

**Live Demo:** [https://alisher-mobile.netlify.app](https://alisher-mobile.netlify.app)

**Admin Panel:** [https://alisher-mobile.netlify.app/#/admin](https://alisher-mobile.netlify.app/#/admin)
- Login: `superadmin`
- Parol: `Admin@2024!Secure`

---

**Loyihani ishlatganingiz uchun rahmat!** 🚀
