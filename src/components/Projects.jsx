import { useEffect, useState, useRef } from 'react';

export default function Projects({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const scrollTargetRef = useRef(0);  
  const scrollCurrentRef = useRef(0); 
  const currentScalesRef = useRef(projects.map(() => 0.6));
  const currentOpacitiesRef = useRef(projects.map(() => 0.2));
  const [, setRenderTick] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      const scrolled = -rect.top;

      if (scrolled >= 0 && scrolled <= totalScrollableHeight) {
        const rawProgress = scrolled / totalScrollableHeight;
        const activationOffset = 0.10;
        let adjustedProgress = 0;
        if (rawProgress > activationOffset) {
          adjustedProgress = (rawProgress - activationOffset) / (1 - activationOffset);
        }
        scrollTargetRef.current = Math.max(0, Math.min(adjustedProgress, 1));
      }
    };

    window.addEventListener('scroll', handleScroll);

    let animationFrameId;
    const updateInertia = () => {
      const lerpFactor = 0.08; 
      scrollCurrentRef.current += (scrollTargetRef.current - scrollCurrentRef.current) * lerpFactor;

      const totalSegments = projects.length - 1 || 1;
      const adjustedProgress = scrollCurrentRef.current;

      const currentSegment = Math.floor(adjustedProgress * totalSegments);
      const segmentProgress = (adjustedProgress * totalSegments) % 1;

      let localProgress;
      if (segmentProgress < 0.20) {
        const t = segmentProgress / 0.20;
        localProgress = (t * t * (3 - 2 * t)) * 0.12;
      } else if (segmentProgress > 0.80) {
        const t = (segmentProgress - 0.80) / 0.20;
        localProgress = 0.88 + (t * t * (3 - 2 * t)) * 0.12;
      } else {
        const t = (segmentProgress - 0.20) / 0.60;
        localProgress = 0.12 + t * 0.76;
      }

      const smoothProgress = (currentSegment + localProgress) / totalSegments;
      const finalProgress = Math.max(0, Math.min(smoothProgress, 1));

      projects.forEach((_, idx) => {
        const targetProgress = idx / (projects.length - 1 || 1);
        const delta = finalProgress - targetProgress;

        let targetScale = 0.60; 
        let targetOpacity = 0.15;

        if (delta >= 0) {
          targetScale = 1.0;
          targetOpacity = 1.0;
        } else {
          const distanceToCenter = Math.abs(delta);
          const maxDistance = 1 / (projects.length - 1 || 1);
          const factor = Math.max(0, Math.min(1 - (distanceToCenter / maxDistance), 1));
          
          targetScale = 0.60 + (factor * 0.40);
          targetOpacity = 0.15 + (factor * 0.85);
        }

        currentScalesRef.current[idx] += (targetScale - currentScalesRef.current[idx]) * 0.1;
        currentOpacitiesRef.current[idx] += (targetOpacity - currentOpacitiesRef.current[idx]) * 0.1;
      });

      const currentIdx = Math.floor(scrollTargetRef.current * projects.length);
      const clampedIdx = Math.max(0, Math.min(currentIdx, projects.length - 1));
      setActiveIndex(clampedIdx);

      setRenderTick(prev => prev + 1);

      animationFrameId = requestAnimationFrame(updateInertia);
    };

    animationFrameId = requestAnimationFrame(updateInertia);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [projects]);

  const totalSegments = projects.length - 1 || 1;
  const currentSegment = Math.floor(scrollCurrentRef.current * totalSegments);
  const segmentProgress = (scrollCurrentRef.current * totalSegments) % 1;

  let localProgress = 0;
  if (segmentProgress < 0.20) {
    const t = segmentProgress / 0.20;
    localProgress = (t * t * (3 - 2 * t)) * 0.12;
  } else if (segmentProgress > 0.80) {
    const t = (segmentProgress - 0.80) / 0.20;
    localProgress = 0.88 + (t * t * (3 - 2 * t)) * 0.12;
  } else {
    const t = (segmentProgress - 0.20) / 0.60;
    localProgress = 0.12 + t * 0.76;
  }
  const ammortizedTrackProgress = (currentSegment + localProgress) / totalSegments;

  return (
    <section
      id="projects" 
      className="projects-scroll-container w-100"
      ref={containerRef}
      style={{ height: `${projects.length * 140}vh` }}
    >
      <div className="projects-title-header">
        <span className="proj-title">LATEST WORK</span>
      </div>

      <div className="projects-sticky-wrapper">
        <div className="container-fluid projects-content-body">
          <div className="row h-100 align-items-center">
            
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
                {projects.map((item, idx) => (
                  <li key={`menu-${item.number}`} className="menu-item-wrapper">
                    <span className={`menu-dash ${activeIndex === idx ? 'active' : ''}`}>—</span>
                    <span className={`project-menu-item ${activeIndex === idx ? 'active' : ''}`}>
                      {item.title}
                    </span>
                  </li>
                ))}
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
              <div
                className="images-track"
                style={{ transform: `translateY(-${ammortizedTrackProgress * (projects.length - 1) * 500}px)` }}
              >
                {projects.map((item, idx) => {
                  const currentScale = currentScalesRef.current[idx];
                  const currentOpacity = currentOpacitiesRef.current[idx];

                  return (
                    <div key={`img-${item.number}`} className="image-track-item">
                      <div 
                        className="proj-visual-mockup"
                        style={{ 
                          transform: `scale(${currentScale})`,
                          opacity: currentOpacity
                        }}
                      >
                        <img src={item.image} alt={item.title} className="proj-img-element" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}