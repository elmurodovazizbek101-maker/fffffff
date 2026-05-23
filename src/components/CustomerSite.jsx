import { useEffect, Suspense, lazy, memo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useData } from '../context/DataContext'
import LoadingSpinner from './LoadingSpinner'
import NotFoundPage from './NotFoundPage'

// Lazy load components
const WebsiteLayout = lazy(() => import('./website/WebsiteLayout'))
const HomePage = lazy(() => import('./website/pages/HomePage'))
const ProductsPage = lazy(() => import('./website/pages/ProductsPage'))
const AboutPage = lazy(() => import('./website/pages/AboutPage'))
const CategoriesPage = lazy(() => import('./website/pages/CategoriesPage'))

const CustomerSite = memo(() => {
  const { loading } = useData()

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <LoadingSpinner size="large" text="Alisher Mobile yuklanmoqda..." />
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <LoadingSpinner size="medium" />
      </div>
    }>
      <WebsiteLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </WebsiteLayout>
    </Suspense>
  )
})

CustomerSite.displayName = 'CustomerSite'

export default CustomerSite
