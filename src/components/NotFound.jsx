import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, follow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <section className="notfound-section">
      <Link to="/" className="notfound-logo">
        MATTEO
      </Link>

      <div className="notfound-content">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">Page not found</h1>
        <p className="notfound-text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn talk-btn notfound-btn">
          <span className="talk-inner">
            <span className="talk-text top">Back to home</span>
            <span className="talk-text bottom">Back to home</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
