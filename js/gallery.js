/* ==========================================================================
   GIS — Gallery filter + lightbox hook
   ========================================================================== */

(() => {
  const wrap = document.querySelector("[data-gallery]");
  if (!wrap) return;

  const buttons = Array.from(document.querySelectorAll("[data-filter]"));
  const items = Array.from(wrap.querySelectorAll("[data-category]"));

  function setPressed(btn) {
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
  }

  function applyFilter(value) {
    const v = value.toLowerCase();
    items.forEach((it) => {
      const cats = (it.getAttribute("data-category") || "").toLowerCase().split(/\s+/);
      const show = v === "all" || cats.includes(v);
      it.hidden = !show;
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-filter") || "all";
      setPressed(btn);
      applyFilter(value);
    });
  });

  // Default active: All
  const all = buttons.find((b) => (b.getAttribute("data-filter") || "").toLowerCase() === "all");
  if (all) {
    setPressed(all);
    applyFilter("all");
  }
})();

