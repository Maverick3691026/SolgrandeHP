(function () {
  "use strict";

  var categories = {
    world: {
      label: "世界観",
      eyebrow: "World Foundation",
      description: "大陸、神話、暦、信仰、魔力の流れ。Old Unknownの全資料へ通じる基礎領域です。",
      panelTitle: "世界設定の基礎",
      panelText: "地理、暦、自然法則、神話、魔力など、他カテゴリの前提になる情報を整理します。",
      entries: [
        ["地理・大陸", "大陸、海域、山脈、気候帯など世界の骨格。"],
        ["神話・創世", "世界の始まり、神々、古い誓約にまつわる伝承。"],
        ["暦・自然法則", "暦、季節、魔力循環、天体現象などの基礎設定。"]
      ]
    },
    nations: {
      label: "国家",
      eyebrow: "Realms and Crowns",
      description: "王権、同盟、紋章、国境線。エラムノーバに存在する諸国家と勢力を記録します。",
      panelTitle: "国家資料の型",
      panelText: "統治体制、首都、文化、軍制、歴史、関連人物を同じ形式で整理します。",
      entries: [
        ["王国", "古き血統と騎士団を中心に成立した諸王国。"],
        ["帝国", "広大な版図、軍政、複数民族を抱える巨大勢力。"],
        ["自由都市", "交易、職能組合、魔術学院が力を持つ独立都市群。"]
      ]
    },
    people: {
      label: "人物",
      eyebrow: "People Archive",
      description: "王族、英雄、魔術師、職人、語り部。エラムノーバの歴史と事件を動かす人物資料を収録します。",
      panelTitle: "人物資料の型",
      panelText: "プロフィール、紹介、来歴、関係性、登場話を固定項目にして、人物ページを増やしやすくします。",
      entries: [
        ["王族・統治者", "王位継承、外交、戦役に関わる中心人物。"],
        ["英雄・冒険者", "伝承、探索、災厄の解決に名を残した人物。"],
        ["学者・魔術師", "魔法体系、歴史研究、技術発展を支えた知識人。"]
      ]
    },
    monsters: {
      label: "モンスター",
      eyebrow: "Bestiary",
      description: "魔獣、精霊、古竜、異界の存在。遭遇記録、危険度、分布を分類する資料庫です。",
      panelTitle: "遭遇記録の型",
      panelText: "分類、生息域、脅威度、弱点、素材、関連伝承を分けて記録します。",
      entries: [
        ["魔獣", "魔力の影響を受けた獣や変異種の分類。"],
        ["精霊・幻獣", "自然、星、古い契約に結びつく存在。"],
        ["竜種", "古代から恐れられ、崇拝もされる大型種。"]
      ]
    },
    magic: {
      label: "魔法",
      eyebrow: "Arcane Systems",
      description: "術式、系統、禁呪、触媒、学院研究。世界の文明を形作る魔法体系を整理します。",
      panelTitle: "魔法体系の型",
      panelText: "系統、消費、媒介、発動条件、社会的制限を共通項目として扱います。",
      entries: [
        ["生活魔法", "照明、着火、清掃、乾燥など、日常生活を便利にするための基礎魔法。", "entries/utility-magic.html"],
        ["元素魔法", "自然界に存在する地・水・火・風などの元素と共鳴し、その力を引き出す基本的な魔法体系。", "entries/elemental-magic.html"],
        ["召喚魔法", ""],
        ["回復魔法", ""],
        ["呪符魔法", ""],
        ["古代語魔法", ""],
        ["竜言語魔法", ""],
        ["禁呪", "国家や宗教によって使用を禁じられた術式。"]
      ]
    },
    religions: {
      label: "宗教",
      eyebrow: "Faiths and Temples",
      description: "神々、聖典、祭祀、神殿勢力。信仰が政治と暮らしへ与える影響を記録します。",
      panelTitle: "信仰資料の型",
      panelText: "教義、祭日、聖地、組織階層、国家との関係を同じ形式で追えるようにします。",
      entries: [
        ["太陽信仰", "王権と結びつきやすい公的信仰。"],
        ["星の祭祀", "暦、航海、予言と関わる祭祀体系。"],
        ["地方信仰", "土地の精霊や祖霊を祀る共同体信仰。"]
      ]
    },
    landmarks: {
      label: "名所",
      eyebrow: "Landmarks",
      description: "遺跡、聖地、自然奇観、都市景観。旅路と事件の舞台となる場所をまとめます。",
      panelTitle: "場所資料の型",
      panelText: "位置、管理者、来歴、関連事件、近隣施設を揃えて、地理資料と相互参照しやすくします。",
      entries: [
        ["愚者の山脈", "ブレノリア大陸を横断する広大な山脈の一部。"],
        ["ネグレイア湖", "創造神リヴィアーナの加護が残る、山脈に抱かれた高山湖。"]
      ]
    },
    history: {
      label: "歴史",
      eyebrow: "Chronicles",
      description: "王朝、戦争、発見、災厄。時代ごとの出来事を年表と詳細史料で整理します。",
      panelTitle: "年代記の型",
      panelText: "事件、年代、関係国家、主要人物、影響範囲を固定項目にして、長い歴史を横断できます。",
      entries: [
        ["神話時代", "神々と古い誓約が語られる遠い時代。"],
        ["王国成立期", "現代国家の制度と国境が形作られた時代。"],
        ["大戦と休戦", "現在の勢力図へつながる戦争と条約。"]
      ]
    },
    races: {
      label: "種族",
      eyebrow: "Races and Peoples",
      description: "人族、妖精族、獣人、古き民。文化、身体的特徴、居住域を整理します。",
      panelTitle: "種族資料の型",
      panelText: "起源、文化、言語、寿命、信仰、国家との関係をテンプレート化して増補します。",
      entries: [
        ["人族", "大陸各地に広がる主要種族。"],
        ["妖精族", "森、星、古い魔法と深く関わる民。"],
        ["獣人", "氏族ごとの身体特徴と文化を持つ人々。"]
      ]
    },
    professions: {
      label: "職業",
      eyebrow: "Professions",
      description: "エラムノーバに存在する職業を、役割や専門分野ごとに整理します。",
      panelTitle: "職業分類",
      panelText: "社会を支えるさまざまな職業を、役割と専門分野に沿って分類します。",
      entries: [
        ["戦闘系", "戦闘や護衛など、武力を用いる職業。"],
        ["生産・技術系", "素材の加工、製造、建築、技術に関わる職業。"],
        ["医療系", "治療、看護、調薬など、人々の健康を支える職業。"],
        ["商業・生活系", "商取引や日々の暮らしを支える職業。"],
        ["学術・宗教系", "研究、教育、信仰、祭祀に関わる職業。"]
      ]
    },
    items: {
      label: "アイテム",
      eyebrow: "Relics and Tools",
      description: "宝具、武器、道具、文書、素材。物語に残る品々の来歴と所在を記録します。",
      panelTitle: "収蔵資料の型",
      panelText: "種別、製作者、所在、効能、関連人物を揃え、探索や事件の手がかりとして扱います。",
      entries: [
        ["武器・防具", "戦役や英雄譚に登場する装備。", "equipment/index.html"]
      ]
    },
    organizations: {
      label: "組織",
      eyebrow: "Orders and Guilds",
      description: "騎士団、商会、学院、秘密結社。目的を共有する集団と勢力関係をまとめます。",
      panelTitle: "組織台帳の型",
      panelText: "目的、拠点、代表者、構成員、同盟・敵対関係を同じ形式で整理します。",
      entries: [
        ["冒険者ギルド", "依頼の仲介や冒険者登録、素材の買い取り、災害対応を担う組織。", "entries/adventurers-guild.html"],
        ["商人ギルド", "商人、交易商、職人、流通業者が加盟し、交易と市場を支える経済組織。", "entries/merchant-guild.html"],
        ["司法制度", "各国の法秩序を維持し、公正な裁きを通じて国民の権利と安全を守る司法組織・国家制度。", "entries/national-courts.html"],
        ["奴隷商人", "奴隷の契約と売買を扱う、国家の認可を受けた組織。"],
        ["騎士団", "国家や信仰に仕える武装組織。"],
        ["商会・組合", "交易、職能、都市運営に影響を持つ組織。"],
        ["学院・研究機関", "魔法、歴史、技術を扱う知識集団。"]
      ]
    },
    facilities: {
      label: "施設",
      eyebrow: "Facilities",
      description: "城塞、神殿、学院、港湾、市場。社会を支える建築と機能を記録します。",
      panelTitle: "施設資料の型",
      panelText: "所在地、管理組織、機能、歴史、関連事件を揃え、名所や組織ページへ接続します。",
      entries: [
        ["軍事・防衛", "城塞、砦、兵舎など、国家や地域の防衛を担う施設。"],
        ["宗教・祭祀", "神殿、礼拝堂、祭壇など、信仰と儀礼に関わる施設。"],
        ["教育・研究", "学院、図書館、研究所など、知識の継承と探究を担う施設。"],
        ["生産・工房", "鍛冶場、工房、製造所など、道具や物資を生産する施設。"],
        ["行政・司法", "官庁、法廷、役所など、統治と法の執行を担う施設。"],
        ["商業・市場", "市場、商店、交易所など、商品と金銭が行き交う施設。", "commercial/index.html"],
        ["街道・旅路", "街道、関所、駅舎など、人々の移動と物流を支える施設。"]
      ]
    },
    glossary: {
      label: "用語集",
      eyebrow: "Terminology Index",
      description: "固有名詞、称号、地名、魔法用語を横断して探すための索引です。",
      panelTitle: "索引資料の型",
      panelText: "読み、分類、関連カテゴリ、初出、解説を揃え、1000ページ規模の回遊を支えます。",
      entries: [
        ["エラムノーバ", "一つの大陸といくつかの群島から成り、二つの月を持つ惑星。", "entries/heiramnova.html"],
        ["ヴィアラ", "エラムノーバ全土で広く流通している共通通貨。", "entries/viala.html"],
        ["剣術流派", "剣術の技法と理念を体系化し、師から弟子へ受け継がれる流派。"],
        ["長さ表記", "ティル、リーヴ、ガルナ、ヴェルドから成る長さ・距離単位。", "entries/length-units.html"],
        ["速度表記", "一定時間内に進む距離によって速度を表すための表記法。", "entries/speed-notation.html"],
        ["犯罪紋", "犯罪歴を示すため、一定以上の罪を犯した者に刻まれる紋。"],
        ["奴隷紋", "奴隷契約に関わる魔法の紋。"],
        ["エラムノーバの果物①", "エラムノーバに存在する14種類の果実と、その効能や用途、風味。", "entries/solgrande-fruits-01.html"],
        ["英雄クラウス物語 小説版", "ブレノリア大陸に伝わる英雄クラウスの物語。", "entries/hero-klaus.html"],
        ["英雄クラウス物語 絵本版", "英雄クラウスの生涯を32枚の絵でたどる絵本。", "entries/hero-klaus-picture-book.html"]
      ]
    }
  };

  var englishCategories = {
    magic: {
      label: "Magic",
      eyebrow: "Arcane Systems",
      description: "Magical systems, disciplines, forbidden arts, catalysts, and academic research that shape civilization.",
      panelTitle: "Magic Archive Format",
      panelText: "Each entry records its discipline, cost, medium, activation requirements, and social restrictions.",
      entries: [
        ["Utility Magic", "Basic magic used for everyday tasks such as lighting, ignition, cleaning, and drying.", "entries/utility-magic.html"],
        ["Elemental Magic", "A fundamental magical system that draws power by resonating with natural elements such as earth, water, fire, and wind.", "entries/elemental-magic.html"],
        ["Summoning Magic", "In preparation."],
        ["Healing Magic", "In preparation."],
        ["Talisman Magic", "In preparation."],
        ["Ancient Language Magic", "In preparation."],
        ["Dragon Language Magic", "In preparation."],
        ["Forbidden Magic", "Spells whose use is prohibited by nations or religions."]
      ]
    },
    religions: {
      label: "Religions",
      eyebrow: "Faiths and Temples",
      description: "Gods, scriptures, rites, and temple powers, recording how faith shapes politics and daily life.",
      panelTitle: "Religion Archive Format",
      panelText: "Each entry records doctrine, holy days, sacred places, hierarchy, and relationships with nations.",
      entries: [
        ["Solar Faith", "A public faith often closely connected to royal authority."],
        ["Rites of the Stars", "A ritual tradition associated with calendars, navigation, and prophecy."],
        ["Local Faiths", "Community faiths honoring local spirits and ancestors."]
      ]
    },
    landmarks: {
      label: "Landmarks",
      eyebrow: "Landmarks",
      description: "Ruins, sacred places, natural wonders, and cityscapes that form the settings of journeys and events.",
      panelTitle: "Landmark Archive Format",
      panelText: "Each entry records its location, custodian, history, related events, and nearby facilities.",
      entries: [
        ["Fools' Mountains", "Part of a vast mountain range crossing the continent."],
        ["Lake Negreia", "A high-altitude lake nestled among the mountains, where the blessing of the creator goddess Livianna remains."]
      ]
    },
    history: {
      label: "History",
      eyebrow: "Chronicles",
      description: "Dynasties, wars, discoveries, and disasters, organized through timelines and historical records.",
      panelTitle: "Historical Archive Format",
      panelText: "Each entry records the event, period, nations involved, key figures, and extent of its influence.",
      entries: [
        ["Mythic Age", "A distant age remembered through tales of gods and ancient covenants."],
        ["Age of Kingdom Formation", "The period in which the institutions and borders of modern nations took shape."],
        ["Great War and Armistice", "Wars and treaties that led to the present balance of power."]
      ]
    },
    races: {
      label: "Races",
      eyebrow: "Races and Peoples",
      description: "Humans, elves, dwarves, orcs, beastfolk, oni, halflings, and the Laclot people—their cultures, physical traits, and homelands.",
      panelTitle: "Race Archive Format",
      panelText: "Each entry records origins, culture, language, lifespan, faith, and relationships with nations.",
      entries: []
    },
    professions: {
      label: "Professions",
      eyebrow: "Professions",
      description: "Occupations found throughout the world, organized by their roles and areas of expertise.",
      panelTitle: "Profession Categories",
      panelText: "The many professions supporting society, classified by role and field of expertise.",
      entries: [
        ["Combat", "Professions involving armed combat, protection, and escort duties."],
        ["Production and Technical", "Professions involving material processing, manufacturing, construction, and technical work."],
        ["Medical", "Professions supporting health through treatment, nursing, and medicine preparation."],
        ["Commerce and Daily Life", "Professions supporting trade and the practical needs of everyday life."],
        ["Academic and Religious", "Professions involving research, education, faith, and ritual practice."]
      ]
    },
    items: {
      label: "Items",
      eyebrow: "Relics and Tools",
      description: "Relics, weapons, tools, documents, and materials, recording the histories and locations of notable objects.",
      panelTitle: "Item Archive Format",
      panelText: "Each entry records its type, creator, location, effects, and related people.",
      entries: [
        ["Weapons and Armor", "Equipment appearing in wars and heroic tales.", "equipment/index.html"]
      ]
    },
    organizations: {
      label: "Organizations",
      eyebrow: "Orders and Guilds",
      description: "Orders, guilds, academies, and secret societies, recording groups with shared aims and their relationships.",
      panelTitle: "Organization Archive Format",
      panelText: "Each entry records its purpose, headquarters, leader, members, alliances, and rivalries.",
      entries: [
        ["Adventurers Guild", "An organization handling requests, adventurer registration, material purchases, and disaster response.", "entries/adventurers-guild.html"],
        ["Merchant Guild", "An economic organization of merchants, traders, artisans, and distributors supporting trade and markets.", "entries/merchant-guild.html"],
        ["Judicial System", "Judicial organizations and state institutions maintaining law and protecting citizens through fair judgment.", "entries/national-courts.html"],
        ["Slave Merchants", "State-authorized organizations handling slave contracts and transactions."],
        ["Knightly Orders", "Armed organizations serving nations or faiths."],
        ["Trading Companies and Associations", "Organizations influencing trade, professions, and urban administration."],
        ["Academies and Research Institutions", "Scholarly organizations devoted to magic, history, and technology."]
      ]
    },
    facilities: {
      label: "Facilities",
      eyebrow: "Facilities",
      description: "Fortresses, temples, academies, ports, and markets—the structures and functions that support society.",
      panelTitle: "Facility Archive Format",
      panelText: "Each entry records its location, managing organization, function, history, and related events.",
      entries: [
        ["Military and Defense", "Fortresses, forts, barracks, and other facilities defending nations and regions."],
        ["Religion and Ritual", "Temples, chapels, altars, and other facilities associated with faith and ritual."],
        ["Education and Research", "Academies, libraries, laboratories, and other facilities devoted to learning and inquiry."],
        ["Production and Workshops", "Forges, workshops, manufactories, and other facilities producing tools and supplies."],
        ["Administration and Justice", "Government offices, courts, and other facilities supporting governance and law enforcement."],
        ["Commerce and Markets", "Markets, shops, trading posts, and other places where goods and money change hands.", "commercial/index.html"],
        ["Roads and Travel", "Roads, checkpoints, stations, and other facilities supporting travel and distribution."]
      ]
    },
    glossary: {
      label: "Glossary",
      eyebrow: "Terminology Index",
      description: "An index for searching proper names, titles, places, and magical terminology.",
      panelTitle: "Glossary Entry Format",
      panelText: "Each entry records its reading, category, related archive sections, first appearance, and explanation.",
      entries: [
        ["Heiramnova", "A planet with two moons, consisting of one continent and several island chains.", "entries/heiramnova.html"],
        ["Viala", "The common currency widely circulated throughout Heiramnova.", "entries/viala.html"],
        ["Sword Schools", "Traditions that systematize sword techniques and philosophies and pass them from master to student."],
        ["Length Notation", "A system of length and distance units comprising Til, Riiv, Garna, and Veld.", "entries/length-units.html"],
        ["Speed Notation", "A notation system expressing speed through distance traveled over a fixed period.", "entries/speed-notation.html"],
        ["Criminal Mark", "A mark placed on those convicted of crimes above a defined level of severity."],
        ["Slave Mark", "A magical mark associated with a slave contract."],
        ["Fruits of Heiramnova I", "Fourteen fruits found in Heiramnova, including their effects, uses, and flavors.", "entries/solgrande-fruits-01.html"],
        ["The Tale of Hero Klaus — Novel Edition", "The novel edition of the tale handed down across Brenoria.", "entries/hero-klaus.html"],
        ["The Tale of Hero Klaus — Picture Book", "A 32-page illustrated journey through the life of Hero Klaus.", "entries/hero-klaus-picture-book.html"]
      ]
    }
  };

  function getCategory() {
    var key = document.body.getAttribute("data-archive-category");

    if (document.documentElement.lang === "en") {
      return englishCategories[key] || null;
    }

    return categories[key];
  }

  function renderIndex(category) {
    var titleNodes = document.querySelectorAll("[data-archive-title]");
    var eyebrow = document.querySelector("[data-archive-eyebrow]");
    var description = document.querySelector("[data-archive-description]");
    var panelTitle = document.querySelector("[data-archive-panel-title]");
    var panelText = document.querySelector("[data-archive-panel-text]");
    var list = document.querySelector("[data-archive-entries]");

    titleNodes.forEach(function (node) {
      node.textContent = category.label;
    });
    if (eyebrow) eyebrow.textContent = category.eyebrow;
    if (description) description.textContent = category.description;
    if (panelTitle) panelTitle.textContent = category.panelTitle;
    if (panelText) panelText.textContent = category.panelText;

    if (list) {
      list.innerHTML = category.entries.map(function (entry) {
        var title = entry[2]
          ? '<a href="' + entry[2] + '">' + entry[0] + "</a>"
          : '<span class="entry-link--pending" aria-disabled="true" tabindex="0" data-tooltip="'
            + (document.documentElement.lang === "en" ? "In preparation" : "準備中") + '">' + entry[0] + "</span>";
        return '<li class="entry-item"><h3>' + title + '</h3><p>' + entry[1] + "</p></li>";
      }).join("");
    }
  }

  function renderTemplate(category) {
    var nodes = document.querySelectorAll("[data-template-category]");

    nodes.forEach(function (node) {
      node.textContent = category.label;
    });
  }

  function initIndexSearch(category) {
    var index = document.querySelector(".lore-index");
    var panel = index ? index.querySelector(":scope > .lore-panel") : null;
    var list = index ? index.querySelector(".entry-list") : null;
    var items;
    var controls;
    var query;
    var sort;
    var reset;
    var count;
    var empty;

    if (!index || !panel || !list || panel.querySelector("[data-archive-search]")) {
      return;
    }

    items = Array.prototype.slice.call(list.querySelectorAll(":scope > .entry-item")).map(function (item, itemIndex) {
      var title = item.querySelector("h3");
      return {
        element: item,
        index: itemIndex,
        name: title ? title.textContent.trim() : "",
        searchText: item.textContent.normalize("NFKC").toLowerCase()
      };
    });

    if (!items.length) {
      return;
    }

    if (panel.querySelector("h2")) {
      panel.querySelector("h2").textContent = document.documentElement.lang === "en"
        ? "Search " + category.label
        : category.label + "検索";
    }
    if (panel.querySelector("p")) {
      panel.querySelector("p").textContent = document.documentElement.lang === "en"
        ? "Search the " + category.label.toLowerCase() + " archive by name or description."
        : "名前や説明を横断して" + category.label + "資料を探すための索引です。";
    }

    controls = document.createElement("div");
    controls.className = "archive-search-controls";
    controls.innerHTML = document.documentElement.lang === "en"
      ? '<div class="people-control">' +
          '<label for="archive-search">Name or description</label>' +
          '<input id="archive-search" type="search" placeholder="Search by name or description" data-archive-search>' +
        '</div>' +
        '<div class="people-control">' +
          '<label for="archive-sort">Sort by</label>' +
          '<select id="archive-sort" data-archive-sort>' +
            '<option value="appearance">Listing order</option>' +
            '<option value="name">Name</option>' +
          '</select>' +
        '</div>' +
        '<button class="button button--ghost people-reset" type="button" data-archive-reset>Reset filters</button>'
      : '<div class="people-control">' +
          '<label for="archive-search">名前・説明検索</label>' +
          '<input id="archive-search" type="search" placeholder="名前・説明で検索" data-archive-search>' +
        '</div>' +
        '<div class="people-control">' +
          '<label for="archive-sort">並び替え</label>' +
          '<select id="archive-sort" data-archive-sort>' +
            '<option value="appearance">掲載順</option>' +
            '<option value="name">名前順</option>' +
          '</select>' +
        '</div>' +
        '<button class="button button--ghost people-reset" type="button" data-archive-reset>条件をリセット</button>';
    panel.appendChild(controls);

    count = document.createElement("p");
    count.className = "people-count archive-search-count";
    count.setAttribute("data-archive-count", "");
    list.parentNode.insertBefore(count, list);

    empty = document.createElement("p");
    empty.className = "people-empty";
    empty.setAttribute("data-archive-empty", "");
    empty.hidden = true;
    list.parentNode.insertBefore(empty, list.nextSibling);

    query = controls.querySelector("[data-archive-search]");
    sort = controls.querySelector("[data-archive-sort]");
    reset = controls.querySelector("[data-archive-reset]");

    function update() {
      var keyword = query.value.trim().normalize("NFKC").toLowerCase();
      var ordered = items.slice();
      var visibleCount = 0;

      if (sort.value === "name") {
        ordered.sort(function (a, b) {
          return a.name.localeCompare(b.name, document.documentElement.lang === "en" ? "en" : "ja");
        });
      } else {
        ordered.sort(function (a, b) {
          return a.index - b.index;
        });
      }

      ordered.forEach(function (item) {
        var visible = !keyword || item.searchText.indexOf(keyword) !== -1;
        item.element.hidden = !visible;
        list.appendChild(item.element);
        if (visible) {
          visibleCount += 1;
        }
      });

      count.textContent = visibleCount + " / " + items.length
        + (document.documentElement.lang === "en" ? " entries" : "件");
      empty.textContent = document.documentElement.lang === "en"
        ? "No " + category.label.toLowerCase() + " entries match your search."
        : "条件に一致する" + category.label + "資料が見つかりません。";
      empty.hidden = visibleCount !== 0;
    }

    query.addEventListener("input", update);
    sort.addEventListener("change", update);
    reset.addEventListener("click", function () {
      query.value = "";
      sort.value = "appearance";
      update();
      query.focus();
    });

    update();
  }

  function init() {
    var category = getCategory();

    if (!category) {
      return;
    }

    renderIndex(category);
    renderTemplate(category);
    initIndexSearch(category);
  }

  window.SolgrandeArchiveCategories = {
    init: init
  };

  document.addEventListener("DOMContentLoaded", init);
})();
