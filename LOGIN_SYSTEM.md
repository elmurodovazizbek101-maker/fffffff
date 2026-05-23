# Login Tizimi - To'liq Yangilangan

## 🎯 Umumiy Ma'lumot

Saytda **2 xil login tizimi** mavjud:

### 1️⃣ Admin Login (Admin Panel uchun)
- **URL**: `/#/admin/login`
- **Telefon**: `+998901234567`
- **Parol**: `admin123`
- **Xususiyatlari**:
  - Faqat admin uchun
  - Telefon raqam va parol bilan kirish
  - Session storage'da saqlanadi
  - Logout tugmasi Header'da

### 2️⃣ Customer Login (Sayt uchun)
- **URL**: Saytning istalgan sahifasida "Kirish" tugmasi
- **Xususiyatlari**:
  - Ro'yxatdan o'tish imkoniyati
  - Telefon raqam va parol bilan kirish
  - LocalStorage'da saqlanadi
  - Mijozlar ma'lumotlari DataContext'ga qo'shiladi

---

## 📋 Admin Login Tizimi

### Kirish Jarayoni:
1. Brauzerda `http://localhost:5173/#/admin/login` ochiladi
2. Telefon raqam: `+998901234567`
3. Parol: `admin123`
4. "Kirish" tugmasini bosing
5. Muvaffaqiyatli kirish → `/#/admin/dashboard`

### Chiqish:
- Header'dagi "Chiqish" tugmasini bosing
- Avtomatik `/#/admin/login` sahifasiga yo'naltiriladi

### Xavfsizlik:
- Noto'g'ri ma'lumotlar kiritilsa → Xato xabari ko'rsatiladi
- Session tugagach → Avtomatik login sahifasiga yo'naltiriladi
- Admin panel himoyalangan → Login qilmasdan kirib bo'lmaydi

---

## 👥 Customer Login Tizimi

### Ro'yxatdan O'tish:
1. Saytda "Kirish" tugmasini bosing
2. "Ro'yxatdan o'tish" tugmasini bosing
3. Quyidagi ma'lumotlarni kiriting:
   - **Ism**: To'liq ismingiz
   - **Viloyat**: Ro'yxatdan tanlang
   - **Tuman/Shahar**: Yozing
   - **Telefon raqam**: +998 90 123 45 67 formatida
   - **Parol**: Xavfsiz parol yarating
4. "Ro'yxatdan o'tish" tugmasini bosing
5. Avtomatik tizimga kiriladi

### Kirish:
1. Saytda "Kirish" tugmasini bosing
2. Telefon raqam va parolni kiriting
3. "Kirish" tugmasini bosing
4. Muvaffaqiyatli kirish → Saytdan foydalanish

### Xususiyatlar:
- Bir telefon raqam faqat 1 marta ro'yxatdan o'tishi mumkin
- Noto'g'ri ma'lumotlar → Xato xabari
- Ma'lumotlar LocalStorage'da saqlanadi
- Ro'yxatdan o'tgan mijozlar avtomatik DataContext'ga qo'shiladi

---

## 🔐 Texnik Tafsilotlar

### Fayllar:

#### Admin Authentication:
- `src/utils/auth.js` - Admin va customer autentifikatsiya funksiyalari
- `src/context/AdminAuthContext.jsx` - Admin session boshqaruvi
- `src/components/LoginPage.jsx` - Admin login sahifasi
- `src/App.jsx` - Admin routing va himoya

#### Customer Authentication:
- `src/utils/auth.js` - Customer ro'yxatdan o'tish va kirish
- `src/components/website/context/AuthContext.jsx` - Customer session boshqaruvi
- `src/components/website/AuthModal.jsx` - Customer login/register modal

### Ma'lumotlar Saqlash:

#### Admin:
```javascript
// Session Storage
sessionStorage.setItem('alisher_mobile_admin_session', 'true')
```

#### Customer:
```javascript
// Local Storage - User session
localStorage.setItem('alisher_mobile_user', JSON.stringify(user))

// Local Storage - Customers database
localStorage.setItem('alisher_mobile_customers', JSON.stringify(customers))
```

---

## ✅ Test Qilish

### Admin Login Test:
```
1. http://localhost:5173/#/admin/login ga o'ting
2. Telefon: +998901234567
3. Parol: admin123
4. Kirish tugmasini bosing
5. Dashboard ochilishi kerak
6. Header'da "Chiqish" tugmasi ko'rinishi kerak
```

### Customer Login Test:
```
1. http://localhost:5173/ ga o'ting
2. "Kirish" tugmasini bosing
3. "Ro'yxatdan o'tish" tugmasini bosing
4. Barcha maydonlarni to'ldiring
5. Ro'yxatdan o'tish tugmasini bosing
6. Saytdan foydalanish mumkin bo'lishi kerak
```

### Customer Login (Mavjud Foydalanuvchi):
```
1. Saytda "Kirish" tugmasini bosing
2. Ro'yxatdan o'tgan telefon va parolni kiriting
3. Kirish tugmasini bosing
4. Tizimga kirish muvaffaqiyatli bo'lishi kerak
```

---

## 🚀 Ishga Tushirish

```bash
# Development server
npm run dev

# Admin panel
http://localhost:5173/#/admin/login

# Customer site
http://localhost:5173/
```

---

## 📝 Eslatmalar

1. **Admin va Customer login tizimi ALOHIDA**
2. Admin faqat telefon va parol bilan kiradi (ro'yxatdan o'tmaydi)
3. Customer'lar ro'yxatdan o'tishi kerak
4. Har bir telefon raqam faqat 1 marta ro'yxatdan o'tishi mumkin
5. Admin session - SessionStorage
6. Customer session - LocalStorage
7. Barcha xatolar foydalanuvchiga ko'rsatiladi

---

## 🎉 Tayyor!

Login tizimi to'liq ishlaydi va test qilishga tayyor!
