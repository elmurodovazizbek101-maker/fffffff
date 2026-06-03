// Backup System - Ma'lumotlarni avtomatik zaxiralash
// LocalStorage ma'lumotlarini export/import qilish

/**
 * Barcha ma'lumotlarni backup qilish
 */
export const createBackup = () => {
  try {
    const backup = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      data: {
        products: JSON.parse(localStorage.getItem('alisher_mobile_products') || '[]'),
        categories: JSON.parse(localStorage.getItem('alisher_mobile_categories') || '[]'),
        customers: JSON.parse(localStorage.getItem('alisher_mobile_customers') || '[]'),
        employees: JSON.parse(localStorage.getItem('alisher_mobile_employees') || '[]'),
        suppliers: JSON.parse(localStorage.getItem('alisher_mobile_suppliers') || '[]'),
        debts: JSON.parse(localStorage.getItem('alisher_mobile_debts') || '[]'),
        expenses: JSON.parse(localStorage.getItem('alisher_mobile_expenses') || '[]'),
        promotions: JSON.parse(localStorage.getItem('alisher_mobile_promotions') || '[]'),
        sales: JSON.parse(localStorage.getItem('alisher_mobile_sales') || '[]'),
        settings: JSON.parse(localStorage.getItem('alisher_mobile_settings') || '{}'),
        customerTransactions: JSON.parse(localStorage.getItem('alisher_mobile_customer_transactions') || '[]'),
        salaryPayments: JSON.parse(localStorage.getItem('alisher_mobile_salary_payments') || '[]')
      }
    }

    return backup
  } catch (error) {
    console.error('Backup yaratishda xatolik:', error)
    throw new Error('Backup yaratishda xatolik yuz berdi')
  }
}

/**
 * Backupni JSON fayl sifatida yuklab olish
 */
export const downloadBackup = () => {
  try {
    const backup = createBackup()
    const dataStr = JSON.stringify(backup, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `alisher-mobile-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    return true
  } catch (error) {
    console.error('Backup yuklab olishda xatolik:', error)
    return false
  }
}

/**
 * Backupni tiklash
 */
export const restoreBackup = (backupData) => {
  try {
    if (!backupData || !backupData.data) {
      throw new Error('Noto\'g\'ri backup formati')
    }

    const { data } = backupData
    
    // Ma'lumotlarni LocalStorage ga qaytarish
    if (data.products) localStorage.setItem('alisher_mobile_products', JSON.stringify(data.products))
    if (data.categories) localStorage.setItem('alisher_mobile_categories', JSON.stringify(data.categories))
    if (data.customers) localStorage.setItem('alisher_mobile_customers', JSON.stringify(data.customers))
    if (data.employees) localStorage.setItem('alisher_mobile_employees', JSON.stringify(data.employees))
    if (data.suppliers) localStorage.setItem('alisher_mobile_suppliers', JSON.stringify(data.suppliers))
    if (data.debts) localStorage.setItem('alisher_mobile_debts', JSON.stringify(data.debts))
    if (data.expenses) localStorage.setItem('alisher_mobile_expenses', JSON.stringify(data.expenses))
    if (data.promotions) localStorage.setItem('alisher_mobile_promotions', JSON.stringify(data.promotions))
    if (data.sales) localStorage.setItem('alisher_mobile_sales', JSON.stringify(data.sales))
    if (data.settings) localStorage.setItem('alisher_mobile_settings', JSON.stringify(data.settings))
    if (data.customerTransactions) localStorage.setItem('alisher_mobile_customer_transactions', JSON.stringify(data.customerTransactions))
    if (data.salaryPayments) localStorage.setItem('alisher_mobile_salary_payments', JSON.stringify(data.salaryPayments))

    return true
  } catch (error) {
    console.error('Backup tiklashda xatolik:', error)
    throw new Error('Backup tiklashda xatolik yuz berdi')
  }
}

/**
 * Fayldan backupni o'qish
 */
export const readBackupFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Fayl tanlanmagan'))
      return
    }

    if (file.type !== 'application/json') {
      reject(new Error('Faqat JSON fayllar qabul qilinadi'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target.result)
        resolve(backupData)
      } catch (error) {
        reject(new Error('Noto\'g\'ri JSON format'))
      }
    }
    reader.onerror = () => reject(new Error('Faylni o\'qishda xatolik'))
    reader.readAsText(file)
  })
}

/**
 * Avtomatik backup (har kuni)
 */
export const setupAutoBackup = () => {
  const lastBackup = localStorage.getItem('alisher_mobile_last_backup')
  const now = new Date()
  const today = now.toDateString()

  if (lastBackup !== today) {
    try {
      const backup = createBackup()
      localStorage.setItem('alisher_mobile_auto_backup', JSON.stringify(backup))
      localStorage.setItem('alisher_mobile_last_backup', today)
      console.log('Avtomatik backup yaratildi:', today)
    } catch (error) {
      console.error('Avtomatik backup xatoligi:', error)
    }
  }
}

/**
 * Ma'lumotlarni tozalash (reset)
 */
export const resetAllData = () => {
  if (confirm('Barcha ma\'lumotlar o\'chirib tashlanadi. Davom etasizmi?')) {
    const keysToKeep = ['alisher_mobile_settings', 'alisher_mobile_language']
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('alisher_mobile_') && !keysToKeep.includes(key)) {
        localStorage.removeItem(key)
      }
    })
    
    // Sahifani qayta yuklash
    window.location.reload()
    return true
  }
  return false
}

/**
 * Backup statistics
 */
export const getBackupStats = () => {
  try {
    const backup = createBackup()
    const stats = {
      totalItems: 0,
      lastBackup: localStorage.getItem('alisher_mobile_last_backup'),
      dataSize: JSON.stringify(backup).length,
      categories: Object.keys(backup.data).map(key => ({
        name: key,
        count: Array.isArray(backup.data[key]) ? backup.data[key].length : 1
      }))
    }

    stats.totalItems = stats.categories.reduce((sum, cat) => sum + cat.count, 0)
    return stats
  } catch (error) {
    console.error('Backup statistika xatoligi:', error)
    return null
  }
}

// App yuklanganida avtomatik backup
if (typeof window !== 'undefined') {
  // Sahifa yuklanganida avtomatik backup
  window.addEventListener('load', setupAutoBackup)
  
  // Sahifa yopilayotganda backup
  window.addEventListener('beforeunload', () => {
    try {
      const backup = createBackup()
      localStorage.setItem('alisher_mobile_session_backup', JSON.stringify(backup))
    } catch (error) {
      console.error('Session backup xatoligi:', error)
    }
  })
}