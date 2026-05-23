# API Documentation - Alisher Mobile

Bu hujjat Alisher Mobile loyihasining barcha API endpointlari va ma'lumotlar strukturasini tavsiflaydi.

## 📋 Table of Contents

1. [Data Structure](#data-structure)
2. [Context APIs](#context-apis)
3. [Telegram Bot API](#telegram-bot-api)
4. [Order Service](#order-service)
5. [Local Storage](#local-storage)

---

## 🗂️ Data Structure

### Product

```typescript
interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  description: string;
  specs: {
    screen?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    camera?: string;
    battery?: string;
    os?: string;
  };
  inStock: boolean;
  rating: number;
  reviews: number;
}
```

### Category

```typescript
interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  productCount: number;
}
```

### Customer

```typescript
interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  telegramId?: number;
  registeredAt: string;
  totalOrders: number;
  totalSpent: number;
}
```

### Order

```typescript
interface Order {
  id: number;
  customerId: number;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'transfer';
  deliveryAddress: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}
```

### Sale

```typescript
interface Sale {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  customerId?: number;
  customerName?: string;
  paymentMethod: 'cash' | 'card' | 'transfer';
  soldBy: string;
  soldAt: string;
}
```

### Debt

```typescript
interface Debt {
  id: number;
  customerId: number;
  customerName: string;
  amount: number;
  paid: number;
  remaining: number;
  dueDate: string;
  status: 'active' | 'paid' | 'overdue';
  notes?: string;
  createdAt: string;
}
```

### Supplier

```typescript
interface Supplier {
  id: number;
  name: string;
  company: string;
  phone: string;
  email?: string;
  address?: string;
  products: string[];
  totalSupplied: number;
  lastSupply: string;
}
```

### Expense

```typescript
interface Expense {
  id: number;
  category: string;
  amount: number;
  description: string;
  date: string;
  paidBy: string;
  paymentMethod: 'cash' | 'card' | 'transfer';
}
```

### Employee

```typescript
interface Employee {
  id: number;
  name: string;
  position: string;
  phone: string;
  email?: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'inactive';
}
```

### Promotion

```typescript
interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  startDate: string;
  endDate: string;
  active: boolean;
}
```

---

## 🔌 Context APIs

### DataContext

**Location:** `src/context/DataContext.jsx`

#### Methods

##### `getProducts()`
Barcha mahsulotlarni qaytaradi.

```javascript
const { products } = useData();
```

##### `getProductById(id)`
ID bo'yicha mahsulotni qaytaradi.

```javascript
const product = getProductById(1);
```

##### `getProductsByBrand(brand)`
Brend bo'yicha mahsulotlarni qaytaradi.

```javascript
const iphones = getProductsByBrand('iPhone');
```

##### `getCategories()`
Barcha kategoriyalarni qaytaradi.

```javascript
const { categories } = useData();
```

##### `addProduct(product)`
Yangi mahsulot qo'shadi.

```javascript
addProduct({
  name: 'iPhone 15 Pro',
  brand: 'iPhone',
  price: 12000000,
  // ...
});
```

##### `updateProduct(id, updates)`
Mahsulotni yangilaydi.

```javascript
updateProduct(1, { price: 11500000 });
```

##### `deleteProduct(id)`
Mahsulotni o'chiradi.

```javascript
deleteProduct(1);
```

##### `addSale(sale)`
Yangi sotuv qo'shadi.

```javascript
addSale({
  productId: 1,
  quantity: 1,
  price: 12000000,
  // ...
});
```

##### `getCustomers()`
Barcha mijozlarni qaytaradi.

```javascript
const { customers } = useData();
```

##### `addCustomer(customer)`
Yangi mijoz qo'shadi.

```javascript
addCustomer({
  name: 'Ali Valiyev',
  phone: '+998901234567',
  // ...
});
```

##### `getPromotions()`
Barcha aksiyalarni qaytaradi.

```javascript
const { promotions } = useData();
```

##### `addPromotion(promotion)`
Yangi aksiya qo'shadi.

```javascript
addPromotion({
  title: 'Yangi yil aksiyasi',
  description: '50% chegirma',
  image: 'promo.jpg',
  // ...
});
```

### LanguageContext

**Location:** `src/context/LanguageContext.jsx`

#### Methods

##### `changeLanguage(lang)`
Tilni o'zgartiradi.

```javascript
const { changeLanguage } = useLanguage();
changeLanguage('uz'); // 'uz', 'en', 'ru'
```

##### `t(key)`
Tarjimani qaytaradi.

```javascript
const { t } = useLanguage();
const title = t('home'); // 'Bosh sahifa'
```

### CartContext

**Location:** `src/components/website/context/CartContext.jsx`

#### Methods

##### `addToCart(product, quantity)`
Mahsulotni savatga qo'shadi.

```javascript
const { addToCart } = useCart();
addToCart(product, 1);
```

##### `removeFromCart(productId)`
Mahsulotni savatdan o'chiradi.

```javascript
removeFromCart(1);
```

##### `updateQuantity(productId, quantity)`
Miqdorni yangilaydi.

```javascript
updateQuantity(1, 3);
```

##### `clearCart()`
Savatni tozalaydi.

```javascript
clearCart();
```

##### `getCartTotal()`
Savat jami narxini qaytaradi.

```javascript
const total = getCartTotal();
```

### AuthContext

**Location:** `src/components/website/context/AuthContext.jsx`

#### Methods

##### `login(credentials)`
Foydalanuvchini tizimga kiritadi.

```javascript
const { login } = useAuth();
await login({ phone: '+998901234567', password: '123456' });
```

##### `register(userData)`
Yangi foydalanuvchi ro'yxatdan o'tkazadi.

```javascript
const { register } = useAuth();
await register({
  name: 'Ali Valiyev',
  phone: '+998901234567',
  password: '123456'
});
```

##### `logout()`
Foydalanuvchini tizimdan chiqaradi.

```javascript
logout();
```

##### `isAuthenticated()`
Foydalanuvchi tizimga kirganligini tekshiradi.

```javascript
const { user, isAuthenticated } = useAuth();
if (isAuthenticated) {
  // ...
}
```

---

## 🤖 Telegram Bot API

**Location:** `bot/index.js`

### Bot Commands

#### `/start`
Botni ishga tushiradi va welcome xabarini ko'rsatadi.

**Response:**
```
🎉 Alisher Mobile ga xush kelibsiz!

Biz O'zbekistondagi eng ishonchli mobil telefonlar do'konimiz.

📱 Mahsulotlar: /products
📦 Buyurtmalar: /orders
📞 Aloqa: /contact
❓ Yordam: /help
```

#### `/products`
Mavjud mahsulotlar ro'yxatini ko'rsatadi.

**Response:**
```
📱 Mavjud mahsulotlar:

iPhone 15 Pro - 12,000,000 so'm
Samsung Galaxy S24 - 10,500,000 so'm
...
```

#### `/orders`
Foydalanuvchi buyurtmalarini ko'rsatadi.

**Response:**
```
📦 Sizning buyurtmalaringiz:

#1234 - 15.01.2024
iPhone 15 Pro x1
Jami: 12,000,000 so'm
Status: Yetkazilmoqda
```

#### `/contact`
Aloqa ma'lumotlarini ko'rsatadi.

**Response:**
```
📞 Aloqa ma'lumotlari:

Telefon: +998 90 123 45 67
Manzil: Toshkent sh., Chilonzor tumani
Telegram: @alisher_mobile_shop_bot
Instagram: @alisher_mobile_uz
```

#### `/help`
Yordam xabarini ko'rsatadi.

**Response:**
```
❓ Yordam

Buyurtma berish uchun:
1. /products - Mahsulotlarni ko'ring
2. Kerakli mahsulotni tanlang
3. Buyurtma tugmasini bosing

Savollar bo'lsa: +998 90 123 45 67
```

### Bot Events

#### New Order Notification (Admin)

```javascript
bot.sendMessage(ADMIN_ID, `
🔔 Yangi buyurtma!

📋 Buyurtma #${orderId}
👤 Mijoz: ${customerName}
📞 Telefon: ${customerPhone}
📍 Manzil: ${address}

🛒 Mahsulotlar:
${items.map(item => `• ${item.name} x${item.quantity} - ${item.price} so'm`).join('\n')}

💰 Jami: ${total} so'm
💳 To'lov: ${paymentMethod}

📝 Izoh: ${notes || 'Yo\'q'}
`);
```

#### Order Confirmation (Customer)

```javascript
bot.sendMessage(customerId, `
✅ Buyurtmangiz qabul qilindi!

📋 Buyurtma #${orderId}
📅 Sana: ${date}

🛒 Mahsulotlar:
${items.map(item => `• ${item.name} x${item.quantity}`).join('\n')}

💰 Jami: ${total} so'm

📦 Yetkazib berish: 1-2 kun ichida
📞 Aloqa: +998 90 123 45 67

Rahmat! 🎉
`);
```

#### New Customer Registration (Admin)

```javascript
bot.sendMessage(ADMIN_ID, `
👤 Yangi mijoz ro'yxatdan o'tdi!

Ism: ${name}
Telefon: ${phone}
Email: ${email || 'Yo\'q'}
Telegram ID: ${telegramId}
Sana: ${date}
`);
```

---

## 📦 Order Service

**Location:** `src/utils/orderService.js`

### `createOrder(orderData)`

Yangi buyurtma yaratadi va Telegram ga xabar yuboradi.

**Parameters:**
```javascript
{
  customer: {
    name: string,
    phone: string,
    telegramId?: number
  },
  items: [
    {
      id: number,
      name: string,
      quantity: number,
      price: number
    }
  ],
  delivery: {
    address: string,
    notes?: string
  },
  payment: {
    method: 'cash' | 'card' | 'transfer'
  }
}
```

**Returns:**
```javascript
{
  success: boolean,
  orderId: number,
  message: string
}
```

**Example:**
```javascript
import { createOrder } from './utils/orderService';

const result = await createOrder({
  customer: {
    name: 'Ali Valiyev',
    phone: '+998901234567'
  },
  items: [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      quantity: 1,
      price: 12000000
    }
  ],
  delivery: {
    address: 'Toshkent, Chilonzor',
    notes: 'Eshik oldiga qoldiring'
  },
  payment: {
    method: 'cash'
  }
});

if (result.success) {
  console.log('Buyurtma yaratildi:', result.orderId);
}
```

---

## 💾 Local Storage

### Cart Data

**Key:** `alisher_mobile_cart`

**Structure:**
```javascript
[
  {
    id: number,
    name: string,
    price: number,
    quantity: number,
    image: string
  }
]
```

### User Data

**Key:** `alisher_mobile_user`

**Structure:**
```javascript
{
  id: number,
  name: string,
  phone: string,
  email?: string,
  telegramId?: number,
  token: string
}
```

### Language Preference

**Key:** `alisher_mobile_language`

**Value:** `'uz' | 'en' | 'ru'`

### Admin Session

**Key:** `alisher_mobile_admin`

**Structure:**
```javascript
{
  isAuthenticated: boolean,
  loginTime: string,
  expiresAt: string
}
```

---

## 🔐 Authentication

### Admin Login

**Endpoint:** `/admin/login`

**Credentials:**
```javascript
{
  login: 'admin',
  password: 'alisher123'
}
```

**Response:**
```javascript
{
  success: boolean,
  token: string,
  expiresIn: number
}
```

### Customer Login (Telegram)

**Method:** Telegram Web App authentication

**Flow:**
1. User clicks "Kirish" button
2. Telegram authentication modal opens
3. User authorizes
4. Telegram returns user data
5. User data saved to context and localStorage

---

## 📊 Statistics API

### Dashboard Stats

```javascript
{
  totalSales: number,
  totalRevenue: number,
  totalOrders: number,
  totalCustomers: number,
  todaySales: number,
  todayRevenue: number,
  topProducts: Product[],
  recentOrders: Order[],
  salesChart: {
    labels: string[],
    data: number[]
  }
}
```

---

## 🔄 Real-time Updates

### Telegram Webhook

**URL:** `https://api.telegram.org/bot{BOT_TOKEN}/setWebhook`

**Webhook URL:** `https://your-domain.com/webhook`

**Method:** POST

**Body:**
```javascript
{
  update_id: number,
  message: {
    message_id: number,
    from: {
      id: number,
      first_name: string,
      username?: string
    },
    chat: {
      id: number,
      type: string
    },
    text: string,
    date: number
  }
}
```

---

## 🛠️ Utility Functions

### Format Price

```javascript
function formatPrice(price) {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0
  }).format(price);
}
```

### Format Date

```javascript
function formatDate(date) {
  return new Intl.DateTimeFormat('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
}
```

### Format Phone

```javascript
function formatPhone(phone) {
  return phone.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
}
```

---

## 📝 Error Handling

### Error Codes

```javascript
{
  'AUTH_FAILED': 'Autentifikatsiya xatosi',
  'INVALID_CREDENTIALS': 'Login yoki parol noto\'g\'ri',
  'PRODUCT_NOT_FOUND': 'Mahsulot topilmadi',
  'OUT_OF_STOCK': 'Mahsulot tugagan',
  'ORDER_FAILED': 'Buyurtma yaratishda xatolik',
  'PAYMENT_FAILED': 'To\'lov amalga oshmadi',
  'NETWORK_ERROR': 'Internet aloqasi yo\'q',
  'SERVER_ERROR': 'Server xatosi'
}
```

### Error Response

```javascript
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  }
}
```

---

## 🔗 External APIs

### Telegram Bot API

**Base URL:** `https://api.telegram.org/bot{BOT_TOKEN}`

**Methods:**
- `sendMessage` - Xabar yuborish
- `sendPhoto` - Rasm yuborish
- `sendDocument` - Fayl yuborish
- `answerCallbackQuery` - Callback javob berish

### Telegram Web App API

**Methods:**
- `window.Telegram.WebApp.ready()` - App tayyor
- `window.Telegram.WebApp.expand()` - To'liq ekran
- `window.Telegram.WebApp.close()` - Yopish
- `window.Telegram.WebApp.MainButton` - Asosiy tugma

---

© 2024 Alisher Mobile. Barcha huquqlar himoyalangan.
