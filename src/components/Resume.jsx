function Resume() {
  return (
    <>
      <header className="resume-header">
        <h2 className="h2 article-title">Resume</h2>
        <a
          href="/assets/Mohamed_Oussama_Resume.pdf"
          download="Admane_Mohamed_Oussama_CV.pdf"
          className="download-btn"
        >
          <ion-icon name="download-outline"></ion-icon>
          <span>Download CV</span>
        </a>
      </header>

      {/* Education */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Education</h3>
        </div>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Ecole nationale Supérieure d'Informatique (ESI)</h4>
            <span>Sept 2024 — June 2029 (Expected)</span>
            <p className="timeline-text">
              Computer Science Engineering Degree <br />
              Algiers, Algeria
            </p>
          </li>
        </ol>
      </section>

    </>
  )
}

export default Resume
