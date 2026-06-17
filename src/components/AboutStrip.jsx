import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStrip() {
  const triggerRef = useRef(null);
  const pinRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const spans = textRef.current.querySelectorAll('.reveal-word');

    gsap.to(spans, {
      color: '#ffffff',
      stagger: 0.1,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: '+=200%',
        pin: pinRef.current,
        scrub: true,
        markers: false,
      },
    });
  }, { scope: triggerRef });

  const titolo = "I develop interfaces that save users time and bridge the gap between design and code.";
  const paragrafo = "I consider myself a hybrid dev: I write clean code, but I think like a designer, breaking down the barriers between both worlds.";

  return (
    <section ref={triggerRef} className="about-trigger w-100" id="about">
      <div ref={pinRef} className="sh-grid container d-flex justify-content-center align-items-center h-100vh">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-xl-9 d-flex flex-column flex-xl-row align-items-center align-items-lg-start position-relative">
            <span className="section-label about-me-label">
              (About me)
            </span>
            <div ref={textRef} className="reveal-text about-me-text px-4 px-xl-0">
              <h1 className="m-0 d-inline">
                {titolo.split(' ').map((word, index) => (
                  <span key={`title-${index}`} className="reveal-word">
                    {word}&nbsp;
                  </span>
                ))}
              </h1>
              <h2 className="m-0 d-inline">
                {paragrafo.split(' ').map((word, index) => (
                  <span key={`p-${index}`} className="reveal-word">
                    {word}&nbsp;
                  </span>
                ))}
              </h2>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
