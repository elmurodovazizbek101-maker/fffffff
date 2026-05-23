const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

// Bot token
const token = '8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE';
const bot = new TelegramBot(token, { polling: true });

// Express server
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3004;
const webAppUrl = 'http://localhost:3000';

// Admin chat ID
const ADMIN_CHAT_ID = '8512936274';

// Bot status endpoint
app.get('/bot-status', (req, res) => {
  res.json({
    status: 'active',
    botToken: token ? 'configured' : 'missing',
    adminId: ADMIN_CHAT_ID,
    webAppUrl: webAppUrl,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Mahsulotlar ro'yxati
const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 14400000,
    category: 'Apple',
    image: '[PHONE]',
    description: 'Eng yangi iPhone modeli, 256GB xotira'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    price: 13200000,
    category: 'Samsung',
    image: '[PHONE]',
    description: 'Samsung flagman telefoni, 512GB'
  },
  {
    id: 3,
    name: 'Honor Magic 6 Pro',
    price: 9600000,
    category: 'Honor',
    image: '[PHONE]',
    description: 'Honor premium telefoni, 256GB'
  },
  {
    id: 4,
    name: 'Vivo X100 Pro',
    price: 9000000,
    category: 'Vivo',
    image: '[PHONE]',
    description: 'Vivo kamera telefoni, 256GB'
  },
  {
    id: 5,
    name: 'Nokia G60 5G',
    price: 3600000,
    category: 'Nokia',
    image: '[PHONE]',
    description: 'Nokia chidamli telefoni, 128GB'
  },
  {
    id: 6,
    name: 'ROG Phone 8 Pro',
    price: 12000000,
    category: 'ROG',
    image: '[PHONE]',
    description: 'Gaming telefoni, 512GB'
  },
  {
    id: 7,
    name: 'Redmi Note 13 Pro',
    price: 4800000,
    category: 'Redmi',
    image: '[PHONE]',
    description: 'Redmi arzon telefoni, 128GB'
  },
  {
    id: 8,
    name: 'OnePlus 12',
    price: 10800000,
    category: 'OnePlus',
    image: '[PHONE]',
    description: 'OnePlus tez telefoni, 256GB'
  },
  {
    id: 9,
    name: 'Oppo Find X7 Pro',
    price: 10200000,
    category: 'Oppo',
    image: '[PHONE]',
    description: 'Oppo dizayn telefoni, 256GB'
  },
  {
    id: 10,
    name: 'Realme GT 5 Pro',
    price: 7200000,
    category: 'Realme',
    image: '[PHONE]',
    description: 'Realme sport telefoni, 256GB'
  }
]

// Asosiy klaviatura
function createMainKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'DO\'KONNI OCHISH', web_app: { url: webAppUrl } }
        ],
        [
          { text: 'KATALOG', callback_data: 'catalog' },
          { text: 'BOGLANISH', callback_data: 'contact' }
        ],
        [
          { text: 'YORDAM', callback_data: 'help' }
        ]
      ]
    }
  };
}

// /start buyrug'i
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'Foydalanuvchi';

  const welcomeMessage = `
Assalomu alaykum, ${firstName}!

**Alisher Mobile** ga xush kelibsiz!

Bizda eng yangi va sifatli smartfonlar:
• iPhone (Apple)
• Samsung Galaxy
• Honor Magic
• Vivo X seriyasi
• Nokia chidamli telefonlar
• ROG Gaming telefonlar
• Redmi arzon telefonlar
• OnePlus tez telefonlar
• Oppo dizayn telefonlar
• Realme sport telefonlar

**Bizning afzalliklarimiz:**
- Rasmiy kafolat
- Tez yetkazib berish
- Eng yaxshi narxlar
- Professional xizmat

Xarid qilish uchun "DO'KONNI OCHISH" tugmasini bosing!
  `;

  bot.sendMessage(chatId, welcomeMessage, createMainKeyboard());
});

// Admin ID olish uchun /getid buyrug'i
bot.onText(/\/getid/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const username = msg.from.username || 'Yo\'q';
  const firstName = msg.from.first_name || 'Yo\'q';
  const lastName = msg.from.last_name || 'Yo\'q';

  const idMessage = `
**Sizning ma'lumotlaringiz:**

**Chat ID:** \`${chatId}\`
**User ID:** \`${userId}\`
**Username:** @${username}
**Ism:** ${firstName} ${lastName}

Admin bo'lish uchun bu ma'lumotlarni yuborib qo'ying.
  `;

  bot.sendMessage(chatId, idMessage, { parse_mode: 'Markdown' });
});

// Callback query handler
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const messageId = query.message.message_id;

  try {
    if (data === 'catalog') {
      showCatalog(chatId);
    } else if (data === 'contact') {
      showContact(chatId);
    } else if (data === 'help') {
      showHelp(chatId);
    } else if (data === 'back_to_main') {
      const welcomeMessage = `
**Alisher Mobile** - O'zbekistondagi eng ishonchli mobil telefonlar do'koni!

Xarid qilish uchun:
1. "DO'KONNI OCHISH" tugmasini bosing
2. Mahsulotlarni tanlang
3. Buyurtma bering

Bizda eng sifatli telefonlar va professional xizmat!
      `;

      bot.editMessageText(welcomeMessage, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'Markdown',
        ...createMainKeyboard()
      });
    } else if (data.startsWith('product_')) {
      const productId = parseInt(data.split('_')[1]);
      showProductDetails(chatId, productId, messageId);
    } else if (data.startsWith('confirm_order_')) {
      const orderId = data.split('_')[2];
      await handleOrderConfirmation(chatId, orderId, query.id);
    } else if (data.startsWith('cancel_order_')) {
      const orderId = data.split('_')[2];
      await handleOrderCancellation(chatId, orderId, query.id);
    }

    await bot.answerCallbackQuery(query.id);
  } catch (error) {
    console.error('Callback query error:', error);
    await bot.answerCallbackQuery(query.id, { text: 'Xatolik yuz berdi!' });
  }
});

// Buyurtma tasdiqlash
async function handleOrderConfirmation(chatId, orderId, queryId) {
  try {
    const confirmMessage = `**Buyurtma #${orderId} tasdiqlandi**\n\nMijozga qo'ng'iroq qiling va yetkazib berish vaqtini belgilang.`;

    await bot.editMessageText(confirmMessage, {
      chat_id: chatId,
      message_id: queryId,
      parse_mode: 'Markdown'
    });
  } catch (error) {
    console.error('Order confirmation error:', error);
  }
}

// Buyurtma bekor qilish
async function handleOrderCancellation(chatId, orderId, queryId) {
  try {
    const cancelMessage = `**Buyurtma #${orderId} bekor qilindi**\n\nMijozga qo'ng'iroq qilib sabab tushuntiring.`;

    await bot.editMessageText(cancelMessage, {
      chat_id: chatId,
      message_id: queryId,
      parse_mode: 'Markdown'
    });
  } catch (error) {
    console.error('Order cancellation error:', error);
  }
}

// Katalog ko'rsatish
function showCatalog(chatId) {
  let catalogMessage = '**Mahsulotlar katalogi:**\n\n';

  const keyboard = [];
  const productsPerRow = 2;

  for (let i = 0; i < products.length; i += productsPerRow) {
    const row = [];
    for (let j = i; j < i + productsPerRow && j < products.length; j++) {
      const product = products[j];
      catalogMessage += `${product.image} **${product.name}**\n`;
      catalogMessage += `Narx: ${product.price.toLocaleString()} so'm\n`;
      catalogMessage += `Kategoriya: ${product.category}\n\n`;

      row.push({
        text: product.name,
        callback_data: `product_${product.id}`
      });
    }
    keyboard.push(row);
  }

  keyboard.push([{ text: 'Orqaga', callback_data: 'back_to_main' }]);

  bot.sendMessage(chatId, catalogMessage, {
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: keyboard }
  });
}

// Mahsulot tafsilotlari
function showProductDetails(chatId, productId, messageId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const productMessage = `
**${product.name}**

**Tavsif:** ${product.description}
**Kategoriya:** ${product.category}
**Narx:** ${product.price.toLocaleString()} so'm

1 yillik rasmiy kafolat
Toshkent bo'ylab tez yetkazib berish
  `;

  const keyboard = [
    [{ text: 'XARID QILISH', web_app: { url: webAppUrl } }],
    [{ text: 'BOGLANISH', callback_data: 'contact' }],
    [{ text: 'Katalogga qaytish', callback_data: 'catalog' }]
  ];

  bot.editMessageText(productMessage, {
    chat_id: chatId,
    message_id: messageId,
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: keyboard }
  });
}

// Bog'lanish ma'lumotlari
function showContact(chatId) {
  const contactMessage = `
**Bog'lanish ma'lumotlari:**

**Telefon:** +998 90 123 45 67
**Manzil:** Toshkent sh., Chilonzor tumani
**Ish vaqti:** Har kuni 9:00 - 21:00

**Email:** info@alishermobile.uz
**Website:** alishermobile.uz

**Ijtimoiy tarmoqlar:**
• Instagram: @alisher_mobile_uz
• Telegram: @alisher_mobile_shop_bot

Savollaringiz bo'lsa, bemalol bog'laning!
  `;

  const keyboard = [
    [{ text: 'Orqaga', callback_data: 'back_to_main' }]
  ];

  bot.sendMessage(chatId, contactMessage, {
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: keyboard }
  });
}

// Yordam
function showHelp(chatId) {
  const helpMessage = `
**Yordam va ko'rsatmalar:**

**Xarid qilish:**
1. "Do'konni ochish" tugmasini bosing
2. Kerakli mahsulotni tanlang
3. Savatga qo'shing
4. Buyurtma bering

**Mavjud mahsulotlar:**
• iPhone (Apple)
• Samsung Galaxy
• Honor Magic
• Vivo X seriyasi
• Nokia chidamli
• ROG Gaming
• Redmi arzon
• OnePlus tez
• Oppo dizayn
• Realme sport

**To'lov usullari:**
• Naqd pul
• Bank kartasi
• Click/Payme
• Muddatli to'lov

**Yetkazib berish:**
• Toshkent: 24 soat ichida
• Boshqa viloyatlar: 2-3 kun
• Kafolat: 1 yil
• Texnik yordam: 24/7

Qo'shimcha savollar uchun bog'laning!
  `;

  const keyboard = [
    [{ text: 'BOGLANISH', callback_data: 'contact' }],
    [{ text: 'Orqaga', callback_data: 'back_to_main' }]
  ];

  bot.sendMessage(chatId, helpMessage, {
    parse_mode: 'Markdown',
    reply_markup: { inline_keyboard: keyboard }
  });
}

// Express API endpoints
app.post('/api/register-customer', async (req, res) => {
  try {
    const { name, email, phone, address, id } = req.body;

    const customerMessage = `
**YANGI MIJOZ RO'YXATDAN O'TDI**

**Mijoz ma'lumotlari:**
**Ism:** ${name}
**Telefon:** ${phone}
**Email:** ${email}
**Manzil:** ${address}
**ID:** ${id}
**Sana:** ${new Date().toLocaleString('uz-UZ')}

Mijoz bilan bog'lanib, xush kelibsiz deb aytishingiz mumkin!
    `;

    await bot.sendMessage(ADMIN_CHAT_ID, customerMessage, { parse_mode: 'Markdown' });

    res.json({ success: true, message: 'Mijoz muvaffaqiyatli ro\'yxatdan o\'tdi' });
  } catch (error) {
    console.error('Customer registration error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/create-order', async (req, res) => {
  try {
    const orderData = req.body;
    const orderId = Date.now();

    // Mijoz ma'lumotlari
    const { customer, items, totalAmount, deliveryInfo, paymentMethod, isNewCustomer } = orderData;

    // Mahsulotlar ro'yxati
    let itemsList = '';
    items.forEach((item, index) => {
      itemsList += `${index + 1}. ${item.name}\n`;
      itemsList += `   Narx: ${item.price.toLocaleString()} so'm\n`;
      itemsList += `   Miqdor: ${item.quantity} dona\n`;
      itemsList += `   Jami: ${(item.price * item.quantity).toLocaleString()} so'm\n\n`;
    });

    const customerTypeIcon = isNewCustomer ? '[NEW]' : '[REGULAR]';
    const customerTypeText = isNewCustomer ? 'Yangi mijoz' : 'Doimiy mijoz';
    const orderDate = new Date();

    const orderMessage = `
**YANGI BUYURTMA** ${customerTypeIcon}

**Buyurtma ID:** #${orderId}
**Sana:** ${orderDate.toLocaleDateString('uz-UZ')}
**Vaqt:** ${orderDate.toLocaleTimeString('uz-UZ')}

**MIJOZ MA'LUMOTLARI** (${customerTypeText})
**Ism:** ${customer.name}
**Telefon:** ${customer.phone}
**Email:** ${customer.email || 'Kiritilmagan'}
**Mijoz ID:** ${customer.id}

**BUYURTMA TAFSILOTLARI:**
${itemsList}

**YETKAZIB BERISH:**
**Manzil:** ${deliveryInfo.address}
**Telefon:** ${deliveryInfo.phone}
**Izoh:** ${deliveryInfo.notes || 'Yo\'q'}

**TO'LOV:** ${paymentMethod}
**JAMI SUMMA:** ${totalAmount.toLocaleString()} so'm

**HOLAT:** Yangi buyurtma (tasdiq kutilmoqda)
    `;

    const keyboard = [
      [
        { text: 'TASDIQLASH', callback_data: `confirm_order_${orderId}` },
        { text: 'BEKOR QILISH', callback_data: `cancel_order_${orderId}` }
      ]
    ];

    await bot.sendMessage(ADMIN_CHAT_ID, orderMessage, {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard }
    });

    res.json({ success: true, orderId, message: 'Buyurtma muvaffaqiyatli yuborildi' });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Server ishga tushirish
app.listen(PORT, () => {
  console.log('Alisher Mobile Bot ishga tushdi!');
  console.log(`Bot username: @alisher_mobile_shop_bot`);
  console.log(`Bot server ishga tushdi: http://localhost:${PORT}`);
  console.log(`Web App URL: ${webAppUrl}`);
});

// Xatoliklarni ushlash
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception:', error);
});
