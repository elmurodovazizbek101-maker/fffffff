# Testing Guide - Alisher Mobile

Saytni to'liq test qilish uchun qo'llanma.

## 🧪 Manual Testing Checklist

### 1. Homepage Testing

#### Desktop (1920x1080)
- [ ] Promotional slider ishlayapti
- [ ] Slider avtomatik o'zgarmoqda (5 soniyada)
- [ ] Slider navigation tugmalari ishlayapti
- [ ] Catalog tugmasi ko'rinmoqda (qizil rang)
- [ ] Navigation menu to'g'ri tartibda
- [ ] Footer barcha ma'lumotlar bilan
- [ ] Social media iconlari ishlayapti

#### Mobile (375x667)
- [ ] Responsive dizayn to'g'ri
- [ ] Hamburger menu ishlayapti
- [ ] Slider mobile da to'g'ri
- [ ] Touch gestures ishlayapti
- [ ] Footer mobile da to'g'ri

#### Tablet (768x1024)
- [ ] Layout tablet uchun optimallashtirilgan
- [ ] Barcha elementlar ko'rinmoqda

### 2. Catalog System Testing

#### Catalog Button
- [ ] Catalog tugmasi bosilganda modal ochiladi
- [ ] Modal barcha brendlarni ko'rsatadi
- [ ] Brendlar to'g'ri iconlar bilan

#### Brand Selection
- [ ] iPhone brendini tanlash
- [ ] Samsung brendini tanlash
- [ ] Honor brendini tanlash
- [ ] Vivo brendini tanlash
- [ ] Nokia brendini tanlash
- [ ] ROG brendini tanlash
- [ ] Redmi brendini tanlash
- [ ] OnePlus brendini tanlash
- [ ] Oppo brendini tanlash
- [ ] Realme brendini tanlash

#### Product Display
- [ ] Har bir brend uchun mahsulotlar ko'rinmoqda
- [ ] 4 ta mahsulot bir qatorda (desktop)
- [ ] 2 ta mahsulot bir qatorda (mobile)
- [ ] Mahsulot rasmlari yuklanmoqda
- [ ] Narxlar to'g'ri ko'rsatilmoqda
- [ ] Rating yulduzchalar ishlayapti

### 3. Product Modal Testing

#### Modal Opening
- [ ] Mahsulot kartasini bosish modal ochadi
- [ ] Modal to'liq ma'lumotlarni ko'rsatadi
- [ ] Mahsulot rasmi katta hajmda
- [ ] Narx va chegirma ko'rinmoqda
- [ ] Xususiyatlar ro'yxati to'liq

#### Modal Actions
- [ ] "Savatga qo'shish" tugmasi ishlayapti
- [ ] Miqdorni oshirish/kamaytirish
- [ ] Modal yopish (X tugmasi)
- [ ] Modal yopish (tashqariga bosish)

### 4. Authentication Testing

#### Login Modal
- [ ] "Kirish" tugmasi modal ochadi
- [ ] Telegram login ishlayapti
- [ ] Ro'yxatdan o'tish forma to'g'ri
- [ ] Parol ko'rsatish/yashirish ishlayapti
- [ ] Barcha inputlar autocomplete="off"
- [ ] Parollar yashirin holatda

#### Registration
- [ ] Ism kiritish
- [ ] Telefon raqam kiritish
- [ ] Email kiritish (ixtiyoriy)
- [ ] Parol kiritish
- [ ] Parol tasdiqlash
- [ ] Ro'yxatdan o'tish tugmasi
- [ ] Telegram ga xabar yuborilmoqda

#### Logout
- [ ] Chiqish tugmasi ishlayapti
- [ ] Session tozalanmoqda
- [ ] Qayta login qilish mumkin

### 5. Cart Testing

#### Adding to Cart
- [ ] Mahsulot savatga qo'shilmoqda
- [ ] Cart badge soni yangilanmoqda
- [ ] Bir xil mahsulot miqdori oshmoqda
- [ ] Turli mahsulotlar qo'shilmoqda

#### Cart Sidebar
- [ ] Cart tugmasi sidebar ochadi
- [ ] Barcha mahsulotlar ko'rinmoqda
- [ ] Miqdorni o'zgartirish ishlayapti
- [ ] Mahsulotni o'chirish ishlayapti
- [ ] Jami narx to'g'ri hisoblanmoqda
- [ ] Bo'sh cart xabari ko'rinmoqda

#### Cart Persistence
- [ ] Cart ma'lumotlari saqlanmoqda
- [ ] Sahifani yangilash cart saqlanadi
- [ ] Browser yopish va ochish

### 6. Checkout Testing

#### Checkout Process
- [ ] "Buyurtma berish" tugmasi ishlayapti
- [ ] Login talab qilinmoqda (agar login qilinmagan)
- [ ] Checkout modal ochilmoqda
- [ ] Yetkazib berish ma'lumotlari

#### Order Submission
- [ ] Manzil kiritish
- [ ] Telefon raqam tasdiqlash
- [ ] Izoh qoldirish (ixtiyoriy)
- [ ] To'lov usulini tanlash
- [ ] Buyurtma yuborish tugmasi
- [ ] Loading animatsiyasi

#### Order Confirmation
- [ ] Muvaffaqiyatli xabar ko'rinmoqda
- [ ] Cart tozalanmoqda
- [ ] Telegram ga buyurtma yuborilmoqda
- [ ] Admin xabar olmoqda

### 7. Telegram Bot Testing

#### Bot Commands
```
/start - Bot ishga tushishi
/help - Yordam xabari
/products - Mahsulotlar ro'yxati
/orders - Buyurtmalar
/contact - Aloqa ma'lumotlari
```

#### Order Notifications
- [ ] Yangi buyurtma admin ga yuborilmoqda
- [ ] Buyurtma ma'lumotlari to'liq
- [ ] Mijoz ma'lumotlari to'g'ri
- [ ] Mahsulotlar ro'yxati to'liq
- [ ] Jami narx to'g'ri

#### Customer Notifications
- [ ] Mijozga tasdiqlash xabari
- [ ] Buyurtma raqami ko'rsatilmoqda
- [ ] Yetkazib berish vaqti
- [ ] Aloqa ma'lumotlari

### 8. Admin Panel Testing

#### Login
- [ ] `/admin/login` sahifasi ochilmoqda
- [ ] Login: admin
- [ ] Parol: alisher123
- [ ] Parol yashirin holatda
- [ ] Login muvaffaqiyatli

#### Dashboard
- [ ] Statistika ko'rinmoqda
- [ ] Grafiklar ishlayapti
- [ ] Oxirgi buyurtmalar ro'yxati
- [ ] Top mahsulotlar

#### Products Management
- [ ] Mahsulotlar ro'yxati
- [ ] Yangi mahsulot qo'shish
- [ ] Mahsulotni tahrirlash
- [ ] Mahsulotni o'chirish
- [ ] Qidiruv ishlayapti
- [ ] Filter ishlayapti

#### Categories Management
- [ ] Kategoriyalar ro'yxati
- [ ] Yangi kategoriya qo'shish
- [ ] Kategoriyani tahrirlash
- [ ] Kategoriyani o'chirish

#### Sales Management
- [ ] Sotuvlar ro'yxati
- [ ] Yangi sotuv qo'shish
- [ ] Sotuv ma'lumotlari to'liq
- [ ] Chek chop etish

#### Customers Management
- [ ] Mijozlar ro'yxati
- [ ] Mijoz ma'lumotlari
- [ ] Mijoz buyurtmalari
- [ ] Qarz ma'lumotlari

#### Debts Management
- [ ] Qarzlar ro'yxati
- [ ] Yangi qarz qo'shish
- [ ] Qarzni to'lash
- [ ] Qarz tarixi

#### Suppliers Management
- [ ] Ta'minotchilar ro'yxati
- [ ] Yangi ta'minotchi qo'shish
- [ ] Ta'minotchi ma'lumotlari

#### Expenses Management
- [ ] Xarajatlar ro'yxati
- [ ] Yangi xarajat qo'shish
- [ ] Xarajat kategoriyalari
- [ ] Jami xarajatlar

#### Employees Management
- [ ] Xodimlar ro'yxati
- [ ] Yangi xodim qo'shish
- [ ] Xodim ma'lumotlari
- [ ] Maosh ma'lumotlari

#### Promotions Management
- [ ] Aksiyalar ro'yxati
- [ ] Yangi aksiya qo'shish
- [ ] Aksiya rasmini yuklash
- [ ] Aksiyani tahrirlash
- [ ] Aksiyani o'chirish
- [ ] Aksiya saytda ko'rinmoqda

#### Settings
- [ ] Til o'zgartirish (O'zbek/English/Русский)
- [ ] Valyuta sozlamalari
- [ ] Do'kon ma'lumotlari
- [ ] Sozlamalarni saqlash

#### Scanner
- [ ] Kamera ruxsati
- [ ] QR kod skanerlash
- [ ] Barcode skanerlash
- [ ] Mahsulot topish

### 9. Multi-Language Testing

#### Uzbek Language
- [ ] Barcha matnlar o'zbekcha
- [ ] Navigation o'zbekcha
- [ ] Tugmalar o'zbekcha
- [ ] Xabarlar o'zbekcha

#### English Language
- [ ] Barcha matnlar inglizcha
- [ ] Navigation inglizcha
- [ ] Tugmalar inglizcha
- [ ] Xabarlar inglizcha

#### Russian Language
- [ ] Barcha matnlar ruscha
- [ ] Navigation ruscha
- [ ] Tugmalar ruscha
- [ ] Xabarlar ruscha

### 10. PWA Testing

#### Installation
- [ ] Install tugmasi ko'rinmoqda (desktop)
- [ ] "Add to Home Screen" (mobile)
- [ ] Icon home screen da
- [ ] Splash screen ko'rinmoqda

#### Offline Mode
- [ ] Internet o'chirilganda
- [ ] Cached sahifalar ochilmoqda
- [ ] Offline xabari ko'rinmoqda
- [ ] Internet qaytganda sync

#### Service Worker
- [ ] Service Worker ro'yxatdan o'tgan
- [ ] Cache ishlayapti
- [ ] Update avtomatik

### 11. Performance Testing

#### Page Load Speed
- [ ] Homepage < 3 soniya
- [ ] Products page < 3 soniya
- [ ] Admin panel < 3 soniya

#### Lighthouse Scores
```bash
lighthouse http://localhost:5173 --view
```
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90
- [ ] PWA > 90

#### Bundle Size
```bash
npm run build
```
- [ ] Main bundle < 500KB
- [ ] Vendor bundle < 1MB
- [ ] Total size < 2MB

### 12. Security Testing

#### Input Validation
- [ ] XSS himoyasi
- [ ] SQL injection himoyasi
- [ ] CSRF himoyasi

#### Authentication
- [ ] Parollar hash qilingan
- [ ] Session xavfsiz
- [ ] Token expiration

#### HTTPS
- [ ] SSL certificate
- [ ] Secure headers
- [ ] CSP headers

### 13. Browser Compatibility

#### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Opera (latest)

#### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Samsung Internet
- [ ] Firefox Mobile

### 14. Responsive Design Testing

#### Breakpoints
- [ ] 320px (Small mobile)
- [ ] 375px (Mobile)
- [ ] 425px (Large mobile)
- [ ] 768px (Tablet)
- [ ] 1024px (Laptop)
- [ ] 1440px (Desktop)
- [ ] 2560px (4K)

#### Orientation
- [ ] Portrait mode
- [ ] Landscape mode

### 15. Accessibility Testing

#### Keyboard Navigation
- [ ] Tab navigation ishlayapti
- [ ] Enter tugmasi ishlayapti
- [ ] Escape modal yopmoqda
- [ ] Arrow keys slider uchun

#### Screen Reader
- [ ] ARIA labels mavjud
- [ ] Alt text rasmlarda
- [ ] Semantic HTML
- [ ] Focus indicators

#### Color Contrast
- [ ] WCAG AA standartiga mos
- [ ] Matn o'qilishi oson
- [ ] Tugmalar aniq

## 🔧 Automated Testing

### Unit Tests (Jest)

```bash
npm install --save-dev jest @testing-library/react
npm test
```

### E2E Tests (Cypress)

```bash
npm install --save-dev cypress
npx cypress open
```

### Visual Regression (Percy)

```bash
npm install --save-dev @percy/cli @percy/cypress
npx percy exec -- cypress run
```

## 📊 Testing Tools

- **Chrome DevTools** - Performance, Network, Console
- **Lighthouse** - Performance audit
- **WAVE** - Accessibility testing
- **GTmetrix** - Speed testing
- **BrowserStack** - Cross-browser testing
- **Postman** - API testing

## 🐛 Bug Reporting

Xato topilsa:
1. Screenshot oling
2. Browser va versiyasini yozing
3. Qadam-baqadam takrorlash yo'lini yozing
4. GitHub Issues ga yuklang

## ✅ Final Checklist

- [ ] Barcha manual testlar o'tdi
- [ ] Barcha automated testlar o'tdi
- [ ] Performance acceptable
- [ ] Security tekshirildi
- [ ] Accessibility standartlariga mos
- [ ] Cross-browser compatible
- [ ] Mobile responsive
- [ ] PWA to'liq ishlayapti
- [ ] Bot integration ishlayapti
- [ ] Admin panel to'liq funksional

---

© 2024 Alisher Mobile. Barcha huquqlar himoyalangan.
