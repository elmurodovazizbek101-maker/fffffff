// Telegram Web App utilities
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

// Global instance
export const telegramApp = new TelegramWebApp()