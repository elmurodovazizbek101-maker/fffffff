import { useState, useEffect, useRef } from 'react'
import { Search, Menu, LogOut, Edit } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const Header = ({ onToggleSidebar, onLogout, isMobile }) => {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const profileMenuRef = useRef(null)

  const getHeaderHeight = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    
    if (width === 1366 && height === 768) return '60px'
    if (isMobile) return '60px'
    return '70px'
  }

  // Tashqariga bosganda dropdown yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileMenu])

  const handleSearch = (e) => {
    e.preventDefault()
    // Qidiruv funksiyasi
  }

  return (
    <>
      <header style={{
        height: getHeaderHeight(),
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 12px' : '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '20px' }}>
          <button
            onClick={onToggleSidebar}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '6px',
              color: '#64748b'
            }}
          >
            <Menu size={20} />
          </button>

          <form onSubmit={handleSearch} style={{ position: 'relative' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }}
            />
            <input
              type="text"
              placeholder={`${t('search')}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: '40px',
                paddingRight: '12px',
                paddingTop: '8px',
                paddingBottom: '8px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                width: '300px',
                fontSize: '14px'
              }}
            />
          </form>
        </div>

        <div style={{ position: 'relative' }} ref={profileMenuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: showProfileMenu ? '#f1f5f9' : 'transparent'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#4f46e5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              A
            </div>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
              Admin
            </span>
          </button>

          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              minWidth: '180px',
              zIndex: 1000
            }}>
              <button
                onClick={() => {
                  setShowEditProfile(true)
                  setShowProfileMenu(false)
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#374151',
                  textAlign: 'left'
                }}
              >
                <Edit size={16} />
                Profilni tahrirlash
              </button>
              <button
                onClick={() => {
                  onLogout()
                  setShowProfileMenu(false)
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#ef4444',
                  textAlign: 'left'
                }}
              >
                <LogOut size={16} />
                Chiqish
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Profile Edit Modal */}
      {showEditProfile && (
        <div className="modal-overlay" onClick={() => setShowEditProfile(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Profilni tahrirlash
              </h3>
              <button
                onClick={() => setShowEditProfile(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            <form>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Ism
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue="Admin"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Login
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue="admin"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Yangi parol
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="Yangi parol kiriting"
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="btn btn-secondary"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowEditProfile(false)
                  }}
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
