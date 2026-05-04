# Design Direction

## Skill Used

- `deck-design-director`

## Overall

- Output format: HTML deck.
- Aspect ratio: 16:9.
- Source priority: video screenshots and `content/bullets.md`.
- Visual identity: Field X red, white, light gray, black Japanese gothic typography.
- Text policy: all real Japanese copy remains editable HTML text.
- Asset policy: current assets are not trusted except the Field X logo if explicitly supplied. Icons and mock visuals should be newly prepared or built in HTML/CSS.
- Sidebar rule: cover does not use the sidebar. Contents, divider slides, and all body slides use the fixed left red sidebar. Use 60px width for this deck; 40px was too thin in browser preview.
- PDF rule: design for browser print/export to PDF at 16:9. Avoid effects that print inconsistently; use stable pixel dimensions, no viewport-dependent font scaling, no overflow text, and keep every slide self-contained.
- Cover PDF rule: the cover's red organic shapes must be a single full-slide background image or simple absolutely positioned CSS shapes inside the slide bounds. Prefer a single background image for PDF stability. Do not rely on clipped viewport pseudo-elements that may shift during PDF export.

## Concrete Look

- Overall feel:
  clean Japanese business proposal, red/white corporate identity, strong but not decorative.
- Page body:
  light warm gray or white canvas, thin red sidebar, large black title, compact red chapter label.
- Main components:
  white rounded cards with pale gray border, red line icons, red message bars, pale red decorative circles/shapes.
- Density:
  closer to the video screenshots than a sparse landing page. Each slide should feel like a finished proposal page, not a marketing hero.

## Shared Components

### Thin Sidebar

- Width: `60px`.
- Background: solid `#ff2121`.
- Used on slides: 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12.
- Not used on cover: 01.
- Content:
  - top: `Chapter1`, `Chapter2`, or `Chapter3`
  - middle: vertical `Copyright @Field X inc. All rights reserved.`
  - bottom: slide page number
- Rule:
  sidebar text must be rendered as text/CSS, not as a stretched image.

### Full-Red Divider

- Full red background.
- Large pale section number at left.
- White title near center-left.
- Short white underline.
- Thin sidebar remains visible at far left.
- No cards, no logo.

### Proposal Cards

- White or near-white cards.
- Thin light gray border.
- Soft shadow only if needed.
- Red line icon in pale red circle.
- Card title bold black.
- Caption is short, 2-3 lines maximum.

### Demo Placeholders

- Use fixed empty frames because final screen images will be inserted later.
- Placeholder frames should be light gray/white, with subtle border.
- Titles/labels remain editable HTML.
- Do not generate detailed UI screenshots unless requested later.

## Slide-by-Slide Direction

## 01 Cover

- Layout:
  match the screenshot: large quiet white area, red organic shape at right, red semicircle bottom-left, faint red circle near top.
- Text:
  recipient top-left, two-line title left, date lower-left, Field X logo lower center.
- Asset needed:
  cover decorative background only. No baked-in text.
- Sidebar:
  none.

## 02 Contents

- Layout:
  heading `Contents / 目次` at top-left, three large agenda cards across the middle.
- Cards:
  red circular number at top, thin red horizontal rule, title, one-line caption.
- Sidebar:
  Chapter0 or Contents label, page number 2. Keep it thin and consistent with body slides.

## 03 Divider: 今回のご提案につきまして

- Layout:
  full red divider.
- Text:
  large translucent `01`, white title `今回のご提案につきまして`, short underline.
- Sidebar:
  Chapter1, page number 3.

## 04 今回のご提案内容

- Layout:
  thin left sidebar, title top-left, red horizontal message bar, four equal cards, bottom message bar.
- Message bar:
  red filled rounded rectangle with white text.
- Cards:
  four-column grid. Each card has a red line icon, title, small red divider, short caption.
- Icons needed:
  database, document/contract, smartphone, growth/chart.
- Sidebar:
  Chapter1, page number 4.

## 05 Divider: デモ画面イメージ

- Layout:
  full red divider.
- Text:
  large translucent `02`, white title `デモ画面イメージ`, short underline.
- Sidebar:
  Chapter2, page number 5.

## 06 物件・入居者管理画面

- Layout:
  thin sidebar, title top-left, one large screenshot placeholder on the left, three stacked callout cards on the right.
- Placeholder:
  large desktop screen frame, empty center for later screenshot.
- Callouts:
  red line icons for building, people, repair/wrench.
- Sidebar:
  Chapter2, page number 6.

## 07 スマートフォン対応・各種契約書作成機能

- Layout:
  thin sidebar, title top-left, large desktop placeholder left, smartphone placeholder center-right, three stacked callout cards on far right.
- Placeholder:
  one desktop frame + one smartphone frame. The smartphone frame must be visibly large, roughly 330px wide on the 1600px canvas, not icon-sized.
- Callouts:
  contract document, yen/invoice, smartphone.
- Sidebar:
  Chapter2, page number 7.

## 08 物件出稿・反響取り込み・AIによる自動化、省力化

- Layout:
  thin sidebar, title and short lead top-left, four fixed placeholder rectangles in a 2x2 grid.
- Labels:
  only section labels above each frame. No additional captions because space is limited.
- Placeholder labels:
  自社物件の出稿機能 / 他社物件の出稿機能 / 反響取り込み・メール返信効率化 / AIによる返信文作成・日程調整・各種データ検索.
- Sidebar:
  Chapter2, page number 8.

## 09 Divider: 将来的な展望と今後の進め方

- Layout:
  full red divider.
- Text:
  large translucent `03`, white title `将来的な展望と今後の進め方`, short underline.
- Sidebar:
  Chapter3, page number 9.

## 10 弊社による今後のAI活用イメージ

- Layout:
  thin sidebar, title top-left, lead below, central red `基幹データ` hub, four surrounding cards.
- Hub:
  red circle with white database icon and `基幹データ` label. The hub should be visually dominant, around 250px diameter with a pale red halo.
- Connections:
  dotted red lines from hub to four cards.
- Cards:
  two cards left, two cards right, icon + title + caption.
- Bottom message:
  long rounded bar with red triangular marker at left.
- Icons needed:
  headset/chat, search/data, growth/chart, document.
- Sidebar:
  Chapter3, page number 10.

## 11 今後の進め方

- Layout:
  thin sidebar, title top-left, lead, large white roadmap panel.
- Roadmap:
  six left-to-right steps with red arrow segments and circular step numbers.
  The circular step numbers should look like progress gauges: step 01 has a small red arc, and each later step fills more of the circular ring until step 06 is nearly complete, matching the screenshot.
  Use the full vertical canvas; do not compress the timeline into the top half.
- Text:
  each step has short paragraph below. Keep dense but readable.
- Sidebar:
  Chapter3, page number 11.

## 12 弊社AI導入による補助金活用支援について

- Layout:
  thin sidebar, title top-left, lead, two large cards side-by-side, bottom note.
- Left card:
  subsidy possibility and maximum amount emphasis.
- Right card:
  application confirmation and document support.
- Tone:
  careful, factual. Do not imply guaranteed approval.
- Sidebar:
  Chapter3, page number 12.

## Required Generated Assets

- `cover_bg_decorative_horizontal`: decorative cover background only.
- Individual red line icons: use separate files per icon, or use lucide/SVG in HTML. Do not rely on automatic splitting from a single generated icon sheet.
- `mock_placeholder_desktop`: neutral desktop screenshot placeholder frame.
- `mock_placeholder_mobile`: neutral smartphone placeholder frame.
- `future_hub_background`: optional soft dotted connector / glow background for the AI hub slide, without text.

## Asset Prompt And Storage

- Prompt source file:
  `projects/2026-04-25-sanko-kikan-html-proposal/design/component_prompt_map.md`
- Put generated raw files here:
  `projects/2026-04-25-sanko-kikan-html-proposal/design/generated_assets_raw/`
- Put approved/renamed working assets here:
  `projects/2026-04-25-sanko-kikan-html-proposal/design/generated_assets/`
- Expected names:
  - `cover_bg_decorative_horizontal.png`
  - `mock_placeholder_desktop.png`
  - `mock_placeholder_mobile.png`
  - `future_hub_background.png`
  - `icon_database.png`
  - `icon_contract_document.png`
  - `icon_smartphone.png`
  - `icon_growth_chart.png`
  - `icon_building.png`
  - `icon_people.png`
  - `icon_wrench.png`
  - `icon_yen_invoice.png`
  - `icon_headset_chat.png`
  - `icon_search.png`
  - `icon_subsidy_document.png`
- Final HTML implementation may copy approved assets into its local `assets/` folder later, but do not overwrite existing assets without approval.

## HTML/CSS First

- Build cards, sidebars, dividers, roadmap, message bars, and labels in HTML/CSS.
- Prefer HTML/CSS/SVG/lucide for icons. Use generated raster only for decorative background or optional empty mock device frames.
- Never bake Japanese body text into generated images.
