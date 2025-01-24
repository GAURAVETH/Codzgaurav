import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Testimonial from './components/Testimonial'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Contact from './components/Contact'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Testimonial />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  )
}

export default App
