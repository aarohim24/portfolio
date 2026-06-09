import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import FreelanceSection from './components/FreelanceSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main style={{ overflowX: 'clip', background: '#0C0C0C' }}>
          <HeroSection />
          <MarqueeSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <FreelanceSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      )}
    </>
  )
}
