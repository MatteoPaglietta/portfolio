import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import TopBar from './TopBar';
import Hero from './Hero';
import AboutStrip from './AboutStrip';
import Projects from './Projects';
import BtnAllProjects from './BtnAllProjects';
import Contact from './Contact';
import Footer from './Footer';

const featuredProjects = [
  { number: '01', title: 'Pepenero Cafè', category: 'Menu website · Web Site', description: 'An intuitive digital menu for modern bars, featuring seamless navigation, a sleek design, and your next order always just a tap away.', image: '/img/pepenero/pepenero.jpg', githubUrl: 'https://pepenerocafe-menu.netlify.app' },
  { number: '02', title: 'Armonie di Erica', category: 'Landing page · Web Site', description: 'A refined online presence for a beauty salon, tailored to highlight premium services, expertise, and results that captivate new clients.', image: '/img/armonie/armonie.jpg', githubUrl: 'https://armonie-di-erica-favaro.it' },
  { number: '03', title: 'BeatsBlend', category: 'Music tool website · Web Site', description: 'A neomorphic music tool that analyzes BPM and key, discovers related tracks, and transforms every uploaded song into new opportunities for musical exploration.', image: '/img/beatsblend/beatsblend.jpg', githubUrl: 'https://github.com/MatteoPaglietta/beatblend' },
];

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis({
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
    });
    window.lenis = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div>
      <TopBar available={false} role="Software Developer" company="Bonetto Automation" />
      <main className="scroll-container">
        <Hero available={false} role="Software Developer" company="Bonetto Automation" />
        <div className="section-2 d-flex flex-column">
          <AboutStrip />
          <Projects projects={featuredProjects} />
          <BtnAllProjects
            title="More Projects"
            link="https://github.com/MatteoPaglietta?tab=repositories"
            arrow={true}
            className="justify-content-center more-projects-footer"
            classNameBtn="more-projects-btn"
          />
          <Contact />
        </div>
        <div className="section-3">
          <Footer />
        </div>
      </main>
    </div>
  );
}
