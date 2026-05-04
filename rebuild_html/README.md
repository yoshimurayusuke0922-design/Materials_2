# Rebuild HTML Deck

このフォルダは、現行の `content/bullets.md`、`design/design_direction.md`、`design/generated_assets/` をもとに新規実装したHTMLスライドです。

## Files

- `index.html`: 12枚構成のHTMLスライド
- `styles.css`: PDF出力を見据えた固定16:9レイアウト
- `assets/`: 実装用にコピーした画像素材

## Preview

`index.html` をブラウザで開いて確認してください。

## Screenshot Slots

スクショを反映する場合は `screenshots.js` の値を画像パスまたは data URL に差し替えます。

```js
window.SANKO_SCREENSHOTS = {
  property: "./assets/screenshots/property.png",
  contract: "./assets/screenshots/contract.png",
  mobile: "./assets/screenshots/mobile.png",
  publishOwn: "./assets/screenshots/publish-own.png",
  publishOther: "./assets/screenshots/publish-other.png",
  responseMail: "./assets/screenshots/response-mail.png",
  aiAssist: "./assets/screenshots/ai-assist.png"
};
```

ブラウザ上では `window.applySankoScreenshots({ property: "data:image/png;base64,..." })` でも差し替えできます。

## PDF Export

ブラウザの印刷機能でPDF化する場合は、以下を推奨します。

- 用紙: 横向き
- 余白: なし
- 背景グラフィック: 有効
- 拡大縮小: 100%
