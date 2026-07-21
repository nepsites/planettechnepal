# Planet Tech Nepal — Website

A production-ready, multi-page site for Planet Tech Nepal: intelligent CCTV and live
mountain streaming for extreme environments. Plain HTML, CSS and a small vanilla-JS
file — no build step, no backend to run.

## Pages

`index.html` (Home), `live-cameras.html`, `weather.html`, `technology.html`,
`pricing.html`, `about.html`, `contact.html` — all sharing one header/footer/stylesheet.

## Folder structure

```
planettechnepal/
├── index.html, live-cameras.html, weather.html, technology.html,
│   pricing.html, about.html, contact.html
├── favicon.ico, apple-touch-icon.png
├── robots.txt, sitemap.xml
├── .gitignore
├── README.md
└── assets/
    ├── css/style.css   # All styles (Poppins, responsive, fluid spacing)
    ├── js/main.js       # Mobile nav + "I'm Interested" show/hide toggle
    └── images/           # Photos, logos (navy + gold), favicons
```

## Run locally

Serve the folder (recommended, so the clean links below resolve correctly):

```bash
python3 -m http.server 8000   # or: npx serve .
```

Opening a `.html` file directly by double-clicking also works, but internal
links (which point to `/about`, `/pricing`, etc. — no `.html`) won't resolve
over a plain `file://` URL. Use a local server, or add `.html` back temporarily
if you need to test by double-clicking files.

## Clean URLs (no `.html` in the address bar)

All internal nav/CTA links across every page point to extension-less paths —
`/about`, `/pricing`, `/contact`, etc. — instead of `about.html`. The actual
files are still named `about.html` and so on; nothing was renamed.

This works because GitHub Pages (and most static hosts, including Cloudflare
Pages, Netlify and Vercel) automatically serves `about.html` when a visitor
requests `/about` — no config needed. So when someone clicks a nav link, the
browser address bar shows `planettechnepal.com/about`, never
`planettechnepal.com/about.html`.

## Deploy

Upload the whole `planettechnepal/` folder to any static host — Cloudflare Pages,
Netlify, Vercel, GitHub Pages, or a plain Nginx/Apache web root. No build command,
publish directory is the project root.

## Lead capture (Contact form + "I'm Interested")

The Contact page form and the "I'm Interested" widgets (on each Pricing card and the
Home page CTA band) submit straight to **Formspree** — a free service that emails
every submission to you and keeps a dashboard of everything submitted (your "leads"
list, exportable as CSV). No server code, no database, nothing to host yourself.

**One-time setup (about 2 minutes):**

1. Sign up free at [formspree.io](https://formspree.io).
2. Create a new form and set the recipient email to `info@planettechnepal.com`
   (Formspree will send a confirmation link to that inbox — click it to verify).
3. Copy your form's endpoint URL — it looks like `https://formspree.io/f/xa1b2c3d`.
4. Find and replace every `YOUR_FORM_ID` in this project with your real ID:
   - `contact.html` (1 occurrence)
   - `pricing.html` (3 occurrences — Starter, Pro, Enterprise cards)
   - `index.html` (1 occurrence — bottom CTA band)

That's it — redeploy, and every submission will land in your inbox and your
Formspree dashboard.

**Notes:**
- Both forms include a hidden `_gotcha` field — Formspree's own honeypot
  convention. Real visitors never fill it; bots often do, and Formspree silently
  drops those submissions.
- The free Formspree plan covers 50 submissions/month, which is unlimited-feeling
  for a new site; paid tiers raise that if needed.
- Want submissions to redirect to a custom "Thanks!" page instead of Formspree's
  default one? Add `<input type="hidden" name="_next" value="https://yourdomain.com/thanks.html">`
  to any of the forms.

## Customize

- **Colors / spacing** — CSS custom properties at the top of `assets/css/style.css` (`:root`).
- **Content / links** — edit the relevant `.html` file; nav is identical across pages.
- **Images** — replace files in `assets/images/` (keep the same names, or update `src`).
- **Fonts** — Poppins, loaded from Google Fonts in `<head>`.

## Notes

- Fully responsive with a mobile hamburger menu (`assets/js/main.js`).
- SEO: title, meta description, Open Graph/Twitter tags, canonical URL, sitemap, robots —
  set per page.
- Before going live, confirm the absolute URLs in `sitemap.xml`, `robots.txt` and each
  page's Open Graph tags match your domain.
