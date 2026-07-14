(function () {
  "use strict";

  var loadedScripts = {};

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
    if (window.SolgrandeNavigation) {
      window.SolgrandeNavigation.init();
    }

    initHomeAudio();
    initPersistentNavigation();
  });
})();
