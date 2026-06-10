export default function Projects({ projects }) {
  return (
    <section className="site-wrap" id="projects">
      <div className="sh-grid">
        <span className="section-label">(Latest work)</span>
        <div>
          <h2>Una selezione di progetti costruiti per sembrare forti al primo sguardo.</h2>
          <p className="t-muted mt-2">Layout ampi, gerarchie tipografiche nette e card dal feeling editoriale.</p>
        </div>
      </div>
      <div className="row g-3">
        {projects.map(p => (
          <div className="col-12 col-md-6" key={p.number}>
            <article className="card-dark rounded overflow-hidden h-100">
              <div className="proj-visual"><span className="proj-num">{p.number}</span></div>
              <div className="p-4">
                <span className="micro-label mb-2">{p.category}</span>
                <h3 className="fs-4 mb-2">{p.title}</h3>
                <p className="t-muted mb-0">{p.description}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
