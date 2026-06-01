import { useState, useEffect } from 'react'
import { Star, MessageCircle, ThumbsUp, User, Calendar } from 'lucide-react'

const ProductRating = ({ 
  productId, 
  initialRating = 0, 
  totalReviews = 0, 
  showReviews = true,
  allowRating = true,
  size = 'medium',
  darkMode = false 
}) => {
  const [rating, setRating] = useState(initialRating)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviews, setReviews] = useState([])
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 0, comment: '', name: '' })
  const [showReviewForm, setShowReviewForm] = useState(false)

  // Demo sharhlar
  const demoReviews = [
    {
      id: 1,
      name: 'Aziz Karimov',
      rating: 5,
      comment: 'Ajoyib telefon! Kamera sifati va tezligi juda yaxshi. Tavsiya qilaman.',
      date: '2024-01-15',
      helpful: 12
    },
    {
      id: 2,
      name: 'Malika Tosheva',
      rating: 4,
      comment: 'Yaxshi telefon, lekin batareya hayoti biroz kam. Umumiy holda mamnunman.',
      date: '2024-01-10',
      helpful: 8
    },
    {
      id: 3,
      name: 'Bobur Aliyev',
      rating: 5,
      comment: 'Eng yaxshi xarid! Tez ishlaydi, dizayni chiroyli. Hech qanday muammo yo\'q.',
      date: '2024-01-05',
      helpful: 15
    },
    {
      id: 4,
      name: 'Nigora Rahimova',
      rating: 4,
      comment: 'Kamera juda yaxshi, lekin narxi biroz qimmat. Lekin sifat uchun arziydi.',
      date: '2024-01-01',
      helpful: 6
    }
  ]

  useEffect(() => {
    // localStorage dan foydalanuvchi reytingini yuklash
    const savedRating = localStorage.getItem(`rating_${productId}`)
    if (savedRating) {
      setUserRating(parseInt(savedRating))
    }

    // Demo sharhlarni yuklash
    setReviews(demoReviews)
  }, [productId])

  // Yulduzcha o'lchamlari
  const getStarSize = () => {
    switch (size) {
      case 'small': return 16
      case 'large': return 28
      default: return 20
    }
  }

  // Reyting berish
  const handleRating = (newRating) => {
    if (!allowRating) return

    setUserRating(newRating)
    localStorage.setItem(`rating_${productId}`, newRating.toString())
    
    // Umumiy reytingni yangilash (demo)
    const newAverage = ((rating * totalReviews) + newRating) / (totalReviews + 1)
    setRating(newAverage)
  }

  // Sharh qo'shish
  const handleSubmitReview = () => {
    if (!newReview.comment.trim() || !newReview.name.trim() || newReview.rating === 0) {
      alert('Iltimos, barcha maydonlarni to\'ldiring')
      return
    }

    const review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    }

    setReviews(prev => [review, ...prev])
    setNewReview({ rating: 0, comment: '', name: '' })
    setShowReviewForm(false)

    // Umumiy reytingni yangilash
    const newAverage = ((rating * totalReviews) + newReview.rating) / (totalReviews + 1)
    setRating(newAverage)
  }

  // Foydali deb belgilash
  const handleHelpful = (reviewId) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ))
  }

  const starSize = getStarSize()
  const displayRating = userRating || rating

  return (
    <div style={{
      background: darkMode ? '#374151' : 'white',
      borderRadius: '12px',
      padding: '20px',
      border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
    }}>
      {/* Asosiy reyting */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '4px'
          }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={starSize}
                  fill={star <= (hoverRating || displayRating) ? '#fbbf24' : 'none'}
                  color="#fbbf24"
                  style={{ 
                    cursor: allowRating ? 'pointer' : 'default',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={() => allowRating && setHoverRating(star)}
                  onMouseLeave={() => allowRating && setHoverRating(0)}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
            <span style={{
              fontSize: size === 'large' ? '18px' : '16px',
              fontWeight: '600',
              color: darkMode ? 'white' : '#1f2937'
            }}>
              {displayRating.toFixed(1)}
            </span>
          </div>
          <div style={{
            fontSize: '14px',
            color: darkMode ? '#9ca3af' : '#6b7280'
          }}>
            {totalReviews + reviews.length} ta sharh
          </div>
        </div>

        {allowRating && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#4338ca'}
            onMouseLeave={(e) => e.target.style.background = '#4f46e5'}
          >
            <MessageCircle size={16} />
            Sharh yozish
          </button>
        )}
      </div>

      {/* Reyting taqsimoti */}
      <div style={{ marginBottom: '20px' }}>
        {[5, 4, 3, 2, 1].map(stars => {
          const count = reviews.filter(r => r.rating === stars).length
          const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0

          return (
            <div key={stars} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '4px'
            }}>
              <span style={{
                fontSize: '14px',
                color: darkMode ? '#d1d5db' : '#374151',
                minWidth: '20px'
              }}>
                {stars}
              </span>
              <Star size={14} fill="#fbbf24" color="#fbbf24" />
              <div style={{
                flex: 1,
                height: '6px',
                background: darkMode ? '#4b5563' : '#e5e7eb',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${percentage}%`,
                  height: '100%',
                  background: '#fbbf24',
                  transition: 'width 0.3s'
                }} />
              </div>
              <span style={{
                fontSize: '12px',
                color: darkMode ? '#9ca3af' : '#6b7280',
                minWidth: '30px'
              }}>
                {count}
              </span>
            </div>
          )
        })}
      </div>

      {/* Sharh yozish formasi */}
      {showReviewForm && (
        <div style={{
          background: darkMode ? '#4b5563' : '#f9fafb',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: darkMode ? 'white' : '#1f2937'
          }}>
            Sharh yozish
          </h4>

          <div style={{ marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '6px',
              color: darkMode ? '#d1d5db' : '#374151'
            }}>
              Reyting
            </label>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={24}
                  fill={star <= newReview.rating ? '#fbbf24' : 'none'}
                  color="#fbbf24"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '6px',
              color: darkMode ? '#d1d5db' : '#374151'
            }}>
              Ismingiz
            </label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ismingizni kiriting"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${darkMode ? '#6b7280' : '#d1d5db'}`,
                borderRadius: '6px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? 'white' : 'black',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '6px',
              color: darkMode ? '#d1d5db' : '#374151'
            }}>
              Sharhingiz
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Mahsulot haqida fikringizni yozing..."
              rows="3"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${darkMode ? '#6b7280' : '#d1d5db'}`,
                borderRadius: '6px',
                background: darkMode ? '#374151' : 'white',
                color: darkMode ? 'white' : 'black',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSubmitReview}
              style={{
                padding: '8px 16px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Yuborish
            </button>
            <button
              onClick={() => setShowReviewForm(false)}
              style={{
                padding: '8px 16px',
                background: darkMode ? '#6b7280' : '#e5e7eb',
                color: darkMode ? 'white' : '#374151',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      {/* Sharhlar ro'yxati */}
      {showReviews && reviews.length > 0 && (
        <div>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '16px',
            color: darkMode ? 'white' : '#1f2937'
          }}>
            Mijozlar sharhlari
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(showAllReviews ? reviews : reviews.slice(0, 3)).map(review => (
              <div key={review.id} style={{
                padding: '16px',
                background: darkMode ? '#4b5563' : '#f9fafb',
                borderRadius: '8px',
                border: `1px solid ${darkMode ? '#6b7280' : '#e5e7eb'}`
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: '#4f46e5',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <User size={16} color="white" />
                    </div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: darkMode ? 'white' : '#1f2937'
                      }}>
                        {review.name}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        <Calendar size={12} />
                        {new Date(review.date).toLocaleDateString('uz-UZ')}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        size={14}
                        fill={star <= review.rating ? '#fbbf24' : 'none'}
                        color="#fbbf24"
                      />
                    ))}
                  </div>
                </div>

                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  color: darkMode ? '#d1d5db' : '#374151',
                  marginBottom: '8px'
                }}>
                  {review.comment}
                </p>

                <button
                  onClick={() => handleHelpful(review.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'transparent',
                    border: 'none',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    fontSize: '12px',
                    cursor: 'pointer',
                    padding: '4px 0'
                  }}
                >
                  <ThumbsUp size={12} />
                  Foydali ({review.helpful})
                </button>
              </div>
            ))}
          </div>

          {reviews.length > 3 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                background: 'transparent',
                border: `1px solid ${darkMode ? '#6b7280' : '#d1d5db'}`,
                borderRadius: '6px',
                color: darkMode ? '#d1d5db' : '#374151',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {showAllReviews ? 'Kamroq ko\'rsatish' : `Yana ${reviews.length - 3} ta sharh ko'rish`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductRating