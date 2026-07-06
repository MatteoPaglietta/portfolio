# Matteo Paglietta — Portfolio

Personal portfolio site for Matteo Paglietta, frontend & web developer. Built with React and Vite, optimized for performance, accessibility and SEO, with static prerendering for search engines.

**Live:** [matteopaglietta.it](https://matteopaglietta.it/)

## Stack

- **React 19** + **React Router** — UI and routing
- **Vite** — build tool and dev server
- **GSAP** + **Lenis** — animations and smooth scroll
- **Bootstrap** (purged at build time with PostCSS/PurgeCSS) — layout utilities
- **EmailJS** — contact form submission without a backend
- **Puppeteer** — static prerendering after build for crawlers/SEO

## Structure

```
src/
  components/   Hero, TopBar, Projects, Contact, Footer, etc.
  App.jsx        Main layout and routing
public/
  img/           Image assets (jpg/webp/avif for each project)
  fonts/         Self-hosted fonts (Anton)
  .htaccess      Apache config: HTTPS, security headers, SPA fallback
scripts/
  purge-bootstrap.mjs   Strips unused Bootstrap classes (pre-build)
  prerender.mjs         Generates static HTML with Puppeteer (post-build)
```

## Commands

```bash
npm run dev       # start the dev server
npm run build     # production build + CSS purge + prerender
npm run preview   # serve the production build locally
npm run lint       # run ESLint
```

## Technical notes

- Images are served in **avif/webp/jpg** with automatic fallback ([LazyImage.jsx](src/components/LazyImage.jsx)).
- The **Anton** font is self-hosted (`public/fonts/`) to avoid a round-trip to Google Fonts.
- `llms.txt` in `public/` describes the site for LLM-based crawlers.
- Security headers (CSP, HSTS, X-Frame-Options, etc.) are defined in `public/.htaccess`.
