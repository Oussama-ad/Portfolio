import { useEffect } from 'react'

function CertModal({ data, onClose }) {
  const { title, issuer, img, alt, desc, pdf } = data

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
      id="certModal"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="project-modal">
        <button className="project-modal-close" onClick={onClose} id="certModalClose">
          <ion-icon name="close-outline"></ion-icon>
        </button>

        <div className="project-modal-img">
          <img src={img} alt={alt} />
        </div>

        <div className="project-modal-body">
          <div className="project-modal-header">
            <div>
              <h3 className="project-modal-title">{title}</h3>
              <span className="project-modal-category">{issuer}</span>
            </div>
          </div>

          <div className="project-modal-separator"></div>

          <div className="project-modal-section">
            <h4 className="project-modal-section-title">About This Certification</h4>
            <p className="project-modal-desc">{desc || 'A comprehensive certification program demonstrating expertise in this field.'}</p>
          </div>

          <div className="project-modal-actions">
            <a
              href={pdf}
              className="project-modal-btn project-modal-btn-live"
              target="_blank"
              rel="noreferrer"
            >
              <ion-icon name="document-text-outline"></ion-icon>
              <span>View Certificate</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertModal
