// Admin credentials management - stored in localStorage
const ADMIN_CREDENTIALS_KEY = 'alisher_mobile_admin_credentials'

// Simple hash function for password security
const simpleHash = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString(36)
}

// Verify hash
const verifyHash = (password, hash) => {
  return simpleHash(password) === hash
}

// Default admin credentials (first time only)
const DEFAULT_ADMIN = {
  login: 'superadmin',
  password: simpleHash('Admin@2024!Secure') // Hashed password
}

// Force reset admin credentials to default (for debugging)
export const resetAdminCredentials = () => {
  localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(DEFAULT_ADMIN))
  console.log('Admin credentials reset to default:', DEFAULT_ADMIN)
  return DEFAULT_ADMIN
}

// Debug function to check current credentials
export const debugAdminCredentials = () => {
  const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY)
  console.log('Stored admin credentials:', stored)
  if (stored) {
    const parsed = JSON.parse(stored)
    console.log('Parsed credentials:', parsed)
    console.log('Expected login:', 'superadmin')
    console.log('Expected password hash:', simpleHash('Admin@2024!Secure'))
    console.log('Stored password hash:', parsed.password)
    console.log('Hash match:', parsed.password === simpleHash('Admin@2024!Secure'))
  }
  return stored
}

// Reset admin credentials if hash mismatch (for migration)
export const migrateAdminCredentials = () => {
  try {
    const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Check if password is already hashed
      if (parsed.password && !parsed.password.includes('-')) {
        // Old plain text password, need to hash it
        const newCreds = {
          login: parsed.login || 'superadmin',
          password: simpleHash(parsed.password)
        }
        localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(newCreds))
        return newCreds
      }
    }
  } catch (error) {
    // If any error, reset to default
    return resetAdminCredentials()
  }
  return null
}

// Initialize admin credentials if not exists
export const initializeAdminCredentials = () => {
  // First try to migrate existing credentials
  const migrated = migrateAdminCredentials()
  if (migrated) {
    return migrated
  }

  const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY)
  if (!stored) {
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(DEFAULT_ADMIN))
    return DEFAULT_ADMIN
  }
  return JSON.parse(stored)
}

// Get current admin credentials
export const getAdminCredentials = () => {
  const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY)
  if (!stored) {
    return initializeAdminCredentials()
  }
  return JSON.parse(stored)
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
    password: simpleHash(newPassword.trim()) // Hash the password
  }

  localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(newCredentials))

  return { success: true, message: 'Admin login va parol muvaffaqiyatli o\'zgartirildi!' }
}

// Verify admin login with username and password
export const verifyAdminCredentials = async (login, password) => {
  if (!login || !password) {
    return false
  }

  const adminCreds = getAdminCredentials()
  const normalizedLogin = String(login).trim()
  const normalizedPassword = String(password).trim()

  const loginMatch = normalizedLogin === adminCreds.login
  const passwordMatch = verifyHash(normalizedPassword, adminCreds.password)

  return loginMatch && passwordMatch
}

// Customer authentication - stored in localStorage
const CUSTOMERS_KEY = 'alisher_mobile_customers'

export const getCustomers = () => {
  const data = localStorage.getItem(CUSTOMERS_KEY)
  return data ? JSON.parse(data) : []
}

export const saveCustomers = (customers) => {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers))
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
