import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import OriarebunPortfolio from './home.jsx'
import ProjectCaseStudyPage from './pages/ProjectCaseStudyPage.jsx'
import PageLoader from './components/PageLoader.jsx'

function AppRoutes() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 700)

    return () => window.clearTimeout(timer)
  }, [location.pathname])

  return (
    <>
      {isLoading && <PageLoader />}
      <Routes>
        <Route path="/" element={<OriarebunPortfolio />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
      </Routes>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
)
