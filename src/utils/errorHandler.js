// Global Error Handler Utility

/**
 * Error types
 */
export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTH: 'AUTH_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
}

/**
 * Custom Error Class
 */
export class AppError extends Error {
  constructor(message, type = ErrorTypes.UNKNOWN, details = null) {
    super(message)
    this.name = 'AppError'
    this.type = type
    this.details = details
    this.timestamp = new Date().toISOString()
  }
}

/**
 * Error Handler
 */
export class ErrorHandler {
  static handle(error, context = '') {
    // Log error
    console.error(`[${context}] Error:`, error)

    // Determine error type
    let errorType = ErrorTypes.UNKNOWN
    let errorMessage = 'Kutilmagan xatolik yuz berdi'

    if (error instanceof AppError) {
      errorType = error.type
      errorMessage = error.message
    } else if (error.name === 'NetworkError' || error.message.includes('fetch')) {
      errorType = ErrorTypes.NETWORK
      errorMessage = 'Internet aloqasi yo\'q. Iltimos, internetni tekshiring.'
    } else if (error.name === 'ValidationError') {
      errorType = ErrorTypes.VALIDATION
      errorMessage = error.message || 'Ma\'lumotlar noto\'g\'ri'
    } else if (error.message) {
      errorMessage = error.message
    }

    return {
      type: errorType,
      message: errorMessage,
      details: error.details || null,
      timestamp: new Date().toISOString()
    }
  }

  static async handleAsync(fn, context = '') {
    try {
      return await fn()
    } catch (error) {
      return this.handle(error, context)
    }
  }

  static showUserError(error, showAlert = true) {
    const handled = this.handle(error)
    
    if (showAlert) {
      alert(`⚠️ ${handled.message}`)
    }

    return handled
  }
}

/**
 * Safe async wrapper
 */
export const safeAsync = async (fn, fallback = null, context = '') => {
  try {
    return await fn()
  } catch (error) {
    ErrorHandler.handle(error, context)
    return fallback
  }
}

/**
 * Safe sync wrapper
 */
export const safeSync = (fn, fallback = null, context = '') => {
  try {
    return fn()
  } catch (error) {
    ErrorHandler.handle(error, context)
    return fallback
  }
}

/**
 * Retry wrapper
 */
export const withRetry = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
      }
    }
  }
  
  throw lastError
}

/**
 * Validation helpers
 */
export const Validators = {
  required: (value, fieldName = 'Maydon') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      throw new AppError(`${fieldName} to'ldirilishi shart`, ErrorTypes.VALIDATION)
    }
    return true
  },

  minLength: (value, min, fieldName = 'Maydon') => {
    if (!value || value.length < min) {
      throw new AppError(
        `${fieldName} kamida ${min} ta belgidan iborat bo'lishi kerak`,
        ErrorTypes.VALIDATION
      )
    }
    return true
  },

  maxLength: (value, max, fieldName = 'Maydon') => {
    if (value && value.length > max) {
      throw new AppError(
        `${fieldName} maksimal ${max} ta belgidan iborat bo'lishi kerak`,
        ErrorTypes.VALIDATION
      )
    }
    return true
  },

  phone: (value) => {
    const phoneRegex = /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/
    if (!phoneRegex.test(value)) {
      throw new AppError(
        'Telefon raqam noto\'g\'ri formatda. Format: +998 XX XXX XX XX',
        ErrorTypes.VALIDATION
      )
    }
    return true
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      throw new AppError('Email noto\'g\'ri formatda', ErrorTypes.VALIDATION)
    }
    return true
  },

  number: (value, fieldName = 'Maydon') => {
    if (isNaN(value) || value === null || value === undefined) {
      throw new AppError(`${fieldName} raqam bo'lishi kerak`, ErrorTypes.VALIDATION)
    }
    return true
  },

  positive: (value, fieldName = 'Maydon') => {
    if (Number(value) <= 0) {
      throw new AppError(`${fieldName} musbat son bo'lishi kerak`, ErrorTypes.VALIDATION)
    }
    return true
  },

  range: (value, min, max, fieldName = 'Maydon') => {
    const num = Number(value)
    if (num < min || num > max) {
      throw new AppError(
        `${fieldName} ${min} va ${max} orasida bo'lishi kerak`,
        ErrorTypes.VALIDATION
      )
    }
    return true
  }
}

export default ErrorHandler
