import './App.css';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import AboutStrip from './components/AboutStrip';
import Projects from './components/Projects';
import Contact from './components/Contact';

const featuredProjects = [
  { number: '01', title: 'Pepenero Cafè | Menu', category: 'Menu website · Web Site', description: 'Menu digitale intuitivo per bar moderni, con navigazione fluida, design accattivante e scelta sempre a portata di smartphone.' },
  { number: '02', title: 'Armonie di Erica Favaro', category: 'Landing page · Web Site', description: 'Presenza online raffinata per il un salone di bellezza, progettata per valorizzare servizi, professionalità e risultati che conquistano nuove clienti.' },
  { number: '03', title: 'Immobiliaris Plus', category: 'School project · Web Site', description: 'Progetto multidisciplinare sviluppato in collaborazione tra diversi corsi, dalla raccolta dei requisiti alla realizzazione finale di una piattaforma immobiliare con ricerca avanzata degli immobili e sistema di valutazione dedicato.' },
  { number: '04', title: 'BeatsBlend', category: 'Music tool website · Web Site', description: 'Tool musicale dal design neomorfico che analizza BPM e tonalità, individua brani correlati e trasforma ogni traccia caricata in nuove opportunità di scoperta.' },
  { number: '05', title: 'Netflix Clone', category: 'School project · Web Site', description: 'Clone di Netflix sviluppato come progetto scolastico, con interfaccia moderna, navigazione intuitiva e focus sull’esperienza di streaming digitale.' },
];

function App() {
  return (
    <div>
      <TopBar />
      <main className="scroll-container">
        <Hero />
        <div className="section-2 d-flex flex-column gap-5">
          <AboutStrip />
          <Projects projects={featuredProjects} />
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App
