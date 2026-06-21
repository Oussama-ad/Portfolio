import { useState } from 'react'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside className={`sidebar${isOpen ? ' active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src="/assets/download.png" alt="Admane Mohamed Oussama" width="80" />
        </figure>
        <div className="info-content">
          <h1 className="name" title="Admane Mohamed Oussama">Admane Mohamed Oussama</h1>
          <p className="title">Full Stack Developer</p>
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
