// Admin credentials
const ADMIN_LOGIN = 'admin'
const ADMIN_PASSWORD = 'admin123'

// Verify admin login with username and password
export const verifyAdminCredentials = async (login, password) => {
  console.log('=== ADMIN LOGIN ATTEMPT ===')
  console.log('Input login:', JSON.stringify(login))
  console.log('Input password:', JSON.stringify(password))
  console.log('Expected login:', JSON.stringify(ADMIN_LOGIN))
  console.log('Expected password:', JSON.stringify(ADMIN_PASSWORD))

  if (!login || !password) {
    console.log('❌ Missing credentials')
    return false
  }

  const normalizedLogin = String(login).trim().toLowerCase()
  const normalizedPassword = String(password).trim()

  console.log('Normalized login:', JSON.stringify(normalizedLogin))
  console.log('Normalized password:', JSON.stringify(normalizedPassword))

  const loginMatch = normalizedLogin === ADMIN_LOGIN.toLowerCase()
  const passwordMatch = normalizedPassword === ADMIN_PASSWORD

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
