/* ==========================================================================
   GIS — Scroll reveal (IntersectionObserver)
   ========================================================================== */

(() => {
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (items.length === 0) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");
        obs.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el, i) => {
    // Stagger within common grids
    const parent = el.parentElement;
    const isGrid = parent && (parent.classList.contains("features") || parent.classList.contains("stats") || parent.classList.contains("flip-grid") || parent.classList.contains("news-grid") || parent.classList.contains("toppers"));
    if (isGrid) el.style.transitionDelay = `${(i % 12) * 0.08}s`;
    obs.observe(el);
  });
})();

