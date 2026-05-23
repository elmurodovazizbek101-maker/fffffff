# 🔐 ADMIN MA'LUMOTLARI

## Default Admin Credentials

```
Login:    superadmin
Parol:    Admin@2024!Secure
```

## Admin Panel URL

```
http://localhost:3000/#/admin/login
```

## localStorage Key

```javascript
'alisher_mobile_admin_credentials'
```

## localStorage Format

```json
{
  "login": "superadmin",
  "password": "Admin@2024!Secure"
}
```

## ⚠️ AGAR LOGIN ISHLAMASA

### 1-usul: localStorage ni tozalash
```javascript
// Browser Console (F12) da bajaring:
localStorage.clear();
location.reload();
```

### 2-usul: Faqat admin credentials ni o'chirish
```javascript
// Browser Console (F12) da bajaring:
localStorage.removeItem('alisher_mobile_admin_credentials');
location.reload();
```

### 3-usul: To'g'ri ma'lumotlarni qo'lda yozish
```javascript
// Browser Console (F12) da bajaring:
localStorage.setItem('alisher_mobile_admin_credentials',
  JSON.stringify({login:'superadmin',password:'Admin@2024!Secure'}));
location.reload();
```

## Admin Ma'lumotlarini O'zgartirish

1. Admin panelga kiring (`superadmin` / `Admin@2024!Secure`)
2. **Sozlamalar** sahifasiga o'ting
3. **Admin Login va Parol** bo'limini toping
4. Yangi login va parolni kiriting (kamida 4 va 6 ta belgi)
5. Parolni tasdiqlang
6. **Login va Parolni O'zgartirish** tugmasini bosing

## Kod Joylashuvi

### 1. `src/utils/auth.js`
```javascript
const DEFAULT_ADMIN = {
  login: 'superadmin',
  password: 'Admin@2024!Secure'
}
```

### 2. `src/components/LoginPage.jsx`
- Login formasi
- Default ma'lumotlar ko'rsatiladi

### 3. `src/context/AdminAuthContext.jsx`
- Login funksiyasi
- Session boshqaruvi

### 4. `src/components/pages/Settings.jsx`
- Admin ma'lumotlarini o'zgartirish
- Joriy ma'lumotlarni ko'rsatish

### 5. `src/App.jsx`
- `initializeAdminCredentials()` - App yuklanganda ishga tushadi
- Admin routing

## Xavfsizlik

- ✅ Ma'lumotlar localStorage da saqlanadi
- ✅ Session sessionStorage da saqlanadi
- ✅ Admin parolni o'zgartirish mumkin
- ✅ Parol kamida 6 ta belgidan iborat bo'lishi kerak
- ✅ Login kamida 4 ta belgidan iborat bo'lishi kerak

## Muhim Eslatmalar

1. **Birinchi kirishda localStorage ni tozalang!**
2. **Default parolni o'zgartiring!**
3. **Yangi parolni eslab qoling!**
4. **Parolni yo'qotib qo'ysangiz, localStorage ni tozalashingiz kerak!**

---

**Versiya:** 1.0.0
**Sana:** 2026-05-23
