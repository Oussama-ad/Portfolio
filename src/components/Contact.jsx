import { useState, useRef } from 'react'

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/Oussama-ad',
    icon: 'logo-github',
    label: 'GitHub',
    detail: '@Oussama-ad',
  },
  {
    href: 'https://www.linkedin.com/in/admane-mohamed-oussama-357296357/',
    icon: 'logo-linkedin',
    label: 'LinkedIn',
    detail: 'Mohamed Oussama Admane',
  },
  {
    href: 'https://leetcode.com/u/SwzasQnqQN/',
    icon: 'code-slash-outline',
    label: 'LeetCode',
    detail: 'Algorithmic Problem Solving',
  },
]

function Contact() {
  const formRef = useRef(null)
  const [btnState, setBtnState] = useState('idle') // idle | sending | success | error
  const [isValid, setIsValid] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const handleInput = () => {
    setIsValid(formRef.current?.checkValidity() ?? false)
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2200)
    } else {
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2200)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBtnState('sending')

    const formData = new FormData(formRef.current)

    try {
      const res = await fetch('https://formspree.io/f/mykopkbb', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (!res.ok) throw new Error('Failed to send raven')

      setBtnState('success')
      formRef.current.reset()
      setIsValid(false)
      setTimeout(() => setBtnState('idle'), 5000)
    } catch {
      setBtnState('error')
      setTimeout(() => setBtnState('idle'), 5000)
    }
  }

  const btnContent = {
    idle: (
      <>
        <ion-icon name="paper-plane-outline"></ion-icon>
        <span>Send Raven / Message</span>
      </>
    ),
    sending: (
      <>
        <ion-icon name="sync-outline" className="rotating-icon"></ion-icon>
        <span>Dispatching Raven...</span>
      </>
    ),
    success: (
      <>
        <ion-icon name="checkmark-done-circle-outline"></ion-icon>
        <span>Raven Dispatched Successfully!</span>
      </>
    ),
    error: (
      <>
        <ion-icon name="alert-circle-outline"></ion-icon>
        <span>Transmission Failed. Please retry.</span>
      </>
    ),
  }

  return (
    <>
      <header className="page-header">
        <div className="header-badge">
          <span className="badge-frost-icon">✉</span>
          <span>DISPATCH A RAVEN</span>
        </div>
        <h2 className="h2 article-title">Get in Touch</h2>
        <div className="title-valyrian-line">
          <span className="line-diamond"></span>
        </div>
      </header>

      {/* Direct Contact Cards */}
      <section className="contact-quick-cards">
        <div className="quick-card">
          <div className="quick-card-icon">
            <ion-icon name="mail-outline"></ion-icon>
          </div>
          <div className="quick-card-info">
            <span className="quick-label">Official Email</span>
            <a href="mailto:om_admane@esi.dz" className="quick-value">
              om_admane@esi.dz
            </a>
          </div>
          <button
            type="button"
            className="quick-copy-action"
            onClick={() => copyToClipboard('om_admane@esi.dz', 'email')}
            title="Copy email address"
          >
            <ion-icon name={copiedEmail ? 'checkmark-outline' : 'copy-outline'}></ion-icon>
            <span className="copy-label">{copiedEmail ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <div className="quick-card">
          <div className="quick-card-icon">
            <ion-icon name="call-outline"></ion-icon>
          </div>
          <div className="quick-card-info">
            <span className="quick-label">Direct Line</span>
            <a href="tel:+213556754220" className="quick-value">
              +213 556 75 42 20
            </a>
          </div>
          <button
            type="button"
            className="quick-copy-action"
            onClick={() => copyToClipboard('+213556754220', 'phone')}
            title="Copy phone number"
          >
            <ion-icon name={copiedPhone ? 'checkmark-outline' : 'copy-outline'}></ion-icon>
            <span className="copy-label">{copiedPhone ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <div className="quick-card">
          <div className="quick-card-icon">
            <ion-icon name="location-outline"></ion-icon>
          </div>
          <div className="quick-card-info">
            <span className="quick-label">Realm & Base</span>
            <span className="quick-value">Algiers, Algeria (ESI)</span>
          </div>
          <span className="status-pill-online">
            <span className="online-indicator"></span> Available
          </span>
        </div>
      </section>

      {/* Main Interactive Form */}
      <section className="contact-form-section">
        <div className="section-title-wrapper">
          <h3 className="h3 form-title">Dispatch Your Message</h3>
          <span className="section-subtitle">
            Whether inquiring about software engineering, AI collaborations, or opportunities.
          </span>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="valyrian-form"
        >
          <div className="form-input-grid">
            <div className="form-group">
              <label htmlFor="fullname" className="form-label">
                Your Noble Name
              </label>
              <div className="input-with-icon">
                <ion-icon name="person-outline"></ion-icon>
                <input
                  id="fullname"
                  type="text"
                  name="fullname"
                  className="modern-input"
                  placeholder="e.g. Jon Snow"
                  required
                  onInput={handleInput}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Raven Transmission (Email)
              </label>
              <div className="input-with-icon">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="modern-input"
                  placeholder="e.g. lord@winterfell.org"
                  required
                  onInput={handleInput}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Your Message / Mission
            </label>
            <div className="textarea-with-icon">
              <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
              <textarea
                id="message"
                name="message"
                className="modern-textarea"
                placeholder="Write your parchment here..."
                rows="5"
                required
                onInput={handleInput}
              ></textarea>
            </div>
          </div>

          <button
            className={`valyrian-submit-btn ${btnState !== 'idle' ? `btn-${btnState}` : ''}`}
            type="submit"
            disabled={!isValid || btnState === 'sending'}
          >
            {btnContent[btnState]}
          </button>
        </form>
      </section>

      {/* Social Network Links */}
      <section className="contact-social-section">
        <div className="section-title-wrapper">
          <h3 className="h3 form-title">Digital Citadels & Profiles</h3>
          <span className="section-subtitle">Follow Oussama across the digital realm</span>
        </div>

        <div className="social-cards-grid">
          {SOCIAL_LINKS.map(({ href, icon, label, detail }) => (
            <a
              href={href}
              className="social-profile-card"
              target="_blank"
              rel="noreferrer"
              key={label}
            >
              <div className="social-card-icon">
                <ion-icon name={icon}></ion-icon>
              </div>
              <div className="social-card-text">
                <h4 className="social-card-label">{label}</h4>
                <span className="social-card-detail">{detail}</span>
              </div>
              <ion-icon name="arrow-forward-outline" className="social-arrow"></ion-icon>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}

export default Contact
