import { useEffect, useState } from "react";

function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isClickScrolling, setIsClickScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

useEffect(() => {
  const html = document.documentElement;
  const body = document.body;
  if (menuOpen) {
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.touchAction = "none"; 
    if (window.lenis) {
      window.lenis.stop();
    }
  } else {
    body.style.overflow = "";
    html.style.overflow = "";
    body.style.touchAction = "";
    if (window.lenis) {
      window.lenis.start();
    }
  }
  return () => {
    body.style.overflow = "";
    html.style.overflow = "";
    body.style.touchAction = "";
    if (window.lenis) window.lenis.start();
  };
}, [menuOpen]);

  useEffect(() => {
    const sections = ["home", "about", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isClickScrolling]);
  
  const scrollToSection = (id) => {
    setMenuOpen(false);
    setIsClickScrolling(true);
    setActiveSection(id);

    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setTimeout(() => {
      setIsClickScrolling(false);
    }, 1000);
  };

  return (
    <header className={`topbar ${scrolled ? "topbar-scrolled" : ""}`}>
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-start">
          <div
            className={`topbar-logo ${scrolled ? "small" : ""}`}
            onClick={() => scrollToSection("home")}
            style={{ cursor: "pointer" }}
          >
            MATTEO
          </div>

          <div className="topbar-actions">
            <div className="topbar-time">
              <div className="time-display">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <small>(GMT+1)</small>
            </div>

            <button onClick={() => scrollToSection("contact")} className="talk-btn">
              <span className="talk-inner">
                <span className="talk-text top">LET'S TALK</span>
                <span className="talk-text bottom">LET'S TALK</span>
              </span>
            </button>

            <button
              className={`menu-btn ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
            </button>
          </div>

          <div className={`fullscreen-menu ${menuOpen ? "open" : ""}`}>
            <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
            <div className="menu-panel" data-lenis-prevent>
              <div className="menu-header">
                <div className="menu-title">
                  <span className="orange-dot-square"></span>
                  MENU
                </div>
                <button className="menu-btn-x" onClick={() => setMenuOpen(false)}>
                  <span />
                  <span />
                </button>
              </div>

              <nav className="menu-nav">
                {["home", "about", "projects", "contact"].map((id) => (
                  <div className="nav-item-wrapper" key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className={`nav-link text-uppercase ${activeSection === id ? "active" : ""}`}
                    >
                      {id} {activeSection === id && <span className="active-marker" />}
                    </button>
                  </div>
                ))}
              </nav>

              <div className="menu-footer">
                <div className="footer-section">
                  <span className="footer-label">(EMAIL)</span>
                  <a href="mailto:matteo.paglietta.mp@gmail.com" target="_blank" rel="noreferrer" className="email-link">
                    matteo.paglietta.mp@gmail.com
                  </a>
                </div>
                <div className="footer-section">
                  <span className="footer-label">(CV)</span>
                  <a
                    href="/PAGLIETTA-MATTEO-CV.pdf"
                    download="PAGLIETTA-MATTEO-CV.pdf"
                    className="cv-link"
                  >
                    Download Cv <span className="arrow ms-3">&#10515;</span>
                  </a>
                </div>
                <div className="footer-section">
                  <span className="footer-label">(SOCIALS)</span>
                  <div className="socials-grid">
                    <a href="https://www.linkedin.com/in/matteo-paglietta" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                    <a href="https://www.instagram.com/_paglie_/" target="_blank" rel="noreferrer">Instagram ↗</a>
                    <a href="https://www.github.com/matteopaglietta" target="_blank" rel="noreferrer">GitHub ↗</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </header >
  );
}

export default TopBar;
