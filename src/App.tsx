import { motion } from 'framer-motion'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import FreelanceSection from './components/FreelanceSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflowX: 'clip', background: '#C5E0E6' }}
    >
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <FreelanceSection />
      <ProjectsSection />
      <ContactSection />
    </motion.main>
  )
}
