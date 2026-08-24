import About from '../components/About'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Statistics from '../components/Statistics'

export default function HomePage() {
  const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Vite']

  return (
    <main className="main-content container">
      <Hero />
      <About />
      <Skills skillList={skills} />
      <Statistics />
    </main>
  )
}
