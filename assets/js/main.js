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
   Submission itself is handled by the Formspree AJAX block below.
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
   Formspree AJAX submission — keeps visitors on the page instead
   of redirecting to Web3Forms' hosted "thanks" page. Applies to
   the main contact form (.form) and the pricing/home "I'm
   interested" mini forms (.interest-form).
   ============================================================ */
(function () {
  "use strict";

  var forms = document.querySelectorAll('form[action*="web3forms.com"]');
  forms.forEach(function (form) {
    var status = document.createElement("p");
    status.className = "form-status";
    status.hidden = true;
    form.appendChild(status);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.hidden = true;
      status.classList.remove("error", "success");

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      var formData = new FormData(form);

      // Contact form: fold "I'm interested in" + "Location / site" into
      // the Message field instead of sending them as separate fields.
      var topic = form.querySelector('[name="Topic"]');
      var location = form.querySelector('[name="Location"]');
      var message = form.querySelector('[name="Message"]');
      if (topic && location && message) {
        var parts = ["Interested in: " + topic.value];
        if (location.value) parts.push("Location / site: " + location.value);
        parts.push("");
        parts.push(message.value);
        formData.set("Message", parts.join("\n"));
        formData.delete("Topic");
        formData.delete("Location");
      }

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          return response.json().then(function (data) {
            if (data && data.success) {
              form.reset();
              status.textContent = "Thanks — your message has been sent. We'll be in touch soon.";
              status.classList.add("success");
            } else {
              status.textContent =
                (data && data.message) || "Something went wrong. Please try again or email us directly.";
              status.classList.add("error");
            }
          });
        })
        .catch(function () {
          status.textContent = "Something went wrong. Please check your connection and try again.";
          status.classList.add("error");
        })
        .finally(function () {
          status.hidden = false;
          if (submitBtn) submitBtn.disabled = false;
        });
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
