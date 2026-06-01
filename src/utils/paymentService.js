// To'lov xizmatlari - Click, Payme, Uzcard, Humo
class PaymentService {
  constructor() {
    this.supportedMethods = {
      click: {
        name: 'Click',
        logo: '💳',
        description: 'Click orqali to\'lov',
        fee: 0.5, // 0.5% komissiya
        minAmount: 1000,
        maxAmount: 50000000,
        processingTime: '1-3 daqiqa'
      },
      payme: {
        name: 'Payme',
        logo: '💰',
        description: 'Payme orqali to\'lov',
        fee: 0.5,
        minAmount: 1000,
        maxAmount: 50000000,
        processingTime: '1-3 daqiqa'
      },
      uzcard: {
        name: 'Uzcard',
        logo: '🏦',
        description: 'Uzcard orqali to\'lov',
        fee: 0.3,
        minAmount: 1000,
        maxAmount: 100000000,
        processingTime: '1-5 daqiqa'
      },
      humo: {
        name: 'Humo',
        logo: '🔷',
        description: 'Humo orqali to\'lov',
        fee: 0.3,
        minAmount: 1000,
        maxAmount: 100000000,
        processingTime: '1-5 daqiqa'
      },
      installment: {
        name: 'Muddatli to\'lov',
        logo: '📅',
        description: '3, 6, 12, 24 oyga bo\'lib to\'lash',
        fee: 2.5, // 2.5% oylik foiz
        minAmount: 1000000,
        maxAmount: 50000000,
        processingTime: 'Darhol'
      },
      cash: {
        name: 'Naqd to\'lov',
        logo: '💵',
        description: 'Yetkazib berish vaqtida naqd to\'lov',
        fee: 0,
        minAmount: 0,
        maxAmount: Infinity,
        processingTime: 'Yetkazib berish vaqtida'
      }
    }
  }

  // Mavjud to'lov usullarini olish
  getPaymentMethods() {
    return Object.entries(this.supportedMethods).map(([key, method]) => ({
      id: key,
      ...method
    }))
  }

  // To'lov usulini tekshirish
  validatePaymentMethod(methodId, amount) {
    const method = this.supportedMethods[methodId]
    if (!method) {
      return { valid: false, error: 'Noto\'g\'ri to\'lov usuli' }
    }

    if (amount < method.minAmount) {
      return { 
        valid: false, 
        error: `Minimal to\'lov miqdori: ${this.formatPrice(method.minAmount)}` 
      }
    }

    if (amount > method.maxAmount) {
      return { 
        valid: false, 
        error: `Maksimal to\'lov miqdori: ${this.formatPrice(method.maxAmount)}` 
      }
    }

    return { valid: true }
  }

  // Komissiya hisoblash
  calculateFee(methodId, amount) {
    const method = this.supportedMethods[methodId]
    if (!method) return 0

    return Math.round(amount * method.fee / 100)
  }

  // Umumiy summa hisoblash (komissiya bilan)
  calculateTotal(methodId, amount) {
    const fee = this.calculateFee(methodId, amount)
    return amount + fee
  }

  // Muddatli to'lov hisoblash
  calculateInstallment(amount, months) {
    const method = this.supportedMethods.installment
    const monthlyRate = method.fee / 100
    const monthlyPayment = Math.round(amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1))
    const totalAmount = monthlyPayment * months
    const totalInterest = totalAmount - amount

    return {
      monthlyPayment,
      totalAmount,
      totalInterest,
      months
    }
  }

  // To'lov jarayonini boshlash
  async initiatePayment(paymentData) {
    const { methodId, amount, orderId, customerInfo } = paymentData
    
    // To'lov usulini tekshirish
    const validation = this.validatePaymentMethod(methodId, amount)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    const method = this.supportedMethods[methodId]
    const fee = this.calculateFee(methodId, amount)
    const total = this.calculateTotal(methodId, amount)

    // To'lov ma'lumotlarini yaratish
    const payment = {
      id: `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      orderId,
      methodId,
      methodName: method.name,
      amount,
      fee,
      total,
      status: 'pending',
      customerInfo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    try {
      // To'lov usuli bo'yicha ishlov berish
      switch (methodId) {
        case 'click':
          return await this.processClickPayment(payment)
        case 'payme':
          return await this.processPaymePayment(payment)
        case 'uzcard':
          return await this.processUzcardPayment(payment)
        case 'humo':
          return await this.processHumoPayment(payment)
        case 'installment':
          return await this.processInstallmentPayment(payment)
        case 'cash':
          return await this.processCashPayment(payment)
        default:
          throw new Error('Qo\'llab-quvvatlanmaydigan to\'lov usuli')
      }
    } catch (error) {
      payment.status = 'failed'
      payment.error = error.message
      payment.updatedAt = new Date().toISOString()
      
      // Xatolikni saqlash
      this.savePaymentToStorage(payment)
      throw error
    }
  }

  // Click to'lov
  async processClickPayment(payment) {
    // Demo rejim - haqiqiy integratsiya uchun Click API ishlatiladi
    return new Promise((resolve) => {
      setTimeout(() => {
        payment.status = 'completed'
        payment.transactionId = `click_${Date.now()}`
        payment.completedAt = new Date().toISOString()
        payment.updatedAt = new Date().toISOString()
        
        this.savePaymentToStorage(payment)
        resolve(payment)
      }, 2000)
    })
  }

  // Payme to'lov
  async processPaymePayment(payment) {
    // Demo rejim - haqiqiy integratsiya uchun Payme API ishlatiladi
    return new Promise((resolve) => {
      setTimeout(() => {
        payment.status = 'completed'
        payment.transactionId = `payme_${Date.now()}`
        payment.completedAt = new Date().toISOString()
        payment.updatedAt = new Date().toISOString()
        
        this.savePaymentToStorage(payment)
        resolve(payment)
      }, 2500)
    })
  }

  // Uzcard to'lov
  async processUzcardPayment(payment) {
    // Demo rejim - haqiqiy integratsiya uchun Uzcard API ishlatiladi
    return new Promise((resolve) => {
      setTimeout(() => {
        payment.status = 'completed'
        payment.transactionId = `uzcard_${Date.now()}`
        payment.completedAt = new Date().toISOString()
        payment.updatedAt = new Date().toISOString()
        
        this.savePaymentToStorage(payment)
        resolve(payment)
      }, 3000)
    })
  }

  // Humo to'lov
  async processHumoPayment(payment) {
    // Demo rejim - haqiqiy integratsiya uchun Humo API ishlatiladi
    return new Promise((resolve) => {
      setTimeout(() => {
        payment.status = 'completed'
        payment.transactionId = `humo_${Date.now()}`
        payment.completedAt = new Date().toISOString()
        payment.updatedAt = new Date().toISOString()
        
        this.savePaymentToStorage(payment)
        resolve(payment)
      }, 2800)
    })
  }

  // Muddatli to'lov
  async processInstallmentPayment(payment) {
    // Demo rejim - haqiqiy integratsiya uchun bank API ishlatiladi
    return new Promise((resolve) => {
      setTimeout(() => {
        payment.status = 'approved'
        payment.transactionId = `installment_${Date.now()}`
        payment.approvedAt = new Date().toISOString()
        payment.updatedAt = new Date().toISOString()
        
        this.savePaymentToStorage(payment)
        resolve(payment)
      }, 1500)
    })
  }

  // Naqd to'lov
  async processCashPayment(payment) {
    payment.status = 'pending_delivery'
    payment.updatedAt = new Date().toISOString()
    
    this.savePaymentToStorage(payment)
    return payment
  }

  // To'lov holatini tekshirish
  async checkPaymentStatus(paymentId) {
    const payments = this.getPaymentsFromStorage()
    const payment = payments.find(p => p.id === paymentId)
    
    if (!payment) {
      throw new Error('To\'lov topilmadi')
    }

    return payment
  }

  // To'lov tarixini olish
  getPaymentHistory(orderId = null) {
    const payments = this.getPaymentsFromStorage()
    
    if (orderId) {
      return payments.filter(p => p.orderId === orderId)
    }
    
    return payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  // To'lovni localStorage ga saqlash
  savePaymentToStorage(payment) {
    try {
      const payments = this.getPaymentsFromStorage()
      const existingIndex = payments.findIndex(p => p.id === payment.id)
      
      if (existingIndex >= 0) {
        payments[existingIndex] = payment
      } else {
        payments.unshift(payment)
      }
      
      localStorage.setItem('alisher_mobile_payments', JSON.stringify(payments))
    } catch (error) {
      console.error('To\'lovni saqlash xatoligi:', error)
    }
  }

  // localStorage dan to'lovlarni olish
  getPaymentsFromStorage() {
    try {
      const payments = localStorage.getItem('alisher_mobile_payments')
      return payments ? JSON.parse(payments) : []
    } catch (error) {
      console.error('To\'lovlarni yuklash xatoligi:', error)
      return []
    }
  }

  // Narxni formatlash
  formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m'
  }

  // To'lov holatini o'zgartirish
  async updatePaymentStatus(paymentId, status, additionalData = {}) {
    const payments = this.getPaymentsFromStorage()
    const paymentIndex = payments.findIndex(p => p.id === paymentId)
    
    if (paymentIndex === -1) {
      throw new Error('To\'lov topilmadi')
    }

    payments[paymentIndex] = {
      ...payments[paymentIndex],
      status,
      ...additionalData,
      updatedAt: new Date().toISOString()
    }

    localStorage.setItem('alisher_mobile_payments', JSON.stringify(payments))
    return payments[paymentIndex]
  }

  // Statistika olish
  getPaymentStats() {
    const payments = this.getPaymentsFromStorage()
    
    const stats = {
      total: payments.length,
      completed: payments.filter(p => p.status === 'completed').length,
      pending: payments.filter(p => p.status === 'pending').length,
      failed: payments.filter(p => p.status === 'failed').length,
      totalAmount: payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0),
      totalFees: payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.fee, 0)
    }

    // Usul bo'yicha statistika
    stats.byMethod = {}
    payments.forEach(payment => {
      if (!stats.byMethod[payment.methodId]) {
        stats.byMethod[payment.methodId] = {
          count: 0,
          amount: 0,
          name: payment.methodName
        }
      }
      stats.byMethod[payment.methodId].count++
      if (payment.status === 'completed') {
        stats.byMethod[payment.methodId].amount += payment.amount
      }
    })

    return stats
  }
}

// Muddatli to'lov rejalari
export const installmentPlans = [
  {
    id: '3-months',
    name: '3 oylik',
    months: 3,
    interestRate: 0,
    description: 'Foizsiz 3 oyga bo\'lib to\'lash',
    minAmount: 1000000
  },
  {
    id: '6-months',
    name: '6 oylik',
    months: 6,
    interestRate: 5,
    description: '6 oyga bo\'lib to\'lash',
    minAmount: 2000000
  },
  {
    id: '12-months',
    name: '12 oylik',
    months: 12,
    interestRate: 10,
    description: '12 oyga bo\'lib to\'lash',
    minAmount: 3000000
  },
  {
    id: '24-months',
    name: '24 oylik',
    months: 24,
    interestRate: 15,
    description: '24 oyga bo\'lib to\'lash',
    minAmount: 5000000
  }
]

// To'lov usullari
export const paymentMethods = [
  {
    id: 'cash',
    name: 'Naqd to\'lov',
    description: 'Yetkazib berish vaqtida naqd to\'lov',
    color: '#10b981',
    fee: 0,
    available: true,
    processingTime: 'Yetkazib berish vaqtida'
  },
  {
    id: 'click',
    name: 'Click',
    description: 'Click orqali to\'lov',
    color: '#0ea5e9',
    fee: 0.5,
    available: true,
    processingTime: '1-3 daqiqa'
  },
  {
    id: 'payme',
    name: 'Payme',
    description: 'Payme orqali to\'lov',
    color: '#06b6d4',
    fee: 0.5,
    available: true,
    processingTime: '1-3 daqiqa'
  },
  {
    id: 'uzcard',
    name: 'Uzcard',
    description: 'Uzcard orqali to\'lov',
    color: '#3b82f6',
    fee: 0.3,
    available: true,
    processingTime: '1-5 daqiqa'
  },
  {
    id: 'humo',
    name: 'Humo',
    description: 'Humo orqali to\'lov',
    color: '#8b5cf6',
    fee: 0.3,
    available: true,
    processingTime: '1-5 daqiqa'
  },
  {
    id: 'installment',
    name: 'Muddatli to\'lov',
    description: 'Bo\'lib to\'lash',
    color: '#f59e0b',
    fee: 0,
    available: true,
    processingTime: 'Darhol'
  }
]

// Singleton instance
const paymentService = new PaymentService()

// Qo'shimcha metodlar
paymentService.calculateTotalAmount = (baseAmount, methodId) => {
  const method = paymentService.supportedMethods[methodId]
  if (!method) return baseAmount
  
  const fee = Math.round(baseAmount * method.fee / 100)
  return baseAmount + fee
}

paymentService.processPayment = async (orderData, methodId, options = {}) => {
  try {
    const paymentData = {
      methodId,
      amount: orderData.totalAmount,
      orderId: `order_${Date.now()}`,
      customerInfo: orderData.customer
    }

    const result = await paymentService.initiatePayment(paymentData)
    
    return {
      success: true,
      paymentId: result.id,
      message: `${result.methodName} orqali to'lov muvaffaqiyatli boshlandi`,
      redirectUrl: methodId !== 'cash' && methodId !== 'installment' ? `https://payment.example.com/${result.id}` : null
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

export { paymentService }
export default paymentService