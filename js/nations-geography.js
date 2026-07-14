(function () {
  "use strict";

  var data = window.SolgrandeGeographyData || { nations: [], regions: [], settlements: [] };
  var state = {
    query: "",
    nationId: "",
    regionId: ""
  };

  function normalize(value) {
    return String(value || "").trim().toLocaleLowerCase("ja-JP");
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
    description.textContent = value || "未設定";
    item.appendChild(term);
    item.appendChild(description);

    return item;
  }

  function createButtonCard(item, type, isSelected) {
    var button = item.detailUrl ? document.createElement("a") : document.createElement("button");
    var body = document.createElement("div");
    var label = document.createElement("p");
    var title = document.createElement("h3");
    var meta = document.createElement("dl");

    button.className = "person-card geo-card";
    if (item.detailUrl) {
      button.href = item.detailUrl;
      button.setAttribute("aria-label", item.name + "の詳細ページへ");
    } else {
      button.type = "button";
      button.dataset.geoType = type;
      button.dataset.geoId = item.id;
    }

    if (isSelected) {
      button.classList.add("is-selected");
    }

    body.className = "person-card__body";
    label.className = "archive-card__label";
    label.textContent = item.englishName || type;
    title.textContent = item.name;
    meta.className = "person-card__meta";

    if (type === "nation") {
      meta.appendChild(createMeta("分類", item.type));
      meta.appendChild(createMeta("首都", item.capital));
      meta.appendChild(createMeta("統治体制", item.government));
      meta.appendChild(createMeta("主要種族", item.mainRace));
    } else {
      meta.appendChild(createMeta("分類", item.type));
      meta.appendChild(createMeta("地形", item.terrain));
    }

    body.appendChild(label);
    body.appendChild(title);
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
    card.href = settlement.detailUrl;
    card.setAttribute("aria-label", settlement.name + "の詳細ページへ");

    figure.className = "person-card__image nation-card__image";
    image.src = settlement.image;
    image.alt = settlement.name + "の拠点画像";
    image.loading = "lazy";
    figure.appendChild(image);

    body.className = "person-card__body";
    label.className = "archive-card__label";
    label.textContent = settlement.englishName || "Settlement";
    title.textContent = settlement.name;
    meta.className = "person-card__meta";
    meta.appendChild(createMeta("分類", settlement.type));
    meta.appendChild(createMeta("役割", settlement.role));
    meta.appendChild(createMeta("人口", settlement.population));

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
    return data.settlements
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
    controls.nationCount.textContent = nations.length + " / " + data.nations.length + "国家";
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
    controls.regionCount.textContent = regions.length + "地域";
    controls.selectedNation.textContent = selectedNation ? selectedNation.name : "国家未選択";
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
    controls.settlementCount.textContent = settlements.length + "拠点";
    controls.selectedRegion.textContent = selectedRegion ? selectedRegion.name : "地域未選択";
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
