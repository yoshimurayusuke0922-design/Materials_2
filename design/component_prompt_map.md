# Component Prompt Map

## cover-bg-decorative-horizontal

- Purpose:
  横長表紙の背景装飾のみを部品化する
- Output role:
  HTMLテキストの背面に敷く装飾画像
- Must include:
  - 右側から流れ込む大きな赤い有機形状
  - 上部中央寄りの淡い赤い円形ニュアンス
  - 左下の赤い有機形状
  - 左上から中央にかけてテキストを置ける静かな余白
- Must exclude:
  - タイトル
  - 副題
  - ロゴ
  - 文字全般
  - UIや図表
- Prompt strategy:
  完成スライドを描かせず、横長表紙背景だけに限定する
- PDF note:
  表紙はPDF化時の崩れを避けるため、この背景装飾を1枚の16:9画像として敷き、宛先・タイトル・日付・ロゴはHTMLで上に重ねる。CSSの巨大な疑似要素やviewport依存のclip-pathには頼らない。
- Storage:
  raw output: `design/generated_assets_raw/cover_bg_decorative_horizontal.*`
  approved asset: `design/generated_assets/cover_bg_decorative_horizontal.png`

## HTML overlay text

- Purpose:
  宛先、タイトル、日付、ロゴを編集可能に保つ
- Rendering:
  すべてHTML/CSS
- Constraints:
  画像に文字を焼き込まない

## Asset Storage Rule

- Prompt source:
  `projects/2026-04-25-sanko-kikan-html-proposal/design/component_prompt_map.md`
- Raw generated files:
  `projects/2026-04-25-sanko-kikan-html-proposal/design/generated_assets_raw/`
- Approved files for implementation:
  `projects/2026-04-25-sanko-kikan-html-proposal/design/generated_assets/`
- Do not place new generated assets into existing `out/`, `outputs/05_final/assets`, `html_deck/assets`, or current production `assets` folders until implementation is approved.

## red-line-icons

- Purpose:
  提案内容カード、デモ注釈、AI活用カード、補助金カードで使う共通アイコンを個別に作る
- Output role:
  透明背景PNGまたはSVG化しやすい赤線アイコン素材。1モチーフ1ファイル推奨。
- Important:
  セット画像を1枚で生成しても、自動で安全に分割される前提にはしない。生成する場合は、各アイコンを個別ファイルで作るか、HTML実装時にlucide/SVGで代替する。
- Needed motifs:
  - database / 基幹データ
  - document / 契約書
  - smartphone
  - growth chart / 営業支援
  - building / 物件
  - people / 入居者
  - wrench / 修繕
  - yen invoice / 請求・インボイス
  - headset chat / 問い合わせ対応
  - search / 横断検索
  - subsidy document / 補助金申請
- Must include:
  - Field X red line style
  - simple outline icons
  - consistent stroke width
  - no text
  - no drop shadow
- Must exclude:
  - Japanese or English labels
  - photorealistic objects
  - gradients inside the icons
- Shared prompt:
  Create one clean red outline icon for a Japanese corporate proposal slide. Motif: [MOTIF]. Transparent background, simple geometric line art, consistent 2px stroke, Field X bright red, no text, no labels, no shadow, no filled illustration. The icon should fit inside a pale red circular badge.

- Individual motifs to generate if not using lucide/SVG:
  - `icon_database.png`: database / 基幹データ
  - `icon_contract_document.png`: contract document / 契約書
  - `icon_smartphone.png`: smartphone
  - `icon_growth_chart.png`: growth chart / 営業支援
  - `icon_building.png`: building / 物件
  - `icon_people.png`: people / 入居者
  - `icon_wrench.png`: wrench repair / 修繕
  - `icon_yen_invoice.png`: yen invoice / 請求・インボイス
  - `icon_headset_chat.png`: headset chat / 問い合わせ対応
  - `icon_search.png`: search / 横断検索
  - `icon_subsidy_document.png`: subsidy application document

## roadmap-progress-ring

- Purpose:
  #11 の丸番号を、スクショのようにステップが進むごとにゲージが溜まる見た目にする
- Output role:
  原則HTML/CSS/SVGで実装する。画像生成は不要。
- Implementation note:
  各ステップの円はCSS conic-gradientまたはSVG stroke-dasharrayで作る。01は約15%、02は約30%、03は約45%、04は約60%、05は約80%、06は約100%の赤い進捗リングにする。

## mock-placeholder-desktop

- Purpose:
  #06-#08 の画面差し込み予定領域として使う、空のデスクトップ画面フレーム
- Output role:
  HTML上で配置する空スクリーン枠、またはCSS再現の参照
- Must include:
  - thin light gray browser/app frame
  - large empty white content area
  - subtle rounded corners
  - no actual UI details
  - no text
- Must exclude:
  - screenshots
  - charts
  - Japanese text
  - colorful UI components
- Prompt:
  Create a minimal empty desktop application screenshot placeholder frame for a Japanese business proposal slide. 16:9-friendly, light gray border, white empty content area, subtle rounded corners, very soft shadow, no text, no UI data, no charts, no icons. It should look like a clean frame where a real system screenshot will be inserted later.

## mock-placeholder-mobile

- Purpose:
  #07 のスマホ対応説明で使う、空のスマートフォンフレーム
- Output role:
  HTML上で配置する空スマホ枠、またはCSS再現の参照
- Must include:
  - slim smartphone device frame
  - empty white screen
  - subtle gray outline
  - no app content
  - no text
- Must exclude:
  - real phone brand
  - icons or UI details
  - screenshots
- Prompt:
  Create a clean empty smartphone screen placeholder for a corporate presentation slide. Slim modern phone frame, light gray outline, empty white screen, subtle shadow, no brand, no text, no UI content, no icons. It should be ready for later insertion of a real mobile screenshot.

## future-hub-background

- Purpose:
  #10 AI活用イメージの中央ハブと周辺カードを支える、薄い接続線・発光背景
- Output role:
  HTMLテキストとカードの背面に置く任意の装飾画像
- Must include:
  - subtle pale red circular glow around center
  - four faint dotted connector lines radiating outward
  - clean white/very light gray background
  - no text
  - no icons
- Must exclude:
  - Japanese text
  - database icon
  - card text
  - complex technology background
- Prompt:
  Create a subtle background scaffold for a corporate AI data hub slide. White to very light gray background, soft pale red circular glow in the center, four faint dotted red connector lines radiating to the corners, minimal and clean, no text, no icons, no cards, no UI screenshots. It will sit behind editable HTML labels and cards.
