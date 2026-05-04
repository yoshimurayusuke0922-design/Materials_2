# Deck Design System

## Purpose

参考資料の左サイドバー、赤白トーン、文字規則をテンプレ化し、各ページの image 生成と HTML 再現の共通基準とする。

## Sources

- `references_by_section/00_cover_agenda`
- `references_by_section/01_context`
- `references_by_section/03_roadmap_future`
- `submessages.md`
- `slide_structure.md`
- `bullets.md`

## Core Principle

- 三幸資料の赤白ベースを維持する
- デザインは少し洗練させる
- ただし派手にしない
- テキストは後からHTMLに戻しやすい構成にする

## Left Sidebar Template

### Role

- 本文ページの共通ナビゲーション
- 章番号、章タイトル、ページ番号を一貫して示す
- 参考資料の見た目をほぼそのまま踏襲する
- ここは独自アレンジしない

### Structure

- 幅: `60px`
- 背景: `#ff2121`
- 上部: 小さめの `ChapterX` / 目次は `Contents`
- 中央: 縦書きの `Copyright @Field X inc. All rights reserved.`
- 下部: ページ番号
- 余白:
  - top: `32px`
  - left/right: 中央揃え。章ラベル用の内側幅は `56px`
  - bottom: `26px`
- 区切り線:
  - 標準版では入れない。ロゴ入り旧variantなど、参照資料側に線がある場合だけ個別指定する

### Sidebar Typography

- Chapter label:
  - text format: `Chapter1`, `Chapter2`, `Chapter3`
  - size: `11px`
  - weight: `700`
  - color: `#ffffff`
- 縦書きコピー:
  - text: `Copyright @Field X inc. All rights reserved.`
  - size: `13px`
  - weight: `700`
  - color: `#ffffff`
  - writing mode: `vertical-rl`
- ページ番号:
  - size: `32px`
  - weight: `800`
  - color: `#ffffff`

### Sidebar Layout Rule

- 参考資料のサイドバーは「章タイトル帯」ではなく「固定レール」として扱う
- 本文ごとに変形しない
- 背景色、文字位置、ページ番号位置を毎ページそろえる
- 07-09のデモページでも同じレールを使う

## Slide Canvas

- Ratio: `16:9`
- Background: `#f7f7f5`
- Outer page background: `#e9edf2`
- Content shadow: soft only

## Color System

- Primary Red: `#ff2121`
- Soft Red Background: `#ffe8e8`
- Ink Strong: `#181818`
- Ink Body: `#555f6b`
- Line Gray: `#e5e7eb`
- Panel White: `rgba(255,255,255,0.96)`

## Typography Regulation

### H1 Cover

- size range: `42px - 66px`
- weight: `800`
- line-height: `1.22 - 1.24`
- break rule:
  - 改行は最大1回
  - 意味の切れ目でのみ改行

### Section Label

- size: `18px`
- weight: `700`
- color: `#ff2121`

### H2 Page Title

- size: `50px`
- weight: `800`
- line-height: `1.12`

### H3 Card Title

- size: `24px`
- weight: `800`
- line-height: `1.25`

### Lead

- size: `23px`
- weight: `400`
- line-height: `1.65`
- color: `#555f6b`

### Body / Bullet

- size: `18px`
- line-height: `1.7`
- color: `#555f6b`

## Spacing Regulation

- Main page padding:
  - top: `56px`
  - right: `62px`
  - bottom: `42px`
  - left: `62px`
- Section header bottom margin: `22px`
- Lead bottom margin: `26px`
- Card gap: `20px - 24px`

## Card Template

- Background: `rgba(255,255,255,0.94)`
- Border: `1px solid #e5e7eb`
- Radius: `24px`
- Padding: `24px - 30px`
- Shadow: none or very soft only

## Divider Template

- Full red background
- Large pale chapter numeral
- White title
- White short caption
- No sidebar

## Demo Page Template

- Sidebar remains
- Main screenshot area or blank placeholder is dominant
- Labels and captions are secondary
- Since screenshots will be inserted later, image benchmark should leave clear blank / screen zones
- 07-09はスクリーンショット差し込み前提の空白版で作る
- ベンチマーク画像にも、空のスクリーン領域を意図的に残す

## Roadmap Template

- Reference priority: `references_by_section/03_roadmap_future/mock_09_roadmap.png`
- Keep the reference structure almost 그대로
- Horizontal flow with six steps
- Red markers and clear line progression
- Avoid redesigning into a different infographic style

## Prompt Transfer Rule

- Every page prompt must reference:
  - red sidebar template
  - color system
  - title regulation
  - card template
- Demo pages must explicitly say:
  - blank screen area for later screenshot insertion
- Sidebar must explicitly say:
  - match the reference slide sidebar almost exactly
- Roadmap prompt must explicitly say:
  - close to reference slide structure
