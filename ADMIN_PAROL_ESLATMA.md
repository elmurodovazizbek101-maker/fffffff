# 🔐 Admin Login va Parol - Eslatma

**Yangilangan:** 02.06.2026  
**Status:** ✅ HECH QACHON O'ZGARMAGAN

---

## 👤 ADMIN PANEL LOGIN

### URL:
```
/admin
```
yoki
```
http://localhost:5173/admin
```
yoki
```
https://your-domain.com/admin
```

### LOGIN MA'LUMOTLARI:

**Login:** `dead`  
**Parol:** `18042011`

---

## ⚠️ MUHIM!

Bu login va parol **HECH QACHON O'ZGARMAGAN**!

Agar kirish muammosi bo'lsa, bu localStorage muammosi, **login/parol muammosi emas!**

---

## 🔧 AGAR KIROLMASANGIZ

### 1. localStorage ni Tozalash:

**Browser Console (F12) da:**
```javascript
localStorage.clear()
location.reload()
```

### 2. Yoki faqat credentials ni o'chirish:

```javascript
localStorage.removeItem('alisher_mobile_admin_credentials')
location.reload()
```

### 3. Yoki default credentials ni qayta o'rnatish:

```javascript
const defaultCreds = {
  login: 'dead',
  password: 'kd7tch' // Bu hash qilingan '18042011'
}
localStorage.setItem('alisher_mobile_admin_credentials', JSON.stringify(defaultCreds))
location.reload()
```

---

## 📋 QADAMMA-QADAM

### 1. Browser Ochish
- Chrome, Edge, Firefox yoki Safari

### 2. `/admin` ga O'tish
- URL barida: `http://localhost:5173/admin`

### 3. Login Qilish
- Login: `dead`
- Parol: `18042011`
- "Kirish" tugmasini bosing

### 4. Agar Xato Bo'lsa
- F12 ni bosing
- Console tabga o'ting
- Quyidagi kodni yozing:
  ```javascript
  localStorage.clear()
  location.reload()
  ```
- Qayta login qiling

---

## 🚨 TEZKOR YECHIM

Hech narsa ishlamasa, **Incognito Mode** da test qiling:

### Chrome:
```
Ctrl + Shift + N (Windows)
Cmd + Shift + N (Mac)
```

### Firefox:
```
Ctrl + Shift + P (Windows)
Cmd + Shift + P (Mac)
```

Incognito mode da `/admin` ga boring va kirish:
- Login: `dead`
- Parol: `18042011`

Agar incognito da ishlasa → localStorage muammosi  
Agar incognito da ham ishlamasa → Kod muammosi

---

## 🔐 PAROLNI O'ZGARTIRISH

Agar parolni o'zgartirmoqchi bo'lsangiz:

### 1. Admin Panelga Kiring
- Login: `dead`
- Parol: `18042011`

### 2. Settings Sahifasiga O'ting
- Sidebar dan "Settings" ni bosing
- "Admin Sozlamalari" bo'limiga o'ting

### 3. Yangi Login/Parol Kiriting
- Yangi login kiriting (kamida 4 ta belgi)
- Yangi parol kiriting (kamida 6 ta belgi)
- "Saqlash" ni bosing

### 4. Eslab Qoling!
- Yangi login va parolni yozib oling!
- Xavfsiz joyda saqlang!

---

## 🔒 XAVFSIZLIK TAVSIYALARI

### 1. Kuchli Parol Ishlating
- Kamida 8 ta belgi
- Katta va kichik harflar
- Raqamlar
- Maxsus belgilar (@, #, $, %, &)

**Yaxshi parol misollari:**
- `Admin2024!Secure`
- `MyStr0ng#Pass`
- `Alisher@Mobile2024`

**Yomon parol misollari:**
- `123456` ❌
- `password` ❌
- `admin` ❌
- `18042011` ⚠️ (Default - o'zgartiring!)

### 2. Parolni Maxfiy Saqlang
- Hech kimga bermang
- Screen share paytida ko'rsatmang
- Sticky note da yozmang
- Password manager ishlating

### 3. Parolni Muntazam O'zgartiring
- Har 3 oyda bir marta
- Shubhali faoliyatda darhol
- Boshqa odamlarga ko'rsatgan bo'lsangiz darhol

### 4. Ikki Faktorli Autentifikatsiya (Kelajakda)
- Telegram bot orqali
- SMS orqali
- Email orqali

---

## 📱 MIJOZ UCHUN LOGIN

Bu **ADMIN** login, **mijozlar uchun emas**!

### Mijozlar uchun:
- Saytda "Ro'yxatdan o'tish" tugmasini bosing
- Ismingiz, login, parol va telefon raqamingizni kiriting
- Ro'yxatdan o'ting va saytdan foydalaning

### Admin vs Mijoz:

| | Admin | Mijoz |
|---|---|---|
| Login | `dead` | O'zingiz yaratasiz |
| Parol | `18042011` | O'zingiz yaratasiz |
| Kirish URL | `/admin` | `/login` yoki sayt |
| Huquqlar | Hamma narsa | Faqat xarid |
| Panel | Admin panel | Customer site |

---

## 🆘 YORDAM

### Agar hali ham muammo bo'lsa:

1. `LOGIN_PAROL_YECHIM.md` faylini o'qing
2. `KARTOCHKA_MUAMMOSI_YECHIM.md` faylini o'qing
3. Browser console da xatolarni tekshiring (F12 > Console)
4. Screenshot oling va yuboring

### Console da debug:

```javascript
// Hozirgi credentials ni ko'rish
const creds = localStorage.getItem('alisher_mobile_admin_credentials')
console.log('Current creds:', JSON.parse(creds))

// Expected values
console.log('Expected login:', 'dead')
console.log('Expected password hash:', 'kd7tch')
```

---

## ✅ XULOSA

**Admin Login:** `dead`  
**Admin Parol:** `18042011`  
**URL:** `/admin`

**Bu hech qachon o'zgarmagan!**

Agar kirish muammosi bo'lsa:
1. localStorage.clear()
2. location.reload()
3. Qayta kirish

---

**Eslatma:** Kiro AI  
**Sana:** 02.06.2026  
**Status:** ✅ ANIQ VA TO'G'RI  
**Parol:** `18042011` (Default - o'zgartiring!)
