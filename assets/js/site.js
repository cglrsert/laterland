// Laterland website: mobile menu, scroll reveal, one-time Turkish suggestion. No cookies, no tracking.
(function () {
  document.documentElement.classList.add("js");
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // On the English home page only: send Turkish-language browsers to /tr/ once.
  // The choice is kept in sessionStorage (this tab only) so the language switch always wins.
  var root = document.documentElement;
  if (root.lang === "en" && root.dataset.page === "home") {
    try {
      var chose = sessionStorage.getItem("laterland-lang");
      var langs = navigator.languages || [navigator.language || ""];
      if (!chose && /^tr\b/i.test(langs[0] || "")) {
        sessionStorage.setItem("laterland-lang", "tr");
        location.replace("tr/");
      }
    } catch (e) { /* storage blocked: stay on English */ }
  }
  document.querySelectorAll(".lang a").forEach(function (a) {
    a.addEventListener("click", function () {
      try { sessionStorage.setItem("laterland-lang", a.getAttribute("hreflang") || ""); } catch (e) {}
    });
  });

  // Respect reduced motion for the hero video.
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("video[autoplay]").forEach(function (v) { v.removeAttribute("autoplay"); v.pause(); });
  }
})();
