import { telegramBot } from './telegram.js'

// Order processing service
export class OrderService {
  static async createOrder(orderData) {
    try {
      // Generate order ID
      const orderId = this.generateOrderId()

      // Prepare order data
      const orderRecord = {
        orderId,
        customer: orderData.customer,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        deliveryInfo: orderData.deliveryInfo,
        paymentMethod: orderData.paymentMethod,
        orderDate: new Date().toISOString(),
        isNewCustomer: orderData.isNewCustomer || false,
        status: 'pending'
      }

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('alisher_mobile_orders') || '[]')
      existingOrders.push(orderRecord)
      localStorage.setItem('alisher_mobile_orders', JSON.stringify(existingOrders))

      // Send to Telegram bot
      try {
        const telegramResult = await telegramBot.sendOrderNotification(orderRecord)
        if (telegramResult.success) {
          console.log('✅ Buyurtma Telegram botga muvaffaqiyatli yuborildi')
        } else {
          console.warn('⚠️ Telegram xabari yuborilmadi:', telegramResult.error)
          // Xatolikni foydalanuvchiga ko'rsatmaslik, chunki buyurtma saqlandi
        }
      } catch (telegramError) {
        console.warn('⚠️ Telegram xabari yuborilmadi:', telegramError.message)
        // Xatolikni yashirish, chunki buyurtma muvaffaqiyatli saqlandi
      }

      return { success: true, orderId, message: 'Buyurtma muvaffaqiyatli qabul qilindi!' }
    } catch (error) {
      console.error('Order processing error:', error)
      return { success: false, error: 'Buyurtmani yuborishda xatolik yuz berdi' }
    }
  }

  static async registerCustomer(customerData) {
    try {
      const registrationData = {
        ...customerData,
        id: this.generateCustomerId(),
        registrationDate: new Date().toISOString()
      }

      // Save to localStorage
      const existingCustomers = JSON.parse(localStorage.getItem('alisher_mobile_customers') || '[]')
      existingCustomers.push(registrationData)
      localStorage.setItem('alisher_mobile_customers', JSON.stringify(existingCustomers))

      // Send to Telegram bot
      try {
        const telegramResult = await telegramBot.sendCustomerNotification(registrationData)
        if (telegramResult.success) {
          console.log('✅ Mijoz ro\'yxatdan o\'tishi Telegram botga yuborildi')
        } else {
          console.warn('⚠️ Telegram xabari yuborilmadi:', telegramResult.error)
          // Xatolikni foydalanuvchiga ko'rsatmaslik, chunki mijoz saqlandi
        }
      } catch (telegramError) {
        console.warn('⚠️ Telegram xabari yuborilmadi:', telegramError.message)
        // Xatolikni yashirish, chunki mijoz muvaffaqiyatli saqlandi
      }

      return { success: true, customerId: registrationData.id, customer: registrationData }
    } catch (error) {
      console.error('Customer registration error:', error)
      return { success: false, error: 'Ro\'yxatdan o\'tishda xatolik yuz berdi' }
    }
  }

  static generateOrderId() {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `ORD${timestamp}${random}`
  }

  static generateCustomerId() {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `CUST${timestamp}${random}`
  }

  static getPaymentMethods() {
    return [
      { id: 'cash', name: 'Naqd pul', icon: 'Banknote' },
      { id: 'card', name: 'Bank kartasi', icon: 'CreditCard' },
      { id: 'click', name: 'Click', icon: 'Smartphone' },
      { id: 'payme', name: 'Payme', icon: 'Smartphone' },
      { id: 'installment', name: 'Muddatli to\'lov', icon: 'Calendar' }
    ]
  }

  // Get all orders from localStorage
  static getOrders() {
    return JSON.parse(localStorage.getItem('alisher_mobile_orders') || '[]')
  }

  // Get all customers from localStorage
  static getCustomers() {
    return JSON.parse(localStorage.getItem('alisher_mobile_customers') || '[]')
  }

  // Test Telegram bot connection
  static async testTelegramBot() {
    try {
      const botInfo = await telegramBot.getBotInfo()
      console.log('Bot info:', botInfo)
      
      // Send test message
      const testResult = await telegramBot.sendMessageToAdmin('🤖 Test message from your website!')
      return testResult
    } catch (error) {
      console.error('Telegram bot test failed:', error)
      return { success: false, error: error.message }
    }
  }
}
