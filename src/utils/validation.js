// Input validation and sanitization utilities

// Sanitize HTML to prevent XSS
export const sanitizeHTML = (str) => {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Sanitize input for safe storage
export const sanitizeInput = (str) => {
  if (!str) return ''
  return str.trim().replace(/[<>]/g, '')
}

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (Uzbekistan format)
export const validatePhone = (phone) => {
  const phoneRegex = /^\+998[0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Validate password strength
export const validatePassword = (password) => {
  const errors = []
  
  if (!password) {
    errors.push('Parol kiritilishi shart')
    return { isValid: false, errors }
  }
  
  if (password.length < 6) {
    errors.push('Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
  }
  
  if (!/[A-Za-z]/.test(password)) {
    errors.push('Parolda kamida bitta harf bo\'lishi kerak')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Parolda kamida bitta raqam bo\'lishi kerak')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: getPasswordStrength(password)
  }
}

// Get password strength
const getPasswordStrength = (password) => {
  let score = 0
  
  if (password.length >= 8) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  
  if (score < 2) return 'Zaif'
  if (score < 4) return 'O\'rtacha'
  return 'Kuchli'
}

// Validate required fields
export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} kiritilishi shart`
  }
  return null
}

// Validate number range
export const validateNumberRange = (value, min, max, fieldName) => {
  const num = parseFloat(value)
  
  if (isNaN(num)) {
    return `${fieldName} raqam bo'lishi kerak`
  }
  
  if (num < min) {
    return `${fieldName} ${min} dan kichik bo'lmasligi kerak`
  }
  
  if (num > max) {
    return `${fieldName} ${max} dan katta bo'lmasligi kerak`
  }
  
  return null
}

// Validate text length
export const validateLength = (value, min, max, fieldName) => {
  if (!value) {
    return `${fieldName} kiritilishi shart`
  }
  
  const length = value.toString().length
  
  if (length < min) {
    return `${fieldName} kamida ${min} ta belgidan iborat bo'lishi kerak`
  }
  
  if (length > max) {
    return `${fieldName} ${max} ta belgidan ko'p bo'lmasligi kerak`
  }
  
  return null
}

// Validate URL format
export const validateURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Validate price format
export const validatePrice = (price) => {
  const priceRegex = /^\d+(\.\d{1,2})?$/
  return priceRegex.test(price.toString())
}

// Validate barcode format
export const validateBarcode = (barcode) => {
  const barcodeRegex = /^[0-9]{8,13}$/
  return barcodeRegex.test(barcode)
}

// Form validation helper
export const validateForm = (data, rules) => {
  const errors = {}
  let isValid = true
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field]
    const value = data[field]
    
    // Required validation
    if (rule.required) {
      const error = validateRequired(value, rule.label || field)
      if (error) {
        errors[field] = error
        isValid = false
        return
      }
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !rule.required) return
    
    // Length validation
    if (rule.minLength || rule.maxLength) {
      const error = validateLength(
        value,
        rule.minLength || 0,
        rule.maxLength || Infinity,
        rule.label || field
      )
      if (error) {
        errors[field] = error
        isValid = false
        return
      }
    }
    
    // Number range validation
    if (rule.min !== undefined || rule.max !== undefined) {
      const error = validateNumberRange(
        value,
        rule.min || -Infinity,
        rule.max || Infinity,
        rule.label || field
      )
      if (error) {
        errors[field] = error
        isValid = false
        return
      }
    }
    
    // Email validation
    if (rule.type === 'email' && !validateEmail(value)) {
      errors[field] = 'Email formati noto\'g\'ri'
      isValid = false
      return
    }
    
    // Phone validation
    if (rule.type === 'phone' && !validatePhone(value)) {
      errors[field] = 'Telefon raqam formati noto\'g\'ri (+998XXXXXXXXX)'
      isValid = false
      return
    }
    
    // URL validation
    if (rule.type === 'url' && !validateURL(value)) {
      errors[field] = 'URL formati noto\'g\'ri'
      isValid = false
      return
    }
    
    // Price validation
    if (rule.type === 'price' && !validatePrice(value)) {
      errors[field] = 'Narx formati noto\'g\'ri'
      isValid = false
      return
    }
    
    // Barcode validation
    if (rule.type === 'barcode' && !validateBarcode(value)) {
      errors[field] = 'Barcode formati noto\'g\'ri (8-13 raqam)'
      isValid = false
      return
    }
    
    // Custom validation
    if (rule.validator) {
      const error = rule.validator(value)
      if (error) {
        errors[field] = error
        isValid = false
        return
      }
    }
  })
  
  return { isValid, errors }
}

// Real-time validation hook
export const useValidation = (initialData, rules) => {
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  
  const validateField = (field, value) => {
    const rule = rules[field]
    if (!rule) return null
    
    const fieldData = { [field]: value }
    const fieldRules = { [field]: rule }
    const result = validateForm(fieldData, fieldRules)
    
    return result.errors[field] || null
  }
  
  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
    
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }
  
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, data[field])
    setErrors(prev => ({ ...prev, [field]: error }))
  }
  
  const validate = () => {
    const result = validateForm(data, rules)
    setErrors(result.errors)
    setTouched(Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
    return result
  }
  
  return {
    data,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    isValid: Object.keys(errors).length === 0
  }
}