import './App.css';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import AboutStrip from './components/AboutStrip';
import Projects from './components/Projects';
import BtnAllProjects from './components/BtnAllProjects';
import Contact from './components/Contact';

const featuredProjects = [
  { number: '01', title: 'Pepenero Cafè ', category: 'Menu website · Web Site', description: 'Menu digitale intuitivo per bar moderni, con navigazione fluida, design accattivante e scelta sempre a portata di smartphone.', image: '/img/pepenero.jpg' },
  { number: '02', title: 'Armonie di Erica', category: 'Landing page · Web Site', description: 'Presenza online raffinata per un salone di bellezza, progettata per valorizzare servizi, professionalità e risultati che conquistano nuove clienti.', image: '/img/armonie.jpg' },
  { number: '03', title: 'BeatsBlend', category: 'Music tool website · Web Site', description: 'Tool musicale dal design neomorfico che analizza BPM e tonalità, individua brani correlati e trasforma ogni traccia caricata in nuove opportunità di scoperta.', image: '/img/beatsblend.jpg' },
];

function App() {
  return (
    <div>
      <TopBar />
      <main className="scroll-container">
        <Hero />
        <div className="section-2 d-flex flex-column">
          <AboutStrip />
          <Projects projects={featuredProjects} />
          <BtnAllProjects />
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App
