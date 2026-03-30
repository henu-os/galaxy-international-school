/* ==========================================================================
   GIS — Animated counters (IntersectionObserver)
   ========================================================================== */

(() => {
  const els = Array.from(document.querySelectorAll("[data-count]"));
  if (els.length === 0) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const duration = prefersReduced ? 0 : 1100;

  function animate(el) {
    const raw = el.getAttribute("data-count") || "0";
    const suffix = el.getAttribute("data-suffix") || "";
    const target = Number(raw);
    const start = 0;

    if (!Number.isFinite(target) || duration === 0) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(start + (target - start) * eased);
      el.textContent = `${val}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        animate(el);
        obs.unobserve(el);
      });
    },
    { threshold: 0.3 }
  );

  els.forEach((el) => obs.observe(el));
})();

