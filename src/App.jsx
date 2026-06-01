import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import { LanguageProvider } from './context/LanguageContext'
import { DataProvider } from './context/DataContext'
import { TelegramProvider } from './context/TelegramService'
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext'
import { initializeAdminCredentials } from './utils/auth'

// Lazy load components for better performance
const LoginPage = lazy(() => import('./components/LoginPage'))
const AdminPanel = lazy(() => import('./components/AdminPanel'))
const CustomerSite = lazy(() => import('./components/CustomerSite'))

// Initialize admin credentials on app load
initializeAdminCredentials()

// Loading fallback component
const PageLoader = ({ text = 'Sahifa yuklanmoqda...' }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }}>
    <LoadingSpinner 
      size="large" 
      text={text}
      type="default"
    />
  </div>
)

function AppRoutes() {
  const { isAuthenticated, login, logout } = useAdminAuth()

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/admin/login"
          element={
            isAuthenticated ?
              <Navigate to="/admin" replace /> :
              <Suspense fallback={<PageLoader text="Admin login yuklanmoqda..." />}>
                <LoginPage onLogin={login} />
              </Suspense>
          }
        />
        <Route
          path="/admin/*"
          element={
            isAuthenticated ?
              <Suspense fallback={<PageLoader text="Admin panel yuklanmoqda..." />}>
                <AdminPanel onLogout={logout} />
              </Suspense> :
              <Navigate to="/admin/login" replace />
          }
        />
        <Route 
          path="*" 
          element={
            <Suspense fallback={<PageLoader text="Sayt yuklanmoqda..." />}>
              <CustomerSite />
            </Suspense>
          } 
        />
      </Routes>
    </Suspense>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <DataProvider>
          <TelegramProvider>
            <AdminAuthProvider>
              <Router
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true
                }}
              >
                <AppRoutes />
              </Router>
            </AdminAuthProvider>
          </TelegramProvider>
        </DataProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App
