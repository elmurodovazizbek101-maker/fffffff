import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { verifyAdminCredentials } from '../utils/auth'

const AdminAuthContext = createContext()

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

const SESSION_KEY = 'alisher_mobile_admin_session'

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  })
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (loginValue, password) => {
    setLoading(true)
    const isValid = await verifyAdminCredentials(loginValue, password)
    setLoading(false)

    if (!isValid) {
      return false
    }

    sessionStorage.setItem(SESSION_KEY, 'true')
    setIsAuthenticated(true)
    return true
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(() => ({ isAuthenticated, login, logout, loading }), [isAuthenticated, login, logout, loading])

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}
