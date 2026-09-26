import { useState } from 'react'
import CertModal from './CertModal'

// ─── Skill Disciplines ──────────────────────────────────────────────────────────
const SKILL_DISCIPLINES = [
  {
    id: 'backend',
    title: 'Backend Citadel',
    icon: 'server-outline',
    rune: '⚔',
    desc: 'High-performance APIs, microservices, and server architecture',
    color: '#38bdf8',
    skills: [
      { name: 'FastAPI', level: 90, tag: 'Python' },
      { name: 'Node.js & Express', level: 88, tag: 'JavaScript' },
      { name: 'PHP / MVC', level: 82, tag: 'Full Stack' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Neural Forge',
    icon: 'hardware-chip-outline',
    rune: '❄',
    desc: 'Intelligent RAG pipelines, predictive models & deep learning',
    color: '#818cf8',
    skills: [
      { name: 'Python AI Stack', level: 85, tag: 'Core' },
      { name: 'Scikit-learn', level: 75, tag: 'Machine Learning' },
      { name: 'RAG', level: 75, tag: 'Architecture' },
      { name: 'Data Engineering', level: 40, tag: 'Pipelines' },
      { name: 'PyTorch', level: 30, tag: 'Deep Learning' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Craft',
    icon: 'browsers-outline',
    rune: '✦',
    desc: 'Fluid, modern reactive web experiences with high visual polish',
    color: '#34d399',
    skills: [
      { name: 'Tailwind & Modern CSS', level: 75, tag: 'Styling' },
      { name: 'React.js', level: 72, tag: 'Framework' },
      { name: 'TypeScript / JS (ES6+)', level: 70, tag: 'Languages' },
      { name: 'Next.js', level: 65, tag: 'SSR / Fullstack' },
    ],
  },
  {
    id: 'devops',
    title: 'Data & Systems Wardens',
    icon: 'shield-checkmark-outline',
    rune: '🛡',
    desc: 'Databases, containerization, cloud, and security testing',
    color: '#f59e0b',
    skills: [
      { name: 'SQL (MySQL / Postgres)', level: 88, tag: 'Relational' },
      { name: 'Linux & Git / CI-CD', level: 85, tag: 'Infrastructure' },
      { name: 'MongoDB & Redis', level: 84, tag: 'NoSQL & Cache' },
      { name: 'Docker Containerization', level: 80, tag: 'DevOps' },
      { name: 'Cyber Security Auditing', level: 25, tag: 'AppSec' },
    ],
  },
]

// ─── Tools Marquee ─────────────────────────────────────────────────────────────
const TOOLS = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
  { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
]

// ─── Certifications ────────────────────────────────────────────────────────────
const CERTIFICATIONS = [
  {
    pdf: '/assets/Certifications/ML-Duke.png',
    img: '/assets/Certifications/ML-Duke.png',
    alt: 'Machine Learning - Duke University',
    title: 'Machine Learning',
    issuer: 'Duke University',
    tag: 'Advanced AI',
    desc: 'Intensive specialization covering core machine learning algorithms, deep neural representations, and statistical inference with PyTorch.',
  },
  {
    pdf: '/assets/Certifications/AI-Fundamentals.png',
    img: '/assets/Certifications/AI-Fundamentals.png',
    alt: 'AI Fundamentals',
    title: 'AI Fundamentals',
    issuer: 'Certification Authority',
    tag: 'Foundations',
    desc: 'Comprehensive coverage of artificial intelligence architectures, computer vision foundations, NLP concepts, and responsible AI deployment.',
  },
  {
    pdf: '/assets/Certifications/backend-expres.png',
    img: '/assets/Certifications/backend-expres.png',
    alt: 'Backend with Express.js',
    title: 'Backend with Express.js',
    issuer: 'Certification Authority',
    tag: 'Backend Systems',
    desc: 'Mastery of RESTful API architecture, scalable middleware pipelines, database abstractions, authentication schemes, and asynchronous programming in Node.',
  },
]

function Skills() {
  const marqueeTools = [...TOOLS, ...TOOLS]
  const [activeTab, setActiveTab] = useState('all')
  const [selectedCert, setSelectedCert] = useState(null)

  const displayedDisciplines = activeTab === 'all'
    ? SKILL_DISCIPLINES
    : SKILL_DISCIPLINES.filter(d => d.id === activeTab)

  return (
    <>
      <header className="page-header">
        <div className="header-badge">
          <span className="badge-frost-icon">⚔</span>
          <span>VALYRIAN ARMORY & PROFICIENCIES</span>
        </div>
        <h2 className="h2 article-title">My Skills</h2>
        <div className="title-valyrian-line">
          <span className="line-diamond"></span>
        </div>
      </header>

      {/* Filter Tabs for Disciplines */}
      <section className="discipline-filter-wrapper">
        <ul className="filter-list">
          <li className="filter-item">
            <button
              className={activeTab === 'all' ? 'active' : ''}
              onClick={() => setActiveTab('all')}
            >
              All Disciplines
            </button>
          </li>
          {SKILL_DISCIPLINES.map(d => (
            <li className="filter-item" key={d.id}>
              <button
                className={activeTab === d.id ? 'active' : ''}
                onClick={() => setActiveTab(d.id)}
              >
                {d.title}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Northern Guild Disciplines Grid */}
      <section className="skills-disciplines-grid">
        {displayedDisciplines.map(discipline => (
          <div className="discipline-card" key={discipline.id}>
            <div className="discipline-header">
              <div className="discipline-icon-box" style={{ borderColor: `${discipline.color}40`, color: discipline.color }}>
                <ion-icon name={discipline.icon}></ion-icon>
              </div>
              <div>
                <div className="discipline-title-row">
                  <span className="discipline-rune">{discipline.rune}</span>
                  <h3 className="discipline-title">{discipline.title}</h3>
                </div>
                <p className="discipline-desc">{discipline.desc}</p>
              </div>
            </div>

            <div className="skills-bars-list">
              {discipline.skills.map(skill => (
                <div className="skill-bar-item" key={skill.name}>
                  <div className="skill-info-row">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-tag-pill">{skill.tag}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-track">
                    <div
                      className="skill-progress-fill"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, #38bdf8 0%, ${discipline.color} 100%)`,
                        boxShadow: `0 0 10px ${discipline.color}66`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Tools Marquee Showcase */}
      <section className="tools-inventory-section">
        <div className="inventory-header">
          <div className="inventory-header-left">
            <span className="inventory-icon">⚙</span>
            <h3 className="inventory-title">Tools & Weaponry Inventory</h3>
          </div>
          <span className="inventory-badge">Continuous Loop</span>
        </div>

        <div className="tools-marquee-container">
          <div className="tools-marquee-edge edge-left"></div>
          <div className="tools-marquee-track">
            {marqueeTools.map(({ name, icon, invert }, i) => (
              <div className="tool-chip" key={`${name}-${i}`} title={name}>
                <img
                  src={icon}
                  alt={name}
                  width="26"
                  height="26"
                  loading="lazy"
                  style={invert ? { filter: 'invert(1)' } : {}}
                />
                <span className="tool-name">{name}</span>
              </div>
            ))}
          </div>
          <div className="tools-marquee-edge edge-right"></div>
        </div>
      </section>

      {/* Certifications Showcase */}
      <section className="certifications-section">
        <div className="section-title-wrapper">
          <h3 className="h3 service-title">Verified Certifications</h3>
          <span className="section-subtitle">Academic & Industry Accreditations</span>
        </div>

        <div className="certifications-grid">
          {CERTIFICATIONS.map((cert) => (
            <div
              className="cert-card"
              key={cert.title}
              onClick={() => setSelectedCert(cert)}
              role="button"
              tabIndex={0}
            >
              <div className="cert-preview-frame">
                <img src={cert.img} alt={cert.alt} loading="lazy" />
                <div className="cert-overlay">
                  <span className="cert-view-cta">
                    <ion-icon name="scan-outline"></ion-icon> Inspect Certificate
                  </span>
                </div>
                <span className="cert-tag">{cert.tag}</span>
              </div>
              <div className="cert-details">
                <h4 className="cert-title">{cert.title}</h4>
                <p className="cert-issuer">
                  <ion-icon name="ribbon-outline"></ion-icon> {cert.issuer}
                </p>
                <p className="cert-desc">{cert.desc}</p>
              </div>
            </div>
          ))}
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
