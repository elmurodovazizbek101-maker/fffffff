import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div style={{
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '96px', fontWeight: 800, marginBottom: '16px', color: '#667eea' }}>
      404
    </div>
    <div style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: '#111827' }}>
      Sahifa topilmadi
    </div>
    <p style={{ maxWidth: '520px', color: '#4b5563', marginBottom: '24px', lineHeight: 1.6 }}>
      Bu URL manzili uchun sahifa mavjud emas. Iltimos, bosh sahifaga qayting yoki menyudan tanlang.
    </p>
    <Link
      to="/"
      style={{
        padding: '14px 26px',
        borderRadius: '999px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textDecoration: 'none',
        fontWeight: 700
      }}
    >
      Bosh sahifaga qaytish
    </Link>
  </div>
)

export default NotFoundPage
