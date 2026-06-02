import { TrendingUp, DollarSign, Percent, CreditCard, Banknote, Smartphone, Users } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useData } from '../../context/DataContext'

const Dashboard = () => {
  const { t } = useLanguage()
  const { getStats } = useData()
  
  // Real statistika olish
  const stats = getStats()

  // Sample data
  const salesData = [
    { name: 'Yan', sales: 4000000 },
    { name: 'Fev', sales: 3000000 },
    { name: 'Mar', sales: 5000000 },
    { name: 'Apr', sales: 4500000 },
    { name: 'May', sales: 6000000 },
    { name: 'Iyun', sales: 5500000 }
  ]

  const debtPeriods = [
    { period: '0-7 kun', amount: 0, color: '#10b981' },
    { period: '7-30 kun', amount: 5242000, color: '#f59e0b' },
    { period: '30-90 kun', amount: 333600, color: '#6b7280' },
    { period: '90+ kun', amount: 0, color: '#ef4444' }
  ]

  const topProducts = [
    { name: 'iPhone 15 Pro Max', sales: 45, revenue: 855000000 },
    { name: 'Samsung S24 Ultra', sales: 38, revenue: 760000000 },
    { name: 'iPhone 15', sales: 32, revenue: 480000000 }
  ]

  const topCustomers = [
    { name: 'Akmal Karimov', purchases: 15, amount: 45000000 },
    { name: 'Dilshod Toshev', purchases: 12, amount: 36000000 },
    { name: 'Nodira Saidova', purchases: 10, amount: 28000000 }
  ]

  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <div className="card" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '20px'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        backgroundColor: `${color}20`,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={24} color={color} />
      </div>
      <div>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: '0 0 4px 0'
        }}>
          {title}
        </p>
        <p style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          margin: 0
        }}>
          {value}
        </p>
        {subtitle && (
          <p style={{
            fontSize: '12px',
            color: '#9ca3af',
            margin: '2px 0 0 0'
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1f2937',
          margin: 0
        }}>
          {t('dashboard')}
        </h1>
        <p style={{ color: '#6b7280', marginTop: '4px' }}>
          Dokon faoliyatining umumiy ko'rinishi
        </p>
      </div>

      {/* Stats Grid - 4 ustun */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard
          icon={TrendingUp}
          title={t('totalSales')}
          value="127,500,000 so'm"
          color="#10b981"
          subtitle="Bu oyda"
        />
        <StatCard
          icon={DollarSign}
          title={t('netProfit')}
          value="25,500,000 so'm"
          color="#3b82f6"
          subtitle="20% foyda"
        />
        <StatCard
          icon={Percent}
          title={t('discount')}
          value="2,300,000 so'm"
          color="#f59e0b"
          subtitle="Jami chegirmalar"
        />
        <StatCard
          icon={CreditCard}
          title={t('activeDebts')}
          value="5,575,600 so'm"
          color="#ef4444"
          subtitle="42 ta mijoz"
        />
      </div>

      {/* Payment Methods */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#1f2937'
        }}>
          To'lov usullari
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px'
          }}>
            <Banknote size={20} color="#10b981" />
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                {t('cash')}
              </p>
              <p style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                45,200,000 so'm
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px'
          }}>
            <CreditCard size={20} color="#3b82f6" />
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                {t('card')}
              </p>
              <p style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                62,800,000 so'm
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px'
          }}>
            <Smartphone size={20} color="#8b5cf6" />
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                {t('click')}
              </p>
              <p style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                13,900,000 so'm
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px'
          }}>
            <Users size={20} color="#ef4444" />
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                {t('debtSales')}
              </p>
              <p style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                5,600,000 so'm
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Sales Chart */}
        <div className="card">
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            Oylik sotuv statistikasi
          </h3>
          <div style={{ 
            width: '100%', 
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '2px dashed #e2e8f0'
          }}>
            <div style={{ textAlign: 'center', color: '#6b7280' }}>
              <TrendingUp size={48} style={{ marginBottom: '12px' }} />
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
                Grafik ko'rinishi
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>
                Recharts kutubxonasi kerak
              </p>
            </div>
          </div>
        </div>

        {/* Debt Periods */}
        <div className="card">
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            {t('debtPeriods')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {debtPeriods.map((period, index) => (
              <div key={index}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '6px'
                }}>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    {period.period}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>
                    {period.amount.toLocaleString()} so'm
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: period.amount > 0 ? `${(period.amount / 6000000) * 100}%` : '2%',
                    height: '100%',
                    backgroundColor: period.color,
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }}>
        {/* Top Products */}
        <div className="card">
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            {t('topProducts')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topProducts.map((product, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    margin: 0,
                    color: '#1f2937'
                  }}>
                    {product.name}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    {product.sales} ta sotildi
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#10b981'
                  }}>
                    {(product.revenue / 1000000).toFixed(1)}M so'm
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="card">
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
            color: '#1f2937'
          }}>
            {t('topCustomers')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topCustomers.map((customer, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#4f46e5',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      margin: 0,
                      color: '#1f2937'
                    }}>
                      {customer.name}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {customer.purchases} ta xarid
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#10b981'
                  }}>
                    {(customer.amount / 1000000).toFixed(1)}M so'm
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
