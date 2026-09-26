function Resume() {
  const milestones = [
    {
      title: 'National Competitive Exam Admittance to ESI',
      detail: 'Admitted to École nationale Supérieure d\'Informatique (ranked #1 Computer Science elite Grande École in Algeria).',
      year: '2024',
    },
  ]

  return (
    <>
      <header className="page-header resume-header-row">
        <div>
          <div className="header-badge">
            <span className="badge-frost-icon">📜</span>
            <span>CHRONICLES & QUALIFICATIONS</span>
          </div>
          <h2 className="h2 article-title">Resume & Lore</h2>
        </div>

        <div className="resume-download-actions">
          <a
            href="/assets/Mohamed_Oussama_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="action-btn-ghost"
          >
            <ion-icon name="eye-outline"></ion-icon>
            <span>View CV</span>
          </a>
          <a
            href="/assets/Mohamed_Oussama_Resume.pdf"
            download="Admane_Mohamed_Oussama_Resume.pdf"
            className="action-btn-valyrian"
          >
            <ion-icon name="download-outline"></ion-icon>
            <span>Download CV</span>
          </a>
        </div>
      </header>
      <div className="title-valyrian-line">
        <span className="line-diamond"></span>
      </div>

      <div className="resume-grid">
        {/* Education Timeline */}
        <section className="timeline-block">
          <div className="timeline-block-header">
            <div className="icon-box-valyrian">
              <ion-icon name="school-outline"></ion-icon>
            </div>
            <h3 className="h3 timeline-heading">Education & Academic Citadel</h3>
          </div>

          <ol className="valyrian-timeline">
            <li className="valyrian-timeline-item">
              <div className="timeline-marker">
                <span className="marker-dot"></span>
                <span className="marker-pulse"></span>
              </div>
              <div className="timeline-content-card">
                <div className="card-top-meta">
                  <h4 className="timeline-card-title">
                    École nationale Supérieure d'Informatique (ESI)
                  </h4>
                  <span className="timeline-date-badge">Sept 2024 — June 2029 (Expected)</span>
                </div>
                <p className="timeline-institution">
                  State Engineering Degree in Computer Science &bull; Algiers, Algeria
                </p>
                <p className="timeline-details-text">
                  Enrolled in Algeria's premier computer science institution. Core curriculum emphasizes advanced algorithms, distributed systems architecture, operating systems, machine learning fundamentals, and cyber security protocols.
                </p>
                <div className="card-mini-tags">
                  <span>Advanced Algorithms</span>
                  <span>Systems Architecture</span>
                  <span>Data Structures</span>
                  <span>Cyber Security</span>
                </div>
              </div>
            </li>
          </ol>
        </section>

        {/* Milestones & Accreditations */}
        <section className="timeline-block">
          <div className="timeline-block-header">
            <div className="icon-box-valyrian">
              <ion-icon name="ribbon-outline"></ion-icon>
            </div>
            <h3 className="h3 timeline-heading">Milestones & Honors</h3>
          </div>

          <div className="milestones-row">
            {milestones.map((m) => (
              <div className="milestone-card" key={m.title}>
                <span className="milestone-year">{m.year}</span>
                <h4 className="milestone-title">{m.title}</h4>
                <p className="milestone-detail">{m.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Resume
