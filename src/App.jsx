import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import AdminPanel from './components/AdminPanel'
import CustomerSite from './components/CustomerSite'
import ErrorBoundary from './components/ErrorBoundary'
import { LanguageProvider } from './context/LanguageContext'
import { DataProvider } from './context/DataContext'
import { TelegramProvider } from './context/TelegramService'
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext'

function AppRoutes() {
  const { isAuthenticated, login, logout } = useAdminAuth()

  return (
    <Routes>
      <Route
        path="/admin/login"
        element={
          isAuthenticated ?
            <Navigate to="/admin" replace /> :
            <LoginPage onLogin={login} />
        }
      />
      <Route
        path="/admin/*"
        element={
          isAuthenticated ?
            <AdminPanel onLogout={logout} /> :
            <Navigate to="/admin/login" replace />
        }
      />
      <Route path="*" element={<CustomerSite />} />
    </Routes>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <DataProvider>
          <TelegramProvider>
            <AdminAuthProvider>
              <Router>
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
