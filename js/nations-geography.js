(function () {
  "use strict";

  var data = window.SolgrandeGeographyData || { nations: [], regions: [], locations: [] };
  var state = {
    query: "",
    nationId: "",
    regionId: ""
  };

  function normalize(value) {
    return String(value || "").trim().toLocaleLowerCase("ja-JP");
  }

  function isEnglishPage() {
    return document.documentElement.lang === "en";
  }

  function displayName(item) {
    return isEnglishPage() ? (item.englishName || item.name) : item.name;
  }

  function displayLabel(item, fallback) {
    if (!isEnglishPage()) {
      return item.englishName || fallback;
    }

    return item.englishName ? item.name : "English name not set";
  }

  function translateValue(value) {
    var translations = {
      "公国": "Principality",
      "都市国家": "City-state",
      "要塞公国": "Fortress duchy",
      "王国": "Kingdom",
      "砂王国": "Desert kingdom",
      "連邦": "Federation",
      "共和国": "Republic",
      "海峡王国": "Strait kingdom",
      "候領": "Marquisate",
      "帝国": "Empire",
      "属領": "Dominion",
      "自由都市": "Free city",
      "大公国": "Grand principality",
      "大帝国": "Great empire",
      "公国制": "Principality",
      "王政": "Monarchy",
      "連邦制": "Federal system",
      "共和制": "Republic",
      "領邦制": "Territorial rule",
      "帝政": "Imperial rule",
      "属領統治": "Dominion administration",
      "自治制": "Self-government",
      "大公国制": "Grand principality",
      "人族": "Human",
      "ドワーフ": "Dwarf",
      "首都圏": "Capital region",
      "首都": "Capital",
      "村": "Village",
      "都市": "City",
      "ツァダル（人口97,896人）": "Tsadar (population: 97,896)",
      "ベルリーズトゥール（Belulieztur／人口34,065人）": "Belulieztur (population: 34,065)",
      "シャールカタフ": "Skar'kataph"
    };

    if (!isEnglishPage()) {
      return value;
    }

    return translations[value] || value;
  }

  function resolveUrl(url) {
    return isEnglishPage() && url ? "../" + url : url;
  }

  function resolveDetailUrl(url) {
    if (isEnglishPage() && url === "entries/Principality%20of%20Bermouthia.html") {
      return url;
    }

    return isEnglishPage() && url ? "../../nations/" + url : url;
  }

  function collectControls() {
    return {
      query: document.querySelector("[data-nations-search]"),
      reset: document.querySelector("[data-nations-reset]"),
      nationGrid: document.querySelector("[data-nations-grid]"),
      regionGrid: document.querySelector("[data-regions-grid]"),
      settlementGrid: document.querySelector("[data-settlements-grid]"),
      nationCount: document.querySelector("[data-nations-count]"),
      regionCount: document.querySelector("[data-regions-count]"),
      settlementCount: document.querySelector("[data-settlements-count]"),
      regionPanel: document.querySelector("[data-regions-panel]"),
      settlementPanel: document.querySelector("[data-settlements-panel]"),
      selectedNation: document.querySelector("[data-selected-nation]"),
      selectedRegion: document.querySelector("[data-selected-region]"),
      empty: document.querySelector("[data-nations-empty]")
    };
  }

  function createMeta(label, value) {
    var item = document.createElement("div");
    var term = document.createElement("dt");
    var description = document.createElement("dd");

    term.textContent = label;
    description.textContent = translateValue(value) || (isEnglishPage() ? "Not set" : "未設定");
    item.appendChild(term);
    item.appendChild(description);

    return item;
  }

  function createButtonCard(item, type, isSelected) {
    var publishedNationIds = [
      "belmosia-principality",
      "kazandor-mining-city",
      "tarenfall-fortress-principality"
    ];
    var isPending = type === "nation" && publishedNationIds.indexOf(item.id) === -1;
    var button = isPending
      ? document.createElement("div")
      : item.detailUrl ? document.createElement("a") : document.createElement("button");
    var body = document.createElement("div");
    var label = document.createElement("p");
    var title = document.createElement("h3");
    var meta = document.createElement("dl");
    var figure;
    var image;

    button.className = "person-card geo-card";
    if (isPending) {
      button.classList.add("person-card--pending");
      button.setAttribute("aria-label", isEnglishPage()
        ? displayName(item) + " is in preparation"
        : item.name + "は準備中です");
      button.setAttribute("aria-disabled", "true");
      button.setAttribute("tabindex", "0");
      button.dataset.tooltip = isEnglishPage() ? "In preparation" : "準備中";
    } else if (item.detailUrl) {
      button.href = resolveDetailUrl(item.detailUrl);
      button.setAttribute("aria-label", isEnglishPage()
        ? displayName(item) + " details (Japanese)"
        : item.name + "の詳細ページへ");
    } else {
      button.type = "button";
      button.dataset.geoType = type;
      button.dataset.geoId = item.id;
    }

    if (isSelected && !isPending) {
      button.classList.add("is-selected");
    }

    body.className = "person-card__body";
    label.className = "archive-card__label";
    label.textContent = displayLabel(item, type);
    title.textContent = displayName(item);
    meta.className = "person-card__meta";

    if (type === "nation") {
      meta.appendChild(createMeta(isEnglishPage() ? "Type" : "分類", item.type));
      meta.appendChild(createMeta(isEnglishPage() ? "Capital" : "首都", item.capital));
      meta.appendChild(createMeta(isEnglishPage() ? "Government" : "統治体制", item.government));
      meta.appendChild(createMeta(isEnglishPage() ? "Primary race" : "主要種族", item.mainRace));
    } else {
      meta.appendChild(createMeta(isEnglishPage() ? "Type" : "分類", item.type));
      meta.appendChild(createMeta(isEnglishPage() ? "Terrain" : "地形", item.terrain));
    }

    body.appendChild(label);
    body.appendChild(title);

    if (type === "nation" && item.id === "belmosia-principality" && item.image) {
      figure = document.createElement("figure");
      image = document.createElement("img");
      figure.className = "geo-card__image";
      image.src = resolveUrl(item.image);
      image.alt = isEnglishPage() ? displayName(item) + " crest" : item.name + "の紋章";
      image.loading = "lazy";
      figure.appendChild(image);
      body.appendChild(figure);
    }

    body.appendChild(meta);

    button.appendChild(body);

    return button;
  }

  function createSettlementCard(settlement) {
    var card = document.createElement("a");
    var figure = document.createElement("figure");
    var image = document.createElement("img");
    var body = document.createElement("div");
    var label = document.createElement("p");
    var title = document.createElement("h3");
    var meta = document.createElement("dl");

    card.className = "person-card nation-card";
    card.href = resolveDetailUrl(settlement.detailUrl);
    card.setAttribute("aria-label", isEnglishPage()
      ? displayName(settlement) + " details"
      : settlement.name + "の詳細ページへ");

    figure.className = "person-card__image nation-card__image";
    image.src = resolveUrl(settlement.image);
    image.alt = isEnglishPage() ? displayName(settlement) + " image" : settlement.name + "の拠点画像";
    image.loading = "lazy";
    figure.appendChild(image);

    body.className = "person-card__body";
    label.className = "archive-card__label";
    label.textContent = displayLabel(settlement, "Settlement");
    title.textContent = displayName(settlement);
    meta.className = "person-card__meta";
    meta.appendChild(createMeta(isEnglishPage() ? "Type" : "分類", settlement.type));
    meta.appendChild(createMeta(isEnglishPage() ? "Role" : "役割", settlement.role));
    meta.appendChild(createMeta(isEnglishPage() ? "Population" : "人口", settlement.population));

    body.appendChild(label);
    body.appendChild(title);
    body.appendChild(meta);
    card.appendChild(figure);
    card.appendChild(body);

    return card;
  }

  function filterNations() {
    var query = normalize(state.query);

    return data.nations
      .filter(function (nation) {
        if (!query) {
          return true;
        }

        return normalize([
          nation.name,
          nation.englishName,
          nation.type,
          nation.capital,
          nation.government,
          nation.mainRace
        ].join(" ")).indexOf(query) !== -1;
      })
      .sort(function (a, b) {
        return Number(a.order || 0) - Number(b.order || 0)
          || a.name.localeCompare(b.name, "ja-JP");
      });
  }

  function getRegions() {
    return data.regions
      .filter(function (region) { return region.nationId === state.nationId; })
      .sort(function (a, b) {
        return Number(a.order || 0) - Number(b.order || 0)
          || a.name.localeCompare(b.name, "ja-JP");
      });
  }

  function getSettlements() {
    return data.locations
      .filter(function (settlement) { return settlement.regionId === state.regionId; })
      .sort(function (a, b) {
        return Number(a.order || 0) - Number(b.order || 0)
          || a.name.localeCompare(b.name, "ja-JP");
      });
  }

  function renderNations(controls) {
    var nations = filterNations();
    var fragment = document.createDocumentFragment();

    nations.forEach(function (nation) {
      fragment.appendChild(createButtonCard(nation, "nation", nation.id === state.nationId));
    });

    controls.nationGrid.replaceChildren(fragment);
    controls.nationCount.textContent = nations.length + " / " + data.nations.length
      + (isEnglishPage() ? " nations" : "国家");
    controls.empty.hidden = nations.length !== 0;
  }

  function renderRegions(controls) {
    var selectedNation = data.nations.find(function (nation) { return nation.id === state.nationId; });
    var regions = getRegions();
    var fragment = document.createDocumentFragment();

    regions.forEach(function (region) {
      fragment.appendChild(createButtonCard(region, "region", region.id === state.regionId));
    });

    controls.regionGrid.replaceChildren(fragment);
    controls.regionCount.textContent = regions.length + (isEnglishPage() ? " regions" : "地域");
    controls.selectedNation.textContent = selectedNation
      ? displayName(selectedNation)
      : isEnglishPage() ? "No nation selected" : "国家未選択";
    controls.regionPanel.hidden = !selectedNation || regions.length === 0;
  }

  function renderSettlements(controls) {
    var selectedRegion = data.regions.find(function (region) { return region.id === state.regionId; });
    var settlements = getSettlements();
    var fragment = document.createDocumentFragment();

    settlements.forEach(function (settlement) {
      fragment.appendChild(createSettlementCard(settlement));
    });

    controls.settlementGrid.replaceChildren(fragment);
    controls.settlementCount.textContent = settlements.length + (isEnglishPage() ? " locations" : "拠点");
    controls.selectedRegion.textContent = selectedRegion
      ? displayName(selectedRegion)
      : isEnglishPage() ? "No region selected" : "地域未選択";
    controls.settlementPanel.hidden = !selectedRegion;
  }

  function render(controls) {
    renderNations(controls);
    renderRegions(controls);
    renderSettlements(controls);
  }

  function bindControls(controls) {
    controls.query.addEventListener("input", function (event) {
      state.query = event.target.value;
      state.nationId = "";
      state.regionId = "";
      render(controls);
    });

    controls.reset.addEventListener("click", function () {
      state.query = "";
      state.nationId = "";
      state.regionId = "";
      controls.query.value = "";
      render(controls);
    });

    controls.nationGrid.addEventListener("click", function (event) {
      var card = event.target.closest("[data-geo-type='nation']");

      if (!card) {
        return;
      }

      state.nationId = card.dataset.geoId;
      state.regionId = "";
      render(controls);
    });

    controls.regionGrid.addEventListener("click", function (event) {
      var card = event.target.closest("[data-geo-type='region']");

      if (!card) {
        return;
      }

      state.regionId = card.dataset.geoId;
      render(controls);
    });
  }

  function init() {
    var controls = collectControls();

    if (!controls.nationGrid || !controls.query) {
      return;
    }

    state.query = "";
    state.nationId = "";
    state.regionId = "";
    controls.query.value = "";

    bindControls(controls);
    render(controls);
  }

  window.SolgrandeNationsGeography = {
    init: init
  };

  document.addEventListener("DOMContentLoaded", init);
})();
