# Planet Tech Nepal — Landing Page

A static, production-ready landing page for Planet Tech Nepal: intelligent CCTV and live
mountain streaming for extreme environments. No build step required — plain HTML, CSS and a
small vanilla-JS file.

## Folder structure

```
planettechnepal/
├── index.html                # Single-page site
├── favicon.ico
├── apple-touch-icon.png
├── robots.txt
├── sitemap.xml
├── .gitignore
├── README.md
└── assets/
    ├── css/
    │   └── style.css         # All styles (Poppins, responsive)
    ├── js/
    │   └── main.js           # Mobile-nav toggle
    └── images/
        ├── hero.webp
        ├── logo.webp             # navy header logo
        ├── logo-gold.png         # gold footer logo (transparent)
        ├── about-station.webp
        ├── about-engineer.webp
        ├── featured-camera.webp
        ├── service-weather.webp
        ├── service-streaming.webp   # pre-composed "LIVE" card
        ├── service-maps.webp
        └── favicon-16/32/48/180.png
```

## Run locally

It's a static site, so just open `index.html` in a browser, or serve the folder:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit http://localhost:8000

## Deploy

Upload the whole `planettechnepal/` folder to any static host:

- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder or connect the repo
  (publish directory = project root, no build command).
- **GitHub Pages** — push to a repo and enable Pages on the root.
- **Nginx / Apache** — copy the folder to the web root.

## Customize

- **Colors / spacing** — CSS custom properties at the top of `assets/css/style.css` (`:root`).
- **Content / links** — edit `index.html`; nav items link to in-page sections (`#home`, `#about`, …).
- **Images** — replace files in `assets/images/` (keep the same names, or update the `src`
  attributes). Images are WebP for performance; the gold footer logo is a transparent PNG.
- **Fonts** — Poppins is loaded from Google Fonts in `<head>`.

## Notes

- Fully responsive with a mobile hamburger menu (`assets/js/main.js`).
- SEO: title, meta description, Open Graph and Twitter tags, canonical URL, sitemap and robots.
- Before going live, update the absolute URLs in `sitemap.xml`, `robots.txt` and the Open Graph
  tags if the domain differs.
