# Telegram Bot Setup Guide

## 🤖 Telegram Bot Integration Complete!

Barcha buyurtmalar va yangi mijozlar haqida to'liq ma'lumotlar Telegram orqali admin ga yuboriladi.

## 📋 Setup Instructions

### 1. Bot Server ni ishga tushirish

```bash
# Bot papkasiga o'ting
cd bot

# Dependencies allaqachon o'rnatilgan
# Agar kerak bo'lsa: npm install

# Bot serverni ishga tushiring
npm start
```

### 2. Admin Telegram ID ni olish

1. Telegram da botingizga `/start` buyrug'ini yuboring
2. Keyin `/getid` buyrug'ini yuboring
3. Bot sizga Chat ID ni beradi
4. Bu ID ni `.env` fayliga qo'shing:

```env
BOT_TOKEN=8861308673:AAFEhBUx20ZABW1xLJ-C1SQ0P_u_yeabvWY
WEBAPP_URL=http://localhost:3000
PORT=3001
ADMIN_CHAT_ID=YOUR_CHAT_ID_HERE
```

### 3. Web App URL ni sozlash

1. BotFather ga `/mybots` yuboring
2. Botingizni tanlang
3. "Bot Settings" > "Menu Button" > "Configure Menu Button"
4. Web App URL: `http://localhost:3000`

## 🔔 Notification Features

### Yangi Buyurtma Xabarlari
Har bir yangi buyurtma uchun admin ga quyidagi ma'lumotlar yuboriladi:

- **Buyurtma ID** va sana/vaqt
- **Mijoz ma'lumotlari** (ism, telefon, email, manzil)
- **Mijoz turi** (yangi yoki mavjud)
- **Mahsulotlar ro'yxati** (nom, narx, miqdor)
- **Jami summa** va to'lov usuli
- **Yetkazib berish ma'lumotlari**
- **Statistika** (mahsulotlar soni, o'rtacha narx)

### Yangi Mijoz Ro'yxatdan O'tganda
- Mijoz ma'lumotlari
- Ro'yxatdan o'tgan sana
- Tavsiyalar (xush kelibsiz xabari, chegirmalar)

### Admin Boshqaruv Tugmalari
- ✅ Buyurtmani tasdiqlash
- ❌ Buyurtmani bekor qilish
- 📞 Mijozga qo'ng'iroq qilish
- 💬 Xabar yuborish
- 📋 Buyurtma tafsilotlari

### Kunlik Hisobot
Har kuni soat 18:00 da avtomatik hisobot:
- Kunlik buyurtmalar soni
- Yangi mijozlar soni
- Jami sotuv summasi
- Diqqat talab qiluvchi holatlar

## 🛠️ Technical Details

### Bot Commands
- `/start` - Botni ishga tushirish
- `/getid` - Admin ID olish
- `/catalog` - Mahsulotlar katalogi
- `/contact` - Bog'lanish ma'lumotlari
- `/help` - Yordam
- `/orders` - Buyurtmalar tarixi

### API Endpoints
- `POST /api/orders` - Yangi buyurtma yaratish
- `POST /api/customers` - Yangi mijoz ro'yxatdan o'tkazish
- `POST /web-data` - Web App dan ma'lumot qabul qilish

### Order Data Structure
```json
{
  "orderId": "ORD1234567890123",
  "customer": {
    "id": "CUST1234567890123",
    "name": "Mijoz ismi",
    "phone": "+998901234567",
    "email": "email@example.com",
    "telegramId": 123456789,
    "telegramUsername": "username"
  },
  "items": [
    {
      "id": 1,
      "name": "iPhone 15 Pro Max",
      "price": 14400000,
      "quantity": 1,
      "category": "Apple"
    }
  ],
  "totalAmount": 14400000,
  "deliveryInfo": {
    "address": "Toshkent sh., Chilonzor tumani",
    "city": "Toshkent",
    "zipCode": "100000",
    "notes": "Qo'shimcha izoh",
    "preferredTime": "Ertaga 14:00 dan keyin"
  },
  "paymentMethod": "cash",
  "orderDate": "2024-01-01T12:00:00.000Z",
  "isNewCustomer": true,
  "customerType": "new"
}
```

## 🚀 Production Deployment

### 1. Hosting
Bot serverni hosting platformasiga deploy qiling:
- Heroku
- Railway
- DigitalOcean
- AWS

### 2. Environment Variables
Production da quyidagi environment variables ni sozlang:
```env
BOT_TOKEN=your_bot_token
WEBAPP_URL=https://your-domain.com
PORT=3001
ADMIN_CHAT_ID=your_admin_chat_id
```

### 3. Web App URL Update
BotFather da Web App URL ni production URL ga o'zgartiring.

## ✅ Test Qilish

1. Bot serverni ishga tushiring: `npm start`
2. Telegram da botga `/start` yuboring
3. Web App ni oching
4. Mahsulot qo'shing va buyurtma bering
5. Admin Telegram da xabar kelishini tekshiring

## 🔧 Troubleshooting

### Bot ishlamayotgan bo'lsa:
1. Bot token to'g'riligini tekshiring
2. Admin Chat ID to'g'riligini tekshiring
3. Bot server ishlab turganini tekshiring
4. Console da error loglarni ko'ring

### Xabarlar kelmayotgan bo'lsa:
1. ADMIN_CHAT_ID to'g'ri sozlanganini tekshiring
2. Bot server API endpointlari ishlayotganini tekshiring
3. Network connection ni tekshiring

## 📞 Support

Agar muammolar bo'lsa, quyidagi loglarni tekshiring:
- Bot server console logs
- Browser developer tools
- Network requests

Bot muvaffaqiyatli sozlandi! Endi barcha buyurtmalar va mijoz ma'lumotlari Telegram orqali real-time da keladi. 🎉