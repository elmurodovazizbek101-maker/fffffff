import { useState } from 'react'
import { Store, Phone, MapPin, Globe, Save, Lock, Key, Shield } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { getAdminCredentials, updateAdminCredentials } from '../../utils/auth'

const Settings = () => {
  const { t, language, setLanguage } = useLanguage()
  const [shopInfo, setShopInfo] = useState({
    name: 'Alisher Mobile',
    phone: '+998 90 123 45 67',
    address: 'Toshkent shahar, Chilonzor tumani',
    description: 'Mobil telefonlar va aksessuarlar do\'koni'
  })

  const [showSuccess, setShowSuccess] = useState(false)

  // Admin credentials state
  const [adminCreds, setAdminCreds] = useState(() => getAdminCredentials())
  const [newAdminLogin, setNewAdminLogin] = useState('')
  const [newAdminPassword, setNewAdminPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [adminUpdateMessage, setAdminUpdateMessage] = useState(null)

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
                onChange={(e) => setShopInfo({...shopInfo, phone: e.target.value})}
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
                padding: '10px 12px',
                backgroundColor: 'white',
                border: '1px solid #fca5a5',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#991b1b',
                fontFamily: 'monospace'
              }}>
                {'•'.repeat(adminCreds.password.length)}
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
                <input
                  type="password"
                  className="input"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Kamida 6 ta belgi"
                  minLength="6"
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
                  Parolni Tasdiqlash
                </label>
                <input
                  type="password"
                  className="input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Parolni qayta kiriting"
                />
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
                  fontWeight: '600'
                }}
              >
                <Shield size={16} />
                Login va Parolni O'zgartirish
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
          gridTemplateColumns: 'repeat(3, 1fr)',
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
            <h3 style={{
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '8px',
              color: '#1f2937'
            }}>
              Ma'lumotlar zaxirasi
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '12px'
            }}>
              Ma'lumotlarni zaxiralash va tiklash
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary" style={{ fontSize: '12px' }}>
                Zaxiralash
              </button>
              <button className="btn btn-secondary" style={{ fontSize: '12px' }}>
                Tiklash
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
