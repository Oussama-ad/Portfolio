import { useState, useEffect } from 'react'

// Roles to cycle through
const ROLES = ['Full Stack Developer', 'AI Enthusiast', 'Backend Engineer', 'CS Student @ ESI']

// Typewriter hook — fixed off-by-one: displayed is computed from state, not inside timeout
function useTypewriter(texts, typingSpeed = 80, deletingSpeed = 45, pauseMs = 1800) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPausing, setIsPausing] = useState(false)

  useEffect(() => {
    const current = texts[roleIndex]

    // Pause after full word is typed
    if (isPausing) {
      const t = setTimeout(() => {
        setIsPausing(false)
        setIsDeleting(true)
      }, pauseMs)
      return () => clearTimeout(t)
    }

    if (!isDeleting) {
      if (charIndex < current.length) {
        // Still typing
        const t = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed)
        return () => clearTimeout(t)
      } else {
        // Finished typing — start pause
        setIsPausing(true)
      }
    } else {
      if (charIndex > 0) {
        // Still deleting
        const t = setTimeout(() => setCharIndex((c) => c - 1), deletingSpeed)
        return () => clearTimeout(t)
      } else {
        // Finished deleting — move to next role
        setIsDeleting(false)
        setRoleIndex((r) => (r + 1) % texts.length)
      }
    }
  }, [charIndex, isDeleting, isPausing, roleIndex, texts, typingSpeed, deletingSpeed, pauseMs])

  // Displayed text is derived directly — no stale closure issue
  return texts[roleIndex].slice(0, charIndex)
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const role = useTypewriter(ROLES)

  return (
    <aside className={`sidebar${isOpen ? ' active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src="/assets/download.png" alt="Admane Mohamed Oussama" width="80" />
        </figure>
        <div className="info-content">
          <h1 className="name" title="Admane Mohamed Oussama">
            <span className="name-line">Admane</span>
            <span className="name-line name-line--highlight">Mohamed Oussama</span>
          </h1>
          <p className="title">
            <span className="typewriter-text">{role}</span>
            <span className="typewriter-cursor">|</span>
          </p>
        </div>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href="mailto:om_admane@esi.dz" className="contact-link">
                om_admane@esi.dz
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a className="contact-link">
                +213 556 75 42 20
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address> Algiers, Algeria</address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          <li className="social-item">
            <a href="https://github.com/Oussama-ad" className="social-link" target="_blank" rel="noreferrer">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a href="https://www.linkedin.com/in/admane-mohamed-oussama-357296357/" className="social-link" target="_blank" rel="noreferrer">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a href="https://leetcode.com/u/SwzasQnqQN/" className="social-link" target="_blank" rel="noreferrer">
              <ion-icon name="code-slash-outline"></ion-icon>
            </a>
          </li>
        </ul>
      </div>

      <button
        className="info_more-btn"
        onClick={() => setIsOpen(!isOpen)}
        data-sidebar-btn
      >
        <ion-icon name="chevron-down"></ion-icon>
      </button>
    </aside>
  )
}

export default Sidebar
