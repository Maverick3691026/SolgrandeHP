(function () {
  "use strict";

  var people = window.SolgrandePeopleData || [];
  var state = {
    query: "",
    nation: "",
    race: "",
    occupation: "",
    attribute: "",
    sort: "appearance"
  };

  function normalize(value) {
    return String(value || "").trim().toLocaleLowerCase("ja-JP");
  }

  function uniqueValues(key) {
    var values = people
      .reduce(function (result, person) {
        var personValues = key === "occupation"
          ? String(person[key] || "").split("・")
          : [person[key]];

        return result.concat(personValues.map(function (value) {
          return String(value || "").trim();
        }));
      }, [])
      .filter(Boolean)
      .filter(function (value, index, allValues) { return allValues.indexOf(value) === index; });

    return values.sort(function (a, b) { return a.localeCompare(b, "ja-JP"); });
  }

  function fillSelect(select, values) {
    if (!select) {
      return;
    }

    values.forEach(function (value) {
      var option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  function collectControls() {
    return {
      query: document.querySelector("[data-people-search]"),
      nation: document.querySelector("[data-people-filter='nation']"),
      race: document.querySelector("[data-people-filter='race']"),
      occupation: document.querySelector("[data-people-filter='occupation']"),
      attribute: document.querySelector("[data-people-filter='attribute']"),
      sort: document.querySelector("[data-people-sort]"),
      reset: document.querySelector("[data-people-reset]"),
      grid: document.querySelector("[data-people-grid]"),
      count: document.querySelector("[data-people-count]"),
      empty: document.querySelector("[data-people-empty]")
    };
  }

  function matchesFilters(person) {
    var queryTarget = normalize([
      person.name,
      person.englishName,
      person.epithet,
      person.affiliation,
      person.occupation
    ].join(" "));

    return (!state.query || queryTarget.indexOf(normalize(state.query)) !== -1)
      && (!state.nation || person.nation === state.nation)
      && (!state.race || person.race === state.race)
      && (!state.occupation || String(person.occupation || "").split("・").map(function (value) {
        return value.trim();
      }).indexOf(state.occupation) !== -1)
      && (!state.attribute || person.attribute === state.attribute);
  }

  function sortPeople(results) {
    var sorted = results.slice();

    sorted.sort(function (a, b) {
      if (state.sort === "name") {
        return a.name.localeCompare(b.name, "ja-JP");
      }

      if (state.sort === "age") {
        return Number(a.age || 0) - Number(b.age || 0) || a.name.localeCompare(b.name, "ja-JP");
      }

      if (state.sort === "nation") {
        return String(a.nation || "").localeCompare(String(b.nation || ""), "ja-JP")
          || a.name.localeCompare(b.name, "ja-JP");
      }

      return Number(a.appearanceOrder || 0) - Number(b.appearanceOrder || 0)
        || a.name.localeCompare(b.name, "ja-JP");
    });

    return sorted;
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

  function createCard(person) {
    var card = document.createElement("a");
    var figure = document.createElement("figure");
    var image = document.createElement("img");
    var body = document.createElement("div");
    var label = document.createElement("p");
    var title = document.createElement("h3");
    var meta = document.createElement("dl");

    card.className = "person-card";
    card.href = person.detailUrl;
    card.setAttribute("aria-label", person.name + "の詳細ページへ");

    figure.className = "person-card__image";
    image.src = person.image;
    image.alt = person.name + "の人物画像";
    image.loading = "lazy";
    figure.appendChild(image);

    body.className = "person-card__body";
    label.className = "archive-card__label";
    label.textContent = person.englishName || "Person";
    title.textContent = person.name;

    meta.className = "person-card__meta";
    meta.appendChild(createMeta("種族", person.race));
    meta.appendChild(createMeta("所属", person.affiliation));
    meta.appendChild(createMeta("職業・立場", person.occupation));

    body.appendChild(label);
    body.appendChild(title);
    body.appendChild(meta);
    card.appendChild(figure);
    card.appendChild(body);

    return card;
  }

  function render(controls) {
    var results = sortPeople(people.filter(matchesFilters));
    var fragment = document.createDocumentFragment();

    results.forEach(function (person) {
      fragment.appendChild(createCard(person));
    });

    controls.grid.replaceChildren(fragment);
    controls.count.textContent = results.length + " / " + people.length + "人";
    controls.empty.hidden = results.length !== 0;
  }

  function bindControls(controls) {
    controls.query.addEventListener("input", function (event) {
      state.query = event.target.value;
      render(controls);
    });

    ["nation", "race", "occupation", "attribute"].forEach(function (key) {
      controls[key].addEventListener("change", function (event) {
        state[key] = event.target.value;
        render(controls);
      });
    });

    controls.sort.addEventListener("change", function (event) {
      state.sort = event.target.value;
      render(controls);
    });

    controls.reset.addEventListener("click", function () {
      state.query = "";
      state.nation = "";
      state.race = "";
      state.occupation = "";
      state.attribute = "";
      state.sort = "appearance";

      controls.query.value = "";
      controls.nation.value = "";
      controls.race.value = "";
      controls.occupation.value = "";
      controls.attribute.value = "";
      controls.sort.value = "appearance";
      render(controls);
    });
  }

  function init() {
    var controls = collectControls();

    if (!controls.grid || !controls.query) {
      return;
    }

    state.query = "";
    state.nation = "";
    state.race = "";
    state.occupation = "";
    state.attribute = "";
    state.sort = "appearance";
    controls.query.value = "";
    controls.nation.innerHTML = '<option value="">すべて</option>';
    controls.race.innerHTML = '<option value="">すべて</option>';
    controls.occupation.innerHTML = '<option value="">すべて</option>';
    controls.attribute.innerHTML = '<option value="">すべて</option>';
    controls.sort.value = "appearance";

    fillSelect(controls.nation, uniqueValues("nation"));
    fillSelect(controls.race, uniqueValues("race"));
    fillSelect(controls.occupation, uniqueValues("occupation"));
    fillSelect(controls.attribute, uniqueValues("attribute"));
    bindControls(controls);
    render(controls);
  }

  window.SolgrandePeopleDatabase = {
    init: init
  };

  document.addEventListener("DOMContentLoaded", init);
})();
