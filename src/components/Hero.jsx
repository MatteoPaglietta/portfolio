import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaAngular,
  FaFigma,
  FaWordpress,
  FaPhp,
} from "react-icons/fa";

import { SiMysql } from "react-icons/si";

export default function Hero() {
  const techStack = [
    FaReact,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaAngular,
    FaFigma,
    SiMysql,
    FaPhp,
    FaWordpress,
  ];

  return (
    <section className="section-1 hero site-wrap" id="home">
      <div className="hero-stage">
        <div className="hs-copy">
          <h1>
            Beyond
            <br />
            Visuals.
            <br />
            Built with
            <br />
            Vision.
          </h1>
        </div>

        <div className="hs-intro">
          <p>
            <span className="ps-5" />I build websites and improve
            <br />web search {" "}
            <span>with intention,
            <br />clarity and care.</span>
          </p>

          <div
            className="d-grid gap-2 mt-4"
            style={{ gridTemplateColumns: "94px 1fr" }}
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
          <a href="#contact" className="btn btn-accent hs-cta-btn d-inline-flex align-items-center project-btn">
            <span className="talk-inner d-flex justify-content-between">
              <span className="project-text top">Start a project<span className="arrow ms-3">&#8599;</span></span>
              <span className="project-text bottom">Start a project<span className="arrow ms-3">&#8599;</span></span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
