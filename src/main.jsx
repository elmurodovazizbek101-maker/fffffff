import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Clean up old sales-related localStorage data
const cleanupSalesData = () => {
  try {
    // Remove sales-related localStorage items
    localStorage.removeItem('alisher_mobile_admin_cart')
    localStorage.removeItem('alisher_mobile_admin_favorites')
    localStorage.removeItem('alisher_mobile_sales')
    console.log('Sales data cleaned up from localStorage')
  } catch (error) {
    console.error('Error cleaning up sales data:', error)
  }
}

// Run cleanup on app start
cleanupSalesData()

// Service Worker registration for caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('✅ SW registered:', registration.scope)
      })
      .catch((error) => {
        console.log('❌ SW registration failed:', error)
      })
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
