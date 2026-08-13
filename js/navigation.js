(function () {
  "use strict";

  var navigationItems = [
    { ja: "世界観", en: "World", path: "world/index.html" },
    { ja: "国家", en: "Nations", path: "nations/index.html" },
    { ja: "人物", en: "People", path: "people/index.html" },
    { ja: "モンスター", en: "Monsters", path: "monsters/index.html" },
    { ja: "魔法", en: "Magic", path: "magic/index.html" },
    { ja: "宗教", en: "Religions", path: "religions/index.html" },
    { ja: "名所", en: "Landmarks", path: "landmarks/index.html" },
    { ja: "歴史", en: "History", path: "history/index.html" },
    { ja: "種族", en: "Races", path: "races/index.html" },
    { ja: "職業", en: "Professions", path: "professions/index.html" },
    { ja: "アイテム", en: "Items", path: "items/index.html" },
    { ja: "組織", en: "Organizations", path: "organizations/index.html" },
    { ja: "施設", en: "Facilities", path: "facilities/index.html" },
    { ja: "用語集", en: "Glossary", path: "glossary/index.html" },
    { ja: "音楽", en: "Music", path: "music/index.html" },
    { ja: "小説", en: "Novels", path: "novels/index.html" }
  ];

  var availableEnglishPages = [
    "index.html",
    "world/index.html",
    "nations/index.html",
    "people/index.html",
    "monsters/index.html",
    "magic/index.html",
    "religions/index.html",
    "landmarks/index.html",
    "people/entries/cassian-hales.html",
    "novels/index.html",
    "novels/prologue.html"
  ];
  var languageResizeReady = false;

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

  function getLanguage() {
    return normalizePath(window.location.pathname).split("/").filter(Boolean).indexOf("en") !== -1 ? "en" : "ja";
  }

  function getProjectRoot() {
    return getSiteRoot() + (getLanguage() === "en" ? "../" : "");
  }

  function getLanguageRelativePath() {
    var segments = normalizePath(window.location.pathname).split("/").filter(Boolean);
    var enIndex = segments.lastIndexOf("en");
    var sectionIndex = -1;

    if (enIndex !== -1) {
      return segments.slice(enIndex + 1).join("/") || "index.html";
    }

    navigationItems.forEach(function (item) {
      sectionIndex = Math.max(sectionIndex, segments.lastIndexOf(item.path.split("/")[0]));
    });

    return sectionIndex === -1 ? "index.html" : segments.slice(sectionIndex).join("/");
  }

  function renderNavigation() {
    var list = document.querySelector(".site-nav__list");
    var siteRoot = getSiteRoot();

    if (!list) {
      return;
    }

    var language = getLanguage();

    list.innerHTML = navigationItems.map(function (item) {
      if (language === "en" && availableEnglishPages.indexOf(item.path) === -1) {
        return '<li><span class="site-nav__pending" aria-disabled="true" tabindex="0" data-tooltip="Translation in preparation">' + item.en + "</span></li>";
      }

      return '<li><a href="' + siteRoot + item.path + '">' + item[language] + "</a></li>";
    }).join("");
  }

  function updateSiteBrandLink() {
    var siteBrand = document.querySelector(".site-brand");

    if (!siteBrand) {
      return;
    }

    siteBrand.setAttribute("href", getSiteRoot() + "index.html");
    siteBrand.setAttribute("aria-label", getLanguage() === "en" ? "Old Unknown home" : "Old Unknown トップページ");
  }

  function renderLanguageSwitcher() {
    var headerInner = document.querySelector(".site-header__inner");
    var siteNav = document.querySelector("[data-site-nav]");
    var toggle = document.querySelector("[data-nav-toggle]");
    var switcher = document.querySelector("[data-language-switcher]");
    var language = getLanguage();
    var pagePath = getLanguageRelativePath();
    var japaneseHref = language === "en" ? getProjectRoot() + pagePath : window.location.href;
    var englishHref = language === "ja" ? getProjectRoot() + "en/" + pagePath : window.location.href;
    var englishAvailable = availableEnglishPages.indexOf(pagePath) !== -1;

    if (!headerInner || !siteNav) {
      return;
    }

    if (!switcher) {
      switcher = document.createElement("nav");
      switcher.className = "language-switcher";
      switcher.setAttribute("data-language-switcher", "");
      switcher.setAttribute("aria-label", language === "en" ? "Language" : "言語選択");
    }

    if (window.matchMedia("(max-width: 1440px)").matches) {
      siteNav.insertBefore(switcher, siteNav.firstChild);
    } else {
      headerInner.insertBefore(switcher, toggle || siteNav);
    }

    switcher.innerHTML = language === "ja"
      ? '<span class="language-switcher__current" lang="ja" aria-current="page">日本語</span><span aria-hidden="true">/</span>'
        + (englishAvailable
          ? '<a href="' + englishHref + '" lang="en" hreflang="en">English</a>'
          : '<span class="language-switcher__pending" lang="en" aria-disabled="true" tabindex="0" data-tooltip="準備中">English</span>')
      : '<a href="' + japaneseHref + '" lang="ja" hreflang="ja">日本語</a><span aria-hidden="true">/</span><span class="language-switcher__current" lang="en" aria-current="page">English</span>';
  }

  function initLanguageSwitcherResize() {
    if (languageResizeReady) {
      return;
    }

    languageResizeReady = true;
    window.matchMedia("(max-width: 1440px)").addEventListener("change", renderLanguageSwitcher);
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

    if (getLanguage() === "en") {
      legal.innerHTML = '<a href="' + getProjectRoot() + 'copyright.html">Copyright and content use policy (Japanese)</a>'
        + '<div class="site-footer__legal-copy">'
        + '<p>© 2026 Malyne. All Rights Reserved.</p>'
        + '<p>Unauthorized reproduction, modification, redistribution, commercial use, and use for generative AI or machine learning are prohibited.</p>'
        + '</div>';
      return;
    }

    legal.innerHTML = '<a href="' + getProjectRoot() + 'copyright.html">著作権・コンテンツ利用方針</a>'
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
      renderLanguageSwitcher();
      initLanguageSwitcherResize();
      renderFooterLegal();
      setCurrentNavigation();
      initMobileNavigation();
    }
  };
})();
