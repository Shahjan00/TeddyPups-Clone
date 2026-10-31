# TeddyPups — Website Clone

A pixel-perfect clone of the TeddyPups website (puppy.instabizweb.com), built as part of a technical assignment for Insta Biz Web.

## What is this?

TeddyPups is a single-page storytelling website for a premium puppy brand. It features a cinematic scroll-driven experience — a loader intro, hero section, a pinned horizontal kennel with animated swinging doors, a walking mascot dog, journey timeline, passport stamps, happy families gallery, FAQ accordion, and CTA sections.

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19** — component-based UI, scroll-driven animations
- **Tailwind CSS** — styling
- **Framer Motion** — page transitions and micro-interactions

## Project Structure

```
├── index.html              # Homepage (main entry)
├── puppies.html            # Puppy listings
├── puppies/                # Individual puppy detail pages
├── contact.html            # Contact page
├── faq.html                # FAQ accordion page
├── how-it-works.html       # Process/journey page
├── happy-families.html     # Testimonials gallery
├── gone-home.html          # Adoption stories
├── static/
│   ├── chunks/             # JS bundles (Next.js output)
│   ├── _next/              # Optimized images
│   ├── brand/              # Logo assets
│   ├── media/              # Puppy photos & media
│   └── images/             # UI graphics
├── cursor/                 # Custom paw cursor assets
└── media/                  # Raw media files
```

## How to Run

No build step needed — this is a static export. Just serve it over HTTP:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open http://localhost:8000 in your browser.

> Note: don't open `index.html` directly via `file://` — the JS chunks need HTTP to load properly.

## Key Features

- **Scroll-driven kennel** — pinned horizontal section where doors swing open as you scroll, with a mascot dog that walks between stops
- **Paw cursor trail** — custom paw-print cursor that leaves fading paw trails (canvas-based)
- **Smart navbar** — hides on scroll down, reappears on scroll up
- **FAQ accordion** — smooth expand/collapse with proper ARIA attributes
- **Optimized images** — pre-generated responsive images, no runtime optimizer needed

## AI Tools Used

I used **Claude (Anthropic)** and **Muse** during development:

- **Debugging the animation engine** — the trickiest part. The original bootstrap had broken chunk references (`.html` files instead of `.js`) and a corrupted data segment that killed the inline scripts. I used Claude to trace through the minified Next.js runtime, find the exact failure points, and patch them. Prompt was something like: *"The page loads but React never hydrates — here are the console errors and the bootstrap code, what's breaking?"*
- **Image loading fix** — after the engine ran, images 404'd because the client-side Image component generated optimizer URLs (`/_next/image?url=...`) but there's no optimizer on static hosting. Used Claude to find the default image loader in the bundle and patch it to map to the pre-generated static files. Prompt: *"Next.js Image component generates /_next/image URLs that 404 on static hosting — how do I override the loader to use existing files?"*
- **Code review** — had it sanity-check my patches for syntax errors before pushing.

Everything else — understanding the component structure, the scroll engine, the animation timing — I worked through myself by reading the code.

## Challenges

1. **Dead bootstrap** — the entry script referenced chunks that didn't exist as JS files. Took a while to realize the downloader had saved error pages as `.html`. Fixed by correcting the chunk paths and deferring the push to window load.
2. **Silent data corruption** — one inline script had a broken escape sequence (`\"` lost its backslash) that killed the entire script block with zero useful error output. Found it by running each script through a JS parser one by one.
3. **Hydration mismatch on images** — the SSR'd HTML had working image URLs, but React re-rendered them as optimizer URLs on hydration. Solved with a URL mapping + loader patch.

## Deployment

Deployed as a static site. Any static host works — Netlify Drop, Vercel, GitHub Pages, etc.

---

Built by Shahjan Ali — B.Tech CSE '27, Parul University
