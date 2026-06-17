import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import BtnAllProjects from "./BtnAllProjects";

const scrollToSection = (id) => {
  if (window.lenis) {
    if (id === "home") {
      window.lenis.scrollTo(0, {
        duration: 2,
      });
    } else {
      window.lenis.scrollTo(`#${id}`, {
        duration: 2,
        offset: 0,
      });
    }
  } else {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }
};

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState({ email: '', message: '', privacy: '' });

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: '', message: '', privacy: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!message.trim()) {
      newErrors.message = 'Message field cannot be empty.';
      valid = false;
    }
    if (!privacyAccepted) {
      newErrors.privacy = 'Please accept the privacy policy to send your message.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('Sending...');
    const SERVICE_ID = 'service_nt1o2a4';
    const TEMPLATE_ID = 'template_w4956qf';
    const PUBLIC_KEY = 'MknHgPmvFF-TqekRu';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
        setStatus('Message sent successfully!');
        setEmail('');
        setMessage('');
        setPrivacyAccepted(false);
        setErrors({ email: '', message: '', privacy: '' });
        setTimeout(() => {
          setStatus('');
        }, 1000);

      }, (error) => {
        setStatus('Failed to send message. Try again.');
        setTimeout(() => {
          setStatus('');
        }, 3000);
      });
  };

  return (
    <section className="container" id="contact">
      <div className="container-fluid px-0" style={{ maxWidth: '1300px' }}>
        <div className="row align-items-center mb-md-5 contact-main-row">
          <div className="col-12 col-md-6 z-1">
            <h2 className="text-uppercase lh-1 mb-0 contact-big-title">
              LET'S WORK<br />TOGETHER
            </h2>
          </div>
          <div className="contact-center-bg" style={{ backgroundImage: "url('/img/contact.jpg')" }}></div>
          <div className="col-lg-5 offset-lg-1 z-1 mt-5 pt-5">
            <div className="hs-contact d-flex pb-md-4">
              <p>
                <span className="ps-xl-5" />Have a project in mind? I'd love to hear about it.
                <br /><span>Let's create something great together!</span>
              </p>
            </div>
            <BtnAllProjects title="Get in touch" link="mailto:matteo.paglietta.mp@gmail.com" arrow={false} className="justify-content-start get-in-touch-footer" style={{ width: '94%' }} classNameBtn='get-in-touch-btn' />
          </div>

        </div>
        <hr style={{ borderTop: '1px solid var(--bc)', opacity: 1, margin: '0 0 3rem' }} />
        <div className="row gy-5 contact-footer-row">
          <div className="col-12 col-lg-4 contact-footer-emailphone d-flex flex-column align-items-center align-items-lg-start">
            <div className="mb-4 text-center text-lg-start">
              <span className="footer-label">(EMAIL)</span>
              <a href="mailto:matteo.paglietta.mp@gmail.com" className="email-link">
                matteo.paglietta.mp@gmail.com
              </a>
            </div>
            <div>
              <span className="footer-label text-center text-lg-start">(PHONE)</span>
              <a href="tel:+393341810274" className="fw-bold text-decoration-none footer-phone">
                +39 334 181 0274
              </a>
            </div>
          </div>
          <div className="col-12 col-lg-5 contact-footer-links d-flex justify-content-center justify-content-lg-center gap-5">
            <div>
              <span className="footer-label">(LINKS)</span>
              <ul className="list-unstyled lh-base m-0 link-list">
                <a className="t-muted" onClick={() => scrollToSection("home")}>Home</a>
                <a className="t-muted" onClick={() => scrollToSection("about")}>About</a>
                <a className="t-muted" onClick={() => scrollToSection("projects")}>Projects</a>
                <a className="t-muted" onClick={() => scrollToSection("contact")}>Contact</a>
              </ul>
            </div>
            <div>
              <span className="footer-label">(CV)</span>
              <ul className="list-unstyled lh-base m-0 link-list">
                <a href="/PAGLIETTA-MATTEO-CV.pdf" download="PAGLIETTA-MATTEO-CV.pdf" className="t-muted">CV <span className="arrow ms-3">&#10515;</span></a>
              </ul>
            </div>
            <div>
              <span className="footer-label">(SOCIALS)</span>
              <ul className="list-unstyled lh-base m-0 d-flex flex-column link-list">
                <a href="https://www.linkedin.com/in/matteo-paglietta" target="_blank" rel="noreferrer" className="t-muted">LinkedIn ↗</a>
                <a href="https://www.instagram.com/_paglie_/" target="_blank" rel="noreferrer" className="t-muted">Instagram ↗</a>
                <a href="https://www.github.com/matteopaglietta" target="_blank" rel="noreferrer" className="t-muted">GitHub ↗</a>
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-3 contact-footer-form d-flex flex-column align-items-center align-items-lg-end">
            <p className="footer-label text-start text-xl-end mb-3" style={{ maxWidth: '280px', textTransform: 'none' }}>
              Write me a message to talk about your project
            </p>
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="ms-lg-auto"
              style={{ maxWidth: '300px' }}
              noValidate
            >
              <div className="input-animated-container my-2">
                <input
                  type="email"
                  id="email-field"
                  name="user_email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`form-control bg-transparent border-0 text-white rounded-0 px-0 pb-2 shadow-none ${errors.email ? 'border-bottom border-danger' : ''}`}
                  placeholder=" "
                  style={{ fontSize: '0.9rem' }}
                />
                <label htmlFor="email-field" className="floating-label">Enter email address*</label>
              </div>
              {errors.email && (
                <div className="text-start mb-3" style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '-5px' }}>
                  {errors.email}
                </div>
              )}
              <div className="input-animated-container mb-2 mt-4">
                <input
                  type="text"
                  id="message-field"
                  name="message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  className={`form-control bg-transparent border-0 text-white rounded-0 px-0 pb-2 shadow-none ${errors.message ? 'border-bottom border-danger' : ''}`}
                  placeholder=" "
                  style={{ fontSize: '0.9rem' }}
                />
                <label htmlFor="message-field" className="floating-label">Enter your message*</label>
              </div>
              {errors.message && (
                <div className="text-start mb-3" style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '-5px' }}>
                  {errors.message}
                </div>
              )}
              <div className="form-check text-start mb-3" style={{ paddingLeft: '1.5em' }}>
                <input
                  className="form-check-input custom-privacy-checkbox"
                  type="checkbox"
                  id="privacy-check"
                  checked={privacyAccepted}
                  onChange={(e) => {
                    setPrivacyAccepted(e.target.checked);
                    if (e.target.checked && errors.privacy) setErrors({ ...errors, privacy: '' });
                  }}
                />
                <label className="form-check-label text-white-50" htmlFor="privacy-check" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                  I consent to the processing of data according to the{' '}
                  <a
                    href="https://www.iubenda.com/privacy-policy/88542204"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#4fccc4', textDecoration: 'none' }}
                  >
                    Privacy Policy
                  </a>{' '}
                  and the {' '}
                  <a
                    href="https://www.iubenda.com/privacy-policy/88542204/cookie-policy"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#4fccc4', textDecoration: 'none' }}
                  >
                    Cookie Policy*
                  </a>
                </label>
              </div>
              {errors.privacy && (
                <div className="text-start mb-3" style={{ color: '#dc3545', fontSize: '0.75rem', marginTop: '-5px' }}>
                  {errors.privacy}
                </div>
              )}
              <button
                type="submit"
                className="btn talk-btn w-100 text-uppercase py-2 small fw-bold"
                style={{ fontSize: '0.8rem', letterSpacing: '0.1em', borderColor: '#222' }}
              >
                <span className="talk-inner">
                  <span className="talk-text top">SEND</span>
                  <span className="talk-text bottom">SEND</span>
                </span>
              </button>
              {status && (
                <p
                  className="small mt-4 text-center text-xl-start"
                  style={{
                    fontSize: '0.75rem',
                    opacity: 0.8,
                    color: status.startsWith('Failed') ? '#dc3545' : undefined,
                  }}
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
        <div className="contact-copyright text-center pt-5 pt-xl-3">
          &copy; {new Date().getFullYear()} Matteo Paglietta. All rights reserved.
        </div>
      </div>
    </section>
  );
}