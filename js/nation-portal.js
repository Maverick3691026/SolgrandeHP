(function () {
  "use strict";

  var categoryOrder = ["首都", "都市", "村", "要塞・砦", "名所", "その他"];

  function isEnglishPage() {
    return document.documentElement.lang === "en";
  }

  function translateType(type) {
    var translations = {
      "首都": "Capital",
      "都市": "City",
      "村": "Village",
      "要塞・砦": "Fortress / Stronghold",
      "名所": "Landmark",
      "その他": "Other"
    };

    return isEnglishPage() ? translations[type] || type : type;
  }

  function resolveNationUrl(url) {
    if (isEnglishPage()) {
      return new URL(url.replace(/^entries\//, ""), window.location.href).href;
    }

    return new URL(url, new URL("../", window.location.href)).href;
  }

  function createLocationCard(location) {
    var card = document.createElement("a");
    var body = document.createElement("div");
    var label = document.createElement("p");
    var title = document.createElement("h3");

    card.className = "person-card nation-location-card";
    card.href = resolveNationUrl(location.detailUrl);
    card.setAttribute("aria-label", isEnglishPage()
      ? "Open " + (location.englishName || location.name)
      : location.name + "の詳細ページへ");

    body.className = "person-card__body";
    label.className = "archive-card__label";
    label.textContent = translateType(location.type);
    title.textContent = isEnglishPage() ? location.englishName || location.name : location.name;
    body.appendChild(label);
    body.appendChild(title);
    card.appendChild(body);

    return card;
  }

  function renderPortal() {
    var data = window.SolgrandeGeographyData || { locations: [] };
    var portal = document.querySelector("[data-nation-locations]");
    var nationId = document.body.dataset.nationId;
    var locations;
    var fragment;

    if (!portal || !nationId) {
      return;
    }

    locations = data.locations
      .filter(function (location) { return location.nationId === nationId; })
      .sort(function (a, b) {
        return categoryOrder.indexOf(a.type) - categoryOrder.indexOf(b.type)
          || Number(a.order || 0) - Number(b.order || 0)
          || a.name.localeCompare(b.name, "ja-JP");
      });
    fragment = document.createDocumentFragment();

    categoryOrder.forEach(function (category) {
      var categoryLocations = locations.filter(function (location) { return location.type === category; });
      var section;
      var heading;
      var grid;

      if (categoryLocations.length === 0) {
        return;
      }

      section = document.createElement("section");
      heading = document.createElement("h3");
      grid = document.createElement("div");
      section.className = "nation-portal__group";
      heading.textContent = translateType(category);
      grid.className = "people-grid nation-portal__grid";

      categoryLocations.forEach(function (location) {
        grid.appendChild(createLocationCard(location));
      });

      section.appendChild(heading);
      section.appendChild(grid);
      fragment.appendChild(section);
    });

    if (locations.length === 0) {
      portal.textContent = isEnglishPage() ? "Regional records are in preparation." : "地域資料は準備中です。";
      return;
    }

    portal.replaceChildren(fragment);
  }

  window.SolgrandeNationPortal = {
    init: renderPortal
  };

  document.addEventListener("DOMContentLoaded", renderPortal);
})();
