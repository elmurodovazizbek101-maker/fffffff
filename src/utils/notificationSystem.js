// Notification System - Real-time bildirishnomalar
// Stock, sales, orders va boshqa muhim hodisalar uchun
import { useState, useEffect } from 'react'

/**
 * Notification types
 */
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  STOCK_ALERT: 'stock_alert',
  NEW_ORDER: 'new_order',
  PAYMENT_RECEIVED: 'payment_received'
}

/**
 * Notification manager class
 */
class NotificationManager {
  constructor() {
    this.notifications = []
    this.subscribers = new Set()
    this.nextId = 1
    
    // Stock monitoring settings
    this.stockThresholds = {
      critical: 5,
      low: 10,
      medium: 20
    }
    
    this.setupStorageListener()
  }

  /**
   * Subscribe to notifications
   */
  subscribe(callback) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  /**
   * Notify all subscribers
   */
  notifySubscribers() {
    this.subscribers.forEach(callback => {
      try {
        callback(this.notifications)
      } catch (error) {
        console.error('Notification subscriber error:', error)
      }
    })
  }

  /**
   * Add new notification
   */
  add(notification) {
    const fullNotification = {
      id: this.nextId++,
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'normal',
      ...notification
    }

    this.notifications.unshift(fullNotification)
    
    // Keep only last 100 notifications
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100)
    }

    this.saveToStorage()
    this.notifySubscribers()

    // Show browser notification if permission granted
    if (notification.showBrowser !== false) {
      this.showBrowserNotification(fullNotification)
    }

    return fullNotification.id
  }

  /**
   * Remove notification
   */
  remove(id) {
    this.notifications = this.notifications.filter(n => n.id !== id)
    this.saveToStorage()
    this.notifySubscribers()
  }

  /**
   * Mark as read
   */
  markAsRead(id) {
    const notification = this.notifications.find(n => n.id === id)
    if (notification) {
      notification.read = true
      this.saveToStorage()
      this.notifySubscribers()
    }
  }

  /**
   * Mark all as read
   */
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true)
    this.saveToStorage()
    this.notifySubscribers()
  }

  /**
   * Get unread count
   */
  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length
  }

  /**
   * Clear all notifications
   */
  clear() {
    this.notifications = []
    this.saveToStorage()
    this.notifySubscribers()
  }

  /**
   * Get all notifications
   */
  getAll() {
    return [...this.notifications]
  }

  /**
   * Get notifications by type
   */
  getByType(type) {
    return this.notifications.filter(n => n.type === type)
  }

  /**
   * Save to localStorage
   */
  saveToStorage() {
    try {
      localStorage.setItem('alisher_mobile_notifications', JSON.stringify(this.notifications))
    } catch (error) {
      console.error('Failed to save notifications:', error)
    }
  }

  /**
   * Load from localStorage
   */
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('alisher_mobile_notifications')
      if (stored) {
        this.notifications = JSON.parse(stored)
        this.nextId = Math.max(...this.notifications.map(n => n.id), 0) + 1
      }
    } catch (error) {
      console.error('Failed to load notifications:', error)
      this.notifications = []
    }
  }

  /**
   * Setup localStorage change listener
   */
  setupStorageListener() {
    this.loadFromStorage()
    
    window.addEventListener('storage', (e) => {
      if (e.key === 'alisher_mobile_notifications') {
        this.loadFromStorage()
        this.notifySubscribers()
      }
    })
  }

  /**
   * Show browser notification
   */
  async showBrowserNotification(notification) {
    if (!('Notification' in window)) return

    let permission = Notification.permission
    
    if (permission === 'default') {
      permission = await Notification.requestPermission()
    }

    if (permission === 'granted') {
      const browserNotification = new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.type,
        requireInteraction: notification.priority === 'high'
      })

      browserNotification.onclick = () => {
        window.focus()
        this.markAsRead(notification.id)
        browserNotification.close()
      }

      // Auto close after 5 seconds
      setTimeout(() => browserNotification.close(), 5000)
    }
  }

  /**
   * Stock monitoring
   */
  checkStockLevels(products) {
    products.forEach(product => {
      const stock = product.stock || 0
      let alertLevel = null

      if (stock <= this.stockThresholds.critical) {
        alertLevel = 'critical'
      } else if (stock <= this.stockThresholds.low) {
        alertLevel = 'low'
      } else if (stock <= this.stockThresholds.medium) {
        alertLevel = 'medium'
      }

      if (alertLevel) {
        // Check if we already sent this alert recently
        const recentAlert = this.notifications.find(n => 
          n.type === NOTIFICATION_TYPES.STOCK_ALERT &&
          n.productId === product.id &&
          n.alertLevel === alertLevel &&
          (Date.now() - new Date(n.timestamp).getTime()) < 3600000 // 1 hour
        )

        if (!recentAlert) {
          this.add({
            type: NOTIFICATION_TYPES.STOCK_ALERT,
            title: 'Mahsulot tugab bormoqda!',
            message: `${product.name} - ${stock} ta qoldi`,
            productId: product.id,
            alertLevel: alertLevel,
            priority: alertLevel === 'critical' ? 'high' : 'normal',
            icon: '📦',
            actions: [
              {
                label: 'Mahsulotni ko\'rish',
                action: () => window.location.href = `#/admin/products?id=${product.id}`
              }
            ]
          })
        }
      }
    })
  }

  /**
   * New order notification
   */
  notifyNewOrder(order) {
    this.add({
      type: NOTIFICATION_TYPES.NEW_ORDER,
      title: 'Yangi buyurtma!',
      message: `${order.customerName} - ${order.total?.toLocaleString()} so'm`,
      orderId: order.id,
      priority: 'high',
      icon: '🛒',
      actions: [
        {
          label: 'Buyurtmani ko\'rish',
          action: () => console.log('Open order:', order.id)
        }
      ]
    })
  }

  /**
   * Payment received notification
   */
  notifyPaymentReceived(payment) {
    this.add({
      type: NOTIFICATION_TYPES.PAYMENT_RECEIVED,
      title: 'To\'lov qabul qilindi!',
      message: `${payment.customerName} - ${payment.amount?.toLocaleString()} so'm`,
      paymentId: payment.id,
      priority: 'normal',
      icon: '💰'
    })
  }

  /**
   * System notification shortcuts
   */
  success(title, message, options = {}) {
    return this.add({
      type: NOTIFICATION_TYPES.SUCCESS,
      title,
      message,
      icon: '✅',
      ...options
    })
  }

  error(title, message, options = {}) {
    return this.add({
      type: NOTIFICATION_TYPES.ERROR,
      title,
      message,
      icon: '❌',
      priority: 'high',
      ...options
    })
  }

  warning(title, message, options = {}) {
    return this.add({
      type: NOTIFICATION_TYPES.WARNING,
      title,
      message,
      icon: '⚠️',
      ...options
    })
  }

  info(title, message, options = {}) {
    return this.add({
      type: NOTIFICATION_TYPES.INFO,
      title,
      message,
      icon: 'ℹ️',
      ...options
    })
  }
}

// Global instance
export const notificationManager = new NotificationManager()

// React hook for notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    setNotifications(notificationManager.getAll())
    
    const unsubscribe = notificationManager.subscribe(setNotifications)
    return unsubscribe
  }, [])

  return {
    notifications,
    unreadCount: notificationManager.getUnreadCount(),
    add: notificationManager.add.bind(notificationManager),
    remove: notificationManager.remove.bind(notificationManager),
    markAsRead: notificationManager.markAsRead.bind(notificationManager),
    markAllAsRead: notificationManager.markAllAsRead.bind(notificationManager),
    clear: notificationManager.clear.bind(notificationManager),
    success: notificationManager.success.bind(notificationManager),
    error: notificationManager.error.bind(notificationManager),
    warning: notificationManager.warning.bind(notificationManager),
    info: notificationManager.info.bind(notificationManager)
  }
}

// Automatic stock monitoring setup
if (typeof window !== 'undefined') {
  // Check stock levels periodically
  setInterval(() => {
    try {
      const products = JSON.parse(localStorage.getItem('alisher_mobile_products') || '[]')
      notificationManager.checkStockLevels(products)
    } catch (error) {
      console.error('Stock monitoring error:', error)
    }
  }, 300000) // Check every 5 minutes
}

export default notificationManager