---
name: fieldx-sidebar-rail
description: Use this when creating or updating a Field X style HTML proposal deck that needs the reusable thin red left sidebar rail with chapter label, vertical copyright copy, and page number. Trigger when the user mentions the recent sidebar, red sidebar, side rail, Field X deck sidebar, or asks to reuse this sidebar design.
---

# Field X Sidebar Rail

## Goal

Recreate the recent Field X-style left sidebar rail as a reusable HTML/CSS component for proposal decks.

## When To Use

- HTML slide decks or proposal pages with a fixed 16:9 canvas.
- The user asks for the recent sidebar, red sidebar, side rail, or Field X sidebar design.
- Deck pages need a consistent chapter/page navigation mark.

## Core Rules

- Do not use the rail on the cover unless the user explicitly asks.
- Use it on contents, divider, and body slides.
- Treat it as a fixed brand rail, not as a variable chapter title band.
- Keep all rail text editable in HTML/CSS.
- Keep the width at `60px`; earlier narrower versions looked weak in preview.
- Start the main slide body after the rail with `left: var(--sidebar)`.

## Standard Markup

```html
<aside class="sidebar">
  <span class="side-chapter">Chapter1</span>
  <span class="side-copy">Copyright @Field X inc. All rights reserved.</span>
  <span class="side-page">4</span>
</aside>
```

For contents, use `Contents` for `.side-chapter`. For body sections, use `Chapter1`, `Chapter2`, `Chapter3`, etc.

## Standard CSS

```css
:root {
  --red-side: #ff2121;
  --sidebar: 60px;
}

.slide {
  position: relative;
  width: 1600px;
  height: 900px;
  overflow: hidden;
}

.slide-inner {
  position: absolute;
  inset: 0 0 0 var(--sidebar);
  padding: 84px 76px 56px 76px;
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

## Optional Logo Variant

Only use the logo variant when the deck needs a Field X mark in the rail. It may require `68px` width to keep the mark readable.

```html
<aside class="side-rail">
  <img class="rail-logo" src="./assets/fieldx_mark.png" alt="" />
  <span class="rail-copy">Copyright @Field X inc. All rights reserved.</span>
  <span class="page-no">2</span>
</aside>
```

## Implementation Checklist

- Apply the rail to every non-cover slide that belongs to the deck system.
- Verify `.slide-inner` or the equivalent content wrapper does not overlap the rail.
- Keep browser preview left-aligned with `justify-content: start` on the deck wrapper when using a fixed 1600px canvas.
- Confirm page numbers are correct after adding or removing slides.
- For PDF export, avoid filters, blend modes, and fragile off-canvas decorations inside the rail.
- If adapting to another brand, change only the red token and copy after the layout works.

## Reference

Detailed human-readable notes live in `design/sidebar_rail_design.md` when this skill is used inside the original project.
