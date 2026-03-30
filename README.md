# Galaxy International School (GIS) Website

Pure **HTML5 + CSS3 + Vanilla JavaScript** (no frameworks, no build tools).

## Run locally (Windows)

- Open `galaxy-international-school/index.html` in your browser.
- Best experience: use a tiny local server (so some embeds/assets behave like production).

### Option A (Python)

```bash
cd galaxy-international-school
python -m http.server 5500
```

Then open `http://localhost:5500/`.

### Option B (VS Code / Cursor Live Server)

- Right-click `index.html` → **Open with Live Server**

## Form submissions (Admissions + Contact)

Forms are configured for Formspree:

- Replace `YOUR_FORM_ID` in:
  - `admissions.html`
  - `contact.html`

Example:

```html
<form action="https://formspree.io/f/xxxxabcd" method="POST">
```

## Images

This project expects:

- `images/logo.png` (provided by you)
- `images/favicon.ico`
- Gallery/topper/faculty images inside `images/gallery/`, `images/toppers/`, `images/faculty/`

Replace the placeholder filenames referenced in the HTML with your real photos (or keep the same names for a drop-in replacement).

## Pages

- `index.html` (Home)
- `about.html`
- `academics.html`
- `admissions.html`
- `facilities.html`
- `faculty.html`
- `gallery.html`
- `results.html`
- `news-events.html`
- `contact.html`

## SEO

- `sitemap.xml`
- `robots.txt`

