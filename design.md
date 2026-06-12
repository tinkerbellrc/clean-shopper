# Design System: Clean Shopper

> This file is the source of truth for the visual direction of this project. When building, read this file and apply these tokens. Do not introduce colors, fonts, spacing, or radii that are not defined here.

**Direction:** Light, textured, alive — warm cream ground, organic blobs, frosted glass panels, botanical motifs
**Feeling:** Calm, made with care — like holding something that was grown, not manufactured
**Reference:** seed.com light mode — cream ground, glass panels, grain, botanical restraint
**Generated for:** Grocery/shopping app, clean-eating audience

---

## 1. Color

### Base palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#F3F1EB` | Warm cream — page ground |
| Surface (glass) | `rgba(255,255,255,0.58)` | Cards, panels — frosted glass |
| Surface elevated | `rgba(255,255,255,0.78)` | Hover/focused cards, modals |
| Text primary | `#141210` | Near-black, warm |
| Text muted | `#7A7671` | Secondary text, captions |
| Accent | `#2E5C3E` | Deep sage — primary actions, links |
| Accent hover | `#1F402B` | Hover/active state |
| Accent light | `rgba(46,92,62,0.10)` | Tag backgrounds, subtle fills |
| Border | `rgba(255,255,255,0.70)` | Glass card catch-light border |
| Border subtle | `rgba(0,0,0,0.06)` | Below-glass dividers, input borders |

### Functional colors — earthy, tonal, desaturated

These are not primary colors. They live in the same earth-and-sage family as the overall palette.

| Token | Value | Hue character | Usage |
|-------|-------|---------------|-------|
| Success | `#456B55` | Muted sage-forest — same family as accent | Confirmed, added, in-stock |
| Success bg | `rgba(69,107,85,0.09)` | | Success badge background |
| Warning | `#8B6830` | Warm amber ochre — aged, not alarming | Low stock, expiring, caution |
| Warning bg | `rgba(139,104,48,0.09)` | | Warning badge background |
| Error | `#924040` | Muted brick/terracotta — earthy, not screaming | Errors, unavailable, destructive |
| Error bg | `rgba(146,64,64,0.09)` | | Error badge background |
| Info | `#3D6080` | Dusty slate blue — calm and informational | Neutral info, hints, counts |
| Info bg | `rgba(61,96,128,0.09)` | | Info badge background |

**WCAG contrast on Background #F3F1EB:**
- Success `#456B55`: ~5.3:1 ✓ AA
- Warning `#8B6830`: ~4.7:1 ✓ AA
- Error `#924040`: ~5.6:1 ✓ AA
- Info `#3D6080`: ~6.2:1 ✓ AA

---

## 2. Generative background layers

Four layers stack in order:

**Layer 1 — cream ground:** `background-color: #F3F1EB`

**Layer 2 — animated blobs:** Four large CSS divs, `border-radius` organic shapes, `filter: blur(90px)`, slowly drifting with `@keyframes`. Use sage greens: `rgba(91,168,114,0.22)`, `rgba(120,170,100,0.12)`, `rgba(58,92,68,0.16)`, `rgba(140,190,120,0.10)`.

**Layer 3 — botanical line art:** A fixed SVG behind the content with faint stroke-based botanical shapes — curving stems, leaf silhouettes, organic arcs. Opacity 0.05–0.07. Adds character and depth without competing with content.

**Layer 4 — texture overlays:**
- Mesh: SVG `feTurbulence` (type: turbulence, baseFrequency 0.014) + `feColorMatrix` — soft organic noise, 5–7% opacity
- Grain: SVG `feTurbulence` (type: fractalNoise, baseFrequency 0.65) — fine film grain, 3.5–4% opacity

---

## 3. Glass surfaces

```css
.glass-card {
  background: rgba(255, 255, 255, 0.58);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.70);
  box-shadow:
    0 2px 12px rgba(0,0,0,0.06),
    0 1px 2px rgba(0,0,0,0.04),
    inset 0 1px 0 rgba(255,255,255,0.90);
}
```

---

## 4. Empty state motifs

Each empty state uses an animated SVG illustration — minimal line-art, stroke-based, no fills except accent.

**Sprouting seed** — for empty lists. An oval seed with a curved stem and two leaves emerging. Animated: leaves unfurl with a `scaleY` + `opacity` grow sequence.

**Floating leaf** — for empty search. A single leaf shape that rotates gently back and forth, as if caught in a breeze.

**Open basket** — for empty cart/bag. A simple woven basket outline. Animated: a subtle bob up/down.

All motifs use `--color-accent` as stroke color, `stroke-linecap: round`, `stroke-linejoin: round`. No fill on strokes. Scale: ~80×80px standard display size.

---

## 5. Icons

A 24px stroke icon set. All icons: `stroke: currentColor`, `stroke-width: 1.5`, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`. Inherit color from parent.

Included icons: `cart`, `check`, `check-circle`, `search`, `list`, `plus`, `leaf`, `tag`, `store`, `close`, `chevron-right`, `alert`.

---

## 6. Typography

**Display / headings:** DM Serif Display, Google Fonts
**Body:** Inter, Google Fonts

| Token | Size | Line height | Weight | Usage |
|-------|------|-------------|--------|-------|
| Display | 3.052rem | 1.1 | 400 | Hero, empty state |
| H1 | 2.441rem | 1.15 | 400 | Page title |
| H2 | 1.953rem | 1.2 | 400 | Section title |
| H3 | 1.563rem | 1.25 | 400 | Card title |
| Body | 1rem | 1.6 | 400 | Paragraphs |
| Small | 0.8rem | 1.5 | 400 | Labels, captions |

---

## 7. Spacing, radius, elevation

**Spacing:** `xs 0.25rem · sm 0.5rem · md 1rem · lg 1.5rem · xl 2.5rem · 2xl 4rem`
**Radius:** `sm 0.25rem · md 0.5rem · lg 1rem · xl 1.5rem · full 9999px`
**Shadow:** `sm`, `md`, `glass` — see tokens below

---

## 8. Components

**Button — primary:** Accent bg, white text, radius md, padding `sm lg`, weight 500.
**Button — glass:** `rgba(255,255,255,0.55)` bg, blur 12px, Border, text Text primary.
**Button — disabled:** `rgba(0,0,0,0.05)` bg, Text muted.
**Card:** glass-card treatment, radius xl, padding lg.
**Input:** `rgba(255,255,255,0.60)` bg, blur 8px, Border subtle. Focus: accent ring.
**Tag:** Accent light bg, Accent text, `rgba(46,92,62,0.20)` border, radius full.
**Badge (functional):** functional-bg + functional-text + matching border, radius full. Never use saturated primary colors.

---

## 9. Voice

**Person:** Second — "Your list", "Add to cart"
**Rhythm:** Short and declarative. One idea per sentence. No filler.
**Tone:** Calm and informative. Like a knowledgeable friend who shops well. No exclamation marks.

---

## 10. Tokens — CSS custom properties

```css
:root {
  --color-bg: #F3F1EB;
  --color-surface: rgba(255,255,255,0.58);
  --color-surface-hover: rgba(255,255,255,0.78);
  --color-text: #141210;
  --color-text-muted: #7A7671;
  --color-accent: #2E5C3E;
  --color-accent-hover: #1F402B;
  --color-accent-light: rgba(46,92,62,0.10);
  --color-border: rgba(255,255,255,0.70);
  --color-border-subtle: rgba(0,0,0,0.06);

  /* functional — earthy, tonal */
  --color-success: #456B55;
  --color-success-bg: rgba(69,107,85,0.09);
  --color-warning: #8B6830;
  --color-warning-bg: rgba(139,104,48,0.09);
  --color-error: #924040;
  --color-error-bg: rgba(146,64,64,0.09);
  --color-info: #3D6080;
  --color-info-bg: rgba(61,96,128,0.09);

  --font-display: "DM Serif Display", serif;
  --font-body: "Inter", sans-serif;
  --text-display: 3.052rem;
  --text-h1: 2.441rem;
  --text-h2: 1.953rem;
  --text-h3: 1.563rem;
  --text-body: 1rem;
  --text-small: 0.8rem;
  --leading-tight: 1.1;
  --leading-normal: 1.6;

  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-glass:
    0 2px 12px rgba(0,0,0,0.06),
    0 1px 2px rgba(0,0,0,0.04),
    inset 0 1px 0 rgba(255,255,255,0.90);
}
```

---

## 11. Tokens — Tailwind theme

```js
export default {
  theme: {
    extend: {
      colors: {
        bg: "#F3F1EB",
        surface: "rgba(255,255,255,0.58)",
        "surface-hover": "rgba(255,255,255,0.78)",
        text: { DEFAULT: "#141210", muted: "#7A7671" },
        accent: { DEFAULT: "#2E5C3E", hover: "#1F402B", light: "rgba(46,92,62,0.10)" },
        border: { DEFAULT: "rgba(255,255,255,0.70)", subtle: "rgba(0,0,0,0.06)" },
        success: { DEFAULT: "#456B55", bg: "rgba(69,107,85,0.09)" },
        warning: { DEFAULT: "#8B6830", bg: "rgba(139,104,48,0.09)" },
        error:   { DEFAULT: "#924040", bg: "rgba(146,64,64,0.09)" },
        info:    { DEFAULT: "#3D6080", bg: "rgba(61,96,128,0.09)" },
      },
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        display: ["3.052rem", { lineHeight: "1.1" }],
        h1: ["2.441rem", { lineHeight: "1.15" }],
        h2: ["1.953rem", { lineHeight: "1.2" }],
        h3: ["1.563rem", { lineHeight: "1.25" }],
        small: ["0.8rem", { lineHeight: "1.5" }],
      },
      borderRadius: {
        sm: "0.25rem", md: "0.5rem", lg: "1rem", xl: "1.5rem",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        md: "0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        glass: "0 2px 12px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.90)",
      },
    },
  },
};
```
