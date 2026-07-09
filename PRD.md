 "# FASHES — Premium 3D Watch E-Commerce (Static HTML)

## Original problem statement
> 3D elements + premium animations e-commerce website for watches. On the index page a watch dial that grows bigger as user scrolls and drifts to the bottom of the page. All pages delivered as separate HTML files.

## User Choices
- Pure static HTML (each page separate `.html`)
- 6 pages: Home, Shop/Collection, Product, About/Heritage, Contact, Cart
- Realistic luxury 3D watch (gold + dark leather)
- Dark luxury color theme (black + gold)
- Three.js for real interactive 3D + GSAP for smooth animations
- Contact: `watches@fashes.com` · `+1 (415) 555-0142`

## Delivered Files (all in `/app/frontend/public/watches/`)
```
index.html      ← Home with scroll-driven Three.js watch
shop.html       ← Collection grid + category filters
product.html    ← Detail page with drag-to-rotate 3D watch
about.html      ← Brand heritage story
contact.html    ← Contact form + info
cart.html       ← Shopping cart (localStorage)
css/style.css   ← Full design system (dark + gold luxury)
js/watch3d.js   ← Scroll-driven Three.js watch (index)
js/main.js      ← Nav, cursor, GSAP reveals, cart helpers
```

## Live preview
`{REACT_APP_BACKEND_URL}/watches/index.html`

## Key implementation notes
- Three.js loaded from CDN (v0.160) — real 3D mesh (torus bezel + cylinder case + canvas dial texture + hand meshes)
- Watch renders live time (hour/min/sec hands update from `new Date()`)
- Scroll-driven transform: scale 1→3.2, x from 2.4→0, y from 0.3→-1.6, subtle mouse parallax
- GSAP + ScrollTrigger for reveals and parallax
- Cart persists via localStorage (`fashes_cart` key)
- All pages share the same nav/footer + design tokens
- Custom cursor with gold hover state, grain overlay, subtle animations everywhere

## What's implemented (2026-02)
- All 6 pages, full 3D watch scroll animation, cart flow, category filtering, product page 3D drag-rotate, contact form (client-side), fully responsive down to 640px.

## Backlog / P1
- Real payment integration (Stripe) — currently checkout shows a confirmation modal only
- Product image gallery (multiple angles per watch)
- Wishlist / favorites
- Backend order persistence + email notifications
- Search
"
Observation: Create successful: /app/memory/PRD.md
