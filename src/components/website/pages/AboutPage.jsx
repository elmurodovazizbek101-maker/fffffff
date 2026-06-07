import { useState, useEffect } from 'react'
import { MapPin, Phone, Clock, Users, Award, Smartphone, Store } from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { icon: Users, number: '5000+', label: 'Mamnun mijozlar' },
    { icon: Smartphone, number: '10000+', label: 'Sotilgan telefonlar' },
    { icon: Award, number: '3', label: 'Yillik tajriba' },
    { icon: Clock, number: '24/7', label: 'Qo\'llab-quvvatlash' }
  ]

  const team = [
    {
      name: 'Alisher Karimov',
      position: 'Asoschisi va Direktor',
      description: 'Mobil texnologiyalar sohasida 10 yillik tajriba'
    },
    {
      name: 'Malika Tosheva',
      position: 'Sotuvlar menejeri',
      description: 'Mijozlar bilan ishlash bo\'yicha mutaxassis'
    },
    {
      name: 'Jasur Saidov',
      position: 'Texnik mutaxassis',
      description: 'Telefonlar ta\'miri va texnik yordam'
    }
  ]

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '20px'
        }}>
          Biz haqimizda
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Alisher Mobile - O'zbekistondagi eng ishonchli mobil telefonlar do'koni.
          Biz mijozlarimizga eng sifatli mahsulotlar va professional xizmatlarni taqdim etamiz.
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '30px',
        marginBottom: '80px'
      }}>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div key={index} style={{
              textAlign: 'center',
              padding: '40px 20px',
              backgroundColor: darkMode ? '#374151' : 'white',
              borderRadius: '16px',
              boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#4f46e5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <IconComponent size={30} color="white" />
              </div>
              <h3 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: darkMode ? 'white' : '#1f2937',
                marginBottom: '8px'
              }}>
                {stat.number}
              </h3>
              <p style={{
                fontSize: '16px',
                color: darkMode ? '#9ca3af' : '#6b7280'
              }}>
                {stat.label}
              </p>
            </div>
          )
        })}
      </div>

      {/* Our Story */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        marginBottom: '80px'
      }}>
        <div>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: darkMode ? 'white' : '#1f2937',
            marginBottom: '24px'
          }}>
            Bizning hikoyamiz
          </h2>
          <p style={{
            fontSize: '18px',
            color: darkMode ? '#9ca3af' : '#6b7280',
            lineHeight: '1.7',
            marginBottom: '20px'
          }}>
            2021 yilda tashkil etilgan Alisher Mobile bugungi kunda O'zbekistonning
            eng yirik mobil telefonlar do'konlaridan biri hisoblanadi.
          </p>
          <p style={{
            fontSize: '18px',
            color: darkMode ? '#9ca3af' : '#6b7280',
            lineHeight: '1.7',
            marginBottom: '20px'
          }}>
            Biz faqat original va sifatli mahsulotlarni sotamiz. Har bir telefon
            rasmiy kafolat bilan ta'minlanadi va professional texnik yordam ko'rsatiladi.
          </p>
          <p style={{
            fontSize: '18px',
            color: darkMode ? '#9ca3af' : '#6b7280',
            lineHeight: '1.7'
          }}>
            Mijozlarimizning mamnunligi bizning asosiy maqsadimizdir. Shuning uchun
            biz doimo eng yaxshi xizmat ko'rsatishga harakat qilamiz.
          </p>
        </div>
        <div style={{
          width: '100%',
          height: '400px',
          backgroundColor: darkMode ? '#374151' : '#f3f4f6',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Store size={120} color={darkMode ? '#9ca3af' : '#6b7280'} />
        </div>
      </div>

      {/* Team */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: darkMode ? 'white' : '#1f2937',
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          Bizning jamoa
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          {team.map((member, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '40px 20px',
              backgroundColor: darkMode ? '#374151' : 'white',
              borderRadius: '16px',
              boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#4f46e5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '36px',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {member.name.charAt(0)}
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937',
                marginBottom: '8px'
              }}>
                {member.name}
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#4f46e5',
                fontWeight: '500',
                marginBottom: '12px'
              }}>
                {member.position}
              </p>
              <p style={{
                fontSize: '14px',
                color: darkMode ? '#9ca3af' : '#6b7280',
                lineHeight: '1.5'
              }}>
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div style={{
        backgroundColor: darkMode ? '#374151' : '#f8fafc',
        borderRadius: '16px',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: darkMode ? 'white' : '#1f2937',
          marginBottom: '40px'
        }}>
          Biz bilan bog'laning
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#4f46e5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MapPin size={24} color="white" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '4px',
                color: darkMode ? 'white' : '#1f2937'
              }}>
                Manzil
              </h4>
              <p style={{ fontSize: '16px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                Toshkent sh., Chilonzor tumani
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#4f46e5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Phone size={24} color="white" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '4px',
                color: darkMode ? 'white' : '#1f2937'
              }}>
                Telefon
              </h4>
              <p style={{ fontSize: '16px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                +998 90 123 45 67
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#4f46e5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={24} color="white" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '4px',
                color: darkMode ? 'white' : '#1f2937'
              }}>
                Ish vaqti
              </h4>
              <p style={{ fontSize: '16px', color: darkMode ? '#9ca3af' : '#6b7280' }}>
                Har kuni 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
