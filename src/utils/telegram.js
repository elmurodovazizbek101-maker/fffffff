// Telegram Bot API utilities
const TELEGRAM_BOT_TOKEN = '8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE'
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

// Telegram Login Widget credentials
const TELEGRAM_CLIENT_ID = '8861308673'
const TELEGRAM_CLIENT_SECRET = 'PW6A8l-05DRWvsCPgmQPwL7yyaxl13UueglZFeQXJkHihPp2l9miXQ'

// Admin chat ID - localStorage dan olinadi yoki default qiymat
const getAdminChatId = () => {
  return localStorage.getItem('telegram_admin_chat_id') || null
}

const setAdminChatId = (chatId) => {
  localStorage.setItem('telegram_admin_chat_id', chatId)
}

export class TelegramBotService {
  constructor() {
    this.botToken = TELEGRAM_BOT_TOKEN
    this.apiUrl = TELEGRAM_API_URL
  }

  // Get current admin chat ID
  getAdminChatId() {
    return getAdminChatId()
  }

  // Set admin chat ID
  setAdminChatId(chatId) {
    setAdminChatId(chatId)
    return true
  }

  // Send message to admin
  async sendMessageToAdmin(message) {
    try {
      const adminChatId = this.getAdminChatId()
      
      // Chat ID tekshirish
      if (!adminChatId) {
        console.warn('⚠️ DIQQAT: Chat ID sozlanmagan!')
        console.log('📱 Telegram botga /start yuboring va Chat ID ni oling')
        console.log('⚙️ Admin paneldan Settings > Telegram sozlamalariga o\'ting')
        return { 
          success: false, 
          error: 'Chat ID sozlanmagan. Botga /start yuboring va Chat ID ni admin paneldan kiriting.' 
        }
      }

      const response = await fetch(`${this.apiUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: adminChatId,
          text: message,
          parse_mode: 'HTML'
        })
      })

      const result = await response.json()
      
      if (result.ok) {
        return { success: true, result }
      } else {
        console.error('❌ Telegram API xatoligi:', result)
        
        // Chat ID xatoligi uchun maxsus xabar
        if (result.description && result.description.includes('chat not found')) {
          return { 
            success: false, 
            error: 'Chat topilmadi. Botga /start yuboring va Chat ID ni to\'g\'ri kiriting.' 
          }
        }
        
        return { success: false, error: result.description }
      }
    } catch (error) {
      console.error('❌ Telegram bilan bog\'lanishda xatolik:', error)
      return { success: false, error: error.message }
    }
  }

  // Format order message
  formatOrderMessage(orderData) {
    const { orderId, customer, items, totalAmount, deliveryInfo, paymentMethod, orderDate } = orderData
    
    let message = `🛒 <b>Yangi buyurtma!</b>\n\n`
    message += `📋 <b>Buyurtma ID:</b> ${orderId}\n`
    message += `📅 <b>Sana:</b> ${new Date(orderDate).toLocaleString('uz-UZ')}\n\n`
    
    message += `👤 <b>Mijoz ma'lumotlari:</b>\n`
    message += `• Ism: ${customer.name}\n`
    message += `• Telefon: ${customer.phone}\n`
    if (customer.email) message += `• Email: ${customer.email}\n`
    
    if (deliveryInfo) {
      message += `\n🚚 <b>Yetkazib berish:</b>\n`
      message += `• Manzil: ${deliveryInfo.address}\n`
      if (deliveryInfo.notes) message += `• Izoh: ${deliveryInfo.notes}\n`
    }
    
    message += `\n🛍️ <b>Buyurtma tarkibi:</b>\n`
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   • Miqdor: ${item.quantity} dona\n`
      message += `   • Narx: ${item.price.toLocaleString()} so'm\n`
      message += `   • Jami: ${(item.price * item.quantity).toLocaleString()} so'm\n\n`
    })
    
    message += `💰 <b>Jami summa:</b> ${totalAmount.toLocaleString()} so'm\n`
    message += `💳 <b>To'lov usuli:</b> ${this.getPaymentMethodName(paymentMethod)}\n`
    
    return message
  }

  // Format customer registration message
  formatCustomerMessage(customerData) {
    let message = `👤 <b>Yangi mijoz ro'yxatdan o'tdi!</b>\n\n`
    message += `• <b>Ism:</b> ${customerData.name}\n`
    message += `• <b>Telefon:</b> ${customerData.phone}\n`
    if (customerData.email) message += `• <b>Email:</b> ${customerData.email}\n`
    if (customerData.address) message += `• <b>Manzil:</b> ${customerData.address}\n`
    message += `• <b>Ro'yxatdan o'tgan sana:</b> ${new Date(customerData.registrationDate).toLocaleString('uz-UZ')}\n`
    
    return message
  }

  // Get payment method name in Uzbek
  getPaymentMethodName(method) {
    const methods = {
      'cash': 'Naqd pul',
      'card': 'Bank kartasi',
      'click': 'Click',
      'payme': 'Payme',
      'installment': 'Muddatli to\'lov'
    }
    return methods[method] || method
  }

  // Send order notification
  async sendOrderNotification(orderData) {
    const message = this.formatOrderMessage(orderData)
    return await this.sendMessageToAdmin(message)
  }

  // Send customer registration notification
  async sendCustomerNotification(customerData) {
    const message = this.formatCustomerMessage(customerData)
    return await this.sendMessageToAdmin(message)
  }

  // Get bot info (for testing)
  async getBotInfo() {
    try {
      const response = await fetch(`${this.apiUrl}/getMe`)
      const result = await response.json()
      
      if (result.ok) {
        return result
      } else {
        console.error('❌ Bot ma\'lumotlarini olishda xatolik:', result)
        return { success: false, error: result.description }
      }
    } catch (error) {
      console.error('❌ Bot ma\'lumotlarini olishda xatolik:', error)
      return { success: false, error: error.message }
    }
  }

  // Get updates (for getting chat ID)
  async getUpdates() {
    try {
      const response = await fetch(`${this.apiUrl}/getUpdates`)
      const result = await response.json()
      
      if (result.ok) {
        return result
      } else {
        console.error('❌ Bot yangilanishlarini olishda xatolik:', result)
        return { success: false, error: result.description }
      }
    } catch (error) {
      console.error('❌ Bot yangilanishlarini olishda xatolik:', error)
      return { success: false, error: error.message }
    }
  }
}

// Telegram Web App utilities (keep for mini-app functionality)
export class TelegramWebApp {
  constructor() {
    this.tg = window.Telegram?.WebApp
    this.user = this.tg?.initDataUnsafe?.user
    this.isReady = false
    
    if (this.tg) {
      this.init()
    }
  }

  init() {
    // Telegram Web App ni sozlash
    this.tg.ready()
    this.tg.expand()
    
    // Tema ranglarini sozlash
    this.tg.setHeaderColor('#4f46e5')
    this.tg.setBackgroundColor('#ffffff')
    
    // Main button ni yashirish (boshlang'ich holatda)
    this.tg.MainButton.hide()
    
    this.isReady = true
  }

  // Foydalanuvchi ma'lumotlarini olish
  getUser() {
    return this.user || null
  }

  // Foydalanuvchi Telegram orqali kirganligi tekshirish
  isFromTelegram() {
    return !!this.tg && !!this.user
  }

  // Main button ni ko'rsatish
  showMainButton(text, callback) {
    if (!this.tg) return
    
    this.tg.MainButton.setText(text)
    this.tg.MainButton.show()
    this.tg.MainButton.onClick(callback)
  }

  // Main button ni yashirish
  hideMainButton() {
    if (!this.tg) return
    this.tg.MainButton.hide()
  }

  // Savatcha ma'lumotlarini yuborish
  sendCartData(cartItems, totalPrice) {
    if (!this.tg) return
    
    const data = {
      items: cartItems,
      total: totalPrice,
      user: this.user
    }
    
    this.tg.sendData(JSON.stringify(data))
  }

  // Haptic feedback
  hapticFeedback(type = 'impact') {
    if (!this.tg?.HapticFeedback) return
    
    switch (type) {
      case 'light':
        this.tg.HapticFeedback.impactOccurred('light')
        break
      case 'medium':
        this.tg.HapticFeedback.impactOccurred('medium')
        break
      case 'heavy':
        this.tg.HapticFeedback.impactOccurred('heavy')
        break
      case 'success':
        this.tg.HapticFeedback.notificationOccurred('success')
        break
      case 'error':
        this.tg.HapticFeedback.notificationOccurred('error')
        break
      default:
        this.tg.HapticFeedback.impactOccurred('medium')
    }
  }

  // Orqaga qaytish tugmasini sozlash
  setBackButton(callback) {
    if (!this.tg) return
    
    this.tg.BackButton.show()
    this.tg.BackButton.onClick(callback)
  }

  // Orqaga qaytish tugmasini yashirish
  hideBackButton() {
    if (!this.tg) return
    this.tg.BackButton.hide()
  }

  // Web App ni yopish
  close() {
    if (!this.tg) return
    this.tg.close()
  }

  // Telegram tema ranglarini olish
  getThemeParams() {
    return this.tg?.themeParams || {}
  }

  // Popup ko'rsatish
  showPopup(title, message, buttons = []) {
    if (!this.tg) return
    
    this.tg.showPopup({
      title,
      message,
      buttons
    })
  }

  // Confirm dialog
  showConfirm(message, callback) {
    if (!this.tg) return
    
    this.tg.showConfirm(message, callback)
  }

  // Alert ko'rsatish
  showAlert(message) {
    if (!this.tg) return
    this.tg.showAlert(message)
  }
}

// Telegram Login Widget utilities
export class TelegramLoginWidget {
  constructor() {
    this.clientId = TELEGRAM_CLIENT_ID
    this.clientSecret = TELEGRAM_CLIENT_SECRET
  }

  // Generate Telegram Login URL
  generateLoginUrl(redirectUrl) {
    const params = new URLSearchParams({
      bot_id: this.clientId,
      origin: window.location.origin,
      return_to: redirectUrl || window.location.href,
      request_access: 'write'
    })
    
    return `https://oauth.telegram.org/auth?${params.toString()}`
  }

  // Verify Telegram login data
  verifyLoginData(authData) {
    try {
      // Basic validation
      if (!authData.id || !authData.first_name || !authData.auth_date) {
        return { valid: false, error: 'Noto\'g\'ri ma\'lumotlar' }
      }

      // Check if auth is not too old (24 hours)
      const authDate = parseInt(authData.auth_date)
      const now = Math.floor(Date.now() / 1000)
      const maxAge = 24 * 60 * 60 // 24 hours

      if (now - authDate > maxAge) {
        return { valid: false, error: 'Autentifikatsiya muddati tugagan' }
      }

      return { 
        valid: true, 
        user: {
          id: authData.id,
          first_name: authData.first_name,
          last_name: authData.last_name || '',
          username: authData.username || '',
          photo_url: authData.photo_url || '',
          auth_date: authData.auth_date
        }
      }
    } catch (error) {
      return { valid: false, error: 'Ma\'lumotlarni tekshirishda xatolik' }
    }
  }

  // Create login button HTML
  createLoginButton(options = {}) {
    const {
      size = 'large',
      corner_radius = 10,
      request_access = 'write',
      lang = 'uz'
    } = options

    return `
      <script async src="https://telegram.org/js/telegram-widget.js?22" 
              data-telegram-login="${this.clientId}" 
              data-size="${size}" 
              data-corner-radius="${corner_radius}" 
              data-request-access="${request_access}" 
              data-userpic="true" 
              data-lang="${lang}"
              data-onauth="onTelegramAuth(user)">
      </script>
    `
  }

  // Handle successful login
  handleSuccessfulLogin(userData) {
    // Save user data to localStorage
    localStorage.setItem('telegram_user', JSON.stringify(userData))
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('telegramLogin', { 
      detail: userData 
    }))

    return userData
  }

  // Get current logged in user
  getCurrentUser() {
    try {
      const userData = localStorage.getItem('telegram_user')
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      return null
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem('telegram_user')
    window.dispatchEvent(new CustomEvent('telegramLogout'))
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getCurrentUser()
  }
}

// Global instances
export const telegramBot = new TelegramBotService()
export const telegramApp = new TelegramWebApp()
export const telegramLogin = new TelegramLoginWidget()