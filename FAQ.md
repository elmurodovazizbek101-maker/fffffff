# FAQ - Frequently Asked Questions

Alisher Mobile loyihasi bo'yicha tez-tez so'raladigan savollar.

## 📋 General Questions

### Q: Alisher Mobile nima?
**A:** Alisher Mobile - bu O'zbekistondagi mobil telefonlar do'koni uchun yaratilgan professional online magazin va admin panel tizimi. React, Vite va Telegram Bot integratsiyasi bilan qurilgan.

### Q: Loyiha qanday texnologiyalar bilan qurilgan?
**A:**
- **Frontend:** React 18, Vite
- **Routing:** React Router DOM v6
- **Icons:** Lucide React
- **Charts:** Recharts
- **Styling:** Modern CSS with CSS Variables
- **Bot:** Node.js, Telegram Bot API
- **PWA:** Service Worker, Web Manifest

### Q: Loyiha bepulmi?
**A:** Ha, loyiha MIT litsenziyasi ostida ochiq manba (open source) hisoblanadi.

---

## 🚀 Installation & Setup

### Q: Qanday qilib loyihani o'rnataman?
**A:**
```bash
# Repository ni clone qiling
git clone https://github.com/username/alisher-mobile.git
cd alisher-mobile

# Dependencies o'rnating
npm install

# Development server ishga tushiring
npm run dev
```

### Q: Qanday Node.js versiyasi kerak?
**A:** Node.js 18.x yoki undan yuqori versiya tavsiya etiladi.

### Q: Bot qanday sozlanadi?
**A:**
```bash
cd bot
npm install

# .env faylini yarating
echo "BOT_TOKEN=your_bot_token" > .env
echo "ADMIN_ID=your_telegram_id" >> .env

# Bot serverni ishga tushiring
node index.js
```

### Q: Environment variables qayerda sozlanadi?
**A:** Bot uchun `bot/.env` faylida:
```
BOT_TOKEN=your_telegram_bot_token
ADMIN_ID=your_telegram_user_id
```

---

## 💻 Development

### Q: Development server qanday ishga tushiriladi?
**A:**
```bash
npm run dev
```
Server `http://localhost:5173` da ochiladi.

### Q: Production build qanday yaratiladi?
**A:**
```bash
npm run build
```
Build `dist/` papkasida yaratiladi.

### Q: Build ni qanday preview qilaman?
**A:**
```bash
npm run preview
```

### Q: Qanday qilib kod formatini tekshiraman?
**A:**
```bash
npm run lint
npm run format
```

---

## 🔐 Admin Panel

### Q: Admin panel ga qanday kiraman?
**A:**
- URL: `http://localhost:5173/admin/login`
- Login: `admin`
- Password: `alisher123`

### Q: Admin parolini qanday o'zgartiraman?
**A:** `src/components/LoginPage.jsx` faylida login logikasini o'zgartiring va yangi parolni hash qiling.

### Q: Admin panel qanday xususiyatlarga ega?
**A:**
- Dashboard (statistika va grafiklar)
- Mahsulotlar boshqaruvi
- Kategoriyalar boshqaruvi
- Sotuvlar
- Mijozlar
- Qarzlar
- Ta'minotchilar
- Xarajatlar
- Xodimlar
- Aksiyalar
- Scanner
- Sozlamalar

---

## 🛒 Customer Website

### Q: Mijozlar qanday buyurtma berishadi?
**A:**
1. Saytga kirish
2. Catalog dan mahsulot tanlash
3. Savatga qo'shish
4. Ro'yxatdan o'tish (agar kerak bo'lsa)
5. Checkout
6. Buyurtma berish

### Q: Ro'yxatdan o'tish majburiyatmi?
**A:** Ha, buyurtma berish uchun ro'yxatdan o'tish kerak.

### Q: Qanday to'lov usullari mavjud?
**A:**
- Naqd pul (Cash on delivery)
- Karta (Card payment)
- Bank o'tkazmasi (Bank transfer)

### Q: Savat ma'lumotlari saqlanadimi?
**A:** Ha, savat ma'lumotlari localStorage da saqlanadi va browser yopilganda ham saqlanib qoladi.

---

## 🤖 Telegram Bot

### Q: Bot qanday ishlaydi?
**A:** Bot yangi buyurtmalar, mijoz ro'yxatdan o'tishlari va boshqa muhim hodisalar haqida admin ga xabar yuboradi.

### Q: Bot token qayerdan olinadi?
**A:** [@BotFather](https://t.me/BotFather) dan yangi bot yarating va token oling.

### Q: Admin ID qanday topiladi?
**A:** [@userinfobot](https://t.me/userinfobot) ga `/start` yuboring, sizning Telegram ID ni ko'rsatadi.

### Q: Bot qanday commandalarga ega?
**A:**
- `/start` - Botni ishga tushirish
- `/products` - Mahsulotlar ro'yxati
- `/orders` - Buyurtmalar
- `/contact` - Aloqa ma'lumotlari
- `/help` - Yordam

### Q: Bot xabarlari qanday customizatsiya qilinadi?
**A:** `bot/index.js` faylida xabar matnlarini o'zgartiring.

---

## 🌐 Multi-Language

### Q: Qanday tillar qo'llab-quvvatlanadi?
**A:**
- O'zbek (uz)
- English (en)
- Русский (ru)

### Q: Yangi til qanday qo'shiladi?
**A:** `src/context/LanguageContext.jsx` faylida yangi til tarjimalarini qo'shing:
```javascript
const translations = {
  uz: { /* O'zbek tarjimalari */ },
  en: { /* English translations */ },
  ru: { /* Русские переводы */ },
  newLang: { /* Yangi til tarjimalari */ }
};
```

### Q: Default til qanday o'zgartiriladi?
**A:** `LanguageContext.jsx` da:
```javascript
const [language, setLanguage] = useState('uz'); // 'uz', 'en', 'ru'
```

---

## 📱 PWA

### Q: PWA nima?
**A:** Progressive Web App - bu web sayt bo'lib, mobil ilovadek o'rnatilishi va ishlashi mumkin.

### Q: PWA qanday o'rnatiladi?
**A:**
- **Desktop:** Browser address bar da install icon ni bosing
- **Mobile (Android):** Menu → Add to Home screen
- **Mobile (iOS):** Share → Add to Home Screen

### Q: Offline ishlash qanday amalga oshiriladi?
**A:** Service Worker (`public/sw.js`) avtomatik caching qiladi va offline rejimda ishlashni ta'minlaydi.

### Q: PWA iconlari qayerda?
**A:** `public/` papkasida turli o'lchamdagi iconlar bo'lishi kerak:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

---

## 🚀 Deployment

### Q: Qayerga deploy qilish mumkin?
**A:**
- Vercel (tavsiya etiladi)
- Netlify
- GitHub Pages
- Heroku
- Railway
- VPS (Ubuntu, CentOS, etc.)

### Q: Vercel ga qanday deploy qilinadi?
**A:**
```bash
# Vercel CLI o'rnating
npm i -g vercel

# Deploy qiling
vercel --prod
```

### Q: Environment variables production da qanday sozlanadi?
**A:** Vercel/Netlify dashboard da Environment Variables bo'limida qo'shing.

### Q: Custom domain qanday qo'shiladi?
**A:** Vercel/Netlify dashboard da Domains bo'limida custom domain qo'shing va DNS sozlamalarini yangilang.

---

## 🔒 Security

### Q: Loyiha xavfsizmi?
**A:** Ha, loyihada quyidagi xavfsizlik choralari mavjud:
- HTTPS
- Password hashing
- XSS protection
- CSRF protection
- SQL injection prevention
- Secure headers
- Input validation

### Q: Admin parolini qanday xavfsiz saqlash kerak?
**A:** Parolni hash qiling (bcrypt yoki argon2 dan foydalaning) va environment variable da saqlang.

### Q: Bot token xavfsizligini qanday ta'minlash kerak?
**A:**
- `.env` faylida saqlang
- `.gitignore` ga qo'shing
- Hech qachon public repository ga commit qilmang

---

## 🐛 Troubleshooting

### Q: "Module not found" xatosi chiqsa?
**A:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Q: Port 5173 band bo'lsa?
**A:** `vite.config.js` da portni o'zgartiring:
```javascript
server: {
  port: 3000 // Boshqa port
}
```

### Q: Build xatosi chiqsa?
**A:**
```bash
# Cache tozalash
rm -rf .vite dist
npm run build
```

### Q: Bot xabar yubormasa?
**A:**
- Bot token to'g'riligini tekshiring
- Admin ID to'g'riligini tekshiring
- Bot server ishlab turganini tekshiring
- Internet aloqasini tekshiring

### Q: Service Worker ishlamasa?
**A:**
- HTTPS da ishlayotganingizni tekshiring
- Browser cache ni tozalang
- Service Worker ni unregister qiling va qayta register qiling

---

## 📊 Performance

### Q: Sayt sekin yuklanayapti, nima qilish kerak?
**A:**
- Rasmlarni optimize qiling
- Code splitting qo'shing
- Lazy loading ishlating
- CDN dan foydalaning
- Caching strategiyasini yaxshilang

### Q: Bundle size katta, qanday kichiklashtirish mumkin?
**A:**
```bash
# Bundle analyzer o'rnating
npm install --save-dev rollup-plugin-visualizer

# Build qiling va tahlil qiling
npm run build -- --report
```

### Q: Lighthouse score qanday yaxshilanadi?
**A:**
- Rasmlarni optimize qiling
- Unused CSS ni olib tashlang
- JavaScript ni minify qiling
- Lazy loading qo'shing
- Caching headers qo'shing

---

## 🎨 Customization

### Q: Ranglarni qanday o'zgartiraman?
**A:** `src/index.css` da CSS variables ni o'zgartiring:
```css
:root {
  --primary: #ef4444;
  --secondary: #3b82f6;
  /* ... */
}
```

### Q: Logo qanday o'zgartiriladi?
**A:** Logo faylini `public/` papkasiga qo'ying va `index.html` da yo'lni yangilang.

### Q: Font qanday o'zgartiriladi?
**A:** `index.html` da Google Fonts linkini o'zgartiring va `src/index.css` da font-family ni yangilang.

### Q: Yangi sahifa qanday qo'shiladi?
**A:**
1. `src/components/pages/` da yangi component yarating
2. `src/App.jsx` da route qo'shing
3. Navigation menu ga link qo'shing

---

## 📱 Mobile

### Q: Mobile da responsive ishlayaptimi?
**A:** Ha, loyiha mobile-first approach bilan qurilgan va barcha ekranlarda ishlaydi.

### Q: Touch gestures qo'llab-quvvatlanadimi?
**A:** Ha, slider va boshqa elementlarda touch gestures ishlaydi.

### Q: Mobile app yaratish mumkinmi?
**A:** Ha, React Native yoki Capacitor dan foydalanib native mobile app yaratish mumkin.

---

## 🔄 Updates

### Q: Loyiha qanday yangilanadi?
**A:**
```bash
git pull origin main
npm install
npm run build
```

### Q: Dependencies qanday yangilanadi?
**A:**
```bash
# Barcha dependencies ni tekshirish
npm outdated

# Yangilash
npm update

# Yoki specific package
npm install package-name@latest
```

### Q: Breaking changes bo'lsa nima qilish kerak?
**A:** CHANGELOG.md faylini o'qing va migration guide ga amal qiling.

---

## 💡 Best Practices

### Q: Qanday best practices tavsiya etiladi?
**A:**
- Git da muntazam commit qiling
- Branch strategy dan foydalaning
- Code review qiling
- Testing yozing
- Documentation yangilang
- Security best practices ga amal qiling
- Performance monitoring qiling

### Q: Qanday qilib code quality ni yaxshilash mumkin?
**A:**
- ESLint va Prettier dan foydalaning
- Code review qiling
- Unit tests yozing
- SonarQube dan foydalaning
- Regular refactoring qiling

---

## 📞 Support

### Q: Yordam kerak bo'lsa qayerga murojaat qilish mumkin?
**A:**
- 📧 Email: support@alisher-mobile.uz
- 💬 Telegram: @alisher_mobile_shop_bot
- 🐛 GitHub Issues: [github.com/username/alisher-mobile/issues](https://github.com/username/alisher-mobile/issues)
- 📚 Documentation: README.md, API.md, FEATURES.md

### Q: Bug topilsa qanday xabar berish kerak?
**A:** GitHub Issues da yangi issue yarating va quyidagilarni kiriting:
- Bug tavsifi
- Qadam-baqadam takrorlash yo'li
- Screenshot (agar kerak bo'lsa)
- Browser va versiya
- Error messages

### Q: Feature request qanday yuboriladi?
**A:** GitHub Issues da "Feature Request" template bilan yangi issue yarating.

---

## 📚 Learning Resources

### Q: React o'rganish uchun qayerdan boshlash kerak?
**A:**
- [React Official Docs](https://react.dev)
- [React Tutorial](https://react.dev/learn)
- [freeCodeCamp React Course](https://www.freecodecamp.org)

### Q: Telegram Bot yaratishni qayerdan o'rganish mumkin?
**A:**
- [Telegram Bot API Docs](https://core.telegram.org/bots/api)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)

### Q: PWA haqida ko'proq ma'lumot qayerda?
**A:**
- [PWA Official Docs](https://web.dev/progressive-web-apps/)
- [Google PWA Guide](https://developers.google.com/web/progressive-web-apps)

---

## 🎓 Contributing

### Q: Loyihaga qanday hissa qo'shish mumkin?
**A:** CONTRIBUTING.md faylini o'qing va quyidagi qadamlarni bajaring:
1. Repository ni fork qiling
2. Feature branch yarating
3. O'zgarishlar kiriting
4. Test qiling
5. Pull request yuboring

### Q: Code style qanday bo'lishi kerak?
**A:** CONTRIBUTING.md da batafsil code style guidelines mavjud.

---

**Savolingiz javob topmadimi?**

📧 Email: support@alisher-mobile.uz
💬 Telegram: @alisher_mobile_shop_bot

---

© 2024 Alisher Mobile. Barcha huquqlar himoyalangan.
