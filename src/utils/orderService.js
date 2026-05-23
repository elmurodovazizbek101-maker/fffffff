// Order processing service
export class OrderService {
  static async createOrder(orderData) {
    try {
      // Generate order ID
      const orderId = this.generateOrderId()

      // Prepare order data for Telegram bot
      const telegramOrderData = {
        orderId,
        customer: orderData.customer,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        deliveryInfo: orderData.deliveryInfo,
        paymentMethod: orderData.paymentMethod,
        orderDate: new Date().toISOString(),
        isNewCustomer: orderData.isNewCustomer || false,
        customerType: orderData.isNewCustomer ? 'new' : 'existing'
      }

      // Send to Telegram bot
      const response = await fetch('http://localhost:3004/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramOrderData)
      })

      if (!response.ok) {
        throw new Error('Failed to process order')
      }

      const result = await response.json()
      return { success: true, orderId, ...result }
    } catch (error) {
      console.error('Order processing error:', error)
      return { success: false, error: error.message }
    }
  }

  static async registerCustomer(customerData) {
    try {
      const registrationData = {
        ...customerData,
        id: this.generateCustomerId(),
        registrationDate: new Date().toISOString()
      }

      // Send to Telegram bot
      const response = await fetch('http://localhost:3004/api/register-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      })

      if (!response.ok) {
        throw new Error('Failed to register customer')
      }

      const result = await response.json()
      return { success: true, customerId: registrationData.id, ...result }
    } catch (error) {
      console.error('Customer registration error:', error)
      return { success: false, error: error.message }
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
}
