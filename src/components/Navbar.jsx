const NAV_ITEMS = [
  { key: 'about', icon: 'person-outline', label: 'About' },
  { key: 'skills', icon: 'construct-outline', label: 'Skills' },
  { key: 'projects', icon: 'briefcase-outline', label: 'Projects' },
  { key: 'resume', icon: 'document-text-outline', label: 'Resume' },
  { key: 'contact', icon: 'mail-outline', label: 'Contact' },
]

function Navbar({ activePage, setActivePage }) {
  const handleNav = (key) => {
    setActivePage(key)
    window.scrollTo(0, 0)
  }

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {NAV_ITEMS.map(({ key, icon, label }) => (
          <li className="navbar-item" key={key}>
            <button
              className={`navbar-link${activePage === key ? ' active' : ''}`}
              onClick={() => handleNav(key)}
            >
              <ion-icon name={icon}></ion-icon>
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
