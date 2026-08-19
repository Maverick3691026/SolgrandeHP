# SOLGRANDE公式世界資料館 運用README

このサイトは、SOLGRANDEの世界設定を長期間追加していくための静的HTMLサイトです。

基本的には、各カテゴリの `entries` フォルダに詳細ページを増やしていきます。人物だけは一覧ページがデータベース表示になっているため、詳細ページに加えて `js/people-data.js` へ人物データを追加します。

## フォルダ構成

```text
/
├─ index.html                  トップページ
├─ css/                        共通デザイン
├─ js/                         共通ナビ、カテゴリ情報、人物DB
├─ assets/                     画像などの素材
├─ world/                      世界観
├─ nations/                    国家
├─ people/                     人物
├─ monsters/                   モンスター
├─ magic/                      魔法
├─ religions/                  宗教
├─ landmarks/                  名所
├─ history/                    歴史
├─ races/                      種族
├─ items/                      アイテム
├─ organizations/              組織
├─ facilities/                 施設
└─ glossary/                   用語集
```

各カテゴリの中は、基本的に次の形です。

```text
カテゴリ名/
├─ index.html                  カテゴリ一覧ページ
└─ entries/
   ├─ template.html            詳細ページ用テンプレート
   └─ sample-entry.html        追加した詳細ページ
```

## 編集してよい主なファイル

通常の運用では、主に次のファイルだけを編集します。

```text
js/people-data.js              人物一覧カードに出すデータ
assets/people/                 人物画像
各カテゴリ/entries/*.html      詳細ページ
```

デザインを変えたい場合だけ、次のCSSを編集します。

```text
css/pages.css                  各ページ固有の見た目
css/components.css             カード、ボタン、ナビなどの共通部品
```

ナビゲーションのカテゴリ自体を増減したい場合だけ、次を編集します。

```text
js/navigation.js
js/archive-categories.js
index.html
```

## 人物を追加する手順

人物は「一覧カード」と「詳細ページ」が連動します。追加するときは、次の3つを行います。

1. 人物画像を追加する
2. 人物詳細ページを作る
3. `js/people-data.js` に人物データを追加する

### 1. 人物画像を追加する

画像はここに入れます。

```text
assets/people/
```

例:

```text
assets/people/portrait-new-character.svg
assets/people/portrait-new-character.jpg
assets/people/portrait-new-character.png
```

画像ファイル名は英数字とハイフンで付けると管理しやすいです。

```text
良い例: portrait-luna-starfall.svg
避けたい例: 新キャラ画像 完成版.png
```

### 2. 人物詳細ページを作る

まず、次のテンプレートを複製します。

```text
people/entries/template.html
```

複製したファイルを、人物ごとの名前に変更します。

```text
people/entries/luna-starfall.html
```

ファイル名は、英数字とハイフンで付けます。

詳細ページ内の次の項目を書き換えます。

```text
タイトル
プロフィール
人物紹介
外見
性格・個性
能力・スキル
来歴
関連人物
関連国家・組織
登場話
備考
```

### 3. `js/people-data.js` に人物データを追加する

人物一覧カードに表示する情報は、次のファイルで管理しています。

```text
js/people-data.js
```

この中にある `window.SolgrandePeopleData = [` の配列へ、人物データを1件追加します。

追加例:

```js
{
  id: "luna-starfall",
  name: "ルナ・スターフォール",
  englishName: "Luna Starfall",
  gender: "女性",
  race: "人族",
  origin: "ソルグランデ王国",
  residence: "王都グランヴェイル",
  nation: "ソルグランデ王国",
  affiliation: "王都文書院",
  occupation: "見習い記録官",
  attribute: "星",
  epithet: "星読みの少女",
  specialty: "星図作成",
  appearanceOrder: 7,
  image: "../assets/people/portrait-luna-starfall.svg",
  detailUrl: "entries/luna-starfall.html"
}
```

前後のデータとはカンマ `,` で区切ります。

```js
{
  id: "previous-character",
  ...
},
{
  id: "luna-starfall",
  ...
}
```

### 人物データの項目説明

| 項目 | 説明 |
| --- | --- |
| `id` | 人物ごとの管理ID。英数字とハイフン推奨 |
| `name` | 一覧カードに出る名前 |
| `englishName` | 英語表記 |
| `gender` | 性別 |
| `race` | 種族。種族フィルターに使います |
| `origin` | 出身 |
| `residence` | 居住地 |
| `nation` | 所属国家。所属国家フィルターと所属国家順ソートに使います |
| `affiliation` | 所属。カードに表示されます |
| `occupation` | 職業・立場。カード表示と職業フィルターに使います |
| `attribute` | 属性。属性フィルターに使います |
| `epithet` | 二つ名。名前検索の対象にもなります |
| `specialty` | 特技 |
| `appearanceOrder` | 登場順。数字が小さいほど先に表示されます |
| `image` | 人物画像へのパス |
| `detailUrl` | 詳細ページへのパス |

## 国家を追加する手順

国家を追加するときは、次のテンプレートを複製します。

```text
nations/entries/template.html
```

例:

```text
nations/entries/solgrande-kingdom.html
```

作ったHTMLの中で、次の項目を書き換えます。

```text
詳細ページタイトル
正式名称
英語表記
首都
統治体制
主要種族
関連組織
概要
地理・領土
政治・制度
文化・信仰
軍事・外交
歴史
関連人物
備考
```

国家一覧ページそのものはここです。

```text
nations/index.html
```

現在はカテゴリ説明とテンプレート導線を表示しています。国家一覧もカード型DBにしたい場合は、人物DBと同じ考え方で `js/nations-data.js` のようなデータファイルを追加すると管理しやすくなります。

## モンスターを追加する手順

テンプレートを複製します。

```text
monsters/entries/template.html
```

例:

```text
monsters/entries/ashen-drake.html
```

主に書き換える項目です。

```text
名称
英語表記
分類
脅威度
生息域
弱点
素材
関連伝承
概要
外見・特徴
生態
能力・攻撃手段
遭遇記録
討伐・対処法
関連地域
備考
```

## その他カテゴリを追加する手順

どのカテゴリも基本は同じです。対象カテゴリの `entries/template.html` を複製して、内容を書き換えます。

| カテゴリ | テンプレート |
| --- | --- |
| 世界観 | `world/entries/template.html` |
| 国家 | `nations/entries/template.html` |
| 人物 | `people/entries/template.html` |
| モンスター | `monsters/entries/template.html` |
| 魔法 | `magic/entries/template.html` |
| 宗教 | `religions/entries/template.html` |
| 名所 | `landmarks/entries/template.html` |
| 歴史 | `history/entries/template.html` |
| 種族 | `races/entries/template.html` |
| アイテム | `items/entries/template.html` |
| 組織 | `organizations/entries/template.html` |
| 施設 | `facilities/entries/template.html` |
| 用語集 | `glossary/entries/template.html` |

ファイル名の例:

```text
magic/entries/starfire-rite.html
religions/entries/sun-temple-faith.html
landmarks/entries/crownfall-ruins.html
history/entries/war-of-white-shields.html
races/entries/fae-folk.html
items/entries/crown-of-dawn.html
organizations/entries/white-shield-order.html
facilities/entries/grand-archive.html
glossary/entries/stellar-calendar.html
```

## 一覧ページへ追加したページを載せたい場合

現在、人物一覧は `js/people-data.js` から自動でカード表示されます。

人物以外のカテゴリは、まずはテンプレートと詳細ページを増やす構成です。一覧にもカードやリストとして出したい場合は、各カテゴリの `index.html` にリンクを追加します。

例として、国家一覧に詳細ページへのリンクを追加したい場合は、次のファイルを編集します。

```text
nations/index.html
```

`entry-list` の近くに、次のようなリンクを追加します。

```html
<li class="entry-item">
  <h3><a href="entries/solgrande-kingdom.html">ソルグランデ王国</a></h3>
  <p>王都グランヴェイルを中心とする王国。</p>
</li>
```

ただし、1000ページ以上を本格的に管理する場合は、人物と同じようにカテゴリ別のデータファイルを作る方法がおすすめです。

```text
js/nations-data.js
js/monsters-data.js
js/magic-data.js
```

## 新しいカテゴリを増やす場合

カテゴリ自体を増やす場合は、作業が少し増えます。

1. 新しいフォルダを作る
2. `index.html` を作る
3. `entries/template.html` を作る
4. ナビへ追加する
5. トップページへカードを追加する
6. カテゴリ情報へ追加する

編集する主なファイル:

```text
js/navigation.js              共通ナビ
js/archive-categories.js      カテゴリ一覧ページの表示データ
index.html                    トップページのカード
```

## 画像を追加する場所

人物画像:

```text
assets/people/
```

将来カテゴリごとに画像を増やす場合は、次のように分けると管理しやすいです。

```text
assets/nations/
assets/monsters/
assets/items/
assets/landmarks/
```

## ファイル名のルール

長期運用では、ファイル名を統一すると探しやすくなります。

おすすめ:

```text
英数字
小文字
単語はハイフンで区切る
```

例:

```text
auren-valecrown.html
solgrande-kingdom.html
ashen-drake.html
stellar-calendar.html
```

避けたい例:

```text
アウレン.html
新規ページ.html
monster final.html
```

## 追加後の確認方法

HTMLを追加したら、ブラウザで次を確認します。

1. トップページが表示される
2. 追加したカテゴリページが表示される
3. 追加した詳細ページが表示される
4. リンクをクリックして移動できる
5. 人物の場合、検索・絞り込み・並び替えに反映される
6. スマートフォン幅でも文字やカードがはみ出さない

ローカルで確認する場合は、サイトのルートフォルダで簡易サーバーを起動します。

```bash
python -m http.server 4175
```

ブラウザで次を開きます。

```text
http://127.0.0.1:4175/
```

## よくあるミス

### 人物カードが出ない

確認するファイル:

```text
js/people-data.js
```

よくある原因:

```text
カンマが抜けている
引用符 " が閉じていない
detailUrl のページが存在しない
image の画像パスが間違っている
```

### カードをクリックすると404になる

`detailUrl` と実際のHTMLファイル名が一致しているか確認します。

```js
detailUrl: "entries/luna-starfall.html"
```

実際のファイル:

```text
people/entries/luna-starfall.html
```

### 画像が表示されない

`image` のパスと実際の画像ファイル名を確認します。

```js
image: "../assets/people/portrait-luna-starfall.svg"
```

実際のファイル:

```text
assets/people/portrait-luna-starfall.svg
```

### ナビにカテゴリが出ない

確認するファイル:

```text
js/navigation.js
```

`navigationItems` にカテゴリが入っているか確認します。

## バックアップのすすめ

長期間運用する場合は、変更前にzipを残すか、Gitなどのバージョン管理を使うと安全です。

おすすめの作業順:

```text
1. 変更前にバックアップ
2. テンプレートを複製
3. 内容を書き換え
4. 一覧データを追加
5. ブラウザで確認
6. 問題なければ公開
```
