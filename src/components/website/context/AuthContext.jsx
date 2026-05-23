import { createContext, useContext, useState, useEffect } from 'react'
import { registerCustomer, verifyCustomerCredentials } from '../../../utils/auth'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('alisher_mobile_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('alisher_mobile_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('alisher_mobile_user')
    }
  }, [user])

  const login = (phone, password) => {
    const result = verifyCustomerCredentials(phone, password)
    if (result.success) {
      setUser(result.customer)
      return { success: true }
    }
    return { success: false, message: result.message }
  }

  const logout = () => {
    setUser(null)
  }

  const register = (userData) => {
    const result = registerCustomer(userData)
    if (result.success) {
      setUser(result.customer)
      return { success: true, customer: result.customer }
    }
    return { success: false, message: result.message }
  }

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
