import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import { verifyCustomerCredentials, registerCustomer } from '../utils/auth'

const CustomerAuthContext = createContext()

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext)
  if (!context) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider')
  }
  return context
}

const SESSION_KEY = 'alisher_mobile_customer_session'

export const CustomerAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    const session = localStorage.getItem(SESSION_KEY)
    return !!session
  })

  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window === 'undefined') return null
    const session = localStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  })

  const [loading, setLoading] = useState(false)

  const login = useCallback(async (loginValue, password) => {
    setLoading(true)
    
    try {
      const result = verifyCustomerCredentials(loginValue, password)
      setLoading(false)

      if (!result.success) {
        return { success: false, message: result.message }
      }

      // Save session
      localStorage.setItem(SESSION_KEY, JSON.stringify(result.customer))
      setIsAuthenticated(true)
      setCurrentUser(result.customer)
      
      return { success: true, customer: result.customer }
    } catch (error) {
      setLoading(false)
      return { success: false, message: 'Login jarayonida xatolik yuz berdi' }
    }
  }, [])

  const register = useCallback(async (userData) => {
    setLoading(true)
    
    try {
      const result = registerCustomer(userData)
      setLoading(false)

      if (!result.success) {
        return { success: false, message: result.message }
      }

      // Automatically login after registration
      localStorage.setItem(SESSION_KEY, JSON.stringify(result.customer))
      setIsAuthenticated(true)
      setCurrentUser(result.customer)
      
      return { success: true, customer: result.customer }
    } catch (error) {
      setLoading(false)
      return { success: false, message: 'Ro\'yxatdan o\'tishda xatolik yuz berdi' }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
    setCurrentUser(null)
  }, [])

  // Check if session is still valid on app start
  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY)
    if (session) {
      try {
        const user = JSON.parse(session)
        setCurrentUser(user)
        setIsAuthenticated(true)
      } catch (error) {
        // Invalid session, clear it
        localStorage.removeItem(SESSION_KEY)
        setIsAuthenticated(false)
        setCurrentUser(null)
      }
    }
  }, [])

  const value = useMemo(() => ({
    isAuthenticated,
    currentUser,
    login,
    register,
    logout,
    loading
  }), [isAuthenticated, currentUser, login, register, logout, loading])

  return (
    <CustomerAuthContext.Provider value={value}>
      {children}
    </CustomerAuthContext.Provider>
  )
}