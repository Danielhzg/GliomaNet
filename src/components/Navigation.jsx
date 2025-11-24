import './Navigation.css'

function Navigation({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠', path: '/' },
    { id: 'classify', label: 'Klasifikasi', icon: '🔍', path: '/classify' },
    { id: 'features', label: 'Fitur', icon: '📚', path: '/features' },
    { id: 'about', label: 'Tentang', icon: 'ℹ️', path: '/about' }
  ]

  const isActive = (id) => {
    return currentPage === id || currentPage === id.replace('/', '')
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div 
          className="nav-logo"
          onClick={() => onNavigate('home')}
          style={{ cursor: 'pointer' }}
        >
          <img src="/certan.png" alt="GliomaNet Logo" className="logo-icon" />
          <span className="logo-text">GliomaNet</span>
        </div>
        
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-link ${isActive(item.id) ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
