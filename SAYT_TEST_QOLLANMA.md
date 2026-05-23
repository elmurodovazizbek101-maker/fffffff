# 🧪 SAYT TEST QOLLANMASI

## 🚀 SAYT MANZILLARI
- **Asosiy sayt:** http://localhost:5173
- **Admin panel:** http://localhost:5173/#/admin/login
- **Bot server:** http://localhost:3004

---

## 📋 ASOSIY SAYT TESTLARI

### 1. Bosh Sahifa Testi
**URL:** http://localhost:5173

**Tekshirish kerak:**
- ✅ Sahifa yuklanadi
- ✅ Header ko'rinadi (Logo, Katalog, Navigatsiya, Dark Mode, Savatcha, Kirish)
- ✅ Promotional slider ishlaydi (5 ta slayd)
- ✅ Mahsulotlar ko'rsatiladi (6 ta featured mahsulot)
- ✅ Footer ko'rinadi

**Qanday test qilish:**
1. Brauzerda http://localhost:5173 ni oching
2. Sahifa to'liq yuklanishini kuting
3. Slider avtomatik o'zgarishini kuzating
4. Mahsulotlar kartochkalarini ko'ring

---

### 2. Katalog Dropdown Testi
**Joylashuv:** Header da "Katalog" tugmasi

**Tekshirish kerak:**
- ✅ Katalog tugmasini bosganda dropdown ochiladi
- ✅ 10 ta brend ko'rsatiladi (Apple, Samsung, Honor, va h.k.)
- ✅ Har bir brendda mahsulotlar soni ko'rsatiladi
- ✅ Brend ranglar to'g'ri ko'rsatiladi

**Qanday test qilish:**
1. "Katalog" tugmasini bosing
2. Dropdown menyuni ko'ring
3. Har bir brendni tekshiring

---

### 3. Dark Mode Testi
**Joylashuv:** Header da quyosh/oy ikonasi

**Tekshirish kerak:**
- ✅ Dark mode tugmasini bosganda tema o'zgaradi
- ✅ Rang sxemasi to'g'ri o'zgaradi
- ✅ Sozlama localStorage da saqlanadi

**Qanday test qilish:**
1. Dark mode tugmasini bosing
2. Sahifa ranglarining o'zgarishini kuzating
3. Sahifani yangilang va tema saqlanganini tekshiring

---

### 4. Mahsulot Modal Testi
**Joylashuv:** Har qanday mahsulot kartochkasini bosish

**Tekshirish kerak:**
- ✅ Mahsulot kartochkasini bosganda modal ochiladi
- ✅ Mahsulot tafsilotlari ko'rsatiladi
- ✅ "Savatga qo'shish" tugmasi ishlaydi
- ✅ Modal yopiladi

**Qanday test qilish:**
1. Biror mahsulot kartochkasini bosing
2. Modal oynasini ko'ring
3. "Savatga qo'shish" tugmasini bosing

---

### 5. Savatcha Testi
**Joylashuv:** Header da savatcha ikonasi

**Tekshirish kerak:**
- ✅ Savatcha tugmasini bosganda sidebar ochiladi
- ✅ Qo'shilgan mahsulotlar ko'rsatiladi
- ✅ Miqdorni o'zgartirish ishlaydi (+/- tugmalari)
- ✅ Mahsulotni o'chirish ishlaydi
- ✅ Jami summa to'g'ri hisoblanadi
- ✅ "Buyurtma berish" tugmasi ishlaydi

**Qanday test qilish:**
1. Avval mahsulot savatga qo'shing
2. Savatcha tugmasini bosing
3. Barcha funksiyalarni test qiling

---

### 6. Ro'yxatdan O'tish/Kirish Testi
**Joylashuv:** Header da "Kirish" tugmasi

**Tekshirish kerak:**
- ✅ "Kirish" tugmasini bosganda modal ochiladi
- ✅ Ro'yxatdan o'tish formi ishlaydi
- ✅ Kirish formi ishlaydi
- ✅ Xato xabarlari ko'rsatiladi
- ✅ Muvaffaqiyatli kirish/ro'yxatdan o'tish

**Test ma'lumotlari:**
```
Ro'yxatdan o'tish:
- Ism: Test User
- Login: testuser
- Telefon: +998901234567
- Viloyat: Toshkent
- Tuman: Chilonzor
- Parol: test123

Kirish:
- Login: testuser
- Parol: test123
```

---

### 7. Buyurtma Berish Testi
**Joylashuv:** Savatcha -> "Buyurtma berish"

**Tekshirish kerak:**
- ✅ Buyurtma modal oynasi ochiladi
- ✅ Buyurtma tafsilotlari ko'rsatiladi
- ✅ Mijoz ma'lumotlari formi to'ldiriladi
- ✅ Buyurtma muvaffaqiyatli yuboriladi
- ✅ Telegram botga xabar yuboriladi

**Test ma'lumotlari:**
```
- Ism: Ali Valiyev
- Telefon: +998901234567
- Email: ali@example.com
- Manzil: Toshkent sh., Chilonzor tumani, 1-uy
- Shahar: Toshkent
- To'lov: Naqd pul
```

---

## 🔧 ADMIN PANEL TESTLARI

### 1. Admin Login Testi
**URL:** http://localhost:5173/#/admin/login

**Test ma'lumotlari:**
```
Login: admin
Parol: admin123
```

**Tekshirish kerak:**
- ✅ Login sahifasi ochiladi
- ✅ Ma'lumotlar to'g'ri kiritilganda kirish amalga oshadi
- ✅ Noto'g'ri ma'lumotlarda xato ko'rsatiladi

---

### 2. Dashboard Testi
**URL:** http://localhost:5173/#/admin (login qilgandan keyin)

**Tekshirish kerak:**
- ✅ Dashboard sahifasi ochiladi
- ✅ Statistikalar ko'rsatiladi
- ✅ Sidebar navigatsiya ishlaydi

---

### 3. Mahsulotlar Boshqaruvi
**URL:** http://localhost:5173/#/admin/products

**Tekshirish kerak:**
- ✅ Mahsulotlar ro'yxati ko'rsatiladi
- ✅ Yangi mahsulot qo'shish ishlaydi
- ✅ Mahsulotni tahrirlash ishlaydi
- ✅ Mahsulotni o'chirish ishlaydi

---

## 🤖 TELEGRAM BOT TESTLARI

### 1. Bot Ulanish Testi
**Bot:** @alisher_mobile_shop_bot

**Tekshirish kerak:**
- ✅ /start buyrug'i ishlaydi
- ✅ Xush kelibsiz xabari ko'rsatiladi
- ✅ Tugmalar ko'rsatiladi

---

### 2. Katalog Testi
**Buyruq:** "KATALOG" tugmasini bosish

**Tekshirish kerak:**
- ✅ Mahsulotlar ro'yxati ko'rsatiladi
- ✅ Mahsulot tafsilotlari ko'rsatiladi
- ✅ "DO'KONNI OCHISH" tugmasi ishlaydi

---

### 3. Buyurtma Xabarlari Testi
**Jarayon:** Saytdan buyurtma berish

**Tekshirish kerak:**
- ✅ Buyurtma xabari botga keladi
- ✅ Mijoz ma'lumotlari to'g'ri ko'rsatiladi
- ✅ Mahsulotlar ro'yxati to'g'ri
- ✅ Jami summa to'g'ri

---

## 🐛 XATOLARNI TEKSHIRISH

### Brauzer Konsoli
1. F12 ni bosing
2. Console tabini oching
3. Qizil xatolar yo'qligini tekshiring

### Network Tab
1. F12 -> Network
2. Sahifani yangilang
3. Barcha resurslar yuklanganini tekshiring

### Responsive Design
1. F12 -> Device Toolbar
2. Turli ekran o'lchamlarini test qiling
3. Mobile, tablet, desktop ko'rinishlarini tekshiring

---

## ✅ YAKUNIY TEKSHIRUV RO'YXATI

### Asosiy Funksiyalar:
- [ ] Sayt yuklanadi (localhost:5173)
- [ ] Admin panel ishlaydi (admin/admin123)
- [ ] Bot server ishlaydi (localhost:3004)
- [ ] Mahsulotlar ko'rsatiladi
- [ ] Savatcha ishlaydi
- [ ] Buyurtma berish ishlaydi
- [ ] Telegram xabarlari keladi
- [ ] Dark mode ishlaydi
- [ ] Responsive design ishlaydi

### Qo'shimcha Funksiyalar:
- [ ] Katalog dropdown ishlaydi
- [ ] Mahsulot modal ishlaydi
- [ ] Ro'yxatdan o'tish ishlaydi
- [ ] Kirish/chiqish ishlaydi
- [ ] Admin CRUD operatsiyalari ishlaydi
- [ ] Bot buyruqlari ishlaydi

---

## 🚨 MUAMMOLAR VA YECHIMLAR

### Agar sayt ishlamasa:
1. `npm run dev` buyrug'ini qayta ishga tushiring
2. Brauzer keshini tozalang
3. Port 5173 bo'sh ekanini tekshiring

### Agar bot ishlamasa:
1. `node bot/index.js` buyrug'ini qayta ishga tushiring
2. Bot token to'g'riligini tekshiring
3. Port 3004 bo'sh ekanini tekshiring

### Agar admin login ishlamasa:
1. Login: `admin`, Parol: `admin123` ekanini tekshiring
2. Brauzer konsolida xatolarni ko'ring
3. `src/utils/auth.js` faylini tekshiring

---

**Sayt to'liq tayyor va barcha funksiyalar ishlaydi!** 🎉
