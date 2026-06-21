import { useState } from 'react'
import CertModal from './CertModal'

// ─── Experience Hub quadrants ────────────────────────────────────────────────
const EXPERIENCE_QUADRANTS = [
  {
    title: 'FRONTEND SYSTEMS',
    color: '#5b9cf5',
    position: 'top-left',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'BACKEND LOGIC',
    color: '#e85d5d',
    position: 'top-right',
    skills: ['FastAPI', 'PHP', 'Express', 'MongoDB', 'MySQL', 'Redis', 'REST API'],
    highlight: ['FastAPI', 'PHP'],
  },
  {
    title: 'DEVOPS & TOOLS',
    color: '#4ecdc4',
    position: 'bottom-left',
    skills: ['AWS', 'Docker', 'Git', 'GitHub', 'Linux', 'CI/CD'],
  },
  {
    title: 'MACHINE LEARNING',
    color: '#f5a623',
    position: 'bottom-right',
    skills: ['PyTorch', 'Scikit-learn', 'Kaggle'],
    highlight: ['Scikit-learn'],
  },
]

// ─── Tools inventory marquee ─────────────────────────────────────────────────
// Languages + all tools from the hub above
const TOOLS = [
  // Languages
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'PHP',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'C',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'Dart',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'Assembly',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg' },
  { name: 'SQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  // Frontend
  { name: 'React',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  // Backend
  { name: 'FastAPI',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'Express',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
  { name: 'MongoDB',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'MySQL',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Redis',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  // DevOps
  { name: 'AWS',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
  { name: 'Linux',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  // ML
  { name: 'PyTorch',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'Scikit-learn',icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
  { name: 'Kaggle',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg' },
]

// ─── Certifications ──────────────────────────────────────────────────────────
const CERTIFICATIONS = [
  {
    pdf: '/assets/Certifications/ML-Duke.png',
    img: '/assets/Certifications/ML-Duke.png',
    alt: 'Machine Learning - Duke University',
    title: 'Machine Learning',
    issuer: 'Duke University',
    desc: 'An intensive program focused on machine learning algorithms, statistical models, and deep learning techniques using PyTorch. Learned how to build robust models for predictive analysis.',
  },
  {
    pdf: '/assets/Certifications/AI-Fundamentals.png',
    img: '/assets/Certifications/AI-Fundamentals.png',
    alt: 'AI Fundamentals',
    title: 'AI Fundamentals',
    issuer: 'Certification Authority',
    desc: 'Covered the core concepts of artificial intelligence, including natural language processing, computer vision, and the ethical implications of deploying AI models in production environments.',
  },
  {
    pdf: '/assets/Certifications/backend-expres.png',
    img: '/assets/Certifications/backend-expres.png',
    alt: 'Backend with Express.js',
    title: 'Backend with Express.js',
    issuer: 'Certification Authority',
    desc: 'A comprehensive certification covering advanced routing, middleware architecture, database integrations, and RESTful API design patterns using Node.js and Express.js.',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
function Skills() {
  const marqueeTools = [...TOOLS, ...TOOLS] // duplicate for seamless loop
  const [currentCert, setCurrentCert] = useState(0)
  const [selectedCert, setSelectedCert] = useState(null)

  const nextCert = () => setCurrentCert((prev) => (prev + 1) % CERTIFICATIONS.length)
  const prevCert = () => setCurrentCert((prev) => (prev - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length)

  const handleCertClick = (index) => {
    if (currentCert === index) {
      setSelectedCert(CERTIFICATIONS[index])
    } else {
      setCurrentCert(index)
    }
  }

  return (
    <>
      <header>
        <h2 className="h2 article-title">My Skills</h2>
      </header>

      {/* ── EXPERIENCE HUB ── */}
      <section className="experience-hub">
        <div className="exp-hub-container">

          {EXPERIENCE_QUADRANTS.map((quad) => (
            <div className={`exp-quadrant exp-${quad.position}`} key={quad.title}>
              <div className="exp-tags">
                {quad.skills.map((skill, i) => (
                  <span
                    className={`exp-tag${quad.highlight && quad.highlight.includes(skill) ? ' exp-tag--highlight' : ''}`}
                    key={skill}
                    style={{ animationDelay: `${i * 0.35}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="exp-quadrant-label" style={{ color: quad.color }}>
                {quad.title}
              </p>
            </div>
          ))}

          {/* Center orb */}
          <div className="exp-center">
            <div className="exp-center-ring"></div>
            <div className="exp-center-glow"></div>
            <div className="exp-center-content">
              <svg className="exp-brain-icon" viewBox="0 0 64 64" width="44" height="44" fill="none">
                <path d="M32 8C20 8 12 18 12 28c0 6 3 11 7 14v10a4 4 0 004 4h18a4 4 0 004-4V42c4-3 7-8 7-14C52 18 44 8 32 8z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 56h16M26 42v6M38 42v6M22 28c0-6 4-10 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="exp-title">EXPERIENCE</h3>
              <p className="exp-subtitle">DATABASE</p>
            </div>
            <div className="exp-orbit-dot"></div>
          </div>

        </div>
      </section>

      {/* ── TOOLS INVENTORY MARQUEE ── */}
      <section className="tools-inventory">
        <div className="tools-inventory-header">
          <span className="tools-inventory-icon">⚙</span>
          <span className="tools-inventory-label">TOOLS INVENTORY</span>
        </div>
        <div className="tools-marquee-wrapper">
          <div className="tools-marquee-fade tools-marquee-fade-left"></div>
          <div className="tools-marquee-track">
            {marqueeTools.map(({ name, icon, invert }, i) => (
              <div className="tools-marquee-item" key={`${name}-${i}`} title={name}>
                <img
                  src={icon}
                  alt={name}
                  width="28"
                  height="28"
                  style={invert ? { filter: 'invert(1)' } : {}}
                />
              </div>
            ))}
          </div>
          <div className="tools-marquee-fade tools-marquee-fade-right"></div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="certifications">
        <div className="certifications-header">
          <h3 className="h3 service-title">Certifications</h3>
          <div className="cert-nav">
            <button className="cert-nav-btn" onClick={prevCert}>
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>
            <button className="cert-nav-btn" onClick={nextCert}>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
          </div>
        </div>
        
        <div className="cert-slider-container">
          <ul className="cert-list">
            {CERTIFICATIONS.map(({ pdf, img, alt, title, issuer }, index) => {
              let positionClass = 'cert-item--hidden';
              if (index === currentCert) positionClass = 'cert-item--active';
              else if (index === (currentCert - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length) positionClass = 'cert-item--prev';
              else if (index === (currentCert + 1) % CERTIFICATIONS.length) positionClass = 'cert-item--next';

              return (
                <li 
                  className={`cert-item ${positionClass}`} 
                  key={title}
                  onClick={() => handleCertClick(index)}
                >
                  <div className="cert-link">
                    <figure className="cert-img">
                      <img src={img} alt={alt} loading="lazy" />
                    </figure>
                    <div className="cert-content">
                      <h4 className="h4 cert-item-title">{title}</h4>
                      <p className="cert-item-text">{issuer}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {selectedCert && (
        <CertModal
          data={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </>
  )
}

export default Skills
