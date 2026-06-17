import { useEffect, useState, useRef } from 'react';

export default function Projects({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const leftContentRef = useRef(null);
  const [flashIndex, setFlashIndex] = useState(null);
  const [leftContentHeight, setLeftContentHeight] = useState(null);
  const prevIndexRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const el = leftContentRef.current;
    if (!el) return;
    const updateHeight = () => setLeftContentHeight(el.getBoundingClientRect().height);
    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);
    window.addEventListener('resize', updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  useEffect(() => {
    if (!projects || projects.length === 0) return;
    const stickyObserverOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.2
    };
    const handleStickyIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'), 10);
          if (!isNaN(index)) {
            if (prevIndexRef.current !== index) {
              prevIndexRef.current = index;
              setActiveIndex(index);
              setFlashIndex(index);
              setTimeout(() => {
                setFlashIndex(null);
              }, 1400);
            }
          }
        }
      });
    };
    const stickyObserver = new IntersectionObserver(handleStickyIntersection, stickyObserverOptions);
    imageRefs.current.forEach((el) => {
      if (el) stickyObserver.observe(el);
    });
    const handleImageAnimations = () => {
      const altezzaFinestra = window.innerHeight;
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;
      imageRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        let entrataDallAlto = false;
        let uscitaDalBasso = false;

        if (isScrollingDown) {
          entrataDallAlto = rect.top < altezzaFinestra * 0.90;
          uscitaDalBasso = rect.bottom > altezzaFinestra * 0.75;
        } else {
          entrataDallAlto = rect.top < altezzaFinestra * 0.75;
          uscitaDalBasso = rect.bottom > altezzaFinestra * 0.10;
        }

        if (entrataDallAlto && uscitaDalBasso) {
          el.classList.add('in-view');
        } else {
          el.classList.remove('in-view');
        }
      });
    };
    handleImageAnimations();

    window.addEventListener('scroll', handleImageAnimations);
    window.addEventListener('resize', handleImageAnimations);

    return () => {
      stickyObserver.disconnect();
      window.removeEventListener('scroll', handleImageAnimations);
      window.removeEventListener('resize', handleImageAnimations);
    };
  }, [projects]);

  return (
    <section
      id="projects"
      className="projects-scroll-container w-100"
      ref={containerRef}
    >
      <div className="projects-title-header">
        <span className="proj-title">LATEST WORK</span>
      </div>

      <div className="projects-sticky-wrapper projects-desktop-layout">
        <div className="container-fluid projects-content-body">
          <div className="row h-100 align-items-stretch">
            <div className="col-12 col-lg-4 project-left-viewport">
              <div className="project-left-content" ref={leftContentRef}>
                <div className="num-viewport">
                  <div
                    className="numbers-track"
                    style={{ transform: `translateY(-${activeIndex * 120}px)` }}
                  >
                    {projects.map((item) => (
                      <span key={`num-${item.number}`} className="proj-big-num">
                        {item.number}.
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="projects-menu list-unstyled">
                  {projects.map((item, idx) => {
                    const isActive = activeIndex === idx;
                    const isFlashing = flashIndex === idx;
                    return (
                      <li key={`menu-${item.number}`} className="menu-item-wrapper">
                        <span className={`menu-dash ${isActive ? 'active' : ''}`}>—</span>
                        <a
                          href={isActive ? (item.githubUrl || "#") : undefined}
                          target={isActive ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className={`project-menu-item ${isActive ? 'active' : ''} ${isFlashing ? 'scroll-triggered' : ''}`}
                          onClick={(e) => !isActive && e.preventDefault()}
                        >
                          {item.title}
                          {isActive && <span className="arrow">&#8599;</span>}
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <div className="project-details-viewport">
                  <div className="title-viewport">
                    <div
                      className="titles-track"
                      style={{ transform: `translateY(-${activeIndex * 80}px)` }}
                    >
                      {projects.map((item) => (
                        <div key={`title-slot-${item.number}`} className="title-track-item">
                          <h3 className="project-display-title">{item.title}</h3>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="desc-viewport">
                    <div
                      className="descs-track"
                      style={{ transform: `translateY(-${activeIndex * 130}px)` }}
                    >
                      {projects.map((item) => (
                        <div key={`desc-slot-${item.number}`} className="desc-track-item">
                          <p className="project-display-desc">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 project-right-viewport">
              {projects.map((item, idx) => (
                <div
                  key={`img-${item.number}`}
                  className="image-track-item"
                  data-index={idx}
                  ref={(el) => (imageRefs.current[idx] = el)}
                >
                  <div
                    className="proj-visual-mockup"
                    style={leftContentHeight ? { height: leftContentHeight } : undefined}
                  >
                    <img src={item.image} alt={item.title} className="proj-img-element" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <div className="projects-mobile-layout container">
        {projects.map((item) => (
          <div key={`mobile-${item.number}`} className="mobile-project-item">
            <div className="mobile-proj-visual-mockup">
              <img src={item.image} alt={item.title} className="mobile-proj-img-element" />
            </div>
            <a
              href={item.githubUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-project-title-link"
            >
              <h3 className="mobile-project-title">{item.title}</h3>
              <span className="arrow">&#8599;</span>
            </a>
            <p className="mobile-project-desc">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="projects-tablet-layout container">
        {projects.map((item, idx) => (
          <div
            key={`tablet-${item.number}`}
            className={`tablet-project-row ${idx % 2 === 1 ? 'reverse' : ''}`}
          >
            <div className="tablet-project-text">
              <span className="tablet-proj-num">{item.number}.</span>
              <a
                href={item.githubUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="tablet-project-title-link"
              >
                <h3 className="tablet-project-title">{item.title}</h3>
                <span className="arrow">&#8599;</span>
              </a>
              <p className="tablet-project-desc">{item.description}</p>
            </div>
            <div className="tablet-proj-visual-mockup">
              <img src={item.image} alt={item.title} className="tablet-proj-img-element" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
