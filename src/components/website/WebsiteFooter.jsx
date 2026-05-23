import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, MessageCircle, Facebook } from 'lucide-react'

const WebsiteFooter = () => {
  return (
    <footer style={{
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '60px 0 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Alisher Mobile
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#9ca3af',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              O'zbekistondagi eng ishonchli mobil telefonlar do'koni.
              Biz mijozlarimizga eng sifatli mahsulotlar va professional xizmatlarni taqdim etamiz.
            </p>

            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '16px'
            }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#374151',
                  borderRadius: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s'
                }}
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://t.me/alishermobile"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#374151',
                  borderRadius: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s'
                }}
              >
                <MessageCircle size={20} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#374151',
                  borderRadius: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s'
                }}
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              Tezkor havolalar
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '12px' }}>
                <Link
                  to="/"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  Bosh sahifa
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link
                  to="/products"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  Mahsulotlar
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link
                  to="/about"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  Biz haqimizda
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a
                  href="#"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  Kafolat
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a
                  href="#"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  Yetkazib berish
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              Kategoriyalar
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '12px' }}>
                <Link
                  to="/products?category=apple"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  Apple iPhone
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link
                  to="/products?category=samsung"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  Samsung Galaxy
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link
                  to="/products?category=honor"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  Honor Magic
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link
                  to="/products?category=vivo"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  Vivo X seriyasi
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link
                  to="/products?category=nokia"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  Nokia
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link
                  to="/products?category=oneplus"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  OnePlus
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link
                  to="/products?category=accessories"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.2s'
                  }}
                >
                  Aksessuarlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              Bog'lanish
            </h4>

            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px'
              }}>
                <MapPin size={18} color="#9ca3af" />
                <span style={{ fontSize: '16px', color: '#9ca3af' }}>
                  Toshkent sh., Chilonzor tumani
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px'
              }}>
                <Phone size={18} color="#9ca3af" />
                <a
                  href="tel:+998901234567"
                  style={{
                    fontSize: '16px',
                    color: '#9ca3af',
                    textDecoration: 'none'
                  }}
                >
                  +998 90 123 45 67
                </a>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px'
              }}>
                <Mail size={18} color="#9ca3af" />
                <a
                  href="mailto:info@alishermobile.uz"
                  style={{
                    fontSize: '16px',
                    color: '#9ca3af',
                    textDecoration: 'none'
                  }}
                >
                  info@alishermobile.uz
                </a>
              </div>
            </div>

            <div>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0
              }}>
                Ish vaqti: Har kuni 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            © 2024 Alisher Mobile. Barcha huquqlar himoyalangan.
          </p>

          <div style={{
            display: 'flex',
            gap: '20px'
          }}>
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#6b7280',
                textDecoration: 'none'
              }}
            >
              Maxfiylik siyosati
            </a>
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#6b7280',
                textDecoration: 'none'
              }}
            >
              Foydalanish shartlari
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default WebsiteFooter
