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
        end: '+=100%',
        pin: pinRef.current,
        scrub: true,
        markers: false,
      },
    });
  }, { scope: triggerRef });

  const testo = "We combines years of web design and branding expertise to craft meaningful, story-driven experiences";

  return (
    <section ref={triggerRef} className="about-trigger w-100" id="about">
      <div ref={pinRef} className="sh-grid d-flex justify-content-center align-items-center h-100vh">
        <div className="d-flex align-items-start">
          <span className="section-label pt-1 pe-5">(About me)</span>
          <h2 ref={textRef} className="reveal-text">
            {testo.split(' ').map((word, index) => (
              <span key={index} className="reveal-word">
                {word}&nbsp;
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
