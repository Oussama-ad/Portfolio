import { useState } from 'react'
import CertModal from './CertModal'

// ─── Experience Hub Quadrants ────────────────────────────────────────────────
const EXPERIENCE_QUADRANTS = [
  {
    title: 'FRONTEND SYSTEMS',
    color: '#38bdf8',
    position: 'top-left',
    rows: [
      ['React', 'TypeScript'],
      ['Next.js', 'Tailwind CSS'],
    ],
    highlight: [],
  },
  {
    title: 'BACKEND LOGIC',
    color: '#fb7185',
    position: 'top-right',
    rows: [
      ['FastAPI', 'PHP'],
      ['Express', 'MongoDB'],
      ['MySQL', 'Redis'],
    ],
    highlight: ['FastAPI', 'PHP'],
  },
  {
    title: 'DEVOPS & TOOLS',
    color: '#2dd4bf',
    position: 'bottom-left',
    rows: [
      ['AWS', 'Docker', 'Git'],
      ['GitHub', 'Linux', 'CI/CD'],
    ],
    highlight: [],
  },
  {
    title: 'MACHINE LEARNING',
    color: '#fbbf24',
    position: 'bottom-right',
    rows: [
      ['PyTorch', 'Scikit-learn'],
      ['RAG', 'Data Engineering'],
      ['Kaggle'],
    ],
    highlight: ['Scikit-learn'],
  },
]

// ─── Skill Telemetry for Interactive Core HUD ────────────────────────────────
const SKILL_DETAILS = {
  // Frontend
  React: { role: 'Component Systems & Hooks', tag: 'Frontend', level: '85% Mastery' },
  TypeScript: { role: 'Static Typing & Type-Safety', tag: 'Frontend', level: '82% Mastery' },
  'Next.js': { role: 'Hybrid SSR & App Router', tag: 'Frontend', level: '80% Mastery' },
  'Tailwind CSS': { role: 'Responsive Design & Design Tokens', tag: 'Frontend', level: '88% Mastery' },

  // Backend
  FastAPI: { role: 'High-Performance Async Python & OpenAPI', tag: 'Backend', level: '90% Mastery' },
  PHP: { role: 'Server-Side Architecture & Web Services', tag: 'Backend', level: '78% Mastery' },
  Express: { role: 'Node.js REST Services & Middleware', tag: 'Backend', level: '85% Mastery' },
  MongoDB: { role: 'NoSQL Document Store & Aggregations', tag: 'Database', level: '82% Mastery' },
  MySQL: { role: 'Relational Schemas & Query Tuning', tag: 'Database', level: '84% Mastery' },
  Redis: { role: 'In-Memory Cache & Pub/Sub Operations', tag: 'Database', level: '75% Mastery' },

  // DevOps & Tools
  AWS: { role: 'Cloud Compute, S3 & IAM Management', tag: 'Cloud', level: '70% Mastery' },
  Docker: { role: 'Containerization & Multi-stage Builds', tag: 'DevOps', level: '84% Mastery' },
  Git: { role: 'Distributed Version Control & Workflows', tag: 'DevOps', level: '92% Mastery' },
  GitHub: { role: 'Actions, CI/CD Pipelines & Collab', tag: 'DevOps', level: '90% Mastery' },
  Linux: { role: 'System Admin, Shell & Kernel Ops', tag: 'Systems', level: '85% Mastery' },
  'CI/CD': { role: 'Automated Build, Test & Deployment', tag: 'DevOps', level: '76% Mastery' },

  // Machine Learning
  PyTorch: { role: 'Deep Learning & Neural Tensors', tag: 'AI/ML', level: '30% Mastery' },
  'Scikit-learn': { role: 'Statistical ML, Classification & Regression', tag: 'AI/ML', level: '82% Mastery' },
  RAG: { role: 'Retrieval-Augmented Vector Search', tag: 'AI/ML', level: '85% Mastery' },
  'Data Engineering': { role: 'ETL Pipelines & Data Transformation', tag: 'Data', level: '40% Mastery' },
  Kaggle: { role: 'Competitive Benchmarks & Notebooks', tag: 'AI/ML', level: '75% Mastery' },
}

// ─── Tools Inventory Marquee ─────────────────────────────────────────────────
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

// ─── Certifications ──────────────────────────────────────────────────────────
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
    pdf: '/assets/Certifications/ml_python.png',
    img: '/assets/Certifications/ml_python.png',
    alt: 'Machine Learning with Python - IBM',
    title: 'Machine Learning with Python',
    issuer: 'IBM / Coursera',
    tag: 'Applied ML',
    desc: 'Comprehensive mastery of core ML algorithms implemented in Python with Scikit-Learn: Supervised models (Linear & Polynomial Regression, KNN, Decision Trees, Random Forests, SVM) and Unsupervised techniques (K-Means, Hierarchical Clustering, PCA), along with practical model evaluation & hyperparameter tuning.',
  },
  {
    pdf: '/assets/Certifications/sql.png',
    img: '/assets/Certifications/sql.png',
    alt: 'Learn SQL - Scrimba',
    title: 'Learn SQL',
    issuer: 'Scrimba',
    tag: 'Database Architecture',
    desc: 'End-to-end relational database engineering from fundamentals (CRUD, filtering, multi-table INNER/LEFT/FULL JOINs, GROUP BY & HAVING aggregations) to advanced architectural concepts: Window Functions (RANK, DENSE_RANK, ROW_NUMBER, OVER partitions), Common Table Expressions (CTEs), correlated subqueries, and indexing for query performance optimization.',
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
  const [selectedCert, setSelectedCert] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  return (
    <>
      <header className="page-header">
        <div className="header-badge">
          <span className="badge-frost-icon">❄</span>
          <span>VALYRIAN ARMORY & EXPERTISE</span>
        </div>
        <h2 className="h2 article-title">My Skills</h2>
        <div className="title-valyrian-line">
          <span className="line-diamond"></span>
        </div>
      </header>

      {/* ── MODERN VALYRIAN EXPERIENCE HUB ── */}
      <section className="experience-hub">
        <div className="exp-hub-container">
          {/* Floating Quadrants */}
          {EXPERIENCE_QUADRANTS.map((quad) => (
            <div className={`exp-quadrant exp-${quad.position}`} key={quad.title}>
              <div className="exp-quadrant-rows">
                {quad.rows.map((row, rowIdx) => (
                  <div className="exp-row" key={rowIdx}>
                    {row.map((skill) => {
                      const isHighlighted = quad.highlight && quad.highlight.includes(skill)
                      const isActive = hoveredSkill === skill
                      const isDimmed = hoveredSkill && hoveredSkill !== skill
                      return (
                        <span
                          className={`exp-tag${isHighlighted ? ' exp-tag--highlight' : ''}${isActive ? ' exp-tag--active' : ''}${isDimmed ? ' exp-tag--dimmed' : ''}`}
                          key={skill}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          onClick={() => setHoveredSkill(hoveredSkill === skill ? null : skill)}
                          role="button"
                          tabIndex={0}
                          title={SKILL_DETAILS[skill]?.role || skill}
                        >
                          {skill}
                        </span>
                      )
                    })}
                  </div>
                ))}
              </div>
              <p className="exp-quadrant-label" style={{ color: quad.color }}>
                {quad.title}
              </p>
            </div>
          ))}

          {/* Central Valyrian Core Orb */}
          <div className={`exp-center${hoveredSkill ? ' exp-center--active' : ''}`}>
            <div className="exp-center-ring"></div>
            <div className="exp-center-glow"></div>

            {/* Orbiting Satellite Dot */}
            <div className="exp-orbit-track">
              <div className="exp-orbit-dot"></div>
            </div>

            {/* Core Content: Dynamic Telemetry or Default State */}
            {hoveredSkill && SKILL_DETAILS[hoveredSkill] ? (
              <div className="exp-center-content exp-center-telemetry">
                <span className="exp-telemetry-tag">
                  {SKILL_DETAILS[hoveredSkill].tag}
                </span>
                <h3 className="exp-telemetry-title">{hoveredSkill}</h3>
                <span className="exp-telemetry-level">
                  {SKILL_DETAILS[hoveredSkill].level}
                </span>
                <p className="exp-telemetry-role">
                  {SKILL_DETAILS[hoveredSkill].role}
                </p>
              </div>
            ) : (
              <div className="exp-center-content">
                <svg className="exp-brain-icon" viewBox="0 0 48 48" width="44" height="44" fill="none">
                  <path
                    d="M24 6C16.27 6 10 12.27 10 20c0 4.8 2.45 8.9 6.2 11.25.8.5 1.3 1.4 1.3 2.35v2.4a2 2 0 002 2h9a2 2 0 002-2v-2.4c0-.95.5-1.85 1.3-2.35C35.55 28.9 38 24.8 38 20c0-7.73-6.27-14-14-14z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 42h10M21 38h6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 14v7M20.5 17.5h7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                <h3 className="exp-title">EXPERIENCE</h3>
                <p className="exp-subtitle">DATABASE</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── TOOLS INVENTORY MARQUEE ── */}
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

      {/* ── CERTIFICATIONS SHOWCASE ── */}
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
