/* ==========================================================================
   GIS — Swiper init (Testimonials / sliders)
   ========================================================================== */

(() => {
  function init() {
    const el = document.querySelector(".swiper");
    if (!el) return;
    if (typeof window.Swiper !== "function") return;

    // eslint-disable-next-line no-new
    new window.Swiper(".swiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 16,
      autoplay: { delay: 3200, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 },
      },
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();

