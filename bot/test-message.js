const TelegramBot = require('node-telegram-bot-api');

// Bot token
const token = '8861308673:AAFEhBUx20ZABW1xLJ-C1SQ0P_u_yeabvWY';
const bot = new TelegramBot(token);

// Admin chat ID
const ADMIN_CHAT_ID = '7504516430';

// Test xabari yuborish
async function sendTestMessage() {
  try {
    const testMessage = `🎉 TEST XABARI 🎉

Alisher Mobile Shop botidan salom!

Bu test xabari. Bot to'g'ri ishlayapti! ✅

Bot ma'lumotlari:
• Bot username: @alisher_mobile_shop_bot
• Server: http://localhost:3003
• Web App: http://localhost:5173

Xususiyatlar:
✅ Mahsulotlar katalogi
✅ Buyurtma qabul qilish
✅ Admin xabarlari
✅ Web App integratsiyasi

Sana: ${new Date().toLocaleString('uz-UZ')}

Bot tayyor va ishlashga tayyor! 🚀`;

    const result = await bot.sendMessage(ADMIN_CHAT_ID, testMessage);

    console.log('✅ Xabar muvaffaqiyatli yuborildi!');
    console.log('Message ID:', result.message_id);
    console.log('Chat ID:', result.chat.id);

    process.exit(0);
  } catch (error) {
    console.error('❌ Xabar yuborishda xatolik:', error.message);

    if (error.response && error.response.body) {
      console.error('Xato tafsilotlari:', error.response.body);
    }

    process.exit(1);
  }
}

// Xabarni yuborish
console.log('📤 Test xabari yuborilmoqda...');
sendTestMessage();
