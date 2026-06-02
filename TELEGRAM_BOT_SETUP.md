# 🤖 Telegram Bot Sozlash Qo'llanmasi

## Bot Token
✅ **Bot Token:** `8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE`

## 📱 Chat ID ni Olish

### 1-usul: Telegram botga /start yuboring

1. Telegram da botingizni qidiring: `@YourBotUsername`
2. Botga `/start` yuboring
3. Quyidagi linkni brauzerda oching:
   ```
   https://api.telegram.org/bot8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE/getUpdates
   ```
4. Natijada sizning Chat ID ni ko'rasiz:
   ```json
   {
     "ok": true,
     "result": [
       {
         "message": {
           "chat": {
             "id": 123456789,  // <-- Bu sizning Chat ID
             "first_name": "Ism",
             "username": "username"
           }
         }
       }
     ]
   }
   ```

### 2-usul: @userinfobot dan foydalaning

1. Telegram da `@userinfobot` ni qidiring
2. Botga `/start` yuboring
3. Bot sizga Chat ID ni yuboradi

### 3-usul: @getmyid_bot dan foydalaning

1. Telegram da `@getmyid_bot` ni qidiring
2. Botga `/start` yuboring
3. Bot sizga Chat ID ni yuboradi

## ⚙️ Chat ID ni Saytga Qo'shish

### Admin Panel orqali:

1. Admin panelga kiring: `/admin`
2. **Settings** bo'limiga o'ting
3. **Telegram sozlamalari** ni toping
4. Chat ID ni kiriting va saqlang

### Yoki localStorage ga qo'lda qo'shing:

Brauzer console da (F12):
```javascript
localStorage.setItem('telegram_admin_chat_id', 'SIZNING_CHAT_ID')
```

## 🧪 Testlash

1. Saytda buyurtma bering
2. Telegram botga xabar kelishi kerak
3. Agar xabar kelmasa:
   - Chat ID to'g'ri kiritilganini tekshiring
   - Botga `/start` yuborganingizni tekshiring
   - Brauzer console da xatolarni ko'ring (F12)

## 📋 Xabar Formati

Buyurtma berilganda Telegram botga quyidagi formatda xabar keladi:

```
🛒 Yangi buyurtma!

📋 Buyurtma ID: ORD1234567890
📅 Sana: 01.06.2026, 12:30

👤 Mijoz ma'lumotlari:
• Ism: Alisher
• Telefon: +998 90 123 45 67

🚚 Yetkazib berish:
• Manzil: Toshkent sh., Chilonzor tumani
• Izoh: Eshik oldida qoldiring

🛍️ Buyurtma tarkibi:
1. iPhone 15 Pro Max
   • Miqdor: 2 dona
   • Narx: 18,500,000 so'm
   • Jami: 37,000,000 so'm

2. Samsung Galaxy S24
   • Miqdor: 1 dona
   • Narx: 11,200,000 so'm
   • Jami: 11,200,000 so'm

💰 Jami summa: 48,200,000 so'm
💳 To'lov usuli: Naqd pul
```

## 🔧 Muammolarni Hal Qilish

### Xabar kelmayapti?

1. **Chat ID tekshiring:**
   ```javascript
   console.log(localStorage.getItem('telegram_admin_chat_id'))
   ```

2. **Bot tokenini tekshiring:**
   ```
   https://api.telegram.org/bot8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE/getMe
   ```

3. **Botga /start yuborganingizni tekshiring**

4. **Brauzer console da xatolarni ko'ring (F12)**

### "Chat not found" xatosi?

- Botga `/start` yuboring
- Chat ID ni qayta kiriting

### "Unauthorized" xatosi?

- Bot token noto'g'ri
- BotFather dan yangi token oling

## 📞 Yordam

Agar muammo hal bo'lmasa:
1. Brauzer console da xatolarni screenshot qiling
2. Chat ID va bot username ni tekshiring
3. Telegram BotFather ga murojaat qiling

---

**Eslatma:** Bot token va Chat ID ni hech kimga bermang! Bu maxfiy ma'lumotlar.
