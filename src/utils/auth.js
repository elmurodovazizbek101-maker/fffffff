// Admin credentials management - stored in localStorage
const ADMIN_CREDENTIALS_KEY = 'alisher_mobile_admin_credentials'

// Default admin credentials (first time only)
const DEFAULT_ADMIN = {
  login: 'superadmin',
  password: 'Admin@2024!Secure'
}

// Initialize admin credentials if not exists
export const initializeAdminCredentials = () => {
  const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY)
  if (!stored) {
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(DEFAULT_ADMIN))
    console.log('✅ Admin credentials initialized with default values')
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
    password: newPassword.trim()
  }

  localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(newCredentials))
  console.log('✅ Admin credentials updated successfully')

  return { success: true, message: 'Admin login va parol muvaffaqiyatli o\'zgartirildi!' }
}

// Verify admin login with username and password
export const verifyAdminCredentials = async (login, password) => {
  console.log('=== ADMIN LOGIN ATTEMPT ===')
  console.log('Input login:', JSON.stringify(login))
  console.log('Input password:', JSON.stringify(password))

  if (!login || !password) {
    console.log('❌ Missing credentials')
    return false
  }

  const adminCreds = getAdminCredentials()
  console.log('Stored admin login:', JSON.stringify(adminCreds.login))

  const normalizedLogin = String(login).trim()
  const normalizedPassword = String(password).trim()

  console.log('Normalized login:', JSON.stringify(normalizedLogin))
  console.log('Normalized password:', JSON.stringify(normalizedPassword))

  const loginMatch = normalizedLogin === adminCreds.login
  const passwordMatch = normalizedPassword === adminCreds.password

  console.log('Login match:', loginMatch)
  console.log('Password match:', passwordMatch)

  const isValid = loginMatch && passwordMatch

  console.log('Final result:', isValid ? '✅ SUCCESS' : '❌ FAILED')
  console.log('=========================')

  return isValid
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

  // Check if login already exists
  const normalizedLogin = customerData.login.trim().toLowerCase()
  const exists = customers.find(c => c.login.toLowerCase() === normalizedLogin)

  if (exists) {
    return { success: false, message: 'Bu login allaqachon band!' }
  }

  const newCustomer = {
    id: Date.now(),
    name: customerData.name,
    login: customerData.login,
    phone: customerData.phone,
    region: customerData.region,
    district: customerData.district,
    password: customerData.password,
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
    c.password === password
  )

  if (customer) {
    return { success: true, customer }
  }

  return { success: false, message: 'Login yoki parol noto\'g\'ri!' }
}
