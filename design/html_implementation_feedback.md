# HTML Implementation Feedback

## 2026-04-30 Preview Fixes

These notes capture preview feedback so the next HTML deck implementation starts closer to the desired design.

## Rules To Reuse

- Sidebar width should be `60px` for this Field X deck. The previous `40px` sidebar looked too thin in browser preview.
- Divider slides must be vertically centered. Avoid placing the large section number and title too high.
- Raster icons generated with transparent padding must be displayed larger than their nominal box. Apparent icon size matters more than the CSS image box.
- Demo placeholders should not sit inside a second large white frame. Use the generated desktop/mobile frame as the visible frame.
- Roadmap slides should use the full vertical space. Keep rings, arrows, and notes distributed through the slide, not compressed near the top.
- AI hub center should be visually dominant. The central red hub and white database icon should be larger than surrounding callout icons.
- Final support/detail slides need larger body text and icons than first-pass defaults.
- Agenda cards should use larger title and caption text so they read as chapter cards, not small body cards.
- Smartphone mockups generated with transparent margins must be displayed at roughly `330px x 600px` or larger on a 1600x900 slide. A 250px-wide phone reads as a small icon, not a demo frame.
- AI hub slides need a dominant center object. Use a central hub near `250px` diameter with a larger soft red halo, especially when surrounding cards are large.
- Roadmap slides should not start the timeline immediately after the lead. Use the full page height by placing the rings around the middle band and allowing the notes to occupy the lower band.
- Browser preview should keep the slide left edge visible. If the canvas is wider than the viewport, align the deck to the left so the sidebar is not hidden by horizontal scrolling.

## Applied In `rebuild_html`

- Sidebar width changed from `40px` to `60px`.
- Agenda card title and caption sizes increased.
- Divider content moved lower and enlarged.
- Proposal, callout, hub, and subsidy icons enlarged.
- Demo screen outer panel removed so generated frame controls the visible frame.
- Roadmap rings, arrows, notes, and vertical spacing enlarged.
- Subsidy slide typography and icons enlarged.
- Smartphone frame enlarged and treated as a real demo frame, not a small icon.
- AI hub enlarged to make the red center and white database icon visually dominant.
- Roadmap vertical placement adjusted so the timeline uses the full slide height.
