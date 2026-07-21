(function () {
  "use strict";

  var loadedScripts = {};

  function stabilizePersistentResourceUrls() {
    document.querySelectorAll('link[rel="stylesheet"][href]').forEach(function (link) {
      link.setAttribute("href", link.href);
    });

    document.querySelectorAll("[data-home-audio][src], [data-music-audio][src]").forEach(function (audio) {
      audio.setAttribute("src", audio.src);
    });
  }

  function getAudioPlayer() {
    return document.querySelector("[data-home-audio-player]");
  }

  function keepAudioPlayerVisible(player) {
    var main = document.querySelector("main");

    if (!player || !main || player.parentElement === document.body) {
      return;
    }

    player.classList.add("is-site-audio");
    document.body.insertBefore(player, main);
  }

  function updateAudioState(audio, toggle) {
    if (audio.paused) {
      toggle.textContent = "Music On";
      toggle.setAttribute("aria-pressed", "false");
    } else {
      toggle.textContent = "Music Off";
      toggle.setAttribute("aria-pressed", "true");
    }
  }

  function initHomeAudio() {
    var player = getAudioPlayer();

    if (!player) {
      return;
    }

    var audio = player.querySelector("[data-home-audio]");
    var toggle = player.querySelector("[data-home-audio-toggle]");
    var volume = player.querySelector("[data-home-audio-volume]");

    if (!audio || !toggle || !volume) {
      return;
    }

    if (player.dataset.audioReady === "true") {
      updateAudioState(audio, toggle);
      return;
    }

    player.dataset.audioReady = "true";
    audio.volume = Number(volume.value);

    volume.addEventListener("input", function () {
      audio.volume = Number(volume.value);
    });

    audio.addEventListener("pause", function () {
      toggle.textContent = "Music On";
      toggle.setAttribute("aria-pressed", "false");
    });

    audio.addEventListener("play", function () {
      toggle.textContent = "Music Off";
      toggle.setAttribute("aria-pressed", "true");
    });

    toggle.addEventListener("click", function () {
      if (audio.paused) {
        keepAudioPlayerVisible(player);
        audio.play().catch(function () {
          toggle.textContent = "Music On";
          toggle.setAttribute("aria-pressed", "false");
        });
      } else {
        audio.pause();
      }
    });
  }

  function initMusicPlayers() {
    document.querySelectorAll("[data-music-player]").forEach(function (player) {
      var audio = player.querySelector("[data-music-audio]");
      var playButton = player.querySelector("[data-music-play]");
      var pauseButton = player.querySelector("[data-music-pause]");
      var stopButton = player.querySelector("[data-music-stop]");
      var volume = player.querySelector("[data-music-volume]");
      var status = player.querySelector("[data-music-status]");

      if (!audio || !playButton || !pauseButton || !stopButton) {
        return;
      }

      if (player.dataset.musicReady === "true") {
        return;
      }

      player.dataset.musicReady = "true";

      if (volume) {
        audio.volume = Number(volume.value);
        volume.addEventListener("input", function () {
          audio.volume = Number(volume.value);
        });
      }

      function setStatus(message) {
        if (status) {
          status.textContent = message;
        }
      }

      playButton.addEventListener("click", function () {
        audio.play().then(function () {
          setStatus("再生中");
        }).catch(function () {
          setStatus("再生できませんでした");
        });
      });

      pauseButton.addEventListener("click", function () {
        audio.pause();
        setStatus("一時停止中");
      });

      stopButton.addEventListener("click", function () {
        audio.pause();
        audio.currentTime = 0;
        setStatus("停止中");
      });

      audio.addEventListener("ended", function () {
        audio.currentTime = 0;
        setStatus("停止中");
      });
    });
  }

  function isInternalPageLink(link) {
    var url;

    if (!link || link.target || link.hasAttribute("download")) {
      return false;
    }

    url = new URL(link.href, window.location.href);

    return url.origin === window.location.origin
      && url.pathname.endsWith(".html")
      && !url.hash;
  }

  function copyBodyState(nextDocument) {
    Array.prototype.slice.call(document.body.attributes).forEach(function (attribute) {
      if (attribute.name.indexOf("data-") === 0) {
        document.body.removeAttribute(attribute.name);
      }
    });

    Array.prototype.slice.call(nextDocument.body.attributes).forEach(function (attribute) {
      if (attribute.name.indexOf("data-") === 0) {
        document.body.setAttribute(attribute.name, attribute.value);
      }
    });
  }

  function normalizeScriptUrl(src, pageUrl) {
    return new URL(src, pageUrl).href;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script;

      if (loadedScripts[src]) {
        resolve();
        return;
      }

      script = document.createElement("script");
      script.src = src;
      script.defer = true;
      script.onload = function () {
        loadedScripts[src] = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function loadPageScripts(nextDocument, pageUrl) {
    var scripts = Array.prototype.slice.call(nextDocument.querySelectorAll("script[src]"))
      .map(function (script) {
        return normalizeScriptUrl(script.getAttribute("src"), pageUrl);
      })
      .filter(function (src) {
        return src.indexOf("/js/main.js") === -1;
      });

    return scripts.reduce(function (chain, src) {
      return chain.then(function () {
        return loadScript(src);
      });
    }, Promise.resolve());
  }

  function initMonsterDatabase() {
    var root = document.querySelector(".monster-database");
    var query = document.querySelector("[data-monster-search]");
    var type = document.querySelector("[data-monster-type]");
    var sort = document.querySelector("[data-monster-sort]");
    var reset = document.querySelector("[data-monster-reset]");
    var count = document.querySelector("[data-monster-count]");
    var empty = document.querySelector("[data-monster-empty]");
    var grid;
    var cards;

    if (!root || !query || !type || !sort || !reset || !count || !empty) {
      return;
    }

    grid = root.querySelector(".monster-grid");
    cards = Array.prototype.slice.call(root.querySelectorAll(".monster-card")).map(function (card, index) {
      var nameNode = card.querySelector("h3");
      var classification = card.querySelector(".person-card__meta div:first-child dd");

      return {
        element: card,
        index: index,
        name: nameNode ? nameNode.textContent.trim() : "",
        type: classification ? classification.textContent.trim() : "",
        searchText: card.textContent.normalize("NFKC").toLowerCase()
      };
    });

    function update() {
      var keyword = query.value.trim().normalize("NFKC").toLowerCase();
      var selectedType = type.value;
      var visibleCount = 0;
      var ordered = cards.slice();

      if (sort.value === "name") {
        ordered.sort(function (a, b) {
          return a.name.localeCompare(b.name, "ja");
        });
      } else {
        ordered.sort(function (a, b) {
          return a.index - b.index;
        });
      }

      ordered.forEach(function (card) {
        var matchesKeyword = !keyword || card.searchText.indexOf(keyword) !== -1;
        var matchesType = !selectedType || card.type === selectedType;
        var visible = matchesKeyword && matchesType;

        card.element.hidden = !visible;
        grid.appendChild(card.element);
        if (visible) {
          visibleCount += 1;
        }
      });

      count.textContent = visibleCount + " / " + cards.length + "体";
      empty.hidden = visibleCount !== 0;
    }

    query.addEventListener("input", update);
    type.addEventListener("change", update);
    sort.addEventListener("change", update);
    reset.addEventListener("click", function () {
      query.value = "";
      type.value = "";
      sort.value = "appearance";
      update();
      query.focus();
    });

    update();
  }

  function reinitializePage() {
    if (window.SolgrandeNavigation) {
      window.SolgrandeNavigation.init();
    }

    if (window.SolgrandeArchiveCategories) {
      window.SolgrandeArchiveCategories.init();
    }

    if (window.SolgrandePeopleDatabase) {
      window.SolgrandePeopleDatabase.init();
    }

    if (window.SolgrandeNationsGeography) {
      window.SolgrandeNationsGeography.init();
    }

    initHomeAudio();
    initMusicPlayers();
    initMonsterDatabase();
  }

  function replacePage(nextDocument, url, addHistory) {
    var currentMain = document.querySelector("main");
    var nextMain = nextDocument.querySelector("main");
    var player = getAudioPlayer();

    if (!currentMain || !nextMain) {
      window.location.href = url.href;
      return Promise.resolve();
    }

    if (player) {
      keepAudioPlayerVisible(player);

      Array.prototype.slice.call(nextMain.querySelectorAll("[data-home-audio-player]")).forEach(function (node) {
        node.remove();
      });
    }

    document.title = nextDocument.title;
    copyBodyState(nextDocument);
    currentMain.replaceWith(nextMain);

    if (addHistory) {
      window.history.pushState({ solgrandePage: true }, "", url.href);
    }

    window.scrollTo({ top: 0, behavior: "instant" });

    return loadPageScripts(nextDocument, url.href).then(reinitializePage);
  }

  function visit(url, addHistory) {
    return window.fetch(url.href, { credentials: "same-origin" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Page request failed.");
        }

        return response.text();
      })
      .then(function (html) {
        var parser = new DOMParser();
        var nextDocument = parser.parseFromString(html, "text/html");

        return replacePage(nextDocument, url, addHistory);
      })
      .catch(function () {
        window.location.href = url.href;
      });
  }

  function initPersistentNavigation() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      var url;

      if (!isInternalPageLink(link)) {
        return;
      }

      event.preventDefault();
      url = new URL(link.href, window.location.href);
      visit(url, true);
    });

    window.addEventListener("popstate", function () {
      visit(new URL(window.location.href), false);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    stabilizePersistentResourceUrls();

    if (window.SolgrandeNavigation) {
      window.SolgrandeNavigation.init();
    }

    initHomeAudio();
    initMusicPlayers();
    initMonsterDatabase();
    initPersistentNavigation();
  });
})();
