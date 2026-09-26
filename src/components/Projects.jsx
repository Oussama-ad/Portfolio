import { useState } from 'react'

const ALL_PROJECTS = [
  {
    title: 'SmartSchool',
    category: 'Full Stack Web Platform',
    filterKey: 'web development',
    badge: 'Team Lead & Backend',
    img: '/assets/Projects/smart-school.png',
    alt: 'SmartSchool Platform Preview',
    desc: 'SmartSchool is a comprehensive, full-stack school management system engineered by a team of 6. As team lead and lead backend architect, I designed the MVC architecture, structured the relational SQL database, coordinated frontend-backend API contracts, and successfully deployed the system to production via FTP. Features include dynamic dashboards, administrative portals, and academic progress tracking.',
    tech: ['React', 'Node.js', 'PHP', 'SQL', 'MVC Architecture', 'FTP Deployment'],
    github: '',
    live: 'https://www.ecolepasteur3.com/team22/',
  },
  {
    title: 'Epicerie Royale Online',
    category: 'Modern E-Commerce',
    filterKey: 'web development',
    badge: 'Production Web App',
    img: '/assets/Projects/epice.png',
    alt: 'Epicerie Royale Online Preview',
    desc: 'Epicerie Royale Online is a high-performance e-commerce platform built to deliver an ultra-smooth, responsive shopping experience. Architected with Supabase for real-time inventory management, secure user authentication, and Postgres-backed transactions, styled with sleek modern interfaces.',
    tech: ['React', 'Supabase', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
    github: '',
    live: 'https://epicesroyal.vercel.app/',
  },
  {
    title: 'Niro AI Assistant',
    category: 'AI & Applications',
    filterKey: 'applications',
    badge: 'RAG Architecture',
    img: '/assets/niro.png',
    alt: 'Niro AI Assistant Preview',
    desc: 'Niro is an advanced RAG (Retrieval-Augmented Generation) AI assistant. Built as an intelligent conversational guide, it dynamically queries indexed contextual embeddings to provide accurate, real-time answers. Features an asynchronous FastAPI backend for rapid low-latency inference and smooth web integration.',
    tech: ['FastAPI', 'Python', 'React', 'RAG Pipelines', 'HuggingFace'],
    github: 'https://github.com/Oussama-ad/Niro',
    live: 'https://ouss-ad85-niro-home.hf.space/',
  },
]

const FILTER_BTNS = [
  { label: 'All Quests', key: 'all' },
  { label: 'Web Applications', key: 'web development' },
  { label: 'AI & Systems', key: 'applications' },
]

function Projects({ onOpenModal }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.filterKey === activeFilter)

  return (
    <>
      <header className="page-header">
        <div className="header-badge">
          <span className="badge-frost-icon">❄</span>
          <span>VALYRIAN WORKS & EXPEDITIONS</span>
        </div>
        <h2 className="h2 article-title">Featured Projects</h2>
        <div className="title-valyrian-line">
          <span className="line-diamond"></span>
        </div>
      </header>

      <section className="projects-section">
        {/* Filter Navigation */}
        <div className="filter-wrapper">
          <ul className="filter-list">
            {FILTER_BTNS.map(btn => (
              <li className="filter-item" key={btn.key}>
                <button
                  className={activeFilter === btn.key ? 'active' : ''}
                  onClick={() => setActiveFilter(btn.key)}
                >
                  {btn.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid">
          {filtered.map((project) => (
            <div
              className="modern-project-card"
              key={project.title}
              onClick={() => onOpenModal(project)}
              role="button"
              tabIndex={0}
            >
              {/* Image Frame with Shimmer */}
              <div className="project-banner">
                <img
                  src={project.img}
                  alt={project.alt}
                  loading="lazy"
                  className="project-banner-img"
                />
                <div className="project-banner-glow"></div>
                <span className="project-badge">{project.badge}</span>
              </div>

              {/* Card Content */}
              <div className="project-card-content">
                <div className="project-meta-row">
                  <span className="project-category-tag">{project.category}</span>
                  <span className="project-inspect-hint">
                    <ion-icon name="open-outline"></ion-icon> Details
                  </span>
                </div>

                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.desc}</p>

                {/* Tech Chips */}
                <div className="project-tech-chips">
                  {project.tech.slice(0, 4).map((t) => (
                    <span className="tech-chip" key={t}>{t}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="tech-chip tech-chip-more">+{project.tech.length - 4}</span>
                  )}
                </div>

                {/* Action Links */}
                <div className="project-card-actions" onClick={(e) => e.stopPropagation()}>
                  {project.github ? (
                    <a
                      href={project.github}
                      className="project-action-btn btn-ghost"
                      target="_blank"
                      rel="noreferrer"
                      title="Inspect Source Code on GitHub"
                    >
                      <ion-icon name="logo-github"></ion-icon>
                      <span>Code</span>
                    </a>
                  ) : null}
                  {project.live ? (
                    <a
                      href={project.live}
                      className="project-action-btn btn-primary"
                      target="_blank"
                      rel="noreferrer"
                      title="Launch Live Application"
                    >
                      <ion-icon name="globe-outline"></ion-icon>
                      <span>Live Demo</span>
                    </a>
                  ) : null}
                  <button
                    type="button"
                    className="project-action-btn btn-details"
                    onClick={() => onOpenModal(project)}
                  >
                    <span>Overview</span>
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Projects
