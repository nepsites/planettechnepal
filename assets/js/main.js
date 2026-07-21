/* Planet Tech Nepal — front-end interactions */
(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  // Close the mobile menu after choosing a link
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeMenu();
  });

  // Reset menu state when resizing back to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) closeMenu();
  });
})();

/* ============================================================
   "I'm Interested" widgets — just a show/hide toggle.
   The email form itself submits normally to Formspree (see the
   action="https://formspree.io/f/..." attribute in the HTML) —
   no JavaScript needed for the actual submission.
   ============================================================ */
(function () {
  "use strict";

  document.querySelectorAll(".interest").forEach(function (box) {
    var toggle = box.querySelector(".interest-toggle");
    var form = box.querySelector(".interest-form");
    if (!toggle || !form) return;

    toggle.addEventListener("click", function () {
      form.hidden = !form.hidden;
      if (!form.hidden) {
        var input = form.querySelector('input[type="email"]');
        if (input) input.focus();
      }
    });
  });
})();

/* ============================================================
   Login page — there's no backend/user database behind this
   static site, so every attempt shows the same generic error.
   ============================================================ */
(function () {
  "use strict";

  var form = document.getElementById("loginForm");
  if (!form) return;

  var errorEl = document.getElementById("loginError");
  var card = document.querySelector(".login-card");
  var password = document.getElementById("password");
  var pwToggle = document.getElementById("pwToggle");

  if (pwToggle && password) {
    pwToggle.addEventListener("click", function () {
      var showing = password.type === "text";
      password.type = showing ? "password" : "text";
      pwToggle.setAttribute("aria-label", showing ? "Show password" : "Hide password");
      pwToggle.classList.toggle("is-visible", !showing);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (errorEl) errorEl.hidden = false;

    if (card) {
      card.classList.remove("shake");
      void card.offsetWidth; // restart the animation on repeat clicks
      card.classList.add("shake");
    }

    if (password) {
      password.value = "";
      password.focus();
    }
  });
})();
