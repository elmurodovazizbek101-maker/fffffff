import { useState } from 'react'
import { Store, Phone, MapPin, Globe, Save, Lock, Key, Shield, Eye, EyeOff, RotateCcw, MessageCircle, Send, CheckCircle, AlertCircle, Database, Download, Upload, BarChart3 } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { getAdminCredentials, updateAdminCredentials, resetAdminCredentials } from '../../utils/auth'
import { telegramBot } from '../../utils/telegram'
import { downloadBackup, restoreBackup, readBackupFile, resetAllData, getBackupStats } from '../../utils/backupSystem'

const Settings = () => {
  const { t, language, setLanguage } = useLanguage()
  const [shopInfo, setShopInfo] = useState({
    name: 'Alisher Mobile',
    phone: '+998 90 123 45 67',
    address: 'Toshkent shahar, Chilonzor tumani',
    description: 'Mobil telefonlar va aksessuarlar do\'koni'
  })

  // Telefon raqam formatlash funksiyasi
  const handleShopPhoneChange = (value) => {
    // +998 ni olib tashlash va qayta qo'shish
    let cleanValue = value.replace(/[^\d]/g, '')
    
    // Agar 998 bilan boshlansa, uni olib tashlash
    if (cleanValue.startsWith('998')) {
      cleanValue = cleanValue.substring(3)
    }
    
    // Maksimal 9 ta raqam (998 dan keyin)
    if (cleanValue.length > 9) {
      cleanValue = cleanValue.substring(0, 9)
    }
    
    // Formatlash: +998 XX XXX XX XX
    let formatted = '+998'
    if (cleanValue.length > 0) {
      formatted += ' ' + cleanValue.substring(0, 2)
    }
    if (cleanValue.length > 2) {
      formatted += ' ' + cleanValue.substring(2, 5)
    }
    if (cleanValue.length > 5) {
      formatted += ' ' + cleanValue.substring(5, 7)
    }
    if (cleanValue.length > 7) {
      formatted += ' ' + cleanValue.substring(7, 9)
    }
    
    setShopInfo({...shopInfo, phone: formatted})
  }

  const [showSuccess, setShowSuccess] = useState(false)

  // Admin credentials state
  const [adminCreds, setAdminCreds] = useState(() => getAdminCredentials())
  const [newAdminLogin, setNewAdminLogin] = useState('')
  const [newAdminPassword, setNewAdminPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [adminUpdateMessage, setAdminUpdateMessage] = useState(null)
  
  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Telegram bot testing states
  const [telegramTestResult, setTelegramTestResult] = useState(null)
  const [telegramTesting, setTelegramTesting] = useState(false)
  const [botInfo, setBotInfo] = useState(null)
  const [telegramChatId, setTelegramChatId] = useState(() => {
    return localStorage.getItem('telegram_admin_chat_id') || ''
  })

  // Backup system states
  const [backupStats, setBackupStats] = useState(null)
  const [backupLoading, setBackupLoading] = useState(false)
  const [restoreLoading, setRestoreLoading] = useState(false)
  const [backupMessage, setBackupMessage] = useState(null)

  const languages = [
    { code: 'uz', name: 'O\'zbekcha', flag: 'UZ' },
    { code: 'en', name: 'English', flag: 'EN' },
    { code: 'ru', name: 'Русский', flag: 'RU' }
  ]

  const handleSaveShopInfo = (e) => {
    e.preventDefault()
    // Save shop info logic here
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode)
  }

  const handleUpdateAdminCredentials = (e) => {
    e.preventDefault()

    // Validation
    if (!newAdminLogin || !newAdminPassword) {
      setAdminUpdateMessage({ type: 'error', text: 'Login va parolni to\'ldiring!' })
      return
    }

    if (newAdminPassword !== confirmPassword) {
      setAdminUpdateMessage({ type: 'error', text: 'Parollar mos kelmadi!' })
      return
    }

    const result = updateAdminCredentials(newAdminLogin, newAdminPassword)

    if (result.success) {
      setAdminUpdateMessage({ type: 'success', text: result.message })
      setAdminCreds(getAdminCredentials())
      setNewAdminLogin('')
      setNewAdminPassword('')
      setConfirmPassword('')

      setTimeout(() => {
        setAdminUpdateMessage(null)
      }, 5000)
    } else {
      setAdminUpdateMessage({ type: 'error', text: result.message })
    }
  }

  const handleResetAdminCredentials = () => {
    if (window.confirm('Admin ma\'lumotlarini default qiymatga qaytarishni xohlaysizmi?\n\nLogin: superadmin\nParol: Admin@2024!Secure')) {
      const defaultCreds = resetAdminCredentials()
      setAdminCreds(defaultCreds)
      setNewAdminLogin('')
      setNewAdminPassword('')
      setConfirmPassword('')
      setAdminUpdateMessage({ 
        type: 'success', 
        text: 'Admin ma\'lumotlari default qiymatga qaytarildi! Login: superadmin, Parol: Admin@2024!Secure' 
      })

      setTimeout(() => {
        setAdminUpdateMessage(null)
      }, 8000)
    }
  }

  // Telegram Chat ID saqlash funksiyasi
  const handleSaveTelegramChatId = () => {
    if (!telegramChatId.trim()) {
      setTelegramTestResult({
        type: 'error',
        message: '❌ Chat ID bo\'sh bo\'lishi mumkin emas!'
      })
      return
    }

    // Chat ID formatini tekshirish (faqat raqamlar yoki - bilan boshlangan raqamlar)
    const chatIdRegex = /^-?\d+$/
    if (!chatIdRegex.test(telegramChatId.trim())) {
      setTelegramTestResult({
        type: 'error',
        message: '❌ Chat ID formati noto\'g\'ri! Faqat raqamlar bo\'lishi kerak.'
      })
      return
    }

    // LocalStorage ga saqlash
    localStorage.setItem('telegram_admin_chat_id', telegramChatId.trim())
    setTelegramTestResult({
      type: 'success',
      message: '✅ Chat ID muvaffaqiyatli saqlandi!',
      details: 'Endi test xabari yuborishingiz mumkin.'
    })

    // 3 soniyadan keyin xabarni yo'qotish
    setTimeout(() => {
      setTelegramTestResult(null)
    }, 3000)
  }

  // Telegram bot testing functions
  const handleTestTelegramBot = async () => {
    setTelegramTesting(true)
    setTelegramTestResult(null)

    try {
      console.log('🤖 Telegram bot test boshlanmoqda...')
      
      // Get bot info first
      const botInfoResult = await telegramBot.getBotInfo()
      setBotInfo(botInfoResult)

      if (botInfoResult.ok) {
        console.log('✅ Bot ma\'lumotlari olindi:', botInfoResult.result.first_name)
        
        // Send test message
        const testResult = await telegramBot.sendMessageToAdmin('🤖 <b>Test xabari saytingizdan!</b>\n\n✅ Telegram bot muvaffaqiyatli ishlayapti!\n📅 Sana: ' + new Date().toLocaleString('uz-UZ'))
        
        if (testResult.success) {
          setTelegramTestResult({
            type: 'success',
            message: '🎉 Test xabari muvaffaqiyatli yuborildi! Telegram botingizni tekshiring.',
            botName: botInfoResult.result?.first_name || 'Bot',
            details: 'Endi buyurtmalar ham Telegram\'ga yuboriladi.'
          })
        } else {
          setTelegramTestResult({
            type: 'error',
            message: `❌ Xabar yuborishda xatolik: ${testResult.error}`,
            details: testResult.error.includes('chat not found') 
              ? 'Chat ID noto\'g\'ri yoki botga /start yuborilmagan.' 
              : 'Bot sozlamalarini tekshiring.'
          })
        }
      } else {
        setTelegramTestResult({
          type: 'error',
          message: `❌ Bot ma'lumotlarini olishda xatolik: ${botInfoResult.description}`,
          details: 'Bot token noto\'g\'ri yoki bot faol emas.'
        })
      }
    } catch (error) {
      console.error('Telegram test xatoligi:', error)
      setTelegramTestResult({
        type: 'error',
        message: `❌ Telegram bilan bog'lanishda xatolik: ${error.message}`,
        details: 'Internet ulanishini tekshiring yoki keyinroq qaytadan urinib ko\'ring.'
      })
    }

    setTelegramTesting(false)
  }

  // Backup system functions
  const loadBackupStats = async () => {
    try {
      const stats = getBackupStats()
      setBackupStats(stats)
    } catch (error) {
      console.error('Backup statistika xatoligi:', error)
    }
  }

  // Component mount da backup stats yuklash
  useState(() => {
    loadBackupStats()
  }, [])

  const handleDownloadBackup = async () => {
    setBackupLoading(true)
    setBackupMessage(null)
    
    try {
      const success = downloadBackup()
      if (success) {
        setBackupMessage({
          type: 'success',
          text: '✅ Backup muvaffaqiyatli yuklab olindi!'
        })
        loadBackupStats() // Refresh stats
      } else {
        setBackupMessage({
          type: 'error', 
          text: '❌ Backup yaratishda xatolik yuz berdi'
        })
      }
    } catch (error) {
      setBackupMessage({
        type: 'error',
        text: `❌ Backup xatoligi: ${error.message}`
      })
    }
    
    setBackupLoading(false)
    setTimeout(() => setBackupMessage(null), 5000)
  }

  const handleRestoreBackup = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setRestoreLoading(true)
    setBackupMessage(null)

    try {
      const backupData = await readBackupFile(file)
      
      if (confirm(`📁 Backup fayli: ${file.name}\n📅 Sana: ${new Date(backupData.timestamp).toLocaleDateString('uz-UZ')}\n\n⚠️ Joriy barcha ma'lumotlar o'chiriladi va backup ma'lumotlari tiklanadi.\n\nDavom etasizmi?`)) {
        const success = restoreBackup(backupData)
        
        if (success) {
          setBackupMessage({
            type: 'success',
            text: '✅ Backup muvaffaqiyatli tiklandi! Sahifa qayta yuklanmoqda...'
          })
          
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      }
    } catch (error) {
      setBackupMessage({
        type: 'error',
        text: `❌ Backup tiklash xatoligi: ${error.message}`
      })
    }

    setRestoreLoading(false)
    event.target.value = '' // Reset file input
  }

  const handleResetAllData = () => {
    const success = resetAllData()
    if (success) {
      setBackupMessage({
        type: 'success',
        text: '🔄 Barcha ma\'lumotlar tozalandi! Sahifa qayta yuklanmoqda...'
      })
    }
  }

  const handleGetChatId = async () => {
    try {
      console.log('🔍 Chat ID qidirilmoqda...')
      const updates = await telegramBot.getUpdates()
      
      if (updates.ok && updates.result.length > 0) {
        const chatIds = [...new Set(updates.result.map(update => 
          update.message?.chat?.id || update.callback_query?.message?.chat?.id
        ).filter(Boolean))]
        
        if (chatIds.length > 0) {
          const chatIdList = chatIds.map(id => `• ${id}`).join('\n')
          
          // Eng oxirgi Chat ID ni avtomatik o'rnatish
          const latestChatId = chatIds[chatIds.length - 1].toString()
          
          if (window.confirm(`✅ Topilgan Chat ID lar:\n\n${chatIdList}\n\n🔧 Eng oxirgi Chat ID (${latestChatId}) ni avtomatik o'rnatishni xohlaysizmi?\n\n✅ "OK" - Avtomatik o'rnatish\n❌ "Cancel" - Qo'lda tanlash`)) {
            // Avtomatik o'rnatish
            telegramBot.setAdminChatId(latestChatId)
            setTelegramTestResult({
              type: 'success',
              message: `✅ Chat ID muvaffaqiyatli o'rnatildi: ${latestChatId}`,
              details: 'Endi "Bot Testini O\'tkazish" tugmasini bosib tekshiring.'
            })
          } else {
            // Qo'lda tanlash
            const selectedChatId = prompt(`📋 Chat ID ni kiriting:\n\nTopilgan Chat ID lar:\n${chatIdList}\n\nEng oxirgi Chat ID ni tavsiya qilamiz: ${latestChatId}`, latestChatId)
            
            if (selectedChatId && selectedChatId.trim()) {
              telegramBot.setAdminChatId(selectedChatId.trim())
              setTelegramTestResult({
                type: 'success',
                message: `✅ Chat ID muvaffaqiyatli o'rnatildi: ${selectedChatId.trim()}`,
                details: 'Endi "Bot Testini O\'tkazish" tugmasini bosib tekshiring.'
              })
            }
          }
        } else {
          setTelegramTestResult({
            type: 'error',
            message: '❌ Chat ID topilmadi',
            details: 'Botga /start yuboring va qaytadan urinib ko\'ring.'
          })
        }
      } else {
        setTelegramTestResult({
          type: 'error',
          message: '❌ Bot yangilanishlari topilmadi',
          details: 'Botga /start yuboring va qaytadan urinib ko\'ring.'
        })
      }
    } catch (error) {
      console.error('Chat ID olishda xatolik:', error)
      setTelegramTestResult({
        type: 'error',
        message: `❌ Chat ID olishda xatolik: ${error.message}`,
        details: 'Internet ulanishini tekshiring.'
      })
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1f2937',
          margin: 0
        }}>
          {t('settings')}
        </h1>
        <p style={{ color: '#6b7280', marginTop: '4px' }}>
          Dokon sozlamalari va tizim parametrlari
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}>
        {/* Shop Information */}
        <div className="card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <Store size={24} color="#4f46e5" />
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: 0,
              color: '#1f2937'
            }}>
              Dokon ma'lumotlari
            </h2>
          </div>

          <form onSubmit={handleSaveShopInfo}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Dokon nomi
              </label>
              <input
                type="text"
                className="input"
                value={shopInfo.name}
                onChange={(e) => setShopInfo({...shopInfo, name: e.target.value})}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}>
                <Phone size={16} style={{ display: 'inline', marginRight: '6px' }} />
                Telefon raqam
              </label>
              <input
                type="tel"
                className="input"
                value={shopInfo.phone}
                onChange={(e) => handleShopPhoneChange(e.target.value)}
                placeholder="+998 90 123 45 67"
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}>
                <MapPin size={16} style={{ display: 'inline', marginRight: '6px' }} />
                Manzil
              </label>
              <input
                type="text"
                className="input"
                value={shopInfo.address}
                onChange={(e) => setShopInfo({...shopInfo, address: e.target.value})}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Tavsif
              </label>
              <textarea
                className="input"
                rows="3"
                value={shopInfo.description}
                onChange={(e) => setShopInfo({...shopInfo, description: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <Save size={16} />
              {t('save')}
            </button>
          </form>

          {showSuccess && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#dcfce7',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              color: '#166534',
              fontSize: '14px'
            }}>
              Ma'lumotlar muvaffaqiyatli saqlandi!
            </div>
          )}
        </div>

        {/* Language Settings */}
        <div className="card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <Globe size={24} color="#4f46e5" />
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: 0,
              color: '#1f2937'
            }}>
              Til sozlamalari
            </h2>
          </div>

          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            marginBottom: '16px'
          }}>
            Admin panel tilini tanlang. Barcha matnlar tanlangan tilga o'zgaradi.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  border: language === lang.code ? '2px solid #4f46e5' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: language === lang.code ? '#f0f9ff' : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: language === lang.code ? '#1e40af' : '#6b7280',
                  padding: '4px 8px',
                  backgroundColor: language === lang.code ? '#dbeafe' : '#f3f4f6',
                  borderRadius: '4px',
                  minWidth: '32px',
                  textAlign: 'center'
                }}>{lang.flag}</div>
                <div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: language === lang.code ? '#1e40af' : '#1f2937'
                  }}>
                    {lang.name}
                  </div>
                  {language === lang.code && (
                    <div style={{
                      fontSize: '12px',
                      color: '#3b82f6'
                    }}>
                      Joriy til
                    </div>
                  )}
                </div>
                {language === lang.code && (
                  <div style={{
                    marginLeft: 'auto',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#4f46e5',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      borderRadius: '50%'
                    }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Credentials Section */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <Shield size={24} color="#ef4444" />
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: 0,
            color: '#1f2937'
          }}>
            Admin Login va Parol
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}>
          {/* Current Credentials */}
          <div style={{
            padding: '20px',
            backgroundColor: '#fef2f2',
            border: '2px solid #fecaca',
            borderRadius: '12px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#991b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Lock size={18} />
              Joriy Ma'lumotlar
            </h3>

            <div style={{ marginBottom: '12px' }}>
              <div style={{
                fontSize: '12px',
                color: '#7f1d1d',
                marginBottom: '4px',
                fontWeight: '500'
              }}>
                Login:
              </div>
              <div style={{
                padding: '10px 12px',
                backgroundColor: 'white',
                border: '1px solid #fca5a5',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#991b1b',
                fontFamily: 'monospace'
              }}>
                {adminCreds.login}
              </div>
            </div>

            <div>
              <div style={{
                fontSize: '12px',
                color: '#7f1d1d',
                marginBottom: '4px',
                fontWeight: '500'
              }}>
                Parol:
              </div>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  padding: '10px 40px 10px 12px',
                  backgroundColor: 'white',
                  border: '1px solid #fca5a5',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#991b1b',
                  fontFamily: 'monospace',
                  flex: 1
                }}>
                  {showCurrentPassword ? adminCreds.password : '•'.repeat(adminCreds.password.length)}
                </div>
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#991b1b'
                  }}
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#fee2e2',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#7f1d1d',
              lineHeight: '1.5'
            }}>
              <strong>⚠️ Muhim:</strong> Bu ma'lumotlarni eslab qoling! Ularni yo'qotib qo'ysangiz, admin panelga kira olmaysiz.
            </div>
          </div>

          {/* Update Form */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Key size={18} />
              Yangi Login va Parol
            </h3>

            <form onSubmit={handleUpdateAdminCredentials}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Yangi Login
                </label>
                <input
                  type="text"
                  className="input"
                  value={newAdminLogin}
                  onChange={(e) => setNewAdminLogin(e.target.value)}
                  placeholder="Kamida 4 ta belgi"
                  minLength="4"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Yangi Parol
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="input"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Kamida 6 ta belgi"
                    minLength="6"
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6b7280'
                    }}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Parolni Tasdiqlash
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Parolni qayta kiriting"
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6b7280'
                    }}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: '12px'
                }}
              >
                <Shield size={16} />
                Login va Parolni O'zgartirish
              </button>

              <button
                type="button"
                onClick={handleResetAdminCredentials}
                className="btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  fontWeight: '600'
                }}
              >
                <RotateCcw size={16} />
                Default Qiymatga Qaytarish
              </button>
            </form>

            {adminUpdateMessage && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: adminUpdateMessage.type === 'success' ? '#dcfce7' : '#fee2e2',
                border: `1px solid ${adminUpdateMessage.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                borderRadius: '8px',
                color: adminUpdateMessage.type === 'success' ? '#166534' : '#991b1b',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {adminUpdateMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Telegram Bot Testing Section */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <MessageCircle size={24} color="#0088cc" />
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: 0,
            color: '#1f2937'
          }}>
            Telegram Bot Sozlamalari
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}>
          {/* Bot Information */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f0f9ff',
            border: '2px solid #bae6fd',
            borderRadius: '12px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#0c4a6e',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <MessageCircle size={18} />
              Bot Ma'lumotlari
            </h3>

            <div style={{ marginBottom: '12px' }}>
              <div style={{
                fontSize: '12px',
                color: '#0c4a6e',
                marginBottom: '4px',
                fontWeight: '500'
              }}>
                Chat ID:
              </div>
              <div style={{
                padding: '10px 12px',
                backgroundColor: 'white',
                border: '1px solid #7dd3fc',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: telegramBot.getAdminChatId() === '123456789' ? '#dc2626' : '#0c4a6e',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {telegramBot.getAdminChatId()}
                {telegramBot.getAdminChatId() === '123456789' ? (
                  <span style={{
                    fontSize: '10px',
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: '500'
                  }}>
                    SOZLANMAGAN
                  </span>
                ) : (
                  <span style={{
                    fontSize: '10px',
                    backgroundColor: '#dcfce7',
                    color: '#16a34a',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: '500'
                  }}>
                    SOZLANGAN
                  </span>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{
                fontSize: '12px',
                color: '#0c4a6e',
                marginBottom: '4px',
                fontWeight: '500'
              }}>
                Chat ID:
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={telegramChatId}
                  onChange={(e) => setTelegramChatId(e.target.value)}
                  placeholder="123456789 (raqamlar)"
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: '1px solid #7dd3fc',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    color: '#0c4a6e'
                  }}
                />
                <button
                  onClick={handleSaveTelegramChatId}
                  className="btn btn-primary"
                  style={{
                    padding: '10px 16px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Saqlash
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{
                fontSize: '12px',
                color: '#0c4a6e',
                marginBottom: '4px',
                fontWeight: '500'
              }}>
                Bot Token:
              </div>
              <div style={{
                padding: '10px 12px',
                backgroundColor: 'white',
                border: '1px solid #7dd3fc',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#0c4a6e',
                fontFamily: 'monospace',
                wordBreak: 'break-all'
              }}>
                8861308673:AAG1V83_d33jueqRvsxuyos4opTaJVyCCmE
              </div>
            </div>

            {botInfo && botInfo.ok && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{
                  fontSize: '12px',
                  color: '#0c4a6e',
                  marginBottom: '4px',
                  fontWeight: '500'
                }}>
                  Bot Nomi:
                </div>
                <div style={{
                  padding: '10px 12px',
                  backgroundColor: 'white',
                  border: '1px solid #7dd3fc',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#0c4a6e'
                }}>
                  @{botInfo.result.username} ({botInfo.result.first_name})
                </div>
              </div>
            )}

            <div style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#e0f2fe',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#0c4a6e',
              lineHeight: '1.5'
            }}>
              <strong>📋 Qadamlar:</strong><br />
              1. Telegram'da botingizga /start yuboring<br />
              2. "Chat ID olish" tugmasini bosing<br />
              3. Chat ID ni telegram.js faylida o'rnating<br />
              4. "Bot testini o'tkazish" tugmasini bosing
            </div>
          </div>

          {/* Testing Controls */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Send size={18} />
              Bot Testlari
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleGetChatId}
                className="btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  color: 'white',
                  fontWeight: '600'
                }}
              >
                <MessageCircle size={16} />
                Chat ID Olish
              </button>

              <button
                onClick={handleTestTelegramBot}
                disabled={telegramTesting}
                className="btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center',
                  background: telegramTesting 
                    ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)' 
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  fontWeight: '600',
                  cursor: telegramTesting ? 'not-allowed' : 'pointer'
                }}
              >
                <Send size={16} />
                {telegramTesting ? 'Test o\'tkazilmoqda...' : 'Bot Testini O\'tkazish'}
              </button>
            </div>

            {telegramTestResult && (
              <div style={{
                marginTop: '16px',
                padding: '16px',
                backgroundColor: telegramTestResult.type === 'success' ? '#dcfce7' : '#fee2e2',
                border: `2px solid ${telegramTestResult.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                borderRadius: '12px',
                color: telegramTestResult.type === 'success' ? '#166534' : '#991b1b'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  {telegramTestResult.type === 'success' ? (
                    <CheckCircle size={20} color="#16a34a" />
                  ) : (
                    <AlertCircle size={20} color="#dc2626" />
                  )}
                  <strong>
                    {telegramTestResult.type === 'success' ? 'Muvaffaqiyat!' : 'Xatolik!'}
                  </strong>
                </div>
                <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                  {telegramTestResult.message}
                </div>
                {telegramTestResult.details && (
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    {telegramTestResult.details}
                  </div>
                )}
                {telegramTestResult.botName && (
                  <div style={{ fontSize: '12px', marginTop: '8px', fontWeight: '600' }}>
                    Bot: {telegramTestResult.botName}
                  </div>
                )}
              </div>
            )}

            <div style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#fef3c7',
              border: '1px solid #fcd34d',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#92400e',
              lineHeight: '1.5'
            }}>
              <strong>⚠️ Eslatma:</strong> Agar xabar kelmasa, Chat ID ni to'g'ri sozlaganingizni va botga /start yuborgan ekanligingizni tekshiring.
            </div>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="card" style={{ marginTop: '24px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#1f2937'
        }}>
          Qo'shimcha sozlamalar
        </h2>

        {/* Settings Grid - 3 ustun */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          <div style={{
            padding: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '8px',
              color: '#1f2937'
            }}>
              Valyuta sozlamalari
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '12px'
            }}>
              Asosiy valyuta va kurs sozlamalari
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="number"
                placeholder="USD kursi"
                className="input"
                style={{ flex: 1 }}
                defaultValue="12000"
              />
              <span style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                so'm
              </span>
            </div>
          </div>

          <div style={{
            padding: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '8px',
              color: '#1f2937'
            }}>
              Bildirishnomalar
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '12px'
            }}>
              Tizim bildirishnomalarini boshqarish
            </p>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <input type="checkbox" defaultChecked />
              <span style={{ fontSize: '14px' }}>
                Kam qolgan mahsulotlar haqida ogohlantirish
              </span>
            </label>
          </div>

          <div style={{
            padding: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <Database size={20} color="#4f46e5" />
              <h3 style={{
                fontSize: '16px',
                fontWeight: '500',
                margin: 0,
                color: '#1f2937'
              }}>
                Ma'lumotlar zaxirasi
              </h3>
            </div>
            
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '12px'
            }}>
              Barcha ma'lumotlarni zaxiralash va tiklash
            </p>

            {backupStats && (
              <div style={{
                marginBottom: '12px',
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <BarChart3 size={16} color="#64748b" />
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#475569' }}>
                    Statistika:
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
                  • Jami ma'lumotlar: <strong>{backupStats.totalItems}</strong><br/>
                  • Oxirgi backup: <strong>{backupStats.lastBackup || 'Hali amalga oshirilmagan'}</strong><br/>
                  • Fayl hajmi: <strong>{(backupStats.dataSize / 1024).toFixed(1)} KB</strong>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <button 
                onClick={handleDownloadBackup}
                disabled={backupLoading}
                className="btn"
                style={{ 
                  fontSize: '12px',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {backupLoading ? (
                  <>
                    <div className="spinner" style={{ width: '14px', height: '14px' }} />
                    Yuklanmoqda...
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    Backup Yaratish
                  </>
                )}
              </button>

              <div style={{ position: 'relative' }}>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleRestoreBackup}
                  style={{ display: 'none' }}
                  id="backup-restore-input"
                  disabled={restoreLoading}
                />
                <label
                  htmlFor="backup-restore-input"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    background: restoreLoading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    borderRadius: '6px',
                    cursor: restoreLoading ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    border: 'none',
                    textAlign: 'center',
                    userSelect: 'none'
                  }}
                >
                  {restoreLoading ? (
                    <>
                      <div className="spinner" style={{ width: '14px', height: '14px' }} />
                      Tiklanmoqda...
                    </>
                  ) : (
                    <>
                      <Upload size={14} />
                      Backup Tiklash
                    </>
                  )}
                </label>
              </div>

              <button 
                onClick={handleResetAllData}
                className="btn"
                style={{ 
                  fontSize: '12px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={14} />
                Barcha Ma'lumotlarni Tozalash
              </button>
            </div>

            {backupMessage && (
              <div style={{
                marginTop: '12px',
                padding: '10px 12px',
                backgroundColor: backupMessage.type === 'success' ? '#dcfce7' : '#fee2e2',
                border: `1px solid ${backupMessage.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                borderRadius: '6px',
                color: backupMessage.type === 'success' ? '#166534' : '#991b1b',
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: '1.4'
              }}>
                {backupMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
