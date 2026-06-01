import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useData } from '../context/DataContext'

const WishlistButton = ({ 
  product, 
  size = 'medium', 
  showText = false, 
  darkMode = false,
  className = '',
  style = {} 
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useData()
  const [isInList, setIsInList] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Sevimlilar holatini kuzatish
  useEffect(() => {
    setIsInList(isInWishlist(product.id))
  }, [product.id, isInWishlist])

  // Sevimlilar ro'yxatiga qo'shish/olib tashlash
  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAnimating(true)
    
    if (isInList) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }

    // Animatsiya tugagandan keyin holatni yangilash
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  // O'lcham bo'yicha stillar
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: '32px',
          height: '32px',
          iconSize: 16,
          fontSize: '12px',
          padding: showText ? '6px 12px' : '8px'
        }
      case 'large':
        return {
          width: '48px',
          height: '48px',
          iconSize: 24,
          fontSize: '16px',
          padding: showText ? '12px 20px' : '12px'
        }
      default: // medium
        return {
          width: '40px',
          height: '40px',
          iconSize: 20,
          fontSize: '14px',
          padding: showText ? '8px 16px' : '10px'
        }
    }
  }

  const sizeStyles = getSizeStyles()

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: showText ? '6px' : '0',
    width: showText ? 'auto' : sizeStyles.width,
    height: sizeStyles.height,
    padding: sizeStyles.padding,
    border: 'none',
    borderRadius: showText ? '8px' : '50%',
    background: isInList 
      ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
      : darkMode 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.05)',
    color: isInList ? 'white' : darkMode ? '#d1d5db' : '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
    boxShadow: isInList 
      ? '0 4px 12px rgba(239, 68, 68, 0.3)' 
      : '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: sizeStyles.fontSize,
    fontWeight: '500',
    ...style
  }

  const hoverStyle = {
    transform: 'scale(1.05)',
    background: isInList 
      ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
      : darkMode 
        ? 'rgba(255, 255, 255, 0.2)' 
        : 'rgba(0, 0, 0, 0.1)',
    boxShadow: isInList 
      ? '0 6px 16px rgba(239, 68, 68, 0.4)' 
      : '0 4px 8px rgba(0, 0, 0, 0.15)'
  }

  return (
    <button
      onClick={handleToggleWishlist}
      className={className}
      style={buttonStyle}
      onMouseEnter={(e) => {
        Object.assign(e.target.style, hoverStyle)
      }}
      onMouseLeave={(e) => {
        Object.assign(e.target.style, buttonStyle)
      }}
      title={isInList ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo\'shish'}
      aria-label={isInList ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo\'shish'}
    >
      <Heart 
        size={sizeStyles.iconSize} 
        fill={isInList ? 'currentColor' : 'none'}
        style={{
          transition: 'all 0.3s ease',
          transform: isAnimating ? 'scale(1.2)' : 'scale(1)'
        }}
      />
      {showText && (
        <span>
          {isInList ? 'Sevimli' : 'Sevimlilar'}
        </span>
      )}
    </button>
  )
}

export default WishlistButton