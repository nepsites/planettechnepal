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
