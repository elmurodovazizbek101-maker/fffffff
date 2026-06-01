import { useState } from 'react'
import { Megaphone, Plus, Edit, Trash2, Upload, Save, X } from 'lucide-react'

const Promotions = () => {
  
  // Local state for promotions
  const [promotions, setPromotions] = useState(() => {
    const saved = localStorage.getItem('alisher_mobile_promotions')
    return saved ? JSON.parse(saved) : []
  })
  
  const [showModal, setShowModal] = useState(false)
  const [editingPromotion, setEditingPromotion] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceUZS: '',
    priceUSD: '',
    image: '',
    category: '',
    rating: 4.5,
    storage: '',
    color: '',
    specs: []
  })

  // USD/UZS konvertatsiya kursi (1 USD = 12600 UZS)
  const USD_TO_UZS_RATE = 12600

  // Narx konvertatsiya funksiyasi
  const handlePriceChange = (field, value) => {
    const numValue = parseFloat(value) || 0
    
    if (field === 'priceUZS') {
      const usdValue = numValue / USD_TO_UZS_RATE
      setFormData({
        ...formData,
        priceUZS: value,
        priceUSD: usdValue > 0 ? usdValue.toFixed(2) : ''
      })
    } else if (field === 'priceUSD') {
      const uzsValue = numValue * USD_TO_UZS_RATE
      setFormData({
        ...formData,
        priceUSD: value,
        priceUZS: uzsValue > 0 ? Math.round(uzsValue).toString() : ''
      })
    }
  }

  // Save to localStorage
  const savePromotions = (newPromotions) => {
    localStorage.setItem('alisher_mobile_promotions', JSON.stringify(newPromotions))
    setPromotions(newPromotions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const promotionData = {
      ...formData,
      id: editingPromotion ? editingPromotion.id : Date.now(),
      priceUZS: parseInt(formData.priceUZS) || 0,
      priceUSD: parseFloat(formData.priceUSD) || 0,
      specs: formData.specs.filter(spec => spec.trim() !== ''),
      createdAt: editingPromotion ? editingPromotion.createdAt : new Date().toISOString()
    }

    if (editingPromotion) {
      const updatedPromotions = promotions.map(promo =>
        promo.id === editingPromotion.id ? promotionData : promo
      )
      savePromotions(updatedPromotions)
    } else {
      savePromotions([...promotions, promotionData])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      priceUZS: '',
      priceUSD: '',
      image: '',
      category: '',
      rating: 4.5,
      storage: '',
      color: '',
      specs: []
    })
    setEditingPromotion(null)
    setShowModal(false)
  }

  const handleEdit = (promotion) => {
    setEditingPromotion(promotion)
    setFormData({
      name: promotion.name || '',
      description: promotion.description || '',
      priceUZS: promotion.priceUZS?.toString() || promotion.price?.toString() || '',
      priceUSD: promotion.priceUSD?.toString() || '',
      image: promotion.image || '',
      category: promotion.category || '',
      rating: promotion.rating || 4.5,
      storage: promotion.storage || '',
      color: promotion.color || '',
      specs: promotion.specs || []
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Bu reklamani o\'chirishni xohlaysizmi?')) {
      const updatedPromotions = promotions.filter(promo => promo.id !== id)
      savePromotions(updatedPromotions)
    }
  }

  const addSpec = () => {
    setFormData({
      ...formData,
      specs: [...formData.specs, '']
    })
  }

  const updateSpec = (index, value) => {
    const newSpecs = [...formData.specs]
    newSpecs[index] = value
    setFormData({
      ...formData,
      specs: newSpecs
    })
  }

  const removeSpec = (index) => {
    setFormData({
      ...formData,
      specs: formData.specs.filter((_, i) => i !== index)
    })
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Megaphone size={32} />
            Reklama boshqaruvi
          </h1>
          <p style={{ color: '#6b7280', margin: '0.5rem 0 0 0' }}>
            Sayt boshidagi reklama slayderini boshqaring
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          <Plus size={20} />
          Yangi reklama qo'shish
        </button>
      </div>

      {/* Promotions Grid - 2 ustun (katta kartochkalar) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem'
      }}>
        {promotions.map(promotion => (
          <div
            key={promotion.id}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{
              width: '100%',
              height: '200px',
              background: promotion.image ? `url(${promotion.image})` : 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {!promotion.image && (
                <Upload size={48} color="#9ca3af" />
              )}
            </div>

            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              {promotion.name || 'Noma\'lum mahsulot'}
            </h3>

            <p style={{
              color: '#6b7280',
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              {promotion.description || 'Tavsif kiritilmagan'}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '900',
                color: '#10b981'
              }}>
                {(promotion.priceUZS || promotion.price || 0).toLocaleString()} so'm
              </span>
              <span style={{
                background: '#f3f4f6',
                color: '#374151',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                {promotion.category || 'Kategoriya'}
              </span>
            </div>

            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => handleEdit(promotion)}
                style={{
                  flex: 1,
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                <Edit size={16} />
                Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(promotion.id)}
                style={{
                  flex: 1,
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                <Trash2 size={16} />
                O'chirish
              </button>
            </div>
          </div>
        ))}

        {promotions.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '4rem',
            color: '#6b7280'
          }}>
            <Megaphone size={64} color="#d1d5db" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Hech qanday reklama yo'q</h3>
            <p style={{ fontSize: '1.1rem' }}>Birinchi reklamangizni qo'shish uchun yuqoridagi tugmani bosing</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            width: '600px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                {editingPromotion ? 'Reklamani tahrirlash' : 'Yangi reklama qo\'shish'}
              </h2>
              <button
                onClick={resetForm}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '0.5rem'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '0.9rem'
                  }}>
                    Mahsulot nomi *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '0.9rem'
                  }}>
                    Tavsif *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      minHeight: '80px',
                      resize: 'vertical'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>
                      Narx (UZS so'm) *
                    </label>
                    <input
                      type="number"
                      value={formData.priceUZS}
                      onChange={(e) => handlePriceChange('priceUZS', e.target.value)}
                      placeholder="12600000"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>
                      Narx (USD dollar)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.priceUSD}
                      onChange={(e) => handlePriceChange('priceUSD', e.target.value)}
                      placeholder="1000.00"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                {/* Konvertatsiya ma'lumoti */}
                <div style={{
                  background: '#f0f9ff',
                  border: '1px solid #0ea5e9',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontSize: '0.85rem',
                  color: '#0369a1'
                }}>
                  💡 <strong>Avtomatik konvertatsiya:</strong> 1 USD = {USD_TO_UZS_RATE.toLocaleString()} UZS
                  <br />
                  Bitta maydonni to'ldirsangiz, ikkinchisi avtomatik hisoblanadi.
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '0.9rem'
                  }}>
                    Kategoriya *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    required
                  >
                    <option value="">Kategoriya tanlang</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Honor">Honor</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Nokia">Nokia</option>
                    <option value="ROG">ROG</option>
                    <option value="Redmi">Redmi</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Realme">Realme</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '0.9rem'
                  }}>
                    Rasm URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>
                      Xotira
                    </label>
                    <input
                      type="text"
                      value={formData.storage}
                      onChange={(e) => setFormData({...formData, storage: e.target.value})}
                      placeholder="256GB"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>
                      Rang
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      placeholder="Qora"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '0.9rem'
                  }}>
                    Xususiyatlar
                  </label>
                  {formData.specs.map((spec, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        value={spec}
                        onChange={(e) => updateSpec(index, e.target.value)}
                        placeholder="Masalan: A17 Pro chip"
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '6px',
                          fontSize: '0.9rem'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeSpec(index)}
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSpec}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Plus size={16} />
                    Xususiyat qo'shish
                  </button>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Save size={20} />
                  {editingPromotion ? 'Saqlash' : 'Qo\'shish'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    flex: 1,
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Promotions
