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
    { label: "用語集", path: "glossary/index.html" },
    { label: "音楽", path: "music/index.html" },
    { label: "小説", path: "novels/index.html" }
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
    var sectionIndex = -1;

    allSections.forEach(function (section) {
      sectionIndex = Math.max(sectionIndex, segments.lastIndexOf(section));
    });

    if (sectionIndex === -1) {
      return "";
    }

    return "../".repeat(segments.length - sectionIndex - 1);
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

  function renderFooterLegal() {
    var footerInner = document.querySelector(".site-footer__inner");
    var legal = document.querySelector(".site-footer__legal");

    if (!footerInner) {
      return;
    }

    if (!legal) {
      legal = document.createElement("div");
      legal.className = "site-footer__legal";
      footerInner.appendChild(legal);
    }

    legal.innerHTML = '<a href="' + getSiteRoot() + 'copyright.html">著作権・コンテンツ利用方針</a>'
      + '<div class="site-footer__legal-copy">'
      + '<p>© 2026 Malyne. All Rights Reserved.</p>'
      + '<p>当サイトの文章、設定、画像、イラストその他のコンテンツについて、無断転載、複製、改変、再配布、商用利用および生成AI・機械学習への利用を禁止します。</p>'
      + '<p>法令上認められる適正な引用を除き、使用を希望する場合は事前にお問い合わせください。</p>'
      + '</div>';
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
      renderFooterLegal();
      setCurrentNavigation();
      initMobileNavigation();
    }
  };
})();
