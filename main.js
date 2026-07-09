 "/* Fashes Watches — global interactions */
(function () {
  // Nav scroll state
  const nav = document.querySelector(\".nav\");
  if (nav) {
    const setNav = () => nav.classList.toggle(\"scrolled\", window.scrollY > 40);
    window.addEventListener(\"scroll\", setNav, { passive: true });
    setNav();
  }

  // Custom cursor
  const dot = document.createElement(\"div\");
  dot.className = \"cursor-dot\";
  document.body.appendChild(dot);
  window.addEventListener(\"mousemove\", (e) => {
    dot.style.left = e.clientX + \"px\";
    dot.style.top = e.clientY + \"px\";
  });
  document.querySelectorAll(\"a, button, .card, input, textarea\").forEach((el) => {
    el.addEventListener(\"mouseenter\", () => dot.classList.add(\"hover\"));
    el.addEventListener(\"mouseleave\", () => dot.classList.remove(\"hover\"));
  });

  // GSAP reveal animations
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Fade + rise on load
    gsap.from(\"[data-reveal]\", {
      opacity: 0,
      y: 40,
      duration: 1.1,
      stagger: 0.08,
      ease: \"power3.out\",
    });

    // Scroll-triggered reveals
    document.querySelectorAll(\"[data-scroll-reveal]\").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: \"power3.out\",
        scrollTrigger: { trigger: el, start: \"top 85%\" },
      });
    });

    // Section titles subtle parallax
    document.querySelectorAll(\"[data-parallax]\").forEach((el) => {
      gsap.to(el, {
        yPercent: -18,
        ease: \"none\",
        scrollTrigger: { trigger: el, start: \"top bottom\", end: \"bottom top\", scrub: true },
      });
    });
  }

  // Cart helpers (localStorage)
  const CART_KEY = \"fashes_cart\";
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
  }
  function saveCart(c) {
    localStorage.setItem(CART_KEY, JSON.stringify(c));
    updateCartCount();
  }
  function updateCartCount() {
    const c = getCart();
    const n = c.reduce((a, b) => a + b.qty, 0);
    document.querySelectorAll(\".cart-count\").forEach((el) => (el.textContent = n));
  }
  window.FASHES = {
    addToCart(item) {
      const c = getCart();
      const i = c.findIndex((x) => x.id === item.id);
      if (i >= 0) c[i].qty += item.qty || 1;
      else c.push({ ...item, qty: item.qty || 1 });
      saveCart(c);
      toast(`${item.name} added to cart`);
    },
    removeFromCart(id) {
      saveCart(getCart().filter((x) => x.id !== id));
    },
    getCart,
    saveCart,
  };
  updateCartCount();

  // Simple toast
  function toast(msg) {
    let t = document.querySelector(\".fashes-toast\");
    if (!t) {
      t = document.createElement(\"div\");
      t.className = \"fashes-toast\";
      t.style.cssText =
        \"position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#d4af37;color:#000;padding:14px 28px;border-radius:100px;font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:500;z-index:10000;opacity:0;transition:opacity .3s ease, transform .3s ease\";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = \"1\";
    t.style.transform = \"translateX(-50%) translateY(0)\";
    clearTimeout(t._h);
    t._h = setTimeout(() => {
      t.style.opacity = \"0\";
      t.style.transform = \"translateX(-50%) translateY(20px)\";
    }, 2200);
  }

  // Contact form submit (client-side only)
  const cf = document.getElementById(\"contact-form\");
  if (cf) {
    cf.addEventListener(\"submit\", (e) => {
      e.preventDefault();
      toast(\"Message sent — we'll reply soon\");
      cf.reset();
    });
  }
})();
"
Observation: Create successful: /app/frontend/public/watches/js/main.js
