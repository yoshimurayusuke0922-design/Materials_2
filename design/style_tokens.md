# Style Tokens

## Skill Used

- `deck-style-token-unifier`

## Colors

- red-main:
  `#ff1b1b`
- red-dark:
  `#d90000`
- red-soft:
  `#fff3f3`
- ink:
  `#171717`
- text:
  `#37414d`
- muted:
  `#6f7883`
- line:
  `#e5e7eb`
- bg:
  `#eef1f5`

## Typography

- h1:
  64px / 1.28 / 700
- h2:
  48px / 1.18 / 700
- section-label:
  18px / 700
- lead:
  24px / 1.5 / 700
- card-heading:
  26px / 1.32 / 700
- body:
  18-20px / 1.5

## Radius

- large-card:
  22px
- panel:
  26px
- message-strip:
  14px
- placeholder:
  22px

## Shadow

- main:
  `0 12px 30px rgb(0 0 0 / 0.12)`

## PDF Export

- slide size:
  `1600px x 900px` or equivalent 16:9 fixed canvas
- print:
  use `@page { size: 16in 9in; margin: 0; }`
- color:
  use print color exact / preserve backgrounds
- layout:
  avoid viewport-based font scaling and avoid overflow-dependent layouts
- cover background:
  use a single full-slide `img` or `background-image` sized to exactly 100% x 100%; keep all text and logo as HTML overlay
- print safety:
  avoid CSS filters, blend modes, large off-canvas pseudo-elements, and clip-path for critical cover shapes

## Sidebar System

- width:
  60px
- background:
  `#ff2121`
- chapter label:
  top aligned, white, `Chapter1 / Chapter2 / Chapter3`
- footer copy:
  vertical white copy, `copyright @Field X inc. All rights reserved.`
- page number:
  bottom centered
- contents slide:
  sidebar enabled, label `Contents` or `Chapter0`, page number 2

## Roadmap Progress Rings

- step-01:
  15%
- step-02:
  30%
- step-03:
  45%
- step-04:
  60%
- step-05:
  80%
- step-06:
  100%

## Component Starting Sizes

- smartphone mock:
  about `330px x 600px` on a `1600px x 900px` slide
- AI hub:
  about `250px` diameter plus pale red halo
- demo desktop frame:
  enlarge generated transparent-frame images enough that the visible screen area dominates the left side

## Spacing Scale

- outer deck gap:
  28px
- slide inner padding:
  56px 34px 44px
- major block gap:
  24px
- minor block gap:
  14-18px
