/* ==========================================================================
   GIS — Hero particles (canvas)
   Lightweight, no libraries.
   ========================================================================== */

(() => {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) return;

  let w = 0;
  let h = 0;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  const particles = [];
  const COUNT = 56;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = Math.max(1, Math.floor(rect.width));
    h = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function seed() {
    particles.length = 0;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(1.2, 3.4),
        vx: rand(-0.25, 0.25),
        vy: rand(-0.18, 0.18),
        a: rand(0.16, 0.42),
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(139,0,0,${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Soft connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 120) continue;
        const alpha = (1 - dist / 120) * 0.16;
        ctx.strokeStyle = `rgba(200,151,42,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(() => {
    resize();
    seed();
  });

  ro.observe(canvas);
  resize();
  seed();
  draw();
})();

