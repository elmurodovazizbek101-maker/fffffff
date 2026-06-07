import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Tag, RefreshCw } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useData } from '../../context/DataContext'

const Categories = () => {
  const { t } = useLanguage()
  const { categories, addCategory, updateCategory, deleteCategory } = useData()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  const [newCategory, setNewCategory] = useState({
    name: '',
    color: '#4f46e5'
  })

  // Debug: Console log to check if functions are available
  useEffect(() => {
    console.log('Categories functions check:', {
      addCategory: typeof addCategory,
      updateCategory: typeof updateCategory,
      deleteCategory: typeof deleteCategory,
      categoriesCount: categories?.length
    })
  }, [addCategory, updateCategory, deleteCategory, categories])

  const colors = [
    '#007AFF', '#1428A0', '#FF6900', '#1BA345', '#4285F4', '#FF0000',
    '#FF6B35', '#DC143C', '#FF4500', '#124191', '#F7DC06', '#EB0028',
    '#FFC400', '#00BCD4', '#9C27B0', '#2E2E2E', '#10b981', '#f59e0b'
  ]

  const defaultCategories = [
    { name: 'Apple', color: '#007AFF' },
    { name: 'Samsung', color: '#1428A0' },
    { name: 'Xiaomi', color: '#FF6900' },
    { name: 'Oppo', color: '#1BA345' },
    { name: 'Vivo', color: '#4285F4' },
    { name: 'Huawei', color: '#FF0000' },
    { name: 'Honor', color: '#FF6B35' },
    { name: 'ROG', color: '#DC143C' },
    { name: 'Redmi', color: '#FF4500' },
    { name: 'Nokia', color: '#124191' },
    { name: 'Poco', color: '#F7DC06' },
    { name: 'OnePlus', color: '#EB0028' },
    { name: 'Realme', color: '#FFC400' },
    { name: 'Tecno', color: '#00BCD4' },
    { name: 'Infinix', color: '#9C27B0' },
    { name: 'Nothing', color: '#2E2E2E' }
  ]

  const handleAddCategory = (e) => {
    e.preventDefault()
    console.log('Adding category:', newCategory)
    
    if (!newCategory.name.trim()) {
      alert('Kategoriya nomini kiriting!')
      return
    }

    try {
      const result = addCategory(newCategory)
      console.log('Category added:', result)
      setNewCategory({ name: '', color: '#4f46e5' })
      setShowAddModal(false)
      alert('Kategoriya muvaffaqiyatli qo\'shildi!')
    } catch (error) {
      console.error('Error adding category:', error)
      alert('Kategoriya qo\'shishda xatolik!')
    }
  }

  const handleEditCategory = (e) => {
    e.preventDefault()
    console.log('Editing category:', editingCategory)
    
    if (!editingCategory.name.trim()) {
      alert('Kategoriya nomini kiriting!')
      return
    }

    try {
      updateCategory(editingCategory.id, editingCategory)
      console.log('Category updated')
      setEditingCategory(null)
      alert('Kategoriya muvaffaqiyatli yangilandi!')
    } catch (error) {
      console.error('Error updating category:', error)
      alert('Kategoriya yangilashda xatolik!')
    }
  }

  const handleDeleteCategory = (id) => {
    console.log('Attempting to delete category:', id)
    
    if (window.confirm('Haqiqatan ham bu kategoriyani o\'chirmoqchimisiz?')) {
      try {
        deleteCategory(id)
        console.log('Category deleted:', id)
        alert('Kategoriya muvaffaqiyatli o\'chirildi!')
      } catch (error) {
        console.error('Error deleting category:', error)
        alert('Kategoriya o\'chirishda xatolik!')
      }
    }
  }

  const handleEditClick = (category) => {
    console.log('Edit button clicked for category:', category)
    setEditingCategory({...category})
  }

  const resetToDefaultCategories = () => {
    if (window.confirm('Barcha kategoriyalar o\'chiriladi va standart kategoriyalar qayta yuklanadi. Davom etasizmi?')) {
      console.log('Resetting categories to default...')
      try {
        // localStorage ni tozalash
        localStorage.removeItem('alisher_mobile_categories')
        // Sahifani qayta yuklash (kategoriyalar default holatga qaytadi)
        window.location.reload()
      } catch (error) {
        console.error('Error resetting categories:', error)
        alert('Reset qilishda xatolik!')
      }
    }
  }

  const addAllMissingCategories = () => {
    console.log('Adding all missing categories...')
    try {
      const existingNames = categories.map(cat => cat.name.toLowerCase())
      const missingCategories = defaultCategories.filter(
        def => !existingNames.includes(def.name.toLowerCase())
      )
      
      console.log('Missing categories:', missingCategories)
      
      missingCategories.forEach(category => {
        addCategory(category)
      })
      
      if (missingCategories.length > 0) {
        alert(`${missingCategories.length} ta yangi kategoriya qo'shildi!`)
      } else {
        alert('Barcha kategoriyalar allaqachon mavjud!')
      }
    } catch (error) {
      console.error('Error adding missing categories:', error)
      alert('Kategoriyalar qo\'shishda xatolik!')
    }
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            {t('categories')}
          </h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            Mahsulot kategoriyalarini boshqarish
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={addAllMissingCategories}
            className="btn btn-success"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            type="button"
          >
            <Plus size={16} />
            Barcha brendlarni qo'shish
          </button>
          
          <button
            onClick={resetToDefaultCategories}
            className="btn btn-warning"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            type="button"
          >
            <RefreshCw size={16} />
            Reset
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={20} />
            {t('create')}
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px'
      }}>
        {categories && categories.length > 0 ? categories.map((category, index) => (
          <div key={`category-${category.id || index}`} className="card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: category.color || '#4f46e5',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Tag size={20} color="white" />
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#1f2937'
                }}>
                  {category.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {category.productCount || 0} ta mahsulot
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Edit button clicked:', category)
                  handleEditClick(category)
                }}
                className="btn btn-primary"
                style={{
                  padding: '10px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  minHeight: '40px',
                  minWidth: '60px'
                }}
                title="Kategoriyani tahrirlash"
                type="button"
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Delete button clicked:', category)
                  handleDeleteCategory(category.id)
                }}
                className="btn btn-danger"
                style={{
                  padding: '10px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  minHeight: '40px',
                  minWidth: '60px'
                }}
                title="Kategoriyani o'chirish"
                type="button"
              >
                <Trash2 size={14} />
                Del
              </button>
            </div>
          </div>
        )) : (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            <Tag size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <h3>Kategoriyalar topilmadi</h3>
            <p>Yangi kategoriya qo'shish uchun yuqoridagi tugmalardan foydalaning</p>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div 
          className="modal-overlay" 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAddModal(false)
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
          }}
        >
          <div 
            className="modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              width: '90%',
              maxWidth: '500px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Yangi kategoriya qo'shish
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
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

            <form onSubmit={handleAddCategory}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Kategoriya nomi
                </label>
                <input
                  type="text"
                  className="input"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Rang
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px'
                }}>
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewCategory({...newCategory, color})}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: color,
                        border: newCategory.color === color ? '3px solid #1f2937' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div 
          className="modal-overlay" 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditingCategory(null)
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
          }}
        >
          <div 
            className="modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              width: '90%',
              maxWidth: '500px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Kategoriyani tahrirlash
              </h3>
              <button
                onClick={() => setEditingCategory(null)}
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

            <form onSubmit={handleEditCategory}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Kategoriya nomi
                </label>
                <input
                  type="text"
                  className="input"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Rang
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px'
                }}>
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setEditingCategory({...editingCategory, color})}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: color,
                        border: editingCategory.color === color ? '3px solid #1f2937' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="btn btn-secondary"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories
