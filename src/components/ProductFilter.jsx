import { useState, useEffect } from 'react'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { categories, priceRanges } from '../data/products'

const ProductFilter = ({ 
  filters, 
  onFiltersChange, 
  onSearch, 
  searchQuery = '',
  totalResults = 0,
  darkMode = false 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [localSearch, setLocalSearch] = useState(searchQuery)

  // Search input o'zgarishini kuzatish
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onSearch) {
        onSearch(localSearch)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [localSearch, onSearch])

  // Filtrni o'zgartirish
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    onFiltersChange(newFilters)
  }

  // Filtrlarni tozalash
  const clearFilters = () => {
    const clearedFilters = {
      category: 'all',
      priceRange: null,
      search: '',
      inStock: false,
      isNew: false,
      sortBy: 'featured'
    }
    onFiltersChange(clearedFilters)
    setLocalSearch('')
  }

  // Faol filtrlar sonini hisoblash
  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.category && filters.category !== 'all') count++
    if (filters.priceRange) count++
    if (filters.inStock) count++
    if (filters.isNew) count++
    if (filters.search) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div style={{
      background: darkMode ? '#374151' : 'white',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '24px',
      boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
    }}>
      {/* Qidiruv va asosiy filtrlar */}
      <div style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: isFilterOpen ? '20px' : '0'
      }}>
        {/* Qidiruv */}
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search size={20} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af'
          }} />
          <input
            type="text"
            placeholder="Mahsulot, brend yoki model qidirish..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '44px',
              paddingRight: '16px',
              paddingTop: '12px',
              paddingBottom: '12px',
              border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
              borderRadius: '8px',
              fontSize: '16px',
              background: darkMode ? '#4b5563' : '#f9fafb',
              color: darkMode ? 'white' : 'black',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
            onBlur={(e) => e.target.style.borderColor = darkMode ? '#4b5563' : '#d1d5db'}
          />
        </div>

        {/* Kategoriya tanlash */}
        <select
          value={filters.category || 'all'}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          style={{
            padding: '12px 16px',
            border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
            borderRadius: '8px',
            fontSize: '16px',
            minWidth: '150px',
            background: darkMode ? '#4b5563' : 'white',
            color: darkMode ? 'white' : 'black',
            outline: 'none'
          }}
        >
          <option value="all">Barcha brendlar</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name} ({category.count})
            </option>
          ))}
        </select>

        {/* Saralash */}
        <select
          value={filters.sortBy || 'featured'}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          style={{
            padding: '12px 16px',
            border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
            borderRadius: '8px',
            fontSize: '16px',
            minWidth: '150px',
            background: darkMode ? '#4b5563' : 'white',
            color: darkMode ? 'white' : 'black',
            outline: 'none'
          }}
        >
          <option value="featured">Tavsiya etilgan</option>
          <option value="name">Nomi bo'yicha</option>
          <option value="price-low">Arzon narx</option>
          <option value="price-high">Qimmat narx</option>
          <option value="rating">Reyting bo'yicha</option>
          <option value="newest">Yangi mahsulotlar</option>
        </select>

        {/* Qo'shimcha filtrlar tugmasi */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
            borderRadius: '8px',
            background: darkMode ? '#4b5563' : 'white',
            color: darkMode ? 'white' : '#374151',
            cursor: 'pointer',
            fontSize: '16px',
            position: 'relative'
          }}
        >
          <Filter size={18} />
          Filtrlar
          {activeFiltersCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown 
            size={16} 
            style={{
              transform: isFilterOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}
          />
        </button>
      </div>

      {/* Qo'shimcha filtrlar */}
      {isFilterOpen && (
        <div style={{
          borderTop: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
          paddingTop: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {/* Narx diapazoni */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: darkMode ? '#d1d5db' : '#374151',
              marginBottom: '8px'
            }}>
              Narx diapazoni
            </label>
            <select
              value={filters.priceRange || ''}
              onChange={(e) => handleFilterChange('priceRange', e.target.value || null)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                borderRadius: '6px',
                background: darkMode ? '#4b5563' : 'white',
                color: darkMode ? 'white' : 'black',
                fontSize: '14px'
              }}
            >
              <option value="">Barcha narxlar</option>
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Mavjudlik */}
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: darkMode ? '#d1d5db' : '#374151',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={filters.inStock || false}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: '#4f46e5'
                }}
              />
              Faqat mavjud mahsulotlar
            </label>
          </div>

          {/* Yangi mahsulotlar */}
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: darkMode ? '#d1d5db' : '#374151',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={filters.isNew || false}
                onChange={(e) => handleFilterChange('isNew', e.target.checked)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: '#4f46e5'
                }}
              />
              Yangi mahsulotlar
            </label>
          </div>

          {/* Filtrlarni tozalash */}
          {activeFiltersCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'end' }}>
              <button
                onClick={clearFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  background: 'transparent',
                  border: `1px solid ${darkMode ? '#6b7280' : '#9ca3af'}`,
                  borderRadius: '6px',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = darkMode ? '#4b5563' : '#f3f4f6'
                  e.target.style.borderColor = darkMode ? '#9ca3af' : '#6b7280'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.borderColor = darkMode ? '#6b7280' : '#9ca3af'
                }}
              >
                <X size={14} />
                Tozalash
              </button>
            </div>
          )}
        </div>
      )}

      {/* Natijalar soni */}
      {totalResults !== undefined && (
        <div style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
          fontSize: '14px',
          color: darkMode ? '#9ca3af' : '#6b7280'
        }}>
          <span style={{ fontWeight: '600' }}>{totalResults}</span> ta mahsulot topildi
          {filters.search && (
            <span> "{filters.search}" so'rovi bo'yicha</span>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductFilter