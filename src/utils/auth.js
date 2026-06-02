// Admin credentials management - stored in localStorage
const ADMIN_CREDENTIALS_KEY = 'alisher_mobile_admin_credentials'

// Credentials cache
let credentialsCache = null

// Default admin credentials - PLAIN TEXT for simplicity
const DEFAULT_ADMIN = {
  login: 'dead',
  password: '18042011' // Plain text password
}

// Force reset admin credentials to default (for debugging)
export const resetAdminCredentials = () => {
  localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(DEFAULT_ADMIN))
  console.log('Admin credentials reset to default')
  return DEFAULT_ADMIN
}

// Initialize admin credentials if not exists
export const initializeAdminCredentials = () => {
  // Cache dan qaytarish agar mavjud bo'lsa
  if (credentialsCache) {
    return credentialsCache
  }

  const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY)
  if (!stored) {
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(DEFAULT_ADMIN))
    credentialsCache = DEFAULT_ADMIN
    return DEFAULT_ADMIN
  }
  
  try {
    const parsed = JSON.parse(stored)
    credentialsCache = parsed
    return parsed
  } catch (error) {
    // If error, reset to default
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(DEFAULT_ADMIN))
    credentialsCache = DEFAULT_ADMIN
    return DEFAULT_ADMIN
  }
}

// Get current admin credentials
export const getAdminCredentials = () => {
  // Cache dan qaytarish
  if (credentialsCache) {
    return credentialsCache
  }

  const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY)
  if (!stored) {
    return initializeAdminCredentials()
  }
  
  try {
    const parsed = JSON.parse(stored)
    credentialsCache = parsed
    return parsed
  } catch (error) {
    return initializeAdminCredentials()
  }
}

// Update admin credentials (only admin can do this)
export const updateAdminCredentials = (newLogin, newPassword) => {
  if (!newLogin || !newPassword) {
    return { success: false, message: 'Login va parol bo\'sh bo\'lmasligi kerak!' }
  }

  if (newLogin.length < 4) {
    return { success: false, message: 'Login kamida 4 ta belgidan iborat bo\'lishi kerak!' }
  }

  if (newPassword.length < 6) {
    return { success: false, message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak!' }
  }

  const newCredentials = {
    login: newLogin.trim(),
    password: newPassword.trim() // Plain text password
  }

  localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(newCredentials))
  
  // Cache ni yangilash
  credentialsCache = newCredentials

  return { success: true, message: 'Admin login va parol muvaffaqiyatli o\'zgartirildi!' }
}

// Verify admin login with username and password - SIMPLE VERSION
export const verifyAdminCredentials = async (login, password) => {
  if (!login || !password) {
    return false
  }

  const adminCreds = getAdminCredentials()
  const normalizedLogin = String(login).trim()
  const normalizedPassword = String(password).trim()

  // Simple plain text comparison
  const loginMatch = normalizedLogin === adminCreds.login
  const passwordMatch = normalizedPassword === adminCreds.password

  return loginMatch && passwordMatch
}

// Customer authentication - stored in localStorage
const CUSTOMERS_KEY = 'alisher_mobile_customers'
let customersCache = null

// Simple hash for customer passwords (keep this for customers)
const simpleHash = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString(36)
}

const verifyHash = (password, hash) => {
  return simpleHash(password) === hash
}

export const getCustomers = () => {
  // Cache dan qaytarish
  if (customersCache) {
    return customersCache
  }

  const data = localStorage.getItem(CUSTOMERS_KEY)
  const customers = data ? JSON.parse(data) : []
  customersCache = customers
  return customers
}

export const saveCustomers = (customers) => {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers))
  customersCache = customers // Cache ni yangilash
}

export const registerCustomer = (customerData) => {
  const customers = getCustomers()

  // Input validation and sanitization
  const sanitizedData = {
    name: customerData.name?.trim().replace(/[<>]/g, ''),
    login: customerData.login?.trim().toLowerCase().replace(/[<>]/g, ''),
    phone: customerData.phone?.trim().replace(/[^+\d\s()-]/g, ''),
    region: customerData.region?.trim().replace(/[<>]/g, ''),
    district: customerData.district?.trim().replace(/[<>]/g, ''),
    password: customerData.password?.trim()
  }

  // Validation
  if (!sanitizedData.name || sanitizedData.name.length < 2) {
    return { success: false, message: 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak!' }
  }

  if (!sanitizedData.login || sanitizedData.login.length < 3) {
    return { success: false, message: 'Login kamida 3 ta belgidan iborat bo\'lishi kerak!' }
  }

  if (!sanitizedData.password || sanitizedData.password.length < 6) {
    return { success: false, message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak!' }
  }

  // Check if login already exists
  const exists = customers.find(c => c.login.toLowerCase() === sanitizedData.login)

  if (exists) {
    return { success: false, message: 'Bu login allaqachon band!' }
  }

  const newCustomer = {
    id: Date.now(),
    name: sanitizedData.name,
    login: sanitizedData.login,
    phone: sanitizedData.phone,
    region: sanitizedData.region,
    district: sanitizedData.district,
    password: simpleHash(sanitizedData.password), // Hash customer password too
    joinDate: new Date().toISOString()
  }

  customers.push(newCustomer)
  saveCustomers(customers)

  return { success: true, customer: newCustomer }
}

export const verifyCustomerCredentials = (login, password) => {
  const customers = getCustomers()
  const normalizedLogin = login.trim().toLowerCase()

  const customer = customers.find(c =>
    c.login.toLowerCase() === normalizedLogin &&
    verifyHash(password, c.password)
  )

  if (customer) {
    return { success: true, customer }
  }

  return { success: false, message: 'Login yoki parol noto\'g\'ri!' }
}
