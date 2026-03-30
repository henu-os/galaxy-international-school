/* ==========================================================================
   GIS — main.js
   - Announcement dismiss
   - Sticky navbar scroll state
   - Mobile overlay menu
   - Floating buttons (WhatsApp, scroll-to-top)
   ========================================================================== */

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const ANNOUNCEMENT_KEY = "gisAnnouncementDismissed_v1";

  function setAnnouncement() {
    const bar = $("#announcement");
    if (!bar) return;

    const dismissed = localStorage.getItem(ANNOUNCEMENT_KEY) === "1";
    if (dismissed) {
      bar.style.display = "none";
      return;
    }

    const closeBtn = $("#announcementClose");
    closeBtn?.addEventListener("click", () => {
      localStorage.setItem(ANNOUNCEMENT_KEY, "1");
      bar.style.display = "none";
    });
  }

  function setNavbarScroll() {
    const navbar = $("#navbar");
    if (!navbar) return;

    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setActiveNavLink() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const links = $$('a[data-navlink="1"]');
    links.forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      const isActive = href === path;
      if (isActive) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function setMobileOverlay() {
    const openBtn = $("#navOpen");
    const overlay = $("#navOverlay");
    const closeBtn = $("#navClose");
    if (!openBtn || !overlay || !closeBtn) return;

    const focusablesSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    let lastFocus = null;

    const open = () => {
      lastFocus = document.activeElement;
      overlay.classList.add("is-open");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      const first = $(focusablesSelector, overlay);
      first?.focus();
    };

    const close = () => {
      overlay.classList.remove("is-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    };

    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;

      const focusables = $$(focusablesSelector, overlay);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // Close overlay after link click
    $$('#navOverlay a[data-navlink="1"]').forEach((a) => a.addEventListener("click", close));
  }

  function setFloatingButtons() {
    const topBtn = $("#scrollTop");
    if (topBtn) {
      const onScroll = () => topBtn.classList.toggle("is-visible", window.scrollY > 300);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    setAnnouncement();
    setNavbarScroll();
    setActiveNavLink();
    setMobileOverlay();
    setFloatingButtons();
  });
})();

