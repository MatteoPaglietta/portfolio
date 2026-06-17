import { useEffect, useState } from "react";
import {
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaAngular, FaFigma,
  FaWordpress, FaPhp, FaBootstrap, FaGit, FaGithub, FaGitlab, FaLaravel,
} from "react-icons/fa";
import { SiMysql, SiTailwindcss, SiGraphql, SiClaude } from "react-icons/si";

export default function Hero({ available, role, company }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const techStack = [
    FaHtml5, FaCss3Alt, FaJs, FaPhp, FaReact, FaAngular, FaLaravel,
    FaWordpress, FaFigma, FaBootstrap, SiTailwindcss, SiMysql, FaGit,
    FaGithub, FaGitlab, SiGraphql, SiClaude, 
  ];

  useEffect(() => {
    const handleLenisScroll = (e) => {
      const vh = window.innerHeight;
      const progress = Math.min(e.scroll / vh, 1);
      setScrollProgress(progress);
    };
    let checkInterval = setInterval(() => {
      if (window.lenis) {
        window.lenis.on('scroll', handleLenisScroll);
        clearInterval(checkInterval);
      }
    }, 50);

    return () => {
      clearInterval(checkInterval);
      if (window.lenis) {
        window.lenis.off('scroll', handleLenisScroll);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    if (window.lenis) {
      if (id === "home") {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        const element = document.getElementById(id);
        if (element) {
          window.lenis.scrollTo(element, { duration: 1.2, offset: 0 });
        }
      }
    } else {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const scale = 1 - scrollProgress * 0.18;
  const opacity = 1 - scrollProgress;

  return (
    <section
      className="section-1 hero"
      id="home"
      style={{
        "--hero-scale": scale,
        "--hero-opacity": opacity
      }}
    >
      <div className="hero-stage">

        <div className="hero-mobile-meta d-lg-none">
          <div className="topbar-available">
            <span className={`${available ? "green-dot" : "red-dot"}`}></span>
            {available ? "Open to work" : `Full-time as ${role} @${company}`}
          </div>

          <div className="topbar-time">
            <div className="time-display">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <small>(GMT+1)</small>
          </div>
        </div>

        <div className="hs-copy">
          <h2>
            <span>
              Functional
              <br />
              Code.
            </span>
            <br />
            Thoughtful
            <br />
            Design.
          </h2>
        </div>

        <div className="hero-center-image-wrapper">
          <img
            src="/img/contact.jpg"
            alt="Matteo Paglietta"
            className="hero-center-img"
          />
        </div>

        <div className="hs-intro">
          <p>
            <span className="ps-5" />I build websites and improve
            <br />organic web search {" "}
            <span>with intention,
              <br />clarity and care.</span>
          </p>

          <div
            className="d-grid gap-2 mt-4 stack-row"
            style={{ gridTemplateColumns: "60px 1fr" }}
          >
            <span className="trusted-lbl align-self-center">
              Stack:
            </span>

            <div className="trusted-carousel">
              <div className="trusted-track">
                {[...techStack, ...techStack].map((Icon, index) => (
                  <div className="trusted-brand" key={index}>
                    <Icon />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hs-cta">
          <a
            href="#contact"
            className="btn btn-accent hs-cta-btn project-btn"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            <span className="talk-inner">
              <span className="project-text top">Start a project<span className="arrow ms-3">&#8599;</span></span>
              <span className="project-text bottom">Start a project<span className="arrow ms-3">&#8599;</span></span>
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
