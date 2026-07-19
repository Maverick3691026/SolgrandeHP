(function () {
  "use strict";

  var categories = {
    world: {
      label: "世界観",
      eyebrow: "World Foundation",
      description: "大陸、神話、暦、信仰、魔力の流れ。SOLGRANDEの全資料へ通じる基礎領域です。",
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
      description: "王権、同盟、紋章、国境線。SOLGRANDEに存在する諸国家と勢力を記録します。",
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
      description: "王族、英雄、魔術師、職人、語り部。SOLGRANDEの歴史と事件を動かす人物資料を収録します。",
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
        ["生活魔法", ""],
        ["元素魔法", ""],
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
        ["古代遺跡", "失われた王国や魔法文明の痕跡。"],
        ["聖地", "宗教的巡礼や儀礼の中心となる場所。"],
        ["自然奇観", "魔力や地形が生んだ特異な景観。"]
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
        ["ヴィアラ", "ソルグランデ全土で広く流通している共通通貨。", "entries/viala.html"],
        ["剣術流派", "剣術の技法と理念を体系化し、師から弟子へ受け継がれる流派。", "sword-schools/index.html"],
        ["長さ単位", "ティル、リーヴ、ガルナ、ヴェルドから成る長さ・距離単位。", "entries/length-units.html"],
        ["英雄クラウス物語 上巻", "ブレノリア大陸に伝わるおとぎ話。英雄クラウスの誕生を描く。", "entries/hero-klaus-upper.html"]
      ]
    }
  };

  function getCategory() {
    var key = document.body.getAttribute("data-archive-category");
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
          : '<span class="entry-link--pending" aria-disabled="true" tabindex="0" data-tooltip="準備中">' + entry[0] + "</span>";
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

  function init() {
    var category = getCategory();

    if (!category) {
      return;
    }

    renderIndex(category);
    renderTemplate(category);
  }

  window.SolgrandeArchiveCategories = {
    init: init
  };

  document.addEventListener("DOMContentLoaded", init);
})();
