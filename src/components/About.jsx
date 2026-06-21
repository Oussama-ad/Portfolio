const SERVICES = [
  {
    icon: 'code-working-outline',
    title: 'Fullstack Development',
    text: 'Building robust, scalable, and professional web applications from end-to-end.',
  },
  {
    icon: 'hardware-chip-outline',
    title: 'AI & Machine Learning',
    text: 'Building predictive models, natural language processing solutions, and data-driven insights.',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Cyber Security',
    text: 'Ensuring application security through robust coding practices and vulnerability analysis.',
  },
  {
    icon: 'server-outline',
    title: 'DevOps & Cloud',
    text: 'Automating deployment pipelines and managing scalable infrastructure using Docker and AWS.',
  },
]

function About() {
  return (
    <>
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text animate-fade-in-up">
        <p>
          I'm a <span className="text-highlight highlight-gold">Computer Science Engineering</span> student from <span className="text-highlight highlight-gold">Algeria</span>, passionate about turning
          complex problems into simple, efficient, and well-engineered solutions. I work across
          the full stack, but I have a strong preference for <span className="text-highlight highlight-gold">Backend Development</span> and <span className="text-highlight highlight-gold">AI/ML</span>, with
          a keen interest in <span className="text-highlight highlight-gold">Cyber Security</span> and <span className="text-highlight highlight-gold">low-level systems programming</span>.
        </p>
        <p>
          My goal is to build applications that are not only functional and user-friendly but also
          secure and visually appealing. I enjoy <span className="text-highlight highlight-gold">team working</span> and I'm always eager to learn new technologies to stay ahead in the field.
        </p>
      </section>

      <section className="service">
        <h3 className="h3 service-title">What i'm doing</h3>
        <ul className="service-list">
          {SERVICES.map(({ icon, title, text }) => (
            <li className="service-item" key={title}>
              <div className="service-icon-box">
                <ion-icon
                  name={icon}
                  size="large"
                  style={{ color: 'var(--orange-yellow-crayola)' }}
                ></ion-icon>
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{title}</h4>
                <p className="service-item-text">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default About
