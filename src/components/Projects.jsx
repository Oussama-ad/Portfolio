import { useState } from 'react'

const ALL_PROJECTS = [
  {
    title: 'SmartSchool',
    category: 'Web development',
    filterKey: 'web development',
    img: '/assets/Projects/smart-school.png',
    alt: 'SmartSchool',
    desc: 'Smart School is a full-stack school management system built by a team of 6. I led the team and contributed primarily to backend development, coordinating between the frontend and backend sides. The backend follows an MVC architecture, and the project was deployed via FTP. The system features a dynamic dashboard for managing school operations with a focus on clean structure and team collaboration.', tech: ['React', 'Node.js', 'PHP', 'SQL', 'FTP'],
    github: '',
    live: 'https://www.ecolepasteur3.com/team22/',
  },
  {
    title: 'Epicerie Royale Online',
    category: 'Web development',
    filterKey: 'web development',
    img: '/assets/Projects/epice.png',
    alt: 'Epicerie Royale Online',
    desc: 'Epicerie Royale Online is a comprehensive e-commerce platform designed to provide a seamless and efficient online shopping experience for customers. Built with a robust backend and a user-friendly interface, the platform handles everything from product browsing to secure payment processing.',
    tech: ['React', 'Supabase', 'Tailwind CSS'],
    github: '',
    live: 'https://epicesroyal.vercel.app/',
  },
]

const FILTER_BTNS = ['All', 'Web design', 'Applications', 'Web development']

function Projects({ onOpenModal }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.filterKey === activeFilter.toLowerCase())

  return (
    <>
      <header>
        <h2 className="h2 article-title">Projects</h2>
      </header>

      <section className="projects">
        <ul className="filter-list">
          {FILTER_BTNS.map(btn => (
            <li className="filter-item" key={btn}>
              <button
                className={activeFilter === btn ? 'active' : ''}
                onClick={() => setActiveFilter(btn)}
                data-filter-btn
              >
                {btn}
              </button>
            </li>
          ))}
        </ul>

        <ul className="project-list">
          {filtered.map((project) => (
            <li
              className="project-item active"
              key={project.title}
              onClick={() => onOpenModal(project)}
              data-filter-item
              data-category={project.filterKey}
            >
              <figure className="project-img">
                <img src={project.img} alt={project.alt} loading="lazy" />
              </figure>
              <div className="project-footer">
                <div className="project-content-wrapper">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                </div>
                <div className="project-links">
                  <a
                    href={project.github}
                    className="project-link-icon"
                    target="_blank"
                    rel="noreferrer"
                    title="GitHub"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ion-icon name="logo-github"></ion-icon>
                  </a>
                  <a
                    href={project.live}
                    className="project-link-icon"
                    target="_blank"
                    rel="noreferrer"
                    title="Live Demo"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ion-icon name="link-outline"></ion-icon>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Projects
