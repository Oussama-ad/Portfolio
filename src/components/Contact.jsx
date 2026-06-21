import { useState, useRef } from 'react'

const SOCIAL_LINKS = [
  { href: 'https://github.com/', icon: 'logo-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/akhileswar-kamale/', icon: 'logo-linkedin', label: 'LinkedIn' },
  { href: 'https://leetcode.com/', icon: 'code-slash-outline', label: 'LeetCode' },
  { href: 'https://www.instagram.com/linesbyakhileswar/', icon: 'logo-instagram', label: 'Instagram' },
]

function Contact() {
  const formRef = useRef(null)
  const [btnState, setBtnState] = useState('idle') // idle | sending | success | error
  const [isValid, setIsValid] = useState(false)

  const handleInput = () => {
    setIsValid(formRef.current?.checkValidity() ?? false)
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

      if (!res.ok) throw new Error('Failed')

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
        <ion-icon name="paper-plane"></ion-icon>
        <span>Send Message</span>
      </>
    ),
    sending: (
      <>
        <ion-icon name="sync-outline" class="rotating"></ion-icon>
        <span>Sending...</span>
      </>
    ),
    success: (
      <>
        <ion-icon name="checkmark-done-outline"></ion-icon>
        <span>Message Sent!</span>
      </>
    ),
    error: (
      <>
        <ion-icon name="alert-circle-outline"></ion-icon>
        <span>Error! Try again.</span>
      </>
    ),
  }

  return (
    <>
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="form"
          data-form
        >
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
              onInput={handleInput}
              data-form-input
            />
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              required
              onInput={handleInput}
              data-form-input
            />
          </div>
          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
            onInput={handleInput}
            data-form-input
          ></textarea>

          <button
            className="form-btn"
            type="submit"
            disabled={!isValid || btnState === 'sending'}
            style={
              btnState === 'success'
                ? { backgroundColor: 'var(--orange-yellow-crayola)', color: 'var(--smoky-black)' }
                : {}
            }
            data-form-btn
          >
            {btnContent[btnState]}
          </button>
        </form>
      </section>

      <div className="separator"></div>

      <section className="contact-social">
        <h3 className="h3 form-title">Connect with me</h3>
        <ul className="social-list">
          {SOCIAL_LINKS.map(({ href, icon, label }) => (
            <li className="social-item" key={label}>
              <a href={href} className="social-link" target="_blank" rel="noreferrer">
                <ion-icon name={icon}></ion-icon>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Contact
