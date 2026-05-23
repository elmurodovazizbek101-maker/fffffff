# Telegram Botni Test Qilish 📱

## ⚠️ Muhim!

Botga xabar yuborish uchun avval **admin** botga `/start` buyrug'ini yuborishi kerak!

---

## 🚀 Qadamma-Qadam Yo'riqnoma:

### 1️⃣ **Botni Ishga Tushiring:**

```bash
cd bot
node index.js
```

**Natija:**
```
Alisher Mobile Bot ishga tushdi!
Bot username: @alisher_mobile_shop_bot
Bot server ishga tushdi: http://localhost:3003
Web App URL: http://localhost:5174
```

---

### 2️⃣ **Telegram'da Botni Oching:**

1. **Telegram** ilovasini oching (mobil yoki desktop)
2. Qidiruv qatoriga `@alisher_mobile_shop_bot` yozing
3. Botni toping va **"START"** tugmasini bosing
4. Yoki `/start` buyrug'ini yuboring

**Bot sizga javob beradi:**
```
Assalomu alaykum, [Ismingiz]!

**Alisher Mobile** ga xush kelibsiz!

Bizda eng yangi va sifatli smartfonlar:
• iPhone (Apple)
• Samsung Galaxy
• Honor Magic
...

Xarid qilish uchun "DO'KONNI OCHISH" tugmasini bosing!
```

---

### 3️⃣ **Admin Chat ID ni Olish:**

Bot bilan `/start` qilganingizdan keyin, o'z Chat ID ni olish uchun:

```
/getid
```

**Bot sizga javob beradi:**
```
**Sizning ma'lumotlaringiz:**

**Chat ID:** `1234567890`
**User ID:** `1234567890`
**Username:** @yourusername
**Ism:** Ismingiz

Admin bo'lish uchun bu ma'lumotlarni yuborib qo'ying.
```

---

### 4️⃣ **Chat ID ni Yangilash:**

Agar sizning Chat ID `7504516430` dan farq qilsa, quyidagi fayllarni yangilang:

**bot/index.js:**
```javascript
const ADMIN_CHAT_ID = 'SIZNING_CHAT_ID';
```

**bot/.env:**
```
ADMIN_CHAT_ID=SIZNING_CHAT_ID
```

---

### 5️⃣ **Test Xabarini Yuborish:**

Chat ID to'g'ri sozlangandan keyin:

```bash
node bot/test-message.js
```

**Natija:**
```
✅ Xabar muvaffaqiyatli yuborildi!
Message ID: 123
Chat ID: 7504516430
```

---

## 🧪 Bot Funksiyalarini Test Qilish:

### **Katalog Ko'rish:**
1. Botda "KATALOG" tugmasini bosing
2. Mahsulotlar ro'yxati ko'rinadi
3. Istalgan mahsulotni tanlang

### **Do'konni Ochish:**
1. "DO'KONNI OCHISH" tugmasini bosing
2. Web App ochiladi
3. Mahsulotlarni ko'ring va xarid qiling

### **Bog'lanish:**
1. "BOGLANISH" tugmasini bosing
2. Kontakt ma'lumotlari ko'rinadi

### **Yordam:**
1. "YORDAM" tugmasini bosing
2. Ko'rsatmalar va ma'lumotlar ko'rinadi

---

## 📦 Buyurtma Test Qilish:

### **Web App orqali:**
1. Telegram botda "DO'KONNI OCHISH" ni bosing
2. Mahsulotni savatga qo'shing
3. Checkout qiling
4. Ma'lumotlarni to'ldiring
5. Buyurtma bering

**Admin Telegram'da xabar oladi:**
```
**YANGI BUYURTMA** [NEW]

**Buyurtma ID:** #1234567890
**Sana:** 21.05.2024
**Vaqt:** 18:30:00

**MIJOZ MA'LUMOTLARI** (Yangi mijoz)
**Ism:** Test User
**Telefon:** +998901234567
...

[TASDIQLASH] [BEKOR QILISH]
[MIJOZGA QO'NG'IROQ]
```

---

## 🔧 Muammolarni Hal Qilish:

### **"Chat not found" xatosi:**
- ✅ Botga `/start` buyrug'ini yuboring
- ✅ Chat ID to'g'ri ekanligini tekshiring

### **Bot javob bermayapti:**
- ✅ Bot server ishga tushganligini tekshiring
- ✅ `node bot/index.js` buyrug'ini bajaring

### **Web App ochilmayapti:**
- ✅ Vite server ishga tushganligini tekshiring
- ✅ `npm run dev` buyrug'ini bajaring
- ✅ URL to'g'ri ekanligini tekshiring

---

## 📝 Bot Buyruqlari:

| Buyruq | Tavsif |
|--------|--------|
| `/start` | Botni ishga tushirish |
| `/getid` | Chat ID va User ID olish |

---

## 🎯 Bot Ma'lumotlari:

**Bot Username:** `@alisher_mobile_shop_bot`
**Bot Token:** `8861308673:AAFEhBUx20ZABW1xLJ-C1SQ0P_u_yeabvWY`
**Admin Chat ID:** `7504516430`
**Bot Server:** `http://localhost:3003`
**Web App URL:** `http://localhost:5173`

---

## ✅ Tayyor!

Endi botni to'liq test qilishingiz mumkin! 🎉

**Eslatma:** Botga xabar yuborish uchun avval `/start` buyrug'ini yuborishni unutmang!
