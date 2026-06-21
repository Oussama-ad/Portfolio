import { useEffect } from 'react'

function ProjectModal({ data, onClose }) {
  const { title, category, img, alt, desc, tech, github, live } = data

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="project-modal-overlay active"
      id="projectModal"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="project-modal">
        <button className="project-modal-close" onClick={onClose} id="projectModalClose">
          <ion-icon name="close-outline"></ion-icon>
        </button>

        <div className="project-modal-img">
          <img src={img} alt={alt} />
        </div>

        <div className="project-modal-body">
          <div className="project-modal-header">
            <div>
              <h3 className="project-modal-title">{title}</h3>
              <span className="project-modal-category">{category}</span>
            </div>
          </div>

          <div className="project-modal-separator"></div>

          <div className="project-modal-section">
            <h4 className="project-modal-section-title">About This Project</h4>
            <p className="project-modal-desc">{desc}</p>
          </div>

          <div className="project-modal-section">
            <h4 className="project-modal-section-title">Tech Stack</h4>
            <div className="project-modal-tech">
              {tech.map((t) => (
                <span className="project-modal-tech-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>

          <div className="project-modal-actions">
            {github && github !== '#' && (
              <a
                href={github}
                className="project-modal-btn project-modal-btn-github"
                target="_blank"
                rel="noreferrer"
              >
                <ion-icon name="logo-github"></ion-icon>
                <span>Source Code</span>
              </a>
            )}
            <a
              href={live}
              className="project-modal-btn project-modal-btn-live"
              target="_blank"
              rel="noreferrer"
            >
              <ion-icon name="link-outline"></ion-icon>
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
