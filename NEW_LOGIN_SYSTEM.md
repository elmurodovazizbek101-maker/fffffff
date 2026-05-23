# Yangi Login Tizimi ✅

## 🎯 Tizim Tuzilishi

### 1️⃣ **Admin Login (Admin Panel)**

**Kirish Ma'lumotlari:**
- **Login:** `admin`
- **Parol:** `admin123`
- **Telefon:** KERAK EMAS ❌

**Kirish Yo'li:**
- URL: `http://localhost:5174/#/admin/login`
- Login va parol bilan kirish
- Session Storage'da saqlanadi

---

### 2️⃣ **Customer Ro'yxatdan O'tish**

**Kerakli Ma'lumotlar:**
- ✅ **Ism** (shart)
- ✅ **Login** (username) - yangi maydon
- ✅ **Telefon raqam** (shart)
- ✅ **Viloyat** (shart)
- ✅ **Tuman/Shahar** (shart)
- ✅ **Parol** (shart)

**Xususiyatlar:**
- Har bir login noyob bo'lishi kerak
- Bir login faqat 1 marta ro'yxatdan o'tishi mumkin
- Ma'lumotlar LocalStorage'da saqlanadi
- Avtomatik DataContext'ga qo'shiladi

---

### 3️⃣ **Customer Kirish (AuthModal)**

**Kirish Ma'lumotlari:**
- ✅ **Login** (username)
- ✅ **Parol**
- ❌ **Telefon KERAK EMAS**

**Xususiyatlar:**
- Login va parol bilan kirish
- Telefon raqam so'ralmaydi
- LocalStorage'da session saqlanadi

---

### 4️⃣ **Harid Paytida (Checkout)**

**So'raladigan Ma'lumotlar:**
- ✅ **Ism** (shart)
- ✅ **Telefon raqam** (shart)
- ✅ **Email** (ixtiyoriy)
- ❌ **Login/Parol KERAK EMAS**

**Xususiyatlar:**
- Faqat telefon raqam va ism kerak
- Login yoki parol so'ralmaydi
- Tez va oson buyurtma berish

---

## 📋 Tizim Ishlash Tartibi

### Admin Uchun:
```
1. /#/admin/login ga kirish
2. Login: admin
3. Parol: admin123
4. Kirish → Dashboard
```

### Customer Uchun (Ro'yxatdan O'tish):
```
1. Saytda "Kirish" tugmasini bosish
2. "Ro'yxatdan o'tish" tugmasini bosish
3. Barcha maydonlarni to'ldirish:
   - Ism
   - Login (username)
   - Telefon raqam
   - Viloyat
   - Tuman/Shahar
   - Parol
4. "Ro'yxatdan o'tish" → Avtomatik kirish
```

### Customer Uchun (Kirish):
```
1. Saytda "Kirish" tugmasini bosish
2. Login va parolni kiriting
3. "Kirish" → Saytdan foydalanish
```

### Harid Qilish:
```
1. Mahsulotlarni savatga qo'shish
2. "Checkout" tugmasini bosish
3. Faqat ism va telefon raqamni kiriting
4. Yetkazib berish va to'lov ma'lumotlarini to'ldiring
5. Buyurtma berish
```

---

## 🔐 Xavfsizlik

### Admin:
- Login: `admin` (o'zgarmas)
- Parol: `admin123` (o'zgarmas)
- Session Storage'da saqlanadi
- Telefon raqam kerak emas

### Customer:
- Login noyob bo'lishi kerak
- Parol oddiy matn sifatida saqlanadi (keyinchalik hash qilish kerak)
- LocalStorage'da saqlanadi
- Telefon raqam ro'yxatdan o'tishda kerak, kirish paytida emas

---

## 📁 Yangilangan Fayllar

### 1. `src/utils/auth.js`
```javascript
// Admin credentials
const ADMIN_LOGIN = 'admin'
const ADMIN_PASSWORD = 'admin123'

// Customer authentication with login/password
export const registerCustomer = (customerData) => {
  // Login noyobligini tekshirish
  // Telefon, ism, viloyat, tuman, parol bilan ro'yxatdan o'tish
}

export const verifyCustomerCredentials = (login, password) => {
  // Login va parol bilan kirish
}
```

### 2. `src/components/LoginPage.jsx`
- Admin uchun login/parol
- Telefon raqam olib tashlandi
- Login: admin
- Parol: admin123

### 3. `src/components/website/AuthModal.jsx`
- Customer uchun login/parol kirish
- Ro'yxatdan o'tishda: ism, login, telefon, viloyat, tuman, parol
- Kirish paytida: faqat login va parol

### 4. `src/components/website/CheckoutModal.jsx`
- Harid paytida faqat telefon va ism
- Login/parol kerak emas
- Tez buyurtma berish

---

## ✅ Test Qilish

### Admin Login:
```
URL: http://localhost:5174/#/admin/login
Login: admin
Parol: admin123
Natija: Dashboard ochilishi kerak
```

### Customer Ro'yxatdan O'tish:
```
1. Saytda "Kirish" → "Ro'yxatdan o'tish"
2. Ism: Test User
3. Login: testuser
4. Telefon: +998901234567
5. Viloyat: Toshkent
6. Tuman: Chilonzor
7. Parol: test123
8. Natija: Avtomatik kirish
```

### Customer Kirish:
```
1. Saytda "Kirish"
2. Login: testuser
3. Parol: test123
4. Natija: Saytdan foydalanish
```

### Harid Qilish:
```
1. Mahsulotni savatga qo'shing
2. Checkout
3. Ism: Test User
4. Telefon: +998901234567
5. Yetkazib berish ma'lumotlari
6. Buyurtma berish
```

---

## 🎉 Xulosa

**Yangi tizim:**
- ✅ Admin: login + parol (telefon yo'q)
- ✅ Customer ro'yxatdan o'tish: ism + login + telefon + viloyat + tuman + parol
- ✅ Customer kirish: login + parol (telefon yo'q)
- ✅ Harid: faqat telefon + ism (login/parol yo'q)

**Afzalliklari:**
- 🚀 Tez va oson kirish
- 📱 Harid paytida minimal ma'lumot
- 🔐 Xavfsiz login tizimi
- ✨ Foydalanuvchiga qulay

Tizim tayyor va test qilishga tayyor! 🎊
