# 🔗 ADMIN PANEL LINKLARI

## 🎯 ASOSIY ADMIN LINK

### Admin Login Sahifasi
```
http://localhost:3000/#/admin/login
```

**Brauzerda ochish:**
1. Brauzeringizni oching (Chrome, Firefox, Edge)
2. Quyidagi linkni nusxalang va address bar ga qo'ying:
   ```
   http://localhost:3000/#/admin/login
   ```
3. Enter bosing

---

## 🔐 LOGIN MA'LUMOTLARI

```
Login:    superadmin
Parol:    Admin@2024!Secure
```

---

## 📍 BARCHA ADMIN LINKLARI

### 1. Login Sahifasi
```
http://localhost:3000/#/admin/login
```

### 2. Dashboard (Login qilgandan keyin)
```
http://localhost:3000/#/admin
```

### 3. Mahsulotlar
```
http://localhost:3000/#/admin/products
```

### 4. Kategoriyalar
```
http://localhost:3000/#/admin/categories
```

### 5. Savdolar
```
http://localhost:3000/#/admin/sales
```

### 6. Mijozlar
```
http://localhost:3000/#/admin/customers
```

### 7. Qarzlar
```
http://localhost:3000/#/admin/debts
```

### 8. Xarajatlar
```
http://localhost:3000/#/admin/expenses
```

### 9. Yetkazib beruvchilar
```
http://localhost:3000/#/admin/suppliers
```

### 10. Xodimlar
```
http://localhost:3000/#/admin/employees
```

### 11. Scanner
```
http://localhost:3000/#/admin/scanner
```

### 12. Aksiyalar
```
http://localhost:3000/#/admin/promotions
```

### 13. Sozlamalar
```
http://localhost:3000/#/admin/settings
```

---

## 🌐 MIJOZLAR SAYTI LINKLARI

### 1. Bosh Sahifa
```
http://localhost:3000/
```

### 2. Mahsulotlar
```
http://localhost:3000/#/products
```

### 3. Biz Haqimizda
```
http://localhost:3000/#/about
```

---

## ⚠️ AGAR LINK ISHLAMASA

### 1. Sayt Ishlab Turibmi Tekshiring
```bash
# Terminal'da bajaring:
npm run dev
```

Natija:
```
VITE v8.0.14  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### 2. Port 3000 Band Bo'lsa
```bash
# Port'ni tozalang:
npx kill-port 3000

# Keyin qayta ishga tushiring:
npm run dev
```

### 3. localStorage Muammosi
```javascript
// Browser Console (F12) da:
localStorage.clear();
location.reload();
```

---

## 🚀 TEZKOR KIRISH

### Windows'da (CMD yoki PowerShell)
```bash
# Saytni ochish
start http://localhost:3000/#/admin/login
```

### Mac/Linux'da (Terminal)
```bash
# Saytni ochish
open http://localhost:3000/#/admin/login
```

---

## 📱 TELEGRAM BOT

### Bot Username
```
@alisher_mobile_shop_bot
```

### Bot Server
```
http://localhost:3004
```

---

## ✅ TEKSHIRISH

### 1. Sayt Ishlayaptimi?
- ✅ Port 3000 LISTENING (ishlab turibdi)
- ✅ Process ID: 19948

### 2. Link To'g'rimi?
- ✅ `http://localhost:3000/#/admin/login` - TO'G'RI
- ❌ `http://localhost:3000/admin/login` - NOTO'G'RI (# yo'q)
- ❌ `http://localhost:5173/#/admin/login` - NOTO'G'RI (eski port)

### 3. Login Ma'lumotlari To'g'rimi?
- ✅ Login: `superadmin` - TO'G'RI
- ✅ Parol: `Admin@2024!Secure` - TO'G'RI
- ❌ Login: `admin` - NOTO'G'RI (eski)
- ❌ Parol: `admin123` - NOTO'G'RI (eski)

---

## 🎯 QADAMMA-QADAM QOLLANMA

### 1-QADAM: Saytni Ishga Tushiring
```bash
# Terminal'da:
cd C:\Users\user\Desktop\topshiriq
npm run dev
```

### 2-QADAM: Brauzerda Oching
```
http://localhost:3000/#/admin/login
```

### 3-QADAM: localStorage ni Tozalang
```javascript
// Browser Console (F12) da:
localStorage.clear();
location.reload();
```

### 4-QADAM: Login Qiling
```
Login: superadmin
Parol: Admin@2024!Secure
```

### 5-QADAM: Kirish Tugmasini Bosing
- ✅ Muvaffaqiyatli kirish
- ✅ Dashboard ochiladi

---

## 🔒 XAVFSIZLIK

### localStorage Key
```javascript
'alisher_mobile_admin_credentials'
```

### localStorage Format
```json
{
  "login": "superadmin",
  "password": "Admin@2024!Secure"
}
```

### Session Key
```javascript
'alisher_mobile_admin_session'
```

---

## 📞 YORDAM

### Muammo: "Login yoki parol noto'g'ri!"
**Yechim:**
```javascript
// Browser Console (F12):
localStorage.removeItem('alisher_mobile_admin_credentials');
location.reload();
```

### Muammo: "Sahifa ochilmayapti"
**Yechim:**
```bash
# Terminal'da:
npm run dev
```

### Muammo: "Port band"
**Yechim:**
```bash
npx kill-port 3000
npm run dev
```

---

## 🎉 TAYYOR!

**Admin Panel Link:**
```
http://localhost:3000/#/admin/login
```

**Login:**
```
superadmin
```

**Parol:**
```
Admin@2024!Secure
```

**Status:** ✅ ISHLAB TURIBDI (Port 3000 LISTENING)

---

**Yaratildi:** 2026-05-23
**Versiya:** 1.0.0
