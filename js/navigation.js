(function () {
  "use strict";

  var navigationItems = [
    { label: "世界観", path: "world/index.html" },
    { label: "国家", path: "nations/index.html" },
    { label: "人物", path: "people/index.html" },
    { label: "モンスター", path: "monsters/index.html" },
    { label: "魔法", path: "magic/index.html" },
    { label: "宗教", path: "religions/index.html" },
    { label: "名所", path: "landmarks/index.html" },
    { label: "歴史", path: "history/index.html" },
    { label: "種族", path: "races/index.html" },
    { label: "アイテム", path: "items/index.html" },
    { label: "組織", path: "organizations/index.html" },
    { label: "施設", path: "facilities/index.html" },
    { label: "用語集", path: "glossary/index.html" }
  ];

  function normalizePath(path) {
    var cleaned = path.replace(/\\/g, "/");

    if (cleaned.endsWith("/")) {
      return cleaned + "index.html";
    }

    return cleaned;
  }

  function getSiteRoot() {
    var path = normalizePath(window.location.pathname);
    var segments = path.split("/").filter(Boolean);
    var allSections = navigationItems.map(function (item) {
      return item.path.split("/")[0];
    });
    var fileName = segments[segments.length - 1];
    var parent = segments[segments.length - 2];
    var grandParent = segments[segments.length - 3];

    if (parent === "entries" && allSections.indexOf(grandParent) !== -1) {
      return "../../";
    }

    if (fileName === "index.html" && allSections.indexOf(parent) !== -1) {
      return "../";
    }

    return "";
  }

  function renderNavigation() {
    var list = document.querySelector(".site-nav__list");
    var siteRoot = getSiteRoot();

    if (!list) {
      return;
    }

    list.innerHTML = navigationItems.map(function (item) {
      return '<li><a href="' + siteRoot + item.path + '">' + item.label + "</a></li>";
    }).join("");
  }

  function updateSiteBrandLink() {
    var siteBrand = document.querySelector(".site-brand");

    if (!siteBrand) {
      return;
    }

    siteBrand.setAttribute("href", getSiteRoot() + "index.html");
  }

  function setCurrentNavigation() {
    var currentPath = normalizePath(window.location.pathname);
    var links = document.querySelectorAll(".site-nav a");

    links.forEach(function (link) {
      var linkPath = normalizePath(new URL(link.getAttribute("href"), window.location.href).pathname);
      var sectionPath = linkPath.replace(/index\.html$/, "");

      if (linkPath === currentPath || currentPath.indexOf(sectionPath) === 0) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function initMobileNavigation() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-site-nav]");

    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";

      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("is-nav-open", !isOpen);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName !== "A") {
        return;
      }

      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("is-nav-open");
    });
  }

  window.SolgrandeNavigation = {
    init: function () {
      updateSiteBrandLink();
      renderNavigation();
      setCurrentNavigation();
      initMobileNavigation();
    }
  };
})();
