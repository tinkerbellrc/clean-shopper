# Clean Shopper — Design System
**Source:** Extracted from seed.com  
**Date:** 2026-04-14  |  **Version:** 2.0  |  **Branch:** design/extracted

---

## Design Direction

Clean Shopper's visual language is **premium, minimal, and nature-forward** — drawn directly from the Seed design system. The palette is almost monochromatic: deep forest green on layered off-whites, with muted warm neutrals for depth. There are no vivid accent colors except for functional feedback states.

The experience should feel like consulting a knowledgeable, trusted source — calm, scientific, and unhurried. Typography carries an editorial weight: light-to-regular, tightly tracked on large headings, never loud. Buttons are always pill-shaped. Sections are full-bleed with generous vertical rhythm. No drop shadows — depth comes from layered surface colors, not elevation.

---

## Design Principles

**Restraint is confidence.** No urgency, no conversion pressure, no visual noise. The interface recedes so information leads.

**Nature as palette.** Deep forest greens and layered off-whites are drawn from the natural world — grounded, organic, trustworthy.

**Editorial lightness.** Typography is light in weight and tight in tracking. Headings feel considered, not loud. Body copy is warm and readable.

**Depth without shadow.** Surface hierarchy uses layered background tones (snow white → yellowish white → foam white) rather than drop shadows or borders.

**Full-bleed generosity.** Sections breathe. Vertical padding is never less than 56px. Whitespace is not waste — it signals quality.

---

## Color System

### Primitive Tokens

| Token | Value | Name |
|---|---|---|
| `--color-primary-seed-green` | `#1c3a13` | Seed Green (deep forest) |
| `--color-primary-soft-green` | `#3d5b34` | Soft Green |
| `--color-primary-snow-white` | `#fcfcf7` | Snow White |
| `--color-primary-white` | `#ffffff` | White |
| `--color-neutral-cool-neutral-20` | `#f9f9f9` | Cool Neutral 20 |
| `--color-neutral-cool-neutral-40` | `#efefef` | Cool Neutral 40 |
| `--color-neutral-cool-neutral-60` | `#e6e6e6` | Cool Neutral 60 |
| `--color-neutral-faded-green-20` | `#d2d8d0` | Faded Green 20 |
| `--color-neutral-faded-green-40` | `#a4b0a1` | Faded Green 40 |
| `--color-neutral-faded-green-60` | `#778971` | Faded Green 60 |
| `--color-neutral-foam-white` | `#eff1e4` | Foam White |
| `--color-neutral-yellowish-white` | `#f6f7ef` | Yellowish White |
| `--color-micronav-green` | `#58644c` | Micronav Green |
| `--color-guidance-bright-green` | `#d3fa99` | Bright Green (accent) |
| `--color-guidance-lemongrass` | `#e9f0ca` | Lemongrass |
| `--color-guidance-error` | `#eb5757` | Error |
| `--color-guidance-warning` | `#ebb057` | Warning |

### Opacity Variants

| Token | Value |
|---|---|
| `--color-primary-seed-green-05` | `rgba(28, 58, 19, 0.05)` |
| `--color-primary-seed-green-10` | `rgba(28, 58, 19, 0.1)` |
| `--color-primary-seed-green-15` | `rgba(28, 58, 19, 0.15)` |
| `--color-primary-seed-green-20` | `rgba(28, 58, 19, 0.2)` |
| `--color-primary-seed-green-50` | `rgba(28, 58, 19, 0.5)` |
| `--color-primary-seed-green-70` | `rgba(28, 58, 19, 0.7)` |
| `--color-neutral-frosted-glass-08` | `rgba(87, 94, 85, 0.08)` |
| `--color-neutral-frosted-glass-35` | `rgba(87, 94, 85, 0.35)` |

### Semantic Tokens

| Token | Maps to | Role |
|---|---|---|
| `--text-primary` | `--color-primary-seed-green` | Primary body and heading text |
| `--text-secondary` | `--color-primary-seed-green-70` | Supporting labels, secondary copy |
| `--text-inverse-primary` | `--color-primary-snow-white` | Text on dark/green backgrounds |
| `--text-inverse-secondary` | snow white at 70% | Secondary text on dark backgrounds |
| `--text-disabled` | `--color-primary-seed-green-50` | Disabled states |
| `--text-error` | `--color-guidance-error` | Error messages |
| `--text-warning` | `--color-guidance-warning` | Warning messages |
| `--fill-brand` | `--color-primary-seed-green` | Brand-colored fills |
| `--fill-brand-subtle` | `--color-primary-soft-green` | Subtle brand fills |
| `--fill-primary` | `--color-primary-snow-white` | Primary surface background |
| `--fill-secondary` | `--color-neutral-yellowish-white` | Secondary surface |
| `--fill-tertiary` | `--color-neutral-foam-white` | Tertiary surface |
| `--fill-neutral-light` | `--color-neutral-cool-neutral-20` | Neutral light fill |
| `--fill-neutral-medium` | `--color-neutral-cool-neutral-40` | Neutral medium fill |

### Color Usage Rules

- **Background hierarchy:** `#ffffff` (true white) → `#fcfcf7` (snow white, primary surface) → `#f6f7ef` (yellowish white) → `#eff1e4` (foam white). Depth through layering, never shadows.
- **`#1c3a13` is the anchor.** Used for all primary text, all primary buttons, and all brand fills. It carries meaning — don't dilute it with decorative use.
- **`#d3fa99` (bright green) is a UI accent only.** Use for interactive highlights or confirmation states, never decoratively.
- **Error (`#eb5757`) and warning (`#ebb057`) are functional only.** Never repurpose them for decoration.

---

## Typography

### Typeface

**Primary:** Inter (variable, 100–900 axis) — substitutes for proprietary Seed Sans  
**Mono:** "JetBrains Mono" — substitutes for Seed Sans Mono  
**Fallback stack:** `Inter, Helvetica, system-ui, sans-serif`

> Note: Seed.com uses a custom proprietary typeface (Seed Sans) with a 350 weight axis. Inter with font-variation-settings approximates the optical weight. Set `font-feature-settings: 'cv05', 'cv11'` for a more humanist feel.

### Scale

| Token | rem | px | Usage |
|---|---|---|---|
| `--font-size-250` | 0.625rem | 10px | Smallest labels |
| `--font-size-300` | 0.75rem | 12px | Eyebrow / uppercase labels |
| `--font-size-350` | 0.875rem | 14px | Small body, nav links |
| `--font-size-400` | 1rem | 16px | Body text |
| `--font-size-450` | 1.125rem | 18px | Large body |
| `--font-size-500` | 1.25rem | 20px | Sub-heading |
| `--font-size-600` | 1.5rem | 24px | Section sub-heading |
| `--font-size-800` | 2rem | 32px | Heading S |
| `--font-size-1000` | 2.5rem | 40px | Heading M |
| `--font-size-1200` | 3rem | 48px | Heading L / Display |
| `--font-size-1600` | 4rem | 64px | Hero display |

### Weights

| Token | Value | Role |
|---|---|---|
| `--font-weight-300` | 300 | Light (captions, fine print) |
| `--font-weight-350` | 350 | Default body and headings |
| `--font-weight-400` | 400 | Regular (nav, UI labels) |
| `--font-weight-500` | 500 | Medium (eyebrows, emphasized labels) |

### Heading Styles

| Level | Size | Weight | Line Height | Letter Spacing | Color |
|---|---|---|---|---|---|
| Display / H1 | 48px | 350 | 1.1 (52.8px) | -1.2px | `#1c3a13` |
| H2 | 48px | 350 | 1.1 | -0.72px | `#fcfcf7` (inverse) |
| H3 Large | 40px | 350 | 1.1 (44px) | -0.4px | `#1c3a13` |
| H3 Section | 32px | 400 | 1.1 (35.2px) | 0 | `#fcfcf7` |
| Sub-heading | 24px | 350 | 1.2 (28.8px) | -0.36px | varies |
| Eyebrow | 12px | 500 | 1.1 | 0 | `#fcfcf7`, uppercase |

### Body Text

```
font-size: 16px
font-weight: 350
line-height: 1.3 (20.8px)
letter-spacing: -0.16px
color: #1c3a13
```

---

## Spacing System

### Base Scale

| Token | rem | px |
|---|---|---|
| `--size-025` | 0.0625rem | 1px |
| `--size-050` | 0.125rem | 2px |
| `--size-100` | 0.25rem | 4px |
| `--size-200` | 0.5rem | 8px |
| `--size-300` | 0.75rem | 12px |
| `--size-400` | 1rem | 16px |
| `--size-600` | 1.5rem | 24px |
| `--size-800` | 2rem | 32px |
| `--size-1000` | 2.5rem | 40px |
| `--size-1200` | 3rem | 48px |
| `--size-1400` | 3.5rem | 56px |
| `--size-1600` | 4rem | 64px |
| `--size-1800` | 4.5rem | 72px |
| `--size-2000` | 5rem | 80px |
| `--size-2500` | 6.25rem | 100px |

### Named Spacing Aliases

| Token | Value |
|---|---|
| `--spacing-4` | 4px |
| `--spacing-8` | 8px |
| `--spacing-16` | 16px |
| `--spacing-24` | 24px |
| `--spacing-32` | 32px |
| `--spacing-40` | 40px |
| `--spacing-48` | 48px |
| `--spacing-56` | 56px |
| `--spacing-64` | 64px |
| `--spacing-80` | 80px |

### Component Spacing

| Context | Value |
|---|---|
| Section vertical padding | 56px |
| Large section padding | 80px 32px |
| Card padding | 40px |
| Nav height | 48px |
| Page margin | 16px |
| Page gutter | 20px |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-xs` | 4px | Small UI elements |
| `--radius-sm` | 8px | Tags, chips |
| `--radius-md` | 16px | Cards |
| `--radius-lg` | 24px | Large cards |
| `--radius-xl` | 32px | Section top corners |
| `--radius-full` | 999px | Pills (buttons, badges) |

**Rules:**
- Buttons are **always pill-shaped** (`--radius-full`). No squared or rounded-corner buttons.
- Cards use `--radius-md` (16px).
- Section "card stack" effect: `border-radius: 32px 32px 0 0` on the top edge only.

---

## Buttons

| Variant | Background | Text | Padding | Radius | Size |
|---|---|---|---|---|---|
| **Primary (large)** | `#1c3a13` | `#fcfcf7` | `16px 24px` | pill | 16px / 350 |
| **Primary (small)** | `#1c3a13` | `#fcfcf7` | `10px 16px` | pill | 14px / 350 |
| **Inverse** | `#fcfcf7` | `#1c3a13` | `16px 24px` | pill | 16px / 350 |
| **Ghost / Frosted** | `rgba(87,94,85,0.35)` | `#fcfcf7` | `6px 12px` | pill | 16px / 400 |
| **Dark overlay** | `rgba(0,0,0,0.3)` | `#fcfcf7` | `16px 24px` | pill | 16px / 350 |

No border/outline-style buttons. No square buttons.

---

## Layout

```
Grid columns:     4-column fluid grid
Gutter:           20px
Page margin:      16px
Nav height:       48px
Content width:    ~1032px (at standard desktop viewport)
```

- Layout is **full-bleed** at the section level. Content constrains via the 4-column grid system, not a fixed max-width container.
- Sections stack vertically with `border-radius: 32px 32px 0 0` on the top edge to create a cinematic "stacked card" reveal on scroll.
- Nav uses flexbox (row). Hero sections use full-bleed with internal flex/grid alignment.
- No drop shadows anywhere in the token system — depth is achieved through surface layering only.

---

## Aesthetic Summary

Seed's design language is **premium minimal with a nature-science foundation**:

- **Color:** Almost monochromatic — deep forest green on off-white. Muted, grounded, never vivid.
- **Type:** Light optical weight (350), tight tracking on large sizes, generous whitespace. Anti-bold — editorial, not loud.
- **Form:** Pill buttons, rounded section corners, no hard edges.
- **Depth:** Layered surface tones, no shadows or borders.
- **Rhythm:** Full-bleed sections, 56–80px vertical padding, cinematic scroll.
- **Overall:** Clinical wellness meets editorial luxury — clean, scientific, trustworthy without being sterile.
