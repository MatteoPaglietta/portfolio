export default function Contact() {
  return (
    <section className="site-wrap" id="contact">
      <div className="card-dark rounded p-4 p-md-5 mb-4">
        <span className="section-label mb-3">(Contact me)</span>
        <h2 className="display-5 fw-bold lh-sm mb-3" style={{letterSpacing:'-.05em'}}>
          Hai un progetto in mente?<br />Costruiamo qualcosa di davvero bello.
        </h2>
        <p className="t-muted mb-4" style={{maxWidth:'680px'}}>
          Scrivimi per discutere del tuo progetto, per un appuntamento o semplicemente per dire ciao. Sono sempre aperto a nuove opportunità e collaborazioni. Non vedo l'ora di sentirti!
        </p>
        <div className="d-flex flex-wrap gap-3">
          <a className="btn btn-gold py-3 px-4" href="mailto:matteo.paglietta.mp@gmail.com">matteo.paglietta.mp@gmail.com</a>
          <a className="btn btn-ghost py-3 px-4" href="tel:+39 334 181 0274">+39 334 181 0274</a>
        </div>
        <div className="contact-border-top d-flex justify-content-between gap-3 mt-5 pt-4">
          <p className="mb-0">Matteo Paglietta</p>
          <p className="mb-0 t-muted">Portfolio concept — premium editorial aesthetic.</p>
        </div>
      </div>
    </section>
  );
}
