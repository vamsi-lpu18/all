import './App.css'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'

import Education from './components/Education'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <Stats />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />

      <Education />
      <Footer />
    </div>
  )
}

export default App
