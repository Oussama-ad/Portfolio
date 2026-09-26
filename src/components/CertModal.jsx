import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

function CertModal({ data, onClose }) {
  const { title, issuer, img, alt, desc, pdf } = data
  const [isFullView, setIsFullView] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (isFullView) {
          setIsFullView(false)
        } else {
          onClose()
        }
      }
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, isFullView])

  return createPortal(
    <div
      className="project-modal-overlay active"
      id="certModal"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {isFullView ? (
        <div className="project-modal cert-modal-fullscreen" onClick={(e) => e.stopPropagation()}>
          <div className="cert-fullscreen-topbar">
            <button
              type="button"
              className="cert-back-btn"
              onClick={() => setIsFullView(false)}
              aria-label="Back to details"
            >
              <ion-icon name="arrow-back-outline"></ion-icon>
              <span>Back to Details</span>
            </button>
            <div className="cert-fullscreen-actions">
              <a
                href={pdf}
                download
                className="cert-fullscreen-link"
                title="Download full resolution certificate"
              >
                <ion-icon name="download-outline"></ion-icon>
                <span>Download</span>
              </a>
              <button
                type="button"
                className="project-modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
          </div>
          <div className="cert-fullscreen-image-wrap">
            <img src={img} alt={alt} className="cert-fullscreen-img" />
          </div>
        </div>
      ) : (
        <div className="project-modal" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="project-modal-close"
            onClick={onClose}
            id="certModalClose"
            aria-label="Close modal"
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>

          <div
            className="project-modal-img"
            onClick={() => setIsFullView(true)}
            style={{ cursor: 'zoom-in' }}
            title="Click to view full resolution"
          >
            <img src={img} alt={alt} />
            <div className="cert-zoom-hint">
              <ion-icon name="scan-outline"></ion-icon>
              <span>Click to Expand</span>
            </div>
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
              <button
                type="button"
                className="project-modal-btn project-modal-btn-live"
                onClick={() => setIsFullView(true)}
              >
                <ion-icon name="scan-outline"></ion-icon>
                <span>View Full Resolution</span>
              </button>
              <a
                href={pdf}
                target="_blank"
                rel="noreferrer"
                className="project-modal-btn project-modal-btn-ghost"
              >
                <ion-icon name="open-outline"></ion-icon>
                <span>Open in Tab</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  )
}

export default CertModal
