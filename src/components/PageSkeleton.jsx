export default function PageSkeleton() {
  return (
    <div className="page-skeleton" aria-hidden="true">
      <div className="page-skeleton-topbar">
        <span className="sk-block sk-logo" />
        <span className="sk-block sk-pill" />
      </div>

      <div className="page-skeleton-hero">
        <span className="sk-block sk-line sk-line-lg" />
        <span className="sk-block sk-line sk-line-lg" />
        <span className="sk-block sk-circle" />
        <span className="sk-block sk-line sk-line-md" />
      </div>

      <div className="page-skeleton-section">
        <span className="sk-block sk-line sk-line-sm" />
        <div className="page-skeleton-grid">
          <span className="sk-block sk-card" />
          <span className="sk-block sk-card" />
          <span className="sk-block sk-card" />
        </div>
      </div>
    </div>
  );
}
