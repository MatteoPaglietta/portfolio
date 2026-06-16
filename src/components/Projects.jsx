import { useEffect, useState, useRef } from 'react';

export default function Projects({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const [flashIndex, setFlashIndex] = useState(null);
  const prevIndexRef = useRef(null);

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
      imageRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const entrataDallAlto = rect.top < altezzaFinestra * 0.70;
        const uscitaDalBasso = rect.bottom > altezzaFinestra * 1;

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

      <div className="projects-sticky-wrapper">
        <div className="container-fluid projects-content-body">
          <div className="row h-100 align-items-stretch">
            <div className="col-12 col-lg-5 project-left-viewport">
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
            <div className="col-12 col-lg-7 project-right-viewport">
              {projects.map((item, idx) => (
                <div
                  key={`img-${item.number}`}
                  className="image-track-item"
                  data-index={idx}
                  ref={(el) => (imageRefs.current[idx] = el)}
                >
                  <div className="proj-visual-mockup">
                    <img src={item.image} alt={item.title} className="proj-img-element" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}