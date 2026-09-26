import { useState, useEffect } from 'react'

// Roles to cycle through
const ROLES = [
  'Full Stack Developer',
  'AI & ML Engineer',
  'Backend Architect',
  'CS Engineering Student @ ESI',
  'Cyber Security Enthusiast',
]

// Typewriter hook with smooth pacing
function useTypewriter(texts, typingSpeed = 75, deletingSpeed = 40, pauseMs = 1700) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPausing, setIsPausing] = useState(false)

  useEffect(() => {
    const current = texts[roleIndex]

    if (isPausing) {
      const t = setTimeout(() => {
        setIsPausing(false)
        setIsDeleting(true)
      }, pauseMs)
      return () => clearTimeout(t)
    }

    if (!isDeleting) {
      if (charIndex < current.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed)
        return () => clearTimeout(t)
      } else {
        setIsPausing(true)
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => setCharIndex((c) => c - 1), deletingSpeed)
        return () => clearTimeout(t)
      } else {
        setIsDeleting(false)
        setRoleIndex((r) => (r + 1) % texts.length)
      }
    }
  }, [charIndex, isDeleting, isPausing, roleIndex, texts, typingSpeed, deletingSpeed, pauseMs])

  return texts[roleIndex].slice(0, charIndex)
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const role = useTypewriter(ROLES)

  const copyEmail = () => {
    navigator.clipboard.writeText('om_admane@esi.dz')
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  return (
    <aside className={`sidebar${isOpen ? ' active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        {/* Direwolf Avatar Box with Valyrian Frost Ring */}
        <div className="avatar-wrapper">
          <figure className="avatar-box">
            <img
              src="/assets/download.png"
              alt="House Stark Direwolf - Admane Mohamed Oussama"
              className="avatar-img"
              width="90"
              height="90"
            />
            <div className="avatar-glow"></div>
            <div className="avatar-frost-ring"></div>
          </figure>
          <span className="stark-sigil-tag">HOUSE STARK</span>
        </div>

        <div className="info-content">
          <div className="allegiance-badge">
            <span className="frost-dot"></span>
            <span>Winter is Coming</span>
          </div>

          <h1 className="name" title="Admane Mohamed Oussama">
            <span className="name-line">Admane</span>
            <span className="name-line name-line--highlight">Mohamed Oussama</span>
          </h1>

          <div className="title-wrapper-role">
            <span className="title-icon">⚔</span>
            <p className="title">
              <span className="typewriter-text">{role}</span>
              <span className="typewriter-cursor">|</span>
            </p>
          </div>
        </div>

        {/* Mobile toggle button */}
        <button
          className="info_more-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle contact details"
        >
          <span>{isOpen ? 'Hide Intel' : 'Show Intel'}</span>
          <ion-icon name={isOpen ? 'chevron-up-outline' : 'chevron-down-outline'}></ion-icon>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="valyrian-separator">
          <span className="separator-rune">✦</span>
        </div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Raven / Email</p>
              <div className="email-copy-wrapper">
                <a href="mailto:om_admane@esi.dz" className="contact-link">
                  om_admane@esi.dz
                </a>
                <button
                  type="button"
                  className="quick-copy-btn"
                  onClick={copyEmail}
                  title="Copy email to clipboard"
                >
                  <ion-icon name={copied ? "checkmark-outline" : "copy-outline"}></ion-icon>
                </button>
              </div>
              {copied && <span className="copy-toast">Copied Raven!</span>}
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="call-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+213556754220" className="contact-link">
                +213 556 75 42 20
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="school-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Citadel / School</p>
              <span className="contact-desc">ESI (National CS School)</span>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="compass-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Realm</p>
              <address>Algiers, Algeria</address>
            </div>
          </li>
        </ul>

        <div className="valyrian-separator">
          <span className="separator-rune">✦</span>
        </div>

        <ul className="social-list">
          <li className="social-item">
            <a
              href="https://github.com/Oussama-ad"
              className="social-link"
              target="_blank"
              rel="noreferrer"
              title="GitHub Profile"
            >
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://www.linkedin.com/in/admane-mohamed-oussama-357296357/"
              className="social-link"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn Profile"
            >
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://leetcode.com/u/SwzasQnqQN/"
              className="social-link"
              target="_blank"
              rel="noreferrer"
              title="LeetCode Problem Solving"
            >
              <ion-icon name="code-slash-outline"></ion-icon>
            </a>
          </li>
        </ul>

        <div className="sidebar-footer-quote">
          <p>"The North Remembers & The Code Endures"</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
