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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      setIsClickScrolling(true);

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        setIsClickScrolling(false);
      }, 700);
    }

    setMenuOpen(false);
  };

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
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isClickScrolling]);

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
              <div>{new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}</div>
              <small>(GMT+1)</small>
            </div>

            <a href="#contact" className="talk-btn">
              <span className="talk-inner">
                <span className="talk-text top">LET'S TALK</span>
                <span className="talk-text bottom">LET'S TALK</span>
              </span>
            </a>

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
            <div className="menu-panel">
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
                <div className="nav-item-wrapper">
                  <button
                    onClick={() => {
                      scrollToSection("home");
                      setActiveSection("home");
                    }}
                    className={`nav-link ${activeSection === "home" ? "active" : ""}`}
                  >
                    HOME {activeSection === "home" && <span className="active-marker" />}
                  </button>
                </div>

                <div className="nav-item-wrapper">
                  <button
                    onClick={() => {
                      scrollToSection("about");
                      setActiveSection("about");
                    }}
                    className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                  >
                    ABOUT {activeSection === "about" && <span className="active-marker" />}
                  </button>
                </div>

                <div className="nav-item-wrapper">
                  <button
                    onClick={() => {
                      scrollToSection("projects");
                      setActiveSection("projects");
                    }}
                    className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
                  >
                    PROJECTS {activeSection === "projects" && <span className="active-marker" />}
                  </button>
                </div>

                <div className="nav-item-wrapper">
                  <button
                    onClick={() => {
                      scrollToSection("contact");
                      setActiveSection("contact");
                    }}
                    className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                  >
                    CONTACT {activeSection === "contact" && <span className="active-marker" />}
                  </button>
                </div>
              </nav>

              <div className="menu-footer">
                <div className="footer-section">
                  <span className="footer-label">(EMAIL)</span>
                  <a href="mailto:matteo.paglietta.mp@gmail.com" target="_blank" rel="noreferrer" className="email-link">
                    matteo.paglietta.mp@gmail.com
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
    </header>
  );
}

export default TopBar;