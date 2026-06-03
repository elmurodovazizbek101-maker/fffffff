// Backup Service - Ma'lumotlarni avtomatik zaxiralash
class BackupService {
  constructor() {
    this.backupPrefix = 'alisher_mobile_backup_'
    this.maxBackups = 10 // Maksimal 10 ta backup saqlash
    this.autoBackupInterval = 24 * 60 * 60 * 1000 // 24 soat
  }

  // Barcha ma'lumotlarni backup qilish
  createBackup(manualBackup = false) {
    try {
      const timestamp = new Date().toISOString()
      const backupData = {
        timestamp,
        version: '1.0.0',
        type: manualBackup ? 'manual' : 'auto',
        data: {
          products: this.getLocalStorageData('alisher_mobile_products'),
          categories: this.getLocalStorageData('alisher_mobile_categories'),
          customers: this.getLocalStorageData('alisher_mobile_customers'),
          employees: this.getLocalStorageData('alisher_mobile_employees'),
          suppliers: this.getLocalStorageData('alisher_mobile_suppliers'),
          debts: this.getLocalStorageData('alisher_mobile_debts'),
          expenses: this.getLocalStorageData('alisher_mobile_expenses'),
          promotions: this.getLocalStorageData('alisher_mobile_promotions'),
          settings: this.getLocalStorageData('alisher_mobile_settings'),
          sales: this.getLocalStorageData('alisher_mobile_sales'),
          cart: this.getLocalStorageData('alisher_mobile_cart'),
          wishlist: this.getLocalStorageData('alisher_mobile_wishlist')
        }
      }

      const backupKey = `${this.backupPrefix}${Date.now()}`
      localStorage.setItem(backupKey, JSON.stringify(backupData))

      // Eski backup'larni tozalash
      this.cleanOldBackups()

      console.log(`✅ Backup yaratildi: ${timestamp}`)
      return { success: true, backupKey, timestamp }
    } catch (error) {
      console.error('❌ Backup yaratishda xatolik:', error)
      return { success: false, error: error.message }
    }
  }

  // LocalStorage'dan ma'lumot olish
  getLocalStorageData(key) {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.warn(`Ma'lumot olinmadi: ${key}`, error)
      return null
    }
  }

  // Backup'larni ro'yxatini olish
  getBackupList() {
    const backups = []
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(this.backupPrefix)) {
        try {
          const backupData = JSON.parse(localStorage.getItem(key))
          backups.push({
            key,
            timestamp: backupData.timestamp,
            type: backupData.type,
            version: backupData.version,
            size: this.calculateBackupSize(backupData)
          })
        } catch (error) {
          console.warn(`Backup o'qilmadi: ${key}`, error)
        }
      }
    }

    return backups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  // Backup hajmini hisoblash
  calculateBackupSize(backupData) {
    const sizeInBytes = new Blob([JSON.stringify(backupData)]).size
    const sizeInKB = (sizeInBytes / 1024).toFixed(2)
    return `${sizeInKB} KB`
  }

  // Backup'dan ma'lumotlarni tiklash
  restoreFromBackup(backupKey) {
    try {
      const backupData = localStorage.getItem(backupKey)
      if (!backupData) {
        throw new Error('Backup topilmadi')
      }

      const backup = JSON.parse(backupData)
      
      // Joriy ma'lumotlarni backup qilish (tiklashdan oldin)
      this.createBackup(true) // Manual backup

      // Ma'lumotlarni tiklash
      Object.entries(backup.data).forEach(([key, value]) => {
        if (value !== null) {
          const storageKey = `alisher_mobile_${key}`
          localStorage.setItem(storageKey, JSON.stringify(value))
        }
      })

      console.log(`✅ Ma'lumotlar tiklandi: ${backup.timestamp}`)
      return { success: true, timestamp: backup.timestamp }
    } catch (error) {
      console.error('❌ Ma'lumotlar tiklanmadi:', error)
      return { success: false, error: error.message }
    }
  }

  // Backup'ni o'chirish
  deleteBackup(backupKey) {
    try {
      localStorage.removeItem(backupKey)
      console.log(`🗑️ Backup o'chirildi: ${backupKey}`)
      return { success: true }
    } catch (error) {
      console.error('❌ Backup o\'chirilmadi:', error)
      return { success: false, error: error.message }
    }
  }

  // Eski backup'larni tozalash
  cleanOldBackups() {
    const backups = this.getBackupList()
    
    if (backups.length > this.maxBackups) {
      const backupsToDelete = backups.slice(this.maxBackups)
      
      backupsToDelete.forEach(backup => {
        this.deleteBackup(backup.key)
      })
      
      console.log(`🧹 ${backupsToDelete.length} ta eski backup o'chirildi`)
    }
  }

  // Avtomatik backup'ni yoqish
  startAutoBackup() {
    // Avval mavjud interval'ni tozalash
    if (this.autoBackupTimer) {
      clearInterval(this.autoBackupTimer)
    }

    // Yangi interval o'rnatish
    this.autoBackupTimer = setInterval(() => {
      this.createBackup(false) // Auto backup
    }, this.autoBackupInterval)

    // Darhol bitta backup yaratish
    this.createBackup(false)

    console.log('🔄 Avtomatik backup yoqildi (har 24 soatda)')
  }

  // Avtomatik backup'ni o'chirish
  stopAutoBackup() {
    if (this.autoBackupTimer) {
      clearInterval(this.autoBackupTimer)
      this.autoBackupTimer = null
      console.log('⏸️ Avtomatik backup o\'chirildi')
    }
  }

  // Ma'lumotlarni JSON faylga eksport qilish
  exportToFile() {
    try {
      const allData = {
        exportDate: new Date().toISOString(),
        version: '1.0.0',
        appName: 'Alisher Mobile',
        data: {
          products: this.getLocalStorageData('alisher_mobile_products'),
          categories: this.getLocalStorageData('alisher_mobile_categories'),
          customers: this.getLocalStorageData('alisher_mobile_customers'),
          employees: this.getLocalStorageData('alisher_mobile_employees'),
          suppliers: this.getLocalStorageData('alisher_mobile_suppliers'),
          debts: this.getLocalStorageData('alisher_mobile_debts'),
          expenses: this.getLocalStorageData('alisher_mobile_expenses'),
          promotions: this.getLocalStorageData('alisher_mobile_promotions'),
          settings: this.getLocalStorageData('alisher_mobile_settings')
        }
      }

      const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `alisher_mobile_backup_${new Date().toISOString().split('T')[0]}.json`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
      
      console.log('📥 Ma\'lumotlar faylga eksport qilindi')
      return { success: true }
    } catch (error) {
      console.error('❌ Eksport xatolik:', error)
      return { success: false, error: error.message }
    }
  }

  // Fayldan ma'lumotlarni import qilish
  importFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target.result)
          
          // Joriy ma'lumotlarni backup qilish
          this.createBackup(true)
          
          // Yangi ma'lumotlarni o'rnatish
          Object.entries(importData.data).forEach(([key, value]) => {
            if (value !== null) {
              const storageKey = `alisher_mobile_${key}`
              localStorage.setItem(storageKey, JSON.stringify(value))
            }
          })
          
          console.log('📤 Ma\'lumotlar fayldan import qilindi')
          resolve({ success: true, date: importData.exportDate })
        } catch (error) {
          console.error('❌ Import xatolik:', error)
          reject({ success: false, error: error.message })
        }
      }
      
      reader.onerror = () => {
        reject({ success: false, error: 'Fayl o\'qilmadi' })
      }
      
      reader.readAsText(file)
    })
  }

  // Storage hajmini hisoblash
  getStorageInfo() {
    let totalSize = 0
    let itemCount = 0
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('alisher_mobile_')) {
        const value = localStorage.getItem(key)
        totalSize += new Blob([value]).size
        itemCount++
      }
    }
    
    return {
      totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
      itemCount,
      availableSpace: this.getAvailableStorage()
    }
  }

  // Mavjud storage hajmini tekshirish
  getAvailableStorage() {
    try {
      const testKey = 'test_storage_size'
      let size = 0
      let testData = ''
      
      // Test ma'lumoti bilan storage limitini aniqlash
      while (true) {
        try {
          testData += '0'.repeat(1024) // 1KB qo'shish
          localStorage.setItem(testKey, testData)
          size += 1024
        } catch (e) {
          localStorage.removeItem(testKey)
          return `~${(size / 1024 / 1024).toFixed(2)} MB`
        }
      }
    } catch (error) {
      return 'Noma\'lum'
    }
  }
}

// Singleton instance
const backupService = new BackupService()

export default backupService