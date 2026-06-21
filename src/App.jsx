import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'
import ProjectModal from './components/ProjectModal'
import Snowfall from './components/Snowfall'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'

function App() {
  const [activePage, setActivePage] = useState('about')
  const [modalData, setModalData] = useState(null)
  const [loading, setLoading] = useState(true)

  const pages = {
    about: <About />,
    skills: <Skills />,
    projects: <Projects onOpenModal={setModalData} />,
    resume: <Resume />,
    contact: <Contact />,
  }

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <Snowfall />
      <CustomCursor />

      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main>
        <Sidebar />

        <div className="main-content">
          {Object.entries(pages).map(([key, component]) => (
            <article
              key={key}
              className={`${key}${activePage === key ? ' active' : ''}`}
              data-page={key}
            >
              {component}
            </article>
          ))}
        </div>
      </main>

      {modalData && (
        <ProjectModal data={modalData} onClose={() => setModalData(null)} />
      )}
    </>
  )
}

export default App

