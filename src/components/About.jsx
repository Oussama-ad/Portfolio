const PILLARS = [
  {
    icon: 'code-working-outline',
    title: 'Fullstack Architecture',
    tag: 'Web & Distributed Systems',
    text: 'Forging scalable, high-throughput web applications with React, Next.js, Node.js, and FastAPI. From reactive interfaces to resilient backends.',
  },
  {
    icon: 'hardware-chip-outline',
    title: 'AI & Neural Systems',
    tag: 'RAG & Deep Learning',
    text: 'Architecting intelligent pipelines, contextual RAG agents, and predictive machine learning models built with PyTorch and Scikit-learn.',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Cyber Security & Hardening',
    tag: 'AppSec & Low-Level',
    text: 'Enforcing security-first development, vulnerability mitigation, authorization protocols, and robust low-level system integrity.',
  },
  {
    icon: 'server-outline',
    title: 'DevOps & Cloud Crucible',
    tag: 'Containerization & CI/CD',
    text: 'Automating pipelines, Docker microservices containerization, Linux server orchestration, and reliable cloud deployments.',
  },
]

const STATS = [
  { label: 'Academic Citadel', value: 'ESI Algiers', sub: 'Top CS Institute' },
  { label: 'Primary Weaponry', value: 'MERN & Python', sub: 'Full Stack & AI' },
  { label: 'Architected Projects', value: '3+ Shipped', sub: 'Full Cycle Apps' },
  { label: 'Current Quest', value: 'Engineering 2029', sub: 'Distributed & AI' },
]

function About() {
  return (
    <>
      <header className="page-header">
        <div className="header-badge">
          <span className="badge-frost-icon">❄</span>
          <span>CHRONICLE OF THE ENGINEER</span>
        </div>
        <h2 className="h2 article-title">About Me</h2>
        <div className="title-valyrian-line">
          <span className="line-diamond"></span>
        </div>
      </header>

      {/* Hero Stat Pills */}
      <section className="hero-stats-grid">
        {STATS.map(({ label, value, sub }) => (
          <div className="hero-stat-card" key={label}>
            <span className="stat-label">{label}</span>
            <span className="stat-value">{value}</span>
            <span className="stat-sub">{sub}</span>
          </div>
        ))}
      </section>

      {/* Main Narrative */}
      <section className="about-text animate-fade-in-up">
        <p className="lead-paragraph">
          I am a <strong className="text-glow">Computer Science Engineering student</strong> at the prestigious{' '}
          <span className="text-highlight">École nationale Supérieure d'Informatique (ESI)</span> in Algeria.
          Guided by the resilience of the North, I forge digital systems that turn intricate problems into elegant,
          bulletproof, and performant digital realities.
        </p>

        <p>
          While comfortable across the entire stack, my core mastery lies in <span className="text-highlight">Backend Architecture</span>,{' '}
          <span className="text-highlight">AI & RAG Systems</span>, and rigorous <span className="text-highlight">Cyber Security</span>.
          From engineering school management ERPs to building custom intelligent assistants, I engineer software built to withstand heavy traffic and hostile environments.
        </p>
      </section>

      {/* The Four Northern Pillars / Services */}
      <section className="service">
        <div className="section-title-wrapper">
          <h3 className="h3 service-title">Forging & Capabilities</h3>
          <span className="section-subtitle">Core areas of engineering expertise</span>
        </div>

        <ul className="service-list">
          {PILLARS.map(({ icon, title, tag, text }) => (
            <li className="service-item" key={title}>
              <div className="service-card-inner">
                <div className="service-header-row">
                  <div className="service-icon-box">
                    <ion-icon name={icon}></ion-icon>
                  </div>
                  <span className="service-tag">{tag}</span>
                </div>
                <div className="service-content-box">
                  <h4 className="h4 service-item-title">{title}</h4>
                  <p className="service-item-text">{text}</p>
                </div>
                <div className="card-frost-accent"></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default About
