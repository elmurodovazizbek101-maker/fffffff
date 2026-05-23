# 🧪 SAVATCHA VA TELEGRAM TEST

**Sana:** 2026-05-23
**Status:** TEST QILISH KERAK

---

## ✅ BOT SERVERI

### Status
- ✅ **Bot ishga tushdi**
- ✅ **Port:** 3004
- ✅ **Bot username:** @alisher_mobile_shop_bot
- ✅ **Web App URL:** http://localhost:3000

### Bot Ma'lumotlari
```
BOT_TOKEN: 8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE
ADMIN_CHAT_ID: 8512936274
PORT: 3004
```

---

## 🧪 TEST QILISH QADAMLARI

### 1. Savatcha Tugmasini Test Qilish

#### A. Mahsulot Qo'shish
1. Saytni oching: `http://localhost:3000/`
2. Biror mahsulotni toping
3. "Savatga qo'shish" tugmasini bosing
4. **Kutilgan natija:** Savatcha badge da raqam ko'rinadi

#### B. Savatcha Ochish
1. O'ng yuqoridagi 🛒 tugmasini bosing
2. **Kutilgan natija:** Savatcha sidebar ochiladi
3. **Tekshiring:**
   - Mahsulotlar ko'rinadi
   - Miqdorni o'zgartirish ishlaydi
   - O'chirish tugmasi ishlaydi
   - Jami narx to'g'ri hisoblanadi

---

### 2. Buyurtma Berish Test

#### A. Checkout Modal
1. Savatcha da "Buyurtma berish" tugmasini bosing
2. **Kutilgan natija:** Checkout modal ochiladi
3. Ma'lumotlarni kiriting:
   - Ism
   - Telefon
   - Manzil
   - Izoh (ixtiyoriy)

#### B. Buyurtma Yuborish
1. "Buyurtma berish" tugmasini bosing
2. **Kutilgan natija:**
   - Loading ko'rinadi
   - Muvaffaqiyat xabari chiqadi
   - Savatcha tozalanadi

---

### 3. Telegram Xabar Test

#### A. Telegram Botni Ochish
1. Telegram da @alisher_mobile_shop_bot ni qidiring
2. `/start` yuboring
3. **Kutilgan natija:** Xush kelibsiz xabari

#### B. Xabar Kelishini Tekshirish
1. Saytda buyurtma bering
2. Telegram botga o'ting
3. **Kutilgan natija:** Buyurtma haqida xabar keladi

**Xabar formati:**
```
🛒 YANGI BUYURTMA!

👤 Mijoz: Ali Valiyev
📱 Telefon: +998901234567
📍 Manzil: Toshkent, Chilonzor

📦 Mahsulotlar:
1. iPhone 15 Pro Max - 1 ta - 15,000,000 so'm

💰 Jami: 15,000,000 so'm

📝 Izoh: Tez yetkazib bering

⏰ Vaqt: 2024-01-15 14:30
```

---

## 🔍 MUAMMOLARNI ANIQLASH

### Agar Savatcha Ochilmasa:

#### 1. Browser Console Tekshirish
```
F12 → Console
```
**Qidirilayotgan xatolar:**
- CartContext xatosi
- CartSidebar xatosi
- React xatosi

#### 2. localStorage Tekshirish
```javascript
// Browser Console da:
localStorage.getItem('alisher_mobile_cart')
```
**Kutilgan:** `null` yoki `[]` yoki mahsulotlar array

#### 3. CartProvider Tekshirish
- WebsiteLayout da CartProvider bor
- CartContext to'g'ri import qilingan
- useCart hook ishlayapti

---

### Agar Telegram Xabar Kelmasa:

#### 1. Bot Server Tekshirish
```bash
# Terminal da:
netstat -ano | findstr :3004
```
**Kutilgan:** Port 3004 LISTENING

#### 2. Bot Token Tekshirish
```bash
# bot/.env faylini tekshiring
BOT_TOKEN=8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE
```

#### 3. Admin Chat ID Tekshirish
```bash
# bot/.env faylini tekshiring
ADMIN_CHAT_ID=8512936274
```

#### 4. Bot Serverga So'rov Yuborish
```bash
# Browser Console da:
fetch('http://localhost:3004/send-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerName: 'Test',
    phone: '+998901234567',
    address: 'Test address',
    items: [{name: 'Test', quantity: 1, price: 1000}],
    totalPrice: 1000
  })
})
```

---

## 🛠️ TUZATISH QADAMLARI

### Savatcha Muammosi

#### 1. CartContext Mavjudligini Tekshirish
```bash
# Fayl mavjudmi:
ls src/components/website/context/CartContext.jsx
```

#### 2. WebsiteLayout da Provider Tekshirish
```javascript
// WebsiteLayout.jsx da:
<CartProvider>
  {children}
</CartProvider>
```

#### 3. Header da useCart Tekshirish
```javascript
// WebsiteHeader.jsx da:
import { useCart } from './context/CartContext'
const { getTotalItems } = useCart()
```

---

### Telegram Muammosi

#### 1. Bot Serverini Qayta Ishga Tushirish
```bash
cd bot
node index.js
```

#### 2. Webhook O'chirish
```bash
# Telegram Bot API:
https://api.telegram.org/bot8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE/deleteWebhook
```

#### 3. Bot Ma'lumotlarini Tekshirish
```bash
# Telegram Bot API:
https://api.telegram.org/bot8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE/getMe
```

---

## 📊 TEST NATIJALARI

### Savatcha
- [ ] Mahsulot qo'shish ishlaydi
- [ ] Savatcha tugmasi ishlaydi
- [ ] Savatcha sidebar ochiladi
- [ ] Mahsulotlar ko'rinadi
- [ ] Miqdor o'zgartirish ishlaydi
- [ ] O'chirish ishlaydi
- [ ] Jami narx to'g'ri

### Buyurtma
- [ ] Checkout modal ochiladi
- [ ] Ma'lumotlar kiritish mumkin
- [ ] Buyurtma yuborish ishlaydi
- [ ] Muvaffaqiyat xabari chiqadi
- [ ] Savatcha tozalanadi

### Telegram
- [ ] Bot serveri ishlayapti
- [ ] Bot /start ga javob beradi
- [ ] Buyurtma xabari keladi
- [ ] Xabar formati to'g'ri
- [ ] Admin chat ID to'g'ri

---

## 🎯 KEYINGI QADAMLAR

1. **Savatcha ni test qiling**
2. **Buyurtma bering**
3. **Telegram xabarni tekshiring**
4. **Muammolarni yozing**
5. **Tuzatish qiling**

---

## 📞 YORDAM

### Agar Hali Ham Ishlamasa:

1. **Browser Console ni tekshiring** (F12)
2. **Network tab ni tekshiring** (XHR so'rovlar)
3. **Bot server loglarini tekshiring**
4. **localStorage ni tozalang**
5. **Sahifani yangilang** (Ctrl+F5)

---

**Yaratildi:** 2026-05-23
**Versiya:** 1.0.0
