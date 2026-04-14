# Design System: Clean Shopper
**Date:** 2026-04-14  |  **Version:** 2.0  |  **Platform:** Web  |  **Source:** Rayum Design System (Figma)

---

## Design Direction

Clean Shopper should feel like a calm, trusted space — organic and minimal, with the restrained confidence of Apple's visual language. It's a place where information is presented cleanly and the interface gets out of the way, with occasional pops of editorial color (inspired by Monocle's confident use of accent) that add personality without clutter.

The experience is closer to consulting a knowledgeable friend than browsing a store. There is no urgency, no pressure, no conversion tactics. Information appears when you need it — enough to be informed, never overwhelmed. The visual environment should feel like walking in nature: soft light, earthy tones, soothing and calming.

Everything should be spacious, visual, and simple. Text is warm and readable. Accessibility is a core value, not a checkbox — strong contrast and readability are baked into the palette, not bolted on after.

## Design Principles

**Let the content breathe.** Generous whitespace is not wasted space — it creates calm. Every element earns its place by serving the user, not filling a layout.

**Earn trust through restraint.** No selling, no urgency, no visual noise. Confidence comes from saying less, not more. The interface recedes so the information can lead.

**Nature as reference.** Color, texture, and rhythm draw from the natural world — earthy, muted, organic. Nothing synthetic, nothing neon, nothing that demands attention.

**Show only what's needed.** Information is progressive, not exhaustive. The default state is simple. Depth is available when the user asks for it.

**Accessible by nature.** Strong contrast and readability are not accommodations — they are the foundation. The calm palette and the accessibility commitment reinforce each other.

---

## Color System

### Palette Philosophy

The palette is anchored by a lively but trustworthy green (the brand primary) that connects directly to the product's mission — clean, natural, healthy — without feeling clinical. A cool blue secondary provides contrast for interactive and informational elements. Neutrals are dark-grounded, running from near-black (#0a0d11) to pure white, which creates excellent contrast and supports both light and dark surfaces.

### Color Primitives

These are the raw values from the Figma "Color Primitives" collection. Use semantic tokens (below) in code — only reference primitives when no semantic token exists.

#### Brand — Primary (Green)

| Step | Hex | Notes |
|------|-----|-------|
| 10 | `#f1fff4` | Lightest tint |
| 20 | `#c6ffd2` | |
| 30 | `#9cffb1` | |
| 40 | `#70fc8e` | |
| **50** | `#5cdf78` | **Base brand green** |
| 60 | `#4ac263` | |
| 70 | `#39a550` | |
| 80 | `#2b873f` | |
| 90 | `#1e6a2f` | |
| 100 | `#07200c` | Darkest shade |

#### Brand — Secondary (Blue)

| Step | Hex | Notes |
|------|-----|-------|
| 10 | `#ebf0ff` | Lightest tint |
| 20 | `#beceff` | |
| 30 | `#92acff` | |
| 40 | `#658aff` | |
| **50** | `#3765f6` | **Base brand blue** |
| 60 | `#244fd4` | |
| 70 | `#153bb2` | |
| 80 | `#092a90` | |
| 90 | `#011c6e` | |
| 100 | `#011040` | Darkest shade |

#### Neutral

| Step | Hex | Notes |
|------|-----|-------|
| 10 | `#ffffff` | White |
| 15 | `#f6f7f9` | Near white |
| 20 | `#edf0f2` | |
| 25 | `#e1e5ea` | |
| 30 | `#d3dbe4` | |
| 35 | `#c3ced7` | |
| 40 | `#b0becb` | |
| 50 | `#929fb1` | Mid-gray |
| 60 | `#606e80` | |
| 70 | `#404b5a` | |
| 80 | `#2f3b4c` | |
| 85 | `#27313f` | |
| 90 | `#1f2633` | |
| 95 | `#181d25` | |
| 100 | `#0a0d11` | Near black |

#### Functional Colors

| Color | Steps available | Base value |
|-------|----------------|------------|
| Blue (info) | 10–100 | `#0070f3` (60) |
| Red (danger) | 10–100 | `#e53e3e` (60) |
| Yellow (warning) | 10–100 | `#ffcb2c` (60) |
| Orange (caution) | 10–100 | `#f07000` (60) |
| Green (success) | 10–100 | `#60cc65` (60) |

---

### Semantic Color Tokens

These are the **only tokens to use in code**. They adapt automatically between Light and Dark mode.

#### Backgrounds

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--bg-default` | Neutral/10 `#ffffff` | Neutral/100 `#0a0d11` | Main page canvas |
| `--bg-muted` | Neutral/15 `#f6f7f9` | Neutral/90 `#1f2633` | Secondary surfaces, sidebar |
| `--bg-inset` | → bg-muted | Neutral/95 `#181d25` | Input fields, recessed areas |
| `--bg-inverse` | Neutral/95 `#181d25` | Neutral/10 `#ffffff` | Inverse surfaces |
| `--bg-overlay` | Neutral/10 `#ffffff` | Neutral/90 `#1f2633` | Floating layers, modals |
| `--bg-neutral-emphasis` | Neutral/35 `#c3ced7` | Neutral/80 `#2f3b4c` | Neutral chips, tags |
| `--bg-neutral-muted` | Neutral/25 `#e1e5ea` | Neutral/85 `#27313f` | Subtle neutral fills |
| `--bg-accent-emphasis` | Primary/40 `#70fc8e` | Primary/40 `#70fc8e` | Accent chips, highlights |
| `--bg-accent-muted` | Primary/10 `#f1fff4` | Primary/100 `#07200c` | Subtle accent tints |
| `--bg-brand-primary` | Primary/40 `#70fc8e` | Primary/40 `#70fc8e` | Brand-colored elements |
| `--bg-brand-secondary` | Secondary/50 `#3765f6` | Secondary/40 `#658aff` | Secondary brand fills |
| `--bg-brand-tertiary` | Secondary/20 `#beceff` | Secondary/100 `#011040` | Tertiary brand tints |

#### Foreground / Text

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--fg-default` | Neutral/100 `#0a0d11` | Neutral/20 `#edf0f2` | Primary text |
| `--fg-muted` | Neutral/60 `#606e80` | Neutral/50 `#929fb1` | Secondary text, captions |
| `--fg-inverse` | Neutral/10 `#ffffff` | Neutral/95 `#181d25` | Text on dark surfaces |
| `--fg-accent` | Primary/50 `#5cdf78` | Primary/40 `#70fc8e` | Accent text |
| `--fg-brand-primary` | Primary/60 `#4ac263` | Primary/40 `#70fc8e` | Brand text |
| `--fg-brand-secondary` | Secondary/60 `#244fd4` | Secondary/40 `#658aff` | Secondary brand text |

#### Borders

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--border-default` | Neutral/35 `#c3ced7` | Neutral/80 `#2f3b4c` | Standard dividers, card edges |
| `--border-muted` | Neutral/50 `#929fb1` | Neutral/80 `#2f3b4c` | Subtle borders |
| `--border-muted-input` | Neutral/30 `#d3dbe4` | Neutral/85 `#27313f` | Input field borders |
| `--border-accent` | Primary/40 `#70fc8e` | Primary/40 `#70fc8e` | Focus rings, accent dividers |
| `--border-brand-secondary` | Secondary/50 `#3765f6` | Secondary/40 `#658aff` | Brand-colored borders |

#### Action — Primary Button

| State | Background | Border | Foreground |
|-------|-----------|--------|-----------|
| Default | Neutral/95 `#181d25` | Neutral/95 | Neutral/10 `#ffffff` |
| Hover | Neutral/90 `#1f2633` | Neutral/90 | Neutral/10 |
| Active | Neutral/100 `#0a0d11` | Neutral/100 | Neutral/10 |
| Disabled | Neutral/35 `#c3ced7` | Neutral/35 | Neutral/60 |

#### Action — Secondary Button

| State | Background | Border | Foreground |
|-------|-----------|--------|-----------|
| Default | Transparent | Neutral/40 `#b0becb` | Neutral/95 `#181d25` |
| Hover | Alpha/Black/4 | Neutral/40 | Neutral/95 |
| Active | Transparent | Neutral/60 | Neutral/100 |
| Disabled | Transparent | Neutral/35 | Neutral/60 |

#### Action — Danger Button

| State | Background | Foreground |
|-------|-----------|-----------|
| Default | Red/60 `#e53e3e` | Neutral/10 |
| Hover | Red/70 `#c32b2b` | Neutral/10 |
| Active | Red/60 | Neutral/10 |

#### Support / Feedback

| Role | Emphasis bg | Muted bg (light) | Muted bg (dark) | Foreground |
|------|------------|-----------------|-----------------|-----------|
| Info | Blue/60 `#0070f3` | Blue/10 `#e5f1ff` | Blue/100 `#002249` | Blue/50 `#2e8eff` |
| Success | Green/60 `#60cc65` | Green/10 `#effaf0` | Green/100 `#0b310c` | Green/70 `#4caf50` |
| Warning | Orange/60 `#f07000` | Orange/10 `#fff1e5` | Orange/100 `#431f00` | Orange/50 `#ff902e` |
| Danger | Red/60 `#e53e3e` | Red/10 `#ffeded` | Red/100 `#450000` | Red/60 |

---

## Typography

### Type Philosophy

Text should feel warm and readable. The type system uses Inter as the primary sans-serif for its clarity and versatility, Playfair as an editorial serif for display moments, and Roboto Mono for structured data and ingredient lists.

### Font Stack

| Role | Font | CSS Stack | Usage |
|------|------|-----------|-------|
| Primary / UI | Inter | `'Inter', system-ui, -apple-system, sans-serif` | All UI text, headings, body |
| Editorial / Display | Playfair | `'Playfair', 'Playfair Display', Georgia, serif` | Hero display moments, editorial headers |
| Monospace / Data | Roboto Mono | `'Roboto Mono', ui-monospace, monospace` | Ingredient data, EWG scores, code |

### Type Scale (from Figma text styles)

| Style | Size | Weight | Letter Spacing | Usage |
|-------|------|--------|----------------|-------|
| Title Hero | 72px | Medium (500) | −4px | Hero moments, landing headline |
| Title Page Large | 64px | Medium (500) | −4px | Largest page titles |
| Title Page Base | 48px | Medium (500) | −4px | Standard page titles |
| Title Page Small | 40px | Medium (500) | −4px | Compact page titles |
| Heading Large | 40px | Semi Bold (600) | −1.2px | Section headings |
| Heading Base | 32px | Semi Bold (600) | −1.2px | Standard section headings |
| Heading Small | 28px | Semi Bold (600) | −1.2px | Subsection headings |
| Subheading Large | 24px | Medium (500) | −0.8px | Large subheadings |
| Subheading Base | 20px | Medium (500) | −0.8px | Standard subheadings |
| Subheading Small | 18px | Medium (500) | −0.8px | Small subheadings |
| Body Large Bold | 18px | Bold (700) | 0 | Emphasized large body |
| Body Large | 18px | Regular (400) | 0 | Large body text |
| Body Base Bold | 16px | Bold (700) | 0 | Emphasized body text |
| Body Base | 16px | Regular (400) | 0 | Standard body / paragraphs |
| Body Small Bold | 14px | Bold (700) | 0 | Small emphasized body |
| Body Small | 14px | Regular (400) | 0 | Secondary text, captions |
| Label Large | 16px | Medium (500) | 0 | Large UI labels |
| Label Base | 14px | Medium (500) | 0 | Standard labels |
| Label Small | 12px | Medium (500) | 0 | Badges, tags, metadata |

### Font Size Primitives

`12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 40 · 48 · 64 · 72` px

### Font Weight Primitives

| Name | Value |
|------|-------|
| Thin | 100 |
| Extra Light | 200 |
| Light | 300 |
| Regular | 400 |
| Medium | 500 |
| Semibold | 600 |
| Bold | 700 |
| Extra Bold | 800 |
| Black | 900 |

---

## Spacing System

### Base Unit

**2px.** Scale steps use multiples named by their multiplier × 50.

### Spacing Primitives

| Token | Value | Usage |
|-------|-------|-------|
| `space/0` | 0px | No spacing |
| `space/50` | 2px | Micro gaps |
| `space/100` | 4px | Tight pairs, icon nudges |
| `space/150` | 6px | Badge padding |
| `space/200` | 8px | Inline element gaps |
| `space/250` | 10px | Small component padding |
| `space/300` | 12px | Related element gaps |
| `space/400` | 16px | Default internal padding |
| `space/500` | 20px | Card internal padding |
| `space/600` | 24px | Card-to-card gap |
| `space/700` | 28px | Medium section gaps |
| `space/800` | 32px | Section padding |
| `space/1000` | 40px | Content breaks |
| `space/1200` | 48px | Section-to-section |
| `space/1400` | 56px | Large section spacing |
| `space/1600` | 64px | Page section rhythm |
| `space/2400` | 96px | Hero spacing |
| `space/4000` | 160px | Extra large layout gaps |

### Semantic Spacing (Component Sizes)

| Token | Value | Usage |
|-------|-------|-------|
| Button height — Large | 48px (space/1200) | Large CTA buttons |
| Button height — Medium | 40px (space/1000) | Standard buttons |
| Button height — Small | 32px (space/800) | Compact buttons |
| Button padding — XL | 24px (space/600) | |
| Button padding — LG | 20px (space/500) | |
| Button padding — MD | 16px (space/400) | |
| Button padding — SM | 12px (space/300) | |
| Card padding | 20px (space/500) | Standard card |
| Card large padding | 32px (space/800) | Featured / large card |
| Icon — Large | 24px (space/600) | |
| Icon — Medium | 20px (space/500) | |
| Icon — Small | 16px (space/400) | |
| Component shell padding | 56px (space/1400) | Page-level shell |
| Input padding (H) | 20px (space/500) | Input left/right |

### Screen Breakpoints

| Name | Width | Height (min) |
|------|-------|-------------|
| Desktop | 1440px | 1024px |
| Tablet | 1194px | 834px |
| Mobile | 402px | 874px |

---

## Shape & Borders

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius/0` | 0px | No radius |
| `radius/50` | 2px | Subtle rounding |
| `radius/100` | 4px | Small badges |
| `radius/200` | 8px | Inputs, small buttons |
| `radius/300` | 12px | Cards (inner) |
| `radius/400` | 16px | Cards, panels |
| `radius/600` | 24px | Buttons, pills, inputs |
| `radius/800` | 32px | Large cards (outer) |
| `radius/Full` | 9999px | Avatars, fully rounded pills |

### Stroke Weights

| Token | Value | Usage |
|-------|-------|-------|
| `stroke/0` | 0px | No border |
| `stroke/3` | 0.33px | Hairline |
| `stroke/5` | 0.5px | Sub-pixel subtle |
| `stroke/10` | 1px | Default border |
| `stroke/15` | 1.5px | Medium emphasis |
| `stroke/20` | 2px | Focus rings, strong emphasis |

---

## Motion

### Motion Philosophy

Smooth and polished but never showy. Motion exists to make transitions feel crafted and intentional — things ease in gently, settle naturally, and never bounce or overshoot. The pace matches the calm environment: nothing snaps, nothing races.

### Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 120ms | Hover states, color transitions, micro-interactions |
| `--duration-normal` | 220ms | Dropdowns, tooltips, tab switches |
| `--duration-slow` | 380ms | Modals, sidebars, page transitions |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-default` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | General transitions |
| `--ease-in` | `cubic-bezier(0.42, 0, 1, 1)` | Elements leaving |
| `--ease-out` | `cubic-bezier(0, 0, 0.58, 1)` | Elements entering |

### Reduced Motion

All motion wrapped in `@media (prefers-reduced-motion: no-preference)`. With reduced motion enabled, transitions are instant (opacity crossfade only, 0ms duration).

---

## Dark Mode

The design system ships with full Light and Dark mode support, defined in the Figma `Color` collection. All semantic tokens listed above have both light and dark values.

Implementation: set `data-theme="dark"` on the `<html>` element (or use `@media (prefers-color-scheme: dark)`).

---

## Design Tokens (CSS Custom Properties)

```css
/* ============================================================
   PRIMITIVES — Brand Colors
   ============================================================ */
:root {
  --color-brand-primary-10:  #f1fff4;
  --color-brand-primary-20:  #c6ffd2;
  --color-brand-primary-30:  #9cffb1;
  --color-brand-primary-40:  #70fc8e;
  --color-brand-primary-50:  #5cdf78;
  --color-brand-primary-60:  #4ac263;
  --color-brand-primary-70:  #39a550;
  --color-brand-primary-80:  #2b873f;
  --color-brand-primary-90:  #1e6a2f;
  --color-brand-primary-100: #07200c;

  --color-brand-secondary-10:  #ebf0ff;
  --color-brand-secondary-20:  #beceff;
  --color-brand-secondary-30:  #92acff;
  --color-brand-secondary-40:  #658aff;
  --color-brand-secondary-50:  #3765f6;
  --color-brand-secondary-60:  #244fd4;
  --color-brand-secondary-70:  #153bb2;
  --color-brand-secondary-80:  #092a90;
  --color-brand-secondary-90:  #011c6e;
  --color-brand-secondary-100: #011040;

  /* --- Neutrals --- */
  --color-neutral-10:  #ffffff;
  --color-neutral-15:  #f6f7f9;
  --color-neutral-20:  #edf0f2;
  --color-neutral-25:  #e1e5ea;
  --color-neutral-30:  #d3dbe4;
  --color-neutral-35:  #c3ced7;
  --color-neutral-40:  #b0becb;
  --color-neutral-50:  #929fb1;
  --color-neutral-60:  #606e80;
  --color-neutral-70:  #404b5a;
  --color-neutral-80:  #2f3b4c;
  --color-neutral-85:  #27313f;
  --color-neutral-90:  #1f2633;
  --color-neutral-95:  #181d25;
  --color-neutral-100: #0a0d11;

  /* --- Functional --- */
  --color-blue-10:  #e5f1ff; --color-blue-60:  #0070f3; --color-blue-100: #002249;
  --color-red-10:   #ffeded; --color-red-60:   #e53e3e; --color-red-100:  #450000;
  --color-green-10: #effaf0; --color-green-60: #60cc65; --color-green-100:#0b310c;
  --color-yellow-10:#fffaea; --color-yellow-60:#ffcb2c; --color-yellow-100:#403000;
  --color-orange-10:#fff1e5; --color-orange-60:#f07000; --color-orange-100:#431f00;

  /* --- Typography --- */
  --font-sans:  'Inter', system-ui, -apple-system, sans-serif;
  --font-serif: 'Playfair', 'Playfair Display', Georgia, serif;
  --font-mono:  'Roboto Mono', ui-monospace, monospace;

  --text-xs:    12px;
  --text-sm:    14px;
  --text-base:  16px;
  --text-lg:    18px;
  --text-xl:    20px;
  --text-2xl:   24px;
  --text-3xl:   28px;
  --text-4xl:   32px;
  --text-5xl:   40px;
  --text-6xl:   48px;
  --text-7xl:   64px;
  --text-8xl:   72px;

  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  /* --- Spacing --- */
  --space-0:    0px;
  --space-0-5:  2px;
  --space-1:    4px;
  --space-1-5:  6px;
  --space-2:    8px;
  --space-2-5:  10px;
  --space-3:    12px;
  --space-4:    16px;
  --space-5:    20px;
  --space-6:    24px;
  --space-7:    28px;
  --space-8:    32px;
  --space-10:   40px;
  --space-12:   48px;
  --space-14:   56px;
  --space-16:   64px;
  --space-24:   96px;
  --space-40:   160px;

  /* --- Border Radius --- */
  --radius-none: 0px;
  --radius-xs:   2px;
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-3xl:  32px;
  --radius-full: 9999px;

  /* --- Stroke --- */
  --stroke-none: 0px;
  --stroke-thin: 0.5px;
  --stroke-base: 1px;
  --stroke-md:   1.5px;
  --stroke-lg:   2px;

  /* --- Motion --- */
  --duration-fast:   120ms;
  --duration-normal: 220ms;
  --duration-slow:   380ms;
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-in:      cubic-bezier(0.42, 0, 1, 1);
  --ease-out:     cubic-bezier(0, 0, 0.58, 1);
}

/* ============================================================
   SEMANTIC TOKENS — Light Mode (default)
   ============================================================ */
:root,
[data-theme="light"] {
  /* Backgrounds */
  --bg-default:         var(--color-neutral-10);
  --bg-muted:           var(--color-neutral-15);
  --bg-inset:           var(--color-neutral-15);
  --bg-inverse:         var(--color-neutral-95);
  --bg-overlay:         var(--color-neutral-10);
  --bg-neutral-emphasis:var(--color-neutral-35);
  --bg-neutral-muted:   var(--color-neutral-25);
  --bg-accent-emphasis: var(--color-brand-primary-40);
  --bg-accent-muted:    var(--color-brand-primary-10);
  --bg-brand-primary:   var(--color-brand-primary-40);
  --bg-brand-secondary: var(--color-brand-secondary-50);
  --bg-brand-tertiary:  var(--color-brand-secondary-20);

  /* Foreground */
  --fg-default:         var(--color-neutral-100);
  --fg-muted:           var(--color-neutral-60);
  --fg-inverse:         var(--color-neutral-10);
  --fg-accent:          var(--color-brand-primary-50);
  --fg-brand-primary:   var(--color-brand-primary-60);
  --fg-brand-secondary: var(--color-brand-secondary-60);

  /* Borders */
  --border-default:     var(--color-neutral-35);
  --border-muted:       var(--color-neutral-50);
  --border-muted-input: var(--color-neutral-30);
  --border-accent:      var(--color-brand-primary-40);
  --border-brand:       var(--color-brand-secondary-50);

  /* Action — Primary */
  --btn-primary-bg:      var(--color-neutral-95);
  --btn-primary-fg:      var(--color-neutral-10);
  --btn-primary-hover:   var(--color-neutral-90);
  --btn-primary-pressed: var(--color-neutral-100);
  --btn-primary-disabled:var(--color-neutral-35);

  /* Action — Secondary */
  --btn-secondary-border:  var(--color-neutral-40);
  --btn-secondary-fg:      var(--color-neutral-95);

  /* Focus */
  --focus-ring:         var(--color-brand-primary-40);
  --focus-center:       var(--color-brand-primary-10);

  /* Support */
  --support-info-bg:      var(--color-blue-10);
  --support-info-fg:      #2e8eff;
  --support-success-bg:   var(--color-green-10);
  --support-success-fg:   #4caf50;
  --support-warning-bg:   var(--color-orange-10);
  --support-warning-fg:   var(--color-orange-60);
  --support-danger-bg:    var(--color-red-10);
  --support-danger-fg:    var(--color-red-60);

  /* Disabled */
  --disabled-bg:        var(--color-neutral-35);
  --disabled-fg:        var(--color-neutral-60);
}

/* ============================================================
   SEMANTIC TOKENS — Dark Mode
   ============================================================ */
@media (prefers-color-scheme: dark) { :root { color-scheme: dark; } }

[data-theme="dark"] {
  /* Backgrounds */
  --bg-default:         var(--color-neutral-100);
  --bg-muted:           var(--color-neutral-90);
  --bg-inset:           var(--color-neutral-95);
  --bg-inverse:         var(--color-neutral-10);
  --bg-overlay:         var(--color-neutral-90);
  --bg-neutral-emphasis:var(--color-neutral-80);
  --bg-neutral-muted:   var(--color-neutral-85);
  --bg-accent-emphasis: var(--color-brand-primary-40);
  --bg-accent-muted:    var(--color-brand-primary-100);
  --bg-brand-primary:   var(--color-brand-primary-40);
  --bg-brand-secondary: var(--color-brand-secondary-40);
  --bg-brand-tertiary:  var(--color-brand-secondary-100);

  /* Foreground */
  --fg-default:         var(--color-neutral-20);
  --fg-muted:           var(--color-neutral-50);
  --fg-inverse:         var(--color-neutral-95);
  --fg-accent:          var(--color-brand-primary-40);
  --fg-brand-primary:   var(--color-brand-primary-40);
  --fg-brand-secondary: var(--color-brand-secondary-40);

  /* Borders */
  --border-default:     var(--color-neutral-80);
  --border-muted:       var(--color-neutral-80);
  --border-muted-input: var(--color-neutral-85);
  --border-accent:      var(--color-brand-primary-40);
  --border-brand:       var(--color-brand-secondary-40);

  /* Action — Primary */
  --btn-primary-bg:      var(--color-neutral-10);
  --btn-primary-fg:      var(--color-neutral-100);
  --btn-primary-hover:   var(--color-neutral-20);
  --btn-primary-pressed: var(--color-neutral-10);
  --btn-primary-disabled:var(--color-neutral-85);

  /* Action — Secondary */
  --btn-secondary-border:  var(--color-neutral-70);
  --btn-secondary-fg:      var(--color-neutral-10);

  /* Focus */
  --focus-ring:         var(--color-brand-primary-40);
  --focus-center:       var(--color-brand-primary-100);

  /* Support */
  --support-info-bg:      var(--color-blue-100);
  --support-info-fg:      #5ca7ff;
  --support-success-bg:   var(--color-green-100);
  --support-success-fg:   var(--color-green-60);
  --support-warning-bg:   var(--color-orange-100);
  --support-warning-fg:   #ff902e;
  --support-danger-bg:    var(--color-red-100);
  --support-danger-fg:    #ff5252;

  /* Disabled */
  --disabled-bg:        var(--color-neutral-70);
  --disabled-fg:        var(--color-neutral-60);
}
```

---

## Open Decisions

1. **Font loading.** Inter and Playfair are specified in the Figma system. Both are Google Fonts — confirm self-hosted vs. CDN for performance.

2. **Accent color use.** The brand primary green (#5cdf78 / Primary/40–50) is vibrant. It works for CTA accents but should be used sparingly against light backgrounds to maintain the calm, restrained aesthetic.

3. **Content max-width.** Not specified in the Figma system. Maintain the existing `720px` conversational max-width from v1 for the chat interface; `1080px` for comparison views.

4. **Illustration and imagery style.** Not covered in the Figma system. Photography treatment, empty state illustrations, and iconography style need a separate pass.

5. **Shadows.** Not defined in the Figma token system. Carry forward the v1 shadow scale (`shadow-sm`, `shadow-md`, `shadow-lg`) or define a new one aligned to the dark-neutral base.
