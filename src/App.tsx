import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import About from './sections/About';
import Specialties from './sections/Specialties';
import Contact from './sections/Contact';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Hero />
      <About />
      <Specialties />
      <Contact />
      <FAQ />
      <Footer />
    </main>
  );
}

export default App;
