/* ==========================================================================
   GIS — Form validation + (optional) async submission for Formspree
   ========================================================================== */

(() => {
  const form = document.querySelector("[data-validate-form]");
  if (!form) return;

  const toast = document.getElementById("toast");
  const submitBtn = form.querySelector('button[type="submit"]');

  const rules = {
    required: (v) => v.trim().length > 0,
    phoneIN: (v) => /^[6-9]\d{9}$/.test(v.replace(/\s+/g, "")),
    email: (v) => v.trim().length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  };

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-open");
    window.setTimeout(() => toast.classList.remove("is-open"), 4200);
  }

  function setFieldState(fieldEl, ok, msg) {
    const field = fieldEl.closest(".field");
    if (!field) return;
    const error = field.querySelector(".error");
    field.classList.toggle("is-invalid", !ok);
    if (error) error.textContent = msg || "";
  }

  function validate() {
    let ok = true;

    const requiredEls = Array.from(form.querySelectorAll("[data-required]"));
    requiredEls.forEach((el) => {
      const isOk = rules.required(el.value || "");
      setFieldState(el, isOk, "This field is required.");
      if (!isOk) ok = false;
    });

    const phone = form.querySelector('input[name="phone"]');
    if (phone) {
      const isOk = rules.phoneIN(phone.value || "");
      setFieldState(phone, isOk, "Enter a valid 10-digit Indian mobile number.");
      if (!isOk) ok = false;
    }

    const email = form.querySelector('input[name="email"]');
    if (email) {
      const isOk = rules.email(email.value || "");
      setFieldState(email, isOk, "Enter a valid email address.");
      if (!isOk) ok = false;
    }

    return ok;
  }

  // Inline validation on blur
  form.addEventListener(
    "blur",
    (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (!t.matches("input, select, textarea")) return;
      validate();
    },
    true
  );

  form.addEventListener("submit", async (e) => {
    const ok = validate();
    if (!ok) {
      e.preventDefault();
      showToast("Please fix the highlighted fields and try again.");
      return;
    }

    // If action is Formspree, enhance with fetch (keeps page smooth)
    const action = form.getAttribute("action") || "";
    const isFormspree = action.includes("formspree.io");
    if (!isFormspree) return;

    e.preventDefault();

    const original = submitBtn?.innerHTML;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner" aria-hidden="true"></span><span>Submitting...</span>`;
    }

    try {
      const fd = new FormData(form);
      const res = await fetch(action, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Submission failed");
      form.reset();
      showToast("✅ Thank you! Our team will contact you within 24 hours.");
    } catch {
      showToast("Sorry—submission failed. Please call us at 9571943750.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = original || "Submit";
      }
    }
  });
})();

