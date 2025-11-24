import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Classify from './pages/Classify'
import Features from './pages/Features'
import About from './pages/About'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')


  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || 'home'
      setCurrentPage(path)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Update URL when page changes
  useEffect(() => {
    const path = currentPage === 'home' ? '/' : `/${currentPage}`
    window.history.pushState({ page: currentPage }, '', path)
  }, [currentPage])

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />
      case 'classify':
        return <Classify />
      case 'features':
        return <Features />
      case 'about':
        return <About />
      default:
        return <Home onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="app">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="app-main">
        {renderPage()}
      </main>
      <footer className="app-footer">
        <div className="container">
          <p>© 2025 GliomaNet - Kelompok 9 Certan </p>
        </div>
      </footer>
    </div>
  )
}

export default App
