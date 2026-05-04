# Field X Sidebar Rail Design

## Purpose

Field X系のHTML提案資料で使う、左端固定の赤いサイドバーを再利用するための設計メモ。本文スライドに共通のページ位置、章位置、ブランド感を与えるための部品として扱う。

## Source

- Primary implementation: `rebuild_html/styles.css`
- HTML pattern: `rebuild_html/index.html`
- Earlier logo variant: `html_deck/styles.css`
- Design notes: `design/design.md`, `design/design_direction.md`, `design/style_tokens.md`

## Core Rule

- 表紙には原則使わない。
- 目次、章扉、本文スライドには固定で使う。
- サイドバーは「章タイトル帯」ではなく、左端に常駐する細いブランドレールとして扱う。
- 毎ページで幅、背景色、文字位置、ページ番号位置を揃える。
- テキストは画像化せず、HTML/CSSの編集可能なテキストで組む。

## Visual Spec

- Canvas: `1600px x 900px` or equivalent 16:9 fixed slide.
- Rail width: `60px`.
- Background: `#ff2121`.
- Text color: `#ffffff`.
- Chapter label:
  - Position: top center.
  - Example: `Contents`, `Chapter1`, `Chapter2`, `Chapter3`.
  - Font size: `11px`.
  - Font weight: `700`.
  - Keep one line with `white-space: nowrap`.
- Copyright copy:
  - Position: vertical center.
  - Text: `Copyright @Field X inc. All rights reserved.`
  - Font size: `13px`.
  - Font weight: `700`.
  - Use `writing-mode: vertical-rl`.
- Page number:
  - Position: bottom center.
  - Font size: `32px`.
  - Font weight: `800`.

## Layout Relationship

The slide body starts after the sidebar:

```css
:root {
  --sidebar: 60px;
}

.slide-inner {
  position: absolute;
  inset: 0 0 0 var(--sidebar);
  padding: 84px 76px 56px 76px;
}
```

For browser preview, align the whole deck to the left so the sidebar is not hidden when the canvas is wider than the viewport:

```css
.deck {
  display: grid;
  gap: 0;
  justify-content: start;
}
```

## Recommended HTML

```html
<aside class="sidebar">
  <span class="side-chapter">Chapter1</span>
  <span class="side-copy">Copyright @Field X inc. All rights reserved.</span>
  <span class="side-page">4</span>
</aside>
```

## Recommended CSS

```css
:root {
  --red-side: #ff2121;
  --sidebar: 60px;
}

.sidebar {
  position: absolute;
  z-index: 10;
  inset: 0 auto 0 0;
  width: var(--sidebar);
  background: var(--red-side);
  color: #fff;
}

.side-chapter {
  position: absolute;
  top: 32px;
  left: 50%;
  width: 56px;
  transform: translateX(-50%);
  text-align: center;
  font-size: 11px;
  line-height: 1;
  font-weight: 700;
  white-space: nowrap;
}

.side-copy {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 13px;
  line-height: 1;
  font-weight: 700;
  white-space: nowrap;
}

.side-page {
  position: absolute;
  left: 0;
  bottom: 26px;
  width: 100%;
  text-align: center;
  font-size: 32px;
  line-height: 1;
  font-weight: 800;
}
```

## Logo Variant

If the deck needs a small mark at the top of the rail, use the `html_deck` style variant:

```html
<aside class="side-rail">
  <img class="rail-logo" src="./assets/fieldx_mark.png" alt="" />
  <span class="rail-copy">Copyright @Field X inc. All rights reserved.</span>
  <span class="page-no">2</span>
</aside>
```

```css
.side-rail {
  position: absolute;
  inset: 0 auto 0 0;
  width: 68px;
  background: linear-gradient(180deg, var(--red) 0%, var(--red-dark) 100%);
  box-shadow: inset -1px 0 0 rgb(255 255 255 / 0.18);
}

.rail-logo {
  position: absolute;
  left: 13px;
  top: 18px;
  width: 42px;
  height: 42px;
  object-fit: cover;
  object-position: left top;
}
```

Use this variant only when the logo mark is important. The standard 60px text-only rail is cleaner and easier to reuse.

## Quality Checklist

- The rail is exactly fixed to the slide left edge.
- The slide body starts at `left: var(--sidebar)` and does not overlap the rail.
- Chapter label, vertical copy, and page number are text, not raster images.
- Page number is centered and visually large enough at 16:9 export size.
- The rail is visible in browser preview and PDF export.
- Width is not reduced below `60px`; earlier `40px` versions looked too thin.
- Letter spacing stays `0` unless the existing deck already uses a different global rule.
