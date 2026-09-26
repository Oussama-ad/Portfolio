const NAV_ITEMS = [
  { key: 'about', icon: 'person-outline', activeIcon: 'person', label: 'About', rune: 'I' },
  { key: 'skills', icon: 'flash-outline', activeIcon: 'flash', label: 'Skills', rune: 'II' },
  { key: 'projects', icon: 'briefcase-outline', activeIcon: 'briefcase', label: 'Projects', rune: 'III' },
  { key: 'resume', icon: 'document-text-outline', activeIcon: 'document-text', label: 'Resume', rune: 'IV' },
  { key: 'contact', icon: 'mail-outline', activeIcon: 'mail', label: 'Contact', rune: 'V' },
]

function Navbar({ activePage, setActivePage }) {
  const handleNav = (key) => {
    setActivePage(key)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="navbar-frost-glow"></div>
      <ul className="navbar-list">
        {NAV_ITEMS.map(({ key, icon, activeIcon, label, rune }) => {
          const isActive = activePage === key
          return (
            <li className="navbar-item" key={key}>
              <button
                className={`navbar-link${isActive ? ' active' : ''}`}
                onClick={() => handleNav(key)}
                aria-current={isActive ? 'page' : undefined}
                data-nav-link={key}
              >
                <div className="nav-icon-wrapper">
                  <ion-icon name={isActive ? activeIcon : icon}></ion-icon>
                  {isActive && <span className="nav-active-pip"></span>}
                </div>
                <span className="nav-label">{label}</span>
                <span className="nav-rune">{rune}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
